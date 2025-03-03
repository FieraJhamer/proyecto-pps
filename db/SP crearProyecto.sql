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
    IN docResolucionTribunal VARCHAR(250),
    IN docResolucionExtensionEtapa1 VARCHAR(250),
    IN docResolucionExtensionEtapa2 VARCHAR(250)
)
BEGIN
    DECLARE idGrupo INT;
    DECLARE idProyecto INT;
    DECLARE idDocumentos INT;
    DECLARE proyectoExistente INT DEFAULT 0;
    DECLARE contadorAlumnos INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error en la transacción';
    END;

    SELECT COUNT(*) INTO proyectoExistente FROM proyectos WHERE nombre_proyecto = nombreProyecto;

    IF proyectoExistente > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: El proyecto con el mismo nombre ya existe';
    END IF;

    INSERT INTO grupos (id_carrera) VALUES (carreraId);
    SET idGrupo = LAST_INSERT_ID();
    
    INSERT INTO documentos (doc_propuesta_proyecto, doc_nota_tutor, doc_cv_tutor, doc_proyecto, doc_resolucion_tribunal, doc_resolucion_ext_etapa1, doc_resolucion_ext_etapa2)
    VALUES (docPropuestaProyecto, docNotaTutor, docCVTutor, docProyecto, docResolucionTribunal, docResolucionExtensionEtapa1, docResolucionExtensionEtapa2);
    SET idDocumentos = LAST_INSERT_ID();

    INSERT INTO proyectos (nombre_proyecto, id_grupo, id_documentos) VALUES (nombreProyecto, idGrupo, idDocumentos);
    SET idProyecto = LAST_INSERT_ID();

    SET contadorAlumnos = 0;

    IF alumno1Nombre IS NOT NULL AND alumno1Apellido IS NOT NULL THEN
        INSERT INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno1Nombre, alumno1Apellido, alumno1Legajo);
        SET contadorAlumnos = contadorAlumnos + 1;
    END IF;

    IF alumno2Nombre IS NOT NULL AND alumno2Apellido IS NOT NULL THEN
        INSERT INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno2Nombre, alumno2Apellido, alumno2Legajo);
        SET contadorAlumnos = contadorAlumnos + 1;
    END IF;

    IF alumno3Nombre IS NOT NULL AND alumno3Apellido IS NOT NULL THEN
        INSERT INTO alumnos (id_grupo, nombre_alumno, apellido_alumno, legajo_alumno)
        VALUES (idGrupo, alumno3Nombre, alumno3Apellido, alumno3Legajo);
        SET contadorAlumnos = contadorAlumnos + 1;
    END IF;
    
    IF contadorAlumnos < 1 OR contadorAlumnos > 3 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Debe haber entre 1 y 3 alumnos';
    END IF;

    IF fecha1Fecha IS NOT NULL THEN
        INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (idProyecto, fecha1Tipo, fecha1Fecha);
    END IF;

    IF COALESCE(fecha4Tipo, 0) <> 0 THEN
        INSERT INTO fechas (id_proyecto, id_tipo_fecha, fecha) VALUES (idProyecto, fecha4Tipo, NULL);
    END IF;

    INSERT INTO tribunales (id_proyecto, integrante_tribunal_1, integrante_tribunal_2, integrante_tribunal_3) 
    VALUES (idProyecto, integranteTrib1, integranteTrib2, integranteTrib3);
END