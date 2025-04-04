import { db } from "../db.js";
import { upload } from "../s3/s3Client.js"

const uploadFiles = upload.fields([
  { name: "docPropuestaProyecto", maxCount: 1 },
  { name: "docAceptacionTutor", maxCount: 1 },
  { name: "docCVTutor", maxCount: 1 },
  { name: "docTesina", maxCount: 1 },
  { name: "docResolucionTribunal", maxCount: 1 },
  { name: "docResolucionExtEtapa1", maxCount: 1 },
  { name: "docResolucionExtEtapa2", maxCount: 1 },
  { name: "docActaTesina", maxCount: 1 },
]);

function limpiarEntero(valor) {
  return valor && !isNaN(valor) ? Number(valor) : null;
}

function limpiarFecha(valor) {
  return valor && valor.trim() !== '' ? valor : null;
}

const crearProyecto = async (req, res) => {
  try {
    const {
      carrera_id,
      nombre_proyecto,
      alumno1_nombre,
      alumno1_apellido,
      alumno1_legajo,
      alumno2_nombre,
      alumno2_apellido,
      alumno3_nombre,
      alumno3_apellido,
      fechaFinCursada_tipo,
      fechaCargaArchivosEtapa1_tipo,
      fechaAprobacionEtapa1_tipo,
      fechaResolucionExtensionEtapa1_tipo,
      fechaCargaArchivosEtapa2_tipo,
      fechaAprobacionEtapa2_tipo,
      fechaResolucionExtensionEtapa2_tipo,
      fechaDesignacionTribunal_tipo,
      fechaDefensaProyecto_tipo,
      tribunalIntegrante1,
      tribunalIntegrante2,
      tribunalIntegrante3,
    } = req.body;

    const alumno2_legajo = limpiarEntero(req.body.alumno2_legajo);
    const alumno3_legajo = limpiarEntero(req.body.alumno3_Legajo);

    const fechaFinCursada = limpiarFecha(req.body.fechaFinCursada);
    const fechaCargaArchivosEtapa1 = limpiarFecha(req.body.fechaCargaArchivosEtapa1);
    const fechaAprobacionEtapa1 = limpiarFecha(req.body.fechaAprobacionEtapa1);
    const fechaCargaArchivosEtapa2 = limpiarFecha(req.body.fechaCargaArchivosEtapa2);
    const fechaAprobacionEtapa2 = limpiarFecha(req.body.fechaAprobacionEtapa2);
    const fechaDesignacionTribunal = limpiarFecha(req.body.fechaDesignacionTribunal);
    const fechaDefensaProyecto = limpiarFecha(req.body.fechaDefensaProyecto);

    const [result] = await db.query(
      `CALL tesina_post(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        fechaFinCursada_tipo,
        fechaFinCursada,
        fechaCargaArchivosEtapa1_tipo,
        fechaCargaArchivosEtapa1,
        fechaAprobacionEtapa1_tipo,
        fechaAprobacionEtapa1,
        fechaResolucionExtensionEtapa1_tipo,
        fechaCargaArchivosEtapa2_tipo,
        fechaCargaArchivosEtapa2,
        fechaAprobacionEtapa2_tipo,
        fechaAprobacionEtapa2,
        fechaResolucionExtensionEtapa2_tipo,
        fechaDesignacionTribunal_tipo,
        fechaDesignacionTribunal,
        fechaDefensaProyecto_tipo,
        fechaDefensaProyecto,
        tribunalIntegrante1,
        tribunalIntegrante2,
        tribunalIntegrante3,
      ]
    );

    res.status(201).json({ message: "Tesina creada con archivos en S3", result });
  } catch (error) {
    console.error(error);
    if (error.code === "ER_SIGNAL_EXCEPTION") {
      res.status(400).send("Error en los inputs");
    } else {
      res.status(500).send("Error en el servidor");
    }
  }
};

export { upload, uploadFiles, crearProyecto };
