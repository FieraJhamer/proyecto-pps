import { db } from "../db.js";
import { upload, s3, DeleteObjectCommand } from "../s3/s3Client.js"

export const uploadFile = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err) {
        console.error("Error en multer:", err);
        return res.status(400).json({ error: err.message });
      }
      console.log("Archivo recibido:", req.file);
      next();
    });
  };

export const modificarArchivo = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No se ha enviado ningún archivo" });
      }

      console.log("En modificar archivo", req.file)
  

      const fileUrl = req.file.location;
  
      res.json({ url: fileUrl });

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

      // Obtener los documentos actuales del proyecto
    const [[{ doc_propuesta_proyecto, doc_nota_tutor, doc_cv_tutor, doc_proyecto, doc_resolucion_tribunal, doc_resolucion_ext_etapa1, doc_resolucion_ext_etapa2, doc_acta_tesina }]] = await db.query(
      `SELECT doc_propuesta_proyecto, doc_nota_tutor, doc_cv_tutor, doc_proyecto, doc_resolucion_tribunal, doc_resolucion_ext_etapa1, doc_resolucion_ext_etapa2, doc_acta_tesina FROM proyectos JOIN documentos ON documentos.id_documentos = proyectos.id_documentos WHERE proyectos.id_proyecto = ?`,
      [id]
    );

    // Función para eliminar un archivo de S3
    const eliminarArchivoDeS3 = async (fileUrl) => {
      if (!fileUrl) return; // Si no hay URL, no hacer nada
    
      try {
        // Extraer la clave (key) del archivo desde la URL
        const url = new URL(fileUrl); // Usar la clase URL para parsear el enlace
        const key = url.pathname.slice(1); // Elimina el primer "/" de la ruta
    
        const deleteParams = {
          Bucket: process.env.BUCKET_NAME, // Nombre del bucket
          Key: key,
        };
    
        // Eliminar el archivo de S3
        await s3.send(new DeleteObjectCommand(deleteParams));
        console.log(`Archivo eliminado de S3: ${key}`);
      } catch (error) {
        console.error(`Error al eliminar archivo de S3: ${fileUrl}`, error);
      }
    };

    // Eliminar archivos antiguos de S3
    await eliminarArchivoDeS3(doc_propuesta_proyecto);
    await eliminarArchivoDeS3(doc_nota_tutor);
    await eliminarArchivoDeS3(doc_cv_tutor);
    await eliminarArchivoDeS3(doc_proyecto);
    await eliminarArchivoDeS3(doc_resolucion_tribunal);
    await eliminarArchivoDeS3(doc_resolucion_ext_etapa1);
    await eliminarArchivoDeS3(doc_resolucion_ext_etapa2);
    await eliminarArchivoDeS3(doc_acta_tesina);

      await db.query(`UPDATE proyectos SET nombre_proyecto = ? WHERE id_proyecto = ?`, [nombre_proyecto, id]);

      if (integrantes && Array.isArray(integrantes)) {
          const [[{ id_grupo }]] = await db.query(`SELECT id_grupo FROM proyectos WHERE id_proyecto = ?`, [id]);

          await db.query(`DELETE FROM alumnos WHERE id_grupo = ?`, [id_grupo]);

          for (const integrante of integrantes) {
              const { nombre_alumno, apellido_alumno, legajo_alumno } = integrante;

              if (
                !nombre_alumno || typeof nombre_alumno !== "string" || !nombre_alumno.trim() ||
                !apellido_alumno || typeof apellido_alumno !== "string" || !apellido_alumno.trim() ||
                !legajo_alumno || (typeof legajo_alumno !== "string" && typeof legajo_alumno !== "number")
              ) {
                continue;
              }

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
        console.log(documentos[0].doc_propuesta_proyecto)
        const [[{ id_documentos }]] = await db.query(`SELECT id_documentos FROM proyectos WHERE id_proyecto = ?`, [id]);
  
        await db.query(
          `UPDATE documentos SET 
            doc_propuesta_proyecto = ?, 
            doc_nota_tutor = ?, 
            doc_cv_tutor = ?, 
            doc_proyecto = ?, 
            doc_resolucion_tribunal = ?,
            doc_resolucion_ext_etapa1 = ?, 
            doc_resolucion_ext_etapa2 = ?,
            doc_acta_tesina = ?
           WHERE id_documentos = ?`,
          [
            documentos[0].doc_propuesta_proyecto,
            documentos[0].doc_nota_tutor,
            documentos[0].doc_cv_tutor,
            documentos[0].doc_proyecto,
            documentos[0].doc_resolucion_tribunal,
            documentos[0].doc_resolucion_ext_etapa1,
            documentos[0].doc_resolucion_ext_etapa2,
            documentos[0].doc_acta_tesina,
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