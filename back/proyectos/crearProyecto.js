import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import crypto from "crypto";
import { S3Client } from "@aws-sdk/client-s3";
import { db } from "../db.js";

/* CONFIGURACIÓN S3 */
const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  region: process.env.BUCKET_REGION,
});

/* CONFIGURACIÓN DE MULTER PARA S3 */
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const key = `${file.fieldname}-${crypto.randomBytes(16).toString("hex")}${path.extname(file.originalname)}`;
      cb(null, key);
    },
    limits: { fileSize: 50 * 1024 * 1024 }
  }),
});

const uploadFiles = upload.fields([
  { name: "docPropuestaProyecto", maxCount: 1 },
  { name: "docAceptacionTutor", maxCount: 1 },
  { name: "docCVTutor", maxCount: 1 },
  { name: "docTesina", maxCount: 1 },
  { name: "docResolucionTribunal", maxCount: 1 },
]);

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
    } = req.body;

    const docPropuestaProyecto = req.files?.docPropuestaProyecto?.[0]?.location;
    const docAceptacionTutor = req.files?.docAceptacionTutor?.[0]?.location;
    const docCVTutor = req.files?.docCVTutor?.[0]?.location;
    const docTesina = req.files?.docTesina?.[0]?.location;
    const docResolucionTribunal = req.files?.docResolucionTribunal?.[0]?.location;

    const [result] = await db.query(
      `CALL tesina_post(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        docPropuestaProyecto,
        docAceptacionTutor,
        docCVTutor,
        docTesina,
        docResolucionTribunal,
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
