import express from "express";
import { validarSuperUsuario, validarJwt } from "../validaciones/validaciones.js";
import crearProyecto from "./crearProyecto.js";
import modificarProyecto from "./modificarProyecto.js"
import obtenerProyecto from "./obtenerProyecto.js"

const proyectos = express.Router();

proyectos.post("/proyectos", crearProyecto );
proyectos.get("/proyectos", validarJwt, validarSuperUsuario, obtenerProyecto);
proyectos.put("/proyectos", validarJwt, validarSuperUsuario, modificarProyecto);

export default proyectos;

