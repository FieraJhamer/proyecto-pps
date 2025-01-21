import express from "express";
import {db} from "../db.js"

const proyectos = express.Router()

proyectos.get("/proyectos", async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM proyectos");
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send("Error al obtener los proyectos")
  }});

  proyectos.put("/proyectos/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
      const [result] = await db.query(`update proyectos set nombre_proyecto = ? where id_proyecto = ?`, [
        nombre,
        id
      ]);
      res.status(200).send(result)
    } catch (error) {
      console.log(error)
      res.status(500).send("Error al actualizar el proyecto")
    }
  });

  export default proyectos;