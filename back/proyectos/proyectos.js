import express from "express";

import { validarJwt } from "../validaciones/validaciones.js";
import { validarCrearProyecto } from "../validaciones/validaciones.js";

import { uploadFiles, crearProyecto} from "./crearProyecto.js";
import modificarProyecto from "./modificarProyecto.js";
import obtenerProyecto, { obtenerDocumentos, obtenerFechas } from "./obtenerProyecto.js";
import { obtenerProyectoPorId } from "./obtenerProyecto.js";
import {getFiles} from "./obtenerProyecto.js"

const proyectos = express.Router();

// CORREGIR ERROR EN EL ENVÍO DE LOS DATOS
proyectos.post("/proyectos", validarJwt, uploadFiles, validarCrearProyecto, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.get("/proyectos/:id", validarJwt, obtenerProyectoPorId);

proyectos.get("/proyectos/:id/fechas", validarJwt, obtenerFechas);

proyectos.get("/proyectos/:id/documentos",validarJwt,obtenerDocumentos)

proyectos.get("/files",validarJwt,getFiles)

proyectos.put("/proyectos/:id", validarJwt, modificarProyecto);

export default proyectos;
