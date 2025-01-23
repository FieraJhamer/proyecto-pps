import express from "express";
import {db} from "../db.js"

const proyectos = express.Router()

proyectos.get("/proyectos", async (req, res) => {
  try {
    const [proyectos]= await db.execute
    (`SELECT 
	  p.nombre_proyecto, 
	  GROUP_CONCAT(CONCAT(a.nombre_alumno, ' ', a.apellido_alumno) SEPARATOR ', ') AS integrantes,
    c.nombre_carrera as carreras
                
    FROM proyectos p 
    JOIN alumnos a ON p.id_grupo = a.id_grupo

    join grupos g on p.id_grupo = g.id_grupo

    join carreras c on c.id_carrera=g.id_carrera
    GROUP BY p.nombre_proyecto, c.nombre_carrera`)
    res.send(proyectos)
  } catch (error) {
    res.status(500).send("Error al obtener los proyectos")
  }});

  proyectos.put("/proyectos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombreProyecto, integrantes, fechaDeCarga, nombreCarrera } = req.body;
    try {
      const [result] = await db.query(`update proyectos set nombre_proyecto = ? where id_proyecto = ?`, [
        nombreProyecto,
        id
      ]);
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).send("Error al actualizar el proyecto")
    }
  });

  export default proyectos;