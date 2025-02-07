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

export const validarSuperUsuario = (req, res, next) => {
  if (req.user.superusuario != 1) {
    return res.status(401).send({ mensaje: "No autorizado" });
  }
  next();
};

export const validarCrearProyecto = [
  body("carrera_id").isInt().notEmpty(),
  body("nombre_proyecto").isString().notEmpty(),

  body("alumno1_nombre").isString().notEmpty(),
  body("alumno1_apellido").isString().notEmpty(),
  body("alumno1_legajo").isNumeric().notEmpty(),

  body("alumno2_nombre").optional().isString(),
  body("alumno2_apellido").optional().isString(),
  body("alumno2_legajo").optional({ checkFalsy: true }).isNumeric(),

  body("alumno3_nombre").optional().isString(),
  body("alumno3_apellido").optional().isString(),
  body("alumno3_legajo").optional({ checkFalsy: true }).isNumeric(),

  body("etapa1_tipo").isInt(),
  body("etapa2_tipo").isInt(),
  body("extension1_tipo").isInt(),
  body("extension2_tipo").isInt(),

  body("fechaFinCursada").optional({ checkFalsy: true }).isISO8601(),
  body("fechaCargaArchivosEtapa1").optional({ checkFalsy: true }).isISO8601(),
  body("fechaAprobacionEtapa1").optional({ checkFalsy: true }).isISO8601(),
  body("fechaCargaArchivosEtapa2").optional({ checkFalsy: true }).isISO8601(),
  body("fechaAprobacionEtapa2").optional({ checkFalsy: true }).isISO8601(),
  body("fechaDesignacionTribunal").optional({ checkFalsy: true }).isISO8601(),
  body("fechaDefensaProyecto").optional({ checkFalsy: true }).isISO8601(),

  body("fechaFinCursada_tipo").isInt(),
  body("fechaCargaArchivosEtapa1_tipo").isInt(),
  body("fechaAprobacionEtapa1_tipo").isInt(),
  body("fechaResolucionExtensionEtapa1_tipo").isInt(),
  body("fechaCargaArchivosEtapa2_tipo").isInt(),
  body("fechaAprobacionEtapa2_tipo").isInt(),
  body("fechaResolucionExtensionEtapa2_tipo").isInt(),
  body("fechaDesignacionTribunal_tipo").isInt(),
  body("fechaDefensaProyecto_tipo").isInt(),

  verificarValidaciones,
];
