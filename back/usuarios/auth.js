import express from "express";
import { db } from "../db.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Strategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

const authRouter = express.Router();

export function authConfig() {
  // Opciones de configuracion de passport-jwt
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  // Creo estrategia jwt
  passport.use(
    new Strategy(jwtOptions, async (payload, next) => {

      // console.log("en strategy", payload);

      const [usuarios] = await db.execute(
      "SELECT nombre FROM usuarios WHERE nombre = ?",
        [payload.nombre]
        );

        // Si hay al menos un usuario reenviarlo
        if (usuarios.length > 0) {
          // console.log(usuarios[0])
          next(null, usuarios[0]);
        } else {
          next(null, false);
        }
    })
  );
}

authRouter.post(
  "/login",
  body("nombre").isAlphanumeric().notEmpty().isLength({ max: 25 }),
  body("password").isStrongPassword({
    minLength: 5, // Minino de 8 caracteres (letras y numeros)
    minLowercase: 1, // Al menos una letra minuscula
    minUppercase: 0, // Al menos una letra mayusculas
    minNumbers: 0, // Al menos un numero
    minSymbols: 0, // Sin simbolos
  }),
  async (req, res) => {
    // Enviar errores de validacion en caso de ocurrir alguno.
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errores: validacion.array() });
      return;
    }

    const { nombre, password } = req.body;

    // Obtener usuario
    const [usuarios] = await db.execute(
      "select * from usuarios where nombre=?",
      [nombre]
    );

    if (usuarios.length === 0) {
      res.status(400).send({ error: "Usuario o contraseña inválida" });
      return;
    }

    // Verificar contraseña
    const passwordComparada = await bcrypt.compare(
      password,
      usuarios[0].password
    );
    if (!passwordComparada) {
      res.status(400).send({ error: "Usuario o contraseña inválidaaa" });
      return;
    }

    // Crear jwt
    const payload = { nombre: usuarios[0].nombre, superusuario: usuarios[0].superusuario, id: usuarios[0].id_usuario};
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    // Enviar jwt
    res.send({ nombre: usuarios[0].nombre, superusuario: usuarios[0].superusuario, id: usuarios[0].id_usuario ,token });
  }
);

export default authRouter;