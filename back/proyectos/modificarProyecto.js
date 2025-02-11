import { db } from "../db.js";
import { upload } from "./crearProyecto.js";

export const uploadFile = upload.single("file")

export const modificarArchivo = async (req, res, next) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se ha enviado ningún archivo" });
      }

      console.log(upload.s3)
  
      // Generar un nombre aleatorio para evitar colisiones
      const fileName = `${crypto.randomUUID()}-${req.file.originalname}`;
  
      const uploadParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      console.log(req.file);
  
      const result = await s3.send(new PutObjectCommand(uploadParams));
      console.log(result)
  
      // Construir la URL del archivo en S3
      const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${fileName}`;
  
      res.json({ url: fileUrl });
      next();
    } catch (error) {
      console.error("Error al subir el archivo a S3:", error);
      res.status(500).json({ error: "Error al subir el archivoo" });
    }
  };
  


const modificarProyecto = async (req, res) => {
  const { id } = req.params;
  const { id_carrera, nombre_proyecto, integrantes, fechas, etapas, extensiones, tribunales, documentos } = req.body;
  

  try {
      await db.beginTransaction(); // Iniciar transacción

      await db.query(`UPDATE proyectos SET nombre_proyecto = ? WHERE id_proyecto = ?`, [nombre_proyecto, id]);

      if (integrantes && Array.isArray(integrantes)) {
          const [[{ id_grupo }]] = await db.query(`SELECT id_grupo FROM proyectos WHERE id_proyecto = ?`, [id]);

          await db.query(`DELETE FROM alumnos WHERE id_grupo = ?`, [id_grupo]);

          for (const integrante of integrantes) {
              const { nombre_alumno, apellido_alumno, legajo_alumno } = integrante;
              await db.query(
                  `INSERT INTO alumnos (nombre_alumno, apellido_alumno, legajo_alumno, id_grupo) VALUES (?, ?, ?, ?)`,
                  [nombre_alumno, apellido_alumno, legajo_alumno, id_grupo]
              );
          }

          await db.query(`UPDATE grupos SET id_carrera = ? WHERE id_grupo = ?`, [id_carrera, id_grupo]);
      }

      if (fechas && Array.isArray(fechas)) {
          await db.query(`DELETE FROM fechas WHERE id_proyecto = ?`, [id]);

          for (const fecha of fechas) {
              const { id_tipo_fecha, fecha_valor } = fecha;
              if (fecha_valor) { 
                  await db.query(
                      `INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (?, ?, ?)`,
                      [id, id_tipo_fecha, fecha_valor]
                  );
              }
              else {
                  await db.query(
                      `INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (?, ?, ?)`,
                      [id, id_tipo_fecha, null]
                  );
              }
          }
      }

      if (etapas && Array.isArray(etapas)) {
          await db.query(`DELETE FROM etapas WHERE id_proyecto = ?`, [id]);

          for (const etapa of etapas) {
              const { id_tipo_etapa, completa } = etapa;
              await db.query(
                  `INSERT INTO etapas (id_proyecto, id_tipo_etapa, completa) VALUES (?, ?, ?)`,
                  [id, id_tipo_etapa, completa]
              );
          }
      }

      if (extensiones && Array.isArray(extensiones)) {
          await db.query(`DELETE FROM extensiones WHERE id_proyecto = ?`, [id]);

          for (const extension of extensiones) {
              const { id_tipo_extension } = extension;
              await db.query(
                  `INSERT INTO extensiones (id_proyecto, id_tipo_extension) VALUES (?, ?)`,
                  [id, id_tipo_extension]
              );
          }
      }

      if (tribunales && Array.isArray(tribunales)) {
          await db.query(`DELETE FROM tribunales WHERE id_proyecto = ?`, [id]);

          const { id_tribunal, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3 } = tribunales[0];
          await db.query(
              `INSERT INTO tribunales (id_proyecto, id_tribunal, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3) VALUES (?, ?, ?, ?, ?)`,
              [id, id_tribunal, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3]
          );
      }

      if (documentos) {
        const [[{ id_documentos }]] = await db.query(`SELECT id_documentos FROM proyectos WHERE id_proyecto = ?`, [id]);
  
        await db.query(
          `UPDATE documentos SET 
            doc_propuesta_proyecto = ?, 
            doc_nota_tutor = ?, 
            doc_cv_tutor = ?, 
            doc_proyecto = ?, 
            doc_resolucion_tribunal = ? 
           WHERE id_documentos = ?`,
          [
            documentos.doc_propuesta_proyecto,
            documentos.doc_nota_tutor,
            documentos.doc_cv_tutor,
            documentos.doc_proyecto,
            documentos.doc_resolucion_tribunal,
            id_documentos,
          ]
        );
      }

      await db.commit(); // Confirmar cambios
      res.status(200).send({ message: "Proyecto actualizado correctamente" });
  } catch (error) {
      await db.rollback(); // Si hay un error, revertir cambios
      console.log(error);
      res.status(500).send("Error al actualizar el proyecto");
  } 
};


export default modificarProyecto;