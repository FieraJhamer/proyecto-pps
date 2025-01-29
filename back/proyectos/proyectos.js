import express from "express";
import { validarJwt } from "../validaciones/validaciones.js";

import crearProyecto from "./crearProyecto.js";
import { validarCrearProyecto } from "../validaciones/validaciones.js";

import modificarProyecto from "./modificarProyecto.js"
import obtenerProyecto from "./obtenerProyecto.js"

const proyectos = express.Router();

proyectos.post("/proyectos", validarJwt, validarCrearProyecto, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.put("/proyectos", validarJwt, modificarProyecto);

export default proyectos;
