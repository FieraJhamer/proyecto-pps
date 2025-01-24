import { db } from "../db.js";

const modificarProyecto = async (req, res) => {
    const { id } = req.params;
    const { carrera_id, nombre_proyecto, integrantes, fechas, etapas, extensiones } = req.body;

    try {
      const [result] = await db.query("update proyectos set nombre_proyecto = ? where id_proyecto = ?", [
        nombre_proyecto,
        id
      ]);
      
      res.status(200).send(result)

    } catch (error) {
      console.log(error)
      res.status(500).send("Error al actualizar el proyecto")
    }
};

export default modificarProyecto;