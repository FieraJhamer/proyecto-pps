import { body, param, validationResult } from "express-validator";
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

export const validarCrearProyecto = [
  body("carrera_id").isInt({ min: 1 }),
  body("nombre_proyecto").isString().notEmpty(),

  body("alumno1_nombre").isString().notEmpty(),
  body("alumno1_apellido").isString().notEmpty(),
  body("alumno1_legajo").isNumeric(),

  body("alumno2_nombre").isString().notEmpty(),
  body("alumno2_apellido").isString().notEmpty(),
  body("alumno2_legajo").isNumeric(),

  body("alumno3_nombre").isString().notEmpty(),
  body("alumno3_apellido").isString().notEmpty(),
  body("alumno3_legajo").isNumeric(),

  body("etapa1_tipo").isInt(),
  body("etapa2_tipo").isInt(),
  body("extension1_tipo").isInt(),
  body("extension2_tipo").isInt(),

  body("fechaFinCursada").isISO8601(),
  body("fechaCargaArchivosEtapa1").isISO8601(),
  body("fechaAprobacionEtapa1").isISO8601(),
  body("fechaResolucionExtensionEtapa1").isISO8601(),
  body("fechaCargaArchivosEtapa2").isISO8601(),
  body("fechaAprobacionEtapa2").isISO8601(),
  body("fechaResolucionExtensionEtapa2_fecha").isISO8601(),
  body("fechaDesignacionTribunal").isISO8601(),
  body("fechaDefensaProyecto").isISO8601(),

  body("fechaFinCursada_tipo").isInt(),
  body("fechaCargaArchivosEtapa1_tipo").isInt(),
  body("fechaAprobacionEtapa1_tipo").isInt(),
  body("fechaResolucionExtensionEtapa1_tipo").isInt(),
  body("fechaCargaArchivosEtapa2_tipo").isInt(),
  body("fechaAprobacionEtapa2_tipo").isInt(),
  body("fechaResolucionExtensionEtapa2_tipo").isInt(),
  body("fechaDesignacionTribunal_tipo").isInt(),
  body("fechaDefensaProyecto_tipo").isInt(),

  verificarValidaciones
];
