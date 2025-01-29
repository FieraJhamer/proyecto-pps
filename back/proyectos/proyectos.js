import express from "express";
import { validarJwt } from "../validaciones/validaciones.js";
import crearProyecto from "./crearProyecto.js";
import modificarProyecto from "./modificarProyecto.js"
import obtenerProyecto from "./obtenerProyecto.js"
import { obtenerProyectoPorId } from "./obtenerProyecto.js";
const proyectos = express.Router();

proyectos.post("/proyectos", validarJwt, crearProyecto);

proyectos.get("/proyectos", validarJwt, obtenerProyecto);

proyectos.get("/proyectos/:id", validarJwt, obtenerProyectoPorId);

proyectos.put("/proyectos/:id", validarJwt, modificarProyecto);

export default proyectos;

