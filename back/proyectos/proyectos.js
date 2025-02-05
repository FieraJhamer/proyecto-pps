import express from "express";
import { validarJwt, validarSuperUsuario } from "../validaciones/validaciones.js";

import crearProyecto from "./crearProyecto.js";
import { validarCrearProyecto } from "../validaciones/validaciones.js";
import { validarId } from "../validaciones/validaciones.js";

import modificarProyecto from "./modificarProyecto.js"
import obtenerProyecto, { obtenerFechas } from "./obtenerProyecto.js"
import { obtenerProyectoPorId } from "./obtenerProyecto.js";
const proyectos = express.Router();

proyectos.post("/proyectos", validarJwt, validarCrearProyecto, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.get("/proyectos/:id", validarJwt, validarId, obtenerProyectoPorId);

proyectos.get("/proyectos/:id/fechas",validarJwt, obtenerFechas)

proyectos.put("/proyectos/:id", validarJwt, validarId, modificarProyecto);

export default proyectos;
