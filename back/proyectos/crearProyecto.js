import { db } from "../db.js";

const crearProyecto = async (req, res) => {
  const {
    carrera_id,
    nombre_proyecto,
    alumno1_nombre,
    alumno1_apellido,
    alumno1_legajo,
    alumno2_nombre,
    alumno2_apellido,
    alumno2_legajo,
    alumno3_nombre,
    alumno3_apellido,
    alumno3_legajo,
    etapa1_tipo,
    etapa2_tipo,
    extension1_tipo,
    extension2_tipo,
    fecha1_tipo,
    fecha1_fecha,
    fecha2_tipo,
    fecha2_fecha,
    fecha3_tipo,
    fecha3_fecha,
    fecha4_tipo,
    fecha4_fecha,
    fecha5_tipo,
    fecha5_fecha,
    fecha6_tipo,
    fecha6_fecha,
    fecha7_tipo,
    fecha7_fecha,
    fecha8_tipo,
    fecha8_fecha,
    fecha9_tipo,
    fecha9_fecha,
  } = req.body;

  try {
    const [result] = await db.query(
      `
        CALL tesina_post(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        carrera_id,
        nombre_proyecto,
        alumno1_nombre,
        alumno1_apellido,
        alumno1_legajo,
        alumno2_nombre,
        alumno2_apellido,
        alumno2_legajo,
        alumno3_nombre,
        alumno3_apellido,
        alumno3_legajo,
        etapa1_tipo,
        etapa2_tipo,
        extension1_tipo,
        extension2_tipo,
        fecha1_tipo,
        fecha1_fecha,
        fecha2_tipo,
        fecha2_fecha,
        fecha3_tipo,
        fecha3_fecha,
        fecha4_tipo,
        fecha4_fecha,
        fecha5_tipo,
        fecha5_fecha,
        fecha6_tipo,
        fecha6_fecha,
        fecha7_tipo,
        fecha7_fecha,
        fecha8_tipo,
        fecha8_fecha,
        fecha9_tipo,
        fecha9_fecha,
      ]
    );

    res.status(201).json({ message: "Tesina creada", result });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      res.status(400).send("Error en los inputs");
    } else {
      res.status(500).send("Error en el servidor");
    }
  }
};

export default crearProyecto;