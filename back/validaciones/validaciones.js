import { param, validationResult } from "express-validator";
import passport from "passport";

export const verificarValidaciones = (req, res, next) => {
  // Enviar errores de validacion en caso de ocurrir alguno.
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).send({ errores: validacion.array() });
  }
  next();
};

export const validarId = param("id").isInt({ min: 1 });

export const validarJwt = passport.authenticate("jwt", {
  session: false,
});

export const validarSuperUsuario = (req,res,next) =>{
if (req.user.superusuario != 1) {
  return res.status(401).send({mensaje: "No autorizado"})
}
next();
}