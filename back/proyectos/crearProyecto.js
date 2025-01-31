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
    fechaFinCursada_tipo,
    fechaFinCursada,
    fechaCargaArchivosEtapa1_tipo,
    fechaCargaArchivosEtapa1,
    fechaAprobacionEtapa1_tipo,
    fechaAprobacionEtapa1,
    fechaResolucionExtensionEtapa1_tipo,
    fechaResolucionExtensionEtapa1ll,
    fechaCargaArchivosEtapa2_tipo,
    fechaCargaArchivosEtapa2,
    fechaAprobacionEtapa2_tipo,
    fechaAprobacionEtapa2,
    fechaResolucionExtensionEtapa2_tipo,
    fechaResolucionExtensionEtapa2,
    fechaDesignacionTribunal_tipo,
    fechaDesignacionTribunal,
    fechaDefensaProyecto_tipo,
    fechaDefensaProyecto,
    tribunalIntegrante1,
    tribunalIntegrante2,
    tribunalIntegrante3,
  } = req.body;

  try {
    const [result] = await db.query(
      `
        CALL tesina_post(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        fechaFinCursada_tipo,
        fechaFinCursada,
        fechaCargaArchivosEtapa1_tipo,
        fechaCargaArchivosEtapa1,
        fechaAprobacionEtapa1_tipo,
        fechaAprobacionEtapa1,
        fechaResolucionExtensionEtapa1_tipo,
        fechaResolucionExtensionEtapa1ll,
        fechaCargaArchivosEtapa2_tipo,
        fechaCargaArchivosEtapa2,
        fechaAprobacionEtapa2_tipo,
        fechaAprobacionEtapa2,
        fechaResolucionExtensionEtapa2_tipo,
        fechaResolucionExtensionEtapa2,
        fechaDesignacionTribunal_tipo,
        fechaDesignacionTribunal,
        fechaDefensaProyecto_tipo,
        fechaDefensaProyecto,
        tribunalIntegrante1,
        tribunalIntegrante2,
        tribunalIntegrante3,
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
