import express from "express";
import multer from "multer";

import { validarJwt } from "../validaciones/validaciones.js";

import crearProyecto from "./crearProyecto.js";
import { validarCrearProyecto } from "../validaciones/validaciones.js";

import modificarProyecto from "./modificarProyecto.js";
import obtenerProyecto, { obtenerFechas } from "./obtenerProyecto.js";
import { obtenerProyectoPorId } from "./obtenerProyecto.js";

const proyectos = express.Router();

const upload = multer({ dest: "uploads/" });

const uploadMultiple = upload.fields([
  { name: "docPropuestaProyecto", maxCount: 1 },
  { name: "docAceptacionTutor", maxCount: 1 },
  { name: "docCVTutor", maxCount: 1 },
  { name: "docTesina", maxCount: 1 },
  { name: "docResolucionTribunal", maxCount: 1 },
]);

proyectos.post("/proyectos", validarJwt, validarCrearProyecto, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.get("/proyectos/:id", validarJwt, obtenerProyectoPorId);

proyectos.get("/proyectos/:id/fechas", validarJwt, obtenerFechas);

proyectos.put("/proyectos/:id", validarJwt, modificarProyecto);


/* ENDPOINT PROVISORIO PARA PROBAR MULTER */
proyectos.post("/proyectos/test", uploadMultiple, (req, res) => {
  res.json({ message: "Archivos recibidos correctamente", files: req.files });
  console.log("Archivos:", req.files);
  console.log("Datos adicionales:", req.body);

  /* ESTA LÍNEA ES PARA BORRAR LOS ARCHIVOS APENAS TERMINA DE MOSTRAR LOS DATOS */
  Object.values(req.files).forEach((fileArray) => {
    fileArray.forEach((file) => fs.unlinkSync(file.path));
  });
});

export default proyectos;
