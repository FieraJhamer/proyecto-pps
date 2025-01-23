import { db } from "../db.js";

const modificarProyecto = async (req, res) => {
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
};

export default modificarProyecto;