CREATE DEFINER=`root`@`localhost` PROCEDURE `tesina_delete`(
    IN p_id_proyecto INT
)
BEGIN
    DECLARE v_id_grupo INT;
    DECLARE v_id_documentos INT;
    DECLARE v_existe INT DEFAULT 0;

    -- Manejador de errores
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error en la eliminación de la tesina';
    END;

    START TRANSACTION;

    -- Verificar si el proyecto existe
    SELECT COUNT(*) INTO v_existe FROM proyectos WHERE id_proyecto = p_id_proyecto;
    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El proyecto no existe';
    END IF;

    -- Obtener los IDs relacionados
    SELECT id_grupo, id_documentos INTO v_id_grupo, v_id_documentos
    FROM proyectos WHERE id_proyecto = p_id_proyecto;

    -- Eliminar dependencias en otras tablas
    DELETE FROM tribunales WHERE id_proyecto = p_id_proyecto;
    DELETE FROM fechas WHERE id_proyecto = p_id_proyecto;

    -- Eliminar alumnos y grupo si existe
    IF v_id_grupo IS NOT NULL THEN
        DELETE FROM alumnos WHERE id_grupo = v_id_grupo;
        DELETE FROM grupos WHERE id_grupo = v_id_grupo;
    END IF;

    -- Eliminar documentos si existen
    IF v_id_documentos IS NOT NULL THEN
        DELETE FROM documentos WHERE id_documentos = v_id_documentos;
    END IF;

    -- Eliminar proyecto
    DELETE FROM proyectos WHERE id_proyecto = p_id_proyecto;

    COMMIT;
END