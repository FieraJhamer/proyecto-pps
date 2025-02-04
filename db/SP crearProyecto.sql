CREATE DEFINER=`alejandro`@`localhost` PROCEDURE `tesina_post`(
    IN carreraId INT,
    IN nombreProyecto VARCHAR(255),
    IN alumno1Nombre VARCHAR(255), IN alumno1Apellido VARCHAR(255), IN alumno1Legajo INT,
    IN alumno2Nombre VARCHAR(255), IN alumno2Apellido VARCHAR(255), IN alumno2Legajo INT,
    IN alumno3Nombre VARCHAR(255), IN alumno3Apellido VARCHAR(255), IN alumno3Legajo INT,
    IN etapa1Tipo INT, IN etapa2Tipo INT,
    IN extension1Tipo INT, IN extension2Tipo INT,
    IN fecha1Tipo INT, IN fecha1Fecha DATE,
    IN fecha2Tipo INT, IN fecha2Fecha DATE,
    IN fecha3Tipo INT, IN fecha3Fecha DATE,
    IN fecha4Tipo INT,
    IN fecha5Tipo INT, IN fecha5Fecha DATE,
    IN fecha6Tipo INT, IN fecha6Fecha DATE,
    IN fecha7Tipo INT,
    IN fecha8Tipo INT, IN fecha8Fecha DATE,
    IN fecha9Tipo INT, IN fecha9Fecha DATE,
    IN integranteTrib1 VARCHAR(150),
    IN integranteTrib2 VARCHAR(150),
    IN integranteTrib3 VARCHAR(150),
    IN docPropuestaProyecto VARCHAR(250),
    IN docNotaTutor VARCHAR(250),
    IN docCVTutor VARCHAR(250),
    IN docProyecto VARCHAR(250),
    IN docResolucionTribunal VARCHAR(250)
)
BEGIN
    DECLARE idGrupo INT;
    DECLARE idProyecto INT;
    DECLARE idDocumentos INT;
    DECLARE proyectoExistente INT DEFAULT 0;
    
    SELECT COUNT(*) INTO proyectoExistente FROM proyectos WHERE nombre_proyecto = nombreProyecto;
    
    IF proyectoExistente > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: El proyecto con el mismo nombre ya existe';
    END IF;
    
    INSERT INTO grupos (id_carrera) VALUES (carreraId);
    SET idGrupo = LAST_INSERT_ID();
    
    INSERT INTO documentos (id_documentos, doc_propuesta_proyecto, doc_nota_tutor, doc_cv_tutor, doc_proyecto, doc_resolucion_tribunal)
    VALUES (idDocumentos, docPropuestaProyecto, docNotaTutor, docCVTutor, docProyecto, docResolucionTribunal);
    SET idDocumentos = LAST_INSERT_ID();
    
    INSERT INTO proyectos (nombre_proyecto, id_grupo, id_documentos) VALUES (nombreProyecto, idGrupo, idDocumentos);
    SET idProyecto = LAST_INSERT_ID();
    
    IF alumno1Legajo IS NOT NULL THEN
        INSERT IGNORE INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno1Nombre, alumno1Apellido, alumno1Legajo);
    END IF;
    
    IF alumno2Legajo IS NOT NULL THEN
        INSERT IGNORE INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno2Nombre, alumno2Apellido, alumno2Legajo);
    END IF;
    
    IF alumno3Legajo IS NOT NULL THEN
        INSERT IGNORE INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno3Nombre, alumno3Apellido, alumno3Legajo);
    END IF;
    
    INSERT INTO etapas (id_tipo_etapa, id_proyecto, completa) VALUES
    (etapa1Tipo, idProyecto, 0),
    (etapa2Tipo, idProyecto, 0);
    
    INSERT INTO extensiones (id_proyecto, id_tipo_extension) VALUES
    (idProyecto, extension1Tipo),
    (idProyecto, extension2Tipo);
    
    INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES
    (idProyecto, fecha1Tipo, fecha1Fecha),
    (idProyecto, fecha2Tipo, fecha2Fecha),
    (idProyecto, fecha3Tipo, fecha3Fecha);
    
    IF fecha4Tipo IS NOT NULL THEN
        INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (idProyecto, fecha4Tipo, NULL);
    END IF;
    
    INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES
    (idProyecto, fecha5Tipo, fecha5Fecha),
    (idProyecto, fecha6Tipo, fecha6Fecha);
    
    IF fecha7Tipo IS NOT NULL THEN
        INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (idProyecto, fecha7Tipo, NULL);
    END IF;
    
    INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES
    (idProyecto, fecha8Tipo, fecha8Fecha),
    (idProyecto, fecha9Tipo, fecha9Fecha);
    
    INSERT INTO tribunales (id_proyecto, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3) 
    VALUES (idProyecto, integranteTrib1, integranteTrib2, integranteTrib3);
END