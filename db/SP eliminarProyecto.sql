CREATE DEFINER=`alejandro`@`localhost` PROCEDURE `tesina_delete`(
    IN p_id_proyecto INT
)
BEGIN
    DECLARE v_id_grupo INT;
    DECLARE v_id_documentos INT;
    DECLARE v_existe INT DEFAULT 0;
    DECLARE v_err_msg TEXT DEFAULT '';
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 v_err_msg = MESSAGE_TEXT;
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_err_msg;
    END;

    START TRANSACTION;
    SELECT COUNT(*) INTO v_existe FROM proyectos WHERE id_proyecto = p_id_proyecto;
    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El proyecto no existe';
    END IF;

    SELECT id_grupo, id_documentos
      INTO v_id_grupo, v_id_documentos
      FROM proyectos
     WHERE id_proyecto = p_id_proyecto;

    DELETE FROM tribunales WHERE id_proyecto = p_id_proyecto;
    DELETE FROM fechas WHERE id_proyecto = p_id_proyecto;

    IF v_id_grupo IS NOT NULL THEN
        DELETE FROM alumnos WHERE id_grupo = v_id_grupo;
        DELETE FROM grupos WHERE id_grupo = v_id_grupo;
    END IF;

    IF v_id_documentos IS NOT NULL THEN
        DELETE FROM documentos WHERE id_documentos = v_id_documentos;
    END IF;

    DELETE FROM proyectos WHERE id_proyecto = p_id_proyecto;

    COMMIT;
END