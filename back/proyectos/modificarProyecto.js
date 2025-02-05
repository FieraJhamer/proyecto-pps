import { db } from "../db.js";

const modificarProyecto = async (req, res) => {
  const { id } = req.params;
  const { id_carrera, nombre_proyecto, integrantes, fechas, etapas, extensiones, tribunales } = req.body;
  

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

      await db.commit(); // Confirmar cambios
      res.status(200).send({ message: "Proyecto actualizado correctamente" });
  } catch (error) {
      await db.rollback(); // Si hay un error, revertir cambios
      console.log(error);
      res.status(500).send("Error al actualizar el proyecto");
  } 
};


export default modificarProyecto;