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
        GROUP BY p.nombre_proyecto, c.nombre_carrera`);
  res.send(proyectos);
};

export default obtenerProyecto;
