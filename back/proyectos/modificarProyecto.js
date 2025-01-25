import { db } from "../db.js";

const modificarProyecto = async (req, res) => {
    const { id } = req.params;

    const { nombre_proyecto, integrantes, fechas, etapas, extensiones } = req.body;
    try {
      const [result] = await db.query(`update proyectos set nombre_proyecto = ? where id_proyecto = ?`, [
        nombre_proyecto,
        id
      ]);

      if (integrantes && Array.isArray(integrantes)) {
        const [[{ id_grupo }]] = await db.query(
          `SELECT id_grupo FROM proyectos WHERE id_proyecto = ?`,
          [id]
        );
  
        await db.query(
          `DELETE FROM alumnos WHERE id_grupo = ?`,
          [id_grupo]
        );
  
        for (const integrante of integrantes) {
          const { nombre_alumno, apellido_alumno, legajo_alumno } = integrante;
          await db.query(
            `INSERT INTO alumnos (nombre_alumno, apellido_alumno, legajo_alumno, id_grupo) VALUES (?, ?, ?, ?)`,
            [nombre_alumno, apellido_alumno, legajo_alumno, id_grupo]
          );
        }
      }

      if (integrantes && Array.isArray(fechas)) {
        await db.query(
          `DELETE FROM fechas WHERE id_proyecto = ?`,
          [id]
        );
  
        for (const fecha of fechas) {
          const { id_tipo_fecha, fecha_valor } = fecha;
          await db.query(
            `INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (?, ?, ?)`,
            [id, id_tipo_fecha, fecha_valor]
          );
        }
      }

      if (etapas && Array.isArray(etapas)) {
        await db.query(
          `DELETE FROM etapas WHERE id_proyecto = ?`,
          [id]
        );
  
        for (const etapa of etapas) {
          const { id_tipo_etapa, completa } = etapa;
          await db.query(
            `INSERT INTO etapas (id_proyecto, id_tipo_etapa, completa) VALUES (?, ?, ?)`,
            [id, id_tipo_etapa, completa]
          );
        }
      }

      if (extensiones && Array.isArray(extensiones)) {
        await db.query(
          `DELETE FROM extensiones WHERE id_proyecto = ?`,
          [id]
        );
  
        for (const extension of extensiones) {
          const { id_tipo_extension } = extension;
          await db.query(
            `INSERT INTO extensiones (id_proyecto, id_tipo_extension) VALUES (?, ?)`,
            [id, id_tipo_extension]
          );
        }
      }
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).send("Error al actualizar el proyecto")
    }
};

export default modificarProyecto;