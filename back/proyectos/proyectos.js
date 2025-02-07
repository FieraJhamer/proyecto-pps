import express from "express";

import { validarJwt } from "../validaciones/validaciones.js";
import { validarCrearProyecto } from "../validaciones/validaciones.js";

import { uploadFiles, crearProyecto} from "./crearProyecto.js";
import modificarProyecto from "./modificarProyecto.js";
import obtenerProyecto, { obtenerFechas } from "./obtenerProyecto.js";
import { obtenerProyectoPorId } from "./obtenerProyecto.js";
import {getFiles} from "./obtenerProyecto.js"

const proyectos = express.Router();

// CORREGIR LA VALIDACION DEL FORMULARIO ANTES DE SUBIR LOS ARCHIVOS
proyectos.post("/proyectos", validarJwt, uploadFiles, validarCrearProyecto, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.get("/proyectos/:id", validarJwt, obtenerProyectoPorId);

proyectos.get("/proyectos/:id/fechas", validarJwt, obtenerFechas);

proyectos.get("/files",validarJwt,getFiles)

proyectos.put("/proyectos/:id", validarJwt, modificarProyecto);

export default proyectos;
