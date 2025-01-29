import { db } from "../db.js";

const obtenerProyecto = async (req, res) => {
  const [proyectos] = await db.execute(`
        SELECT

        p.id_proyecto, p.nombre_proyecto, 
        
        GROUP_CONCAT(CONCAT(a.nombre_alumno, ' ', a.apellido_alumno) SEPARATOR ', ') AS integrantes,
        c.nombre_carrera as carreras
                    
        FROM proyectos p 
        JOIN alumnos a ON p.id_grupo = a.id_grupo
    
        JOIN grupos g ON p.id_grupo = g.id_grupo
    
        JOIN carreras c ON c.id_carrera=g.id_carrera

        GROUP BY p.id_proyecto,p.nombre_proyecto, c.nombre_carrera`);
  res.send(proyectos);
};

export const obtenerProyectoPorId = async (req, res) => {
  const { id } = req.params;
  try {
      const [[proyecto]] = await db.query(
          `SELECT id_proyecto, nombre_proyecto FROM proyectos WHERE id_proyecto = ?`,
          [id]
      );

      if (!proyecto) {
          return res.status(404).send("Proyecto no encontrado");
      }

      const [integrantes] = await db.query(
          `SELECT nombre_alumno, apellido_alumno, legajo_alumno
           FROM alumnos
           WHERE id_grupo = (SELECT id_grupo FROM proyectos WHERE id_proyecto = ?)`,
          [id]
      );

      const [fechas] = await db.query(
          `SELECT id_tipo_fecha, fecha AS fecha_valor
           FROM fechas
           WHERE id_proyecto = ?`,
          [id]
      );

      const [etapas] = await db.query(
          `SELECT id_tipo_etapa, completa
           FROM etapas
           WHERE id_proyecto = ?`,
          [id]
      );

      const [extensiones] = await db.query(
          `SELECT id_tipo_extension
           FROM extensiones
           WHERE id_proyecto = ?`,
          [id]
      );

      const proyectoCompleto = {
          id_proyecto: proyecto.id_proyecto,
          nombre_proyecto: proyecto.nombre_proyecto,
          integrantes,
          fechas,
          etapas,
          extensiones,
      };

      res.status(200).json(proyectoCompleto);
  } catch (error) {
      console.log(error);
      res.status(500).send("Error al obtener el proyecto");
  }
};


export default obtenerProyecto;
