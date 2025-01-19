import express from "express";
import {db} from "../db.js"
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { validarSuperUsuario,validarJwt, verificarValidaciones, validarId } from "../validaciones/validaciones.js";

const usuarios = express.Router()

usuarios.get("/usuarios",
  validarJwt,
  validarSuperUsuario,
   async (req, res) => {
  try {
    const [result] = await db.query("SELECT * FROM usuarios");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

usuarios.post("/usuarios",
  validarJwt,
  validarSuperUsuario,
  body("nombre").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 8, // Minino de 8 caracteres (letras y numeros)
    minLowercase: 1, // Al menos una letra minuscula
    minUppercase: 1, // Al menos una letra mayusculas
    minNumbers: 1, // Al menos un numero
    minSymbols: 0, // Sin simbolos
  }),
  verificarValidaciones,
  async (req, res) => {
    
    const { nombre, apellido, email, telefono, password, superusuario } = req.body;

    const passwordHashed = await bcrypt.hash(password, 10);
    try {
    const [result] = await db.query(`insert into usuarios(nombre, apellido, email, telefono, password, superusuario) values(?, ?, ?, ?, ?, ?)`, [
    nombre,
    apellido,
    email,
    telefono,
    passwordHashed,
    superusuario
    ]);

    res.status(201).send({result});

    } catch (error) {
      console.log(error)
      if (error.code === "ER_SIGNAL_EXCEPTION") {
        res.status(400).send("El email ya fue registrado");
      } else {
        res.status(500).send("Error en el servidor");
      }
    }
  });

usuarios.put("/usuarios/:id",
  validarJwt,
  validarId,
  body("nombre").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("apellido").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  verificarValidaciones,
   async (req, res) => {
  const {nombre,apellido, superusuario} = req.body;
  const id = Number(req.params.id)

  try {
    const result = await db.query(`UPDATE usuarios SET nombre = ?, apellido = ?, superusuario = ? WHERE id_usuario = ?`, [nombre, apellido, superusuario, id]);
    res.status(200).send(result);

  } catch (error) {
      res.status(500).send("Error en el servidor");
  }
})

usuarios.delete("/usuarios/:id",
  validarJwt,
  validarSuperUsuario,
  validarId,
   async(req,res)=> {
  const id = req.params.id
  try {
    const result = await db.query(`DELETE from usuarios WHERE id_usuario = ?`, [id]);
    res.status(200).send(result);

  } catch (error) {
      res.status(500).send("Error en el servidor");
      console.log(error)
  }
})

export default usuarios;