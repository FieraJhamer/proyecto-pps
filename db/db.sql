/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: proyecto-pps
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumnos` (
  `id_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `id_grupo` int(11) NOT NULL,
  `nombre_alumno` varchar(45) NOT NULL,
  `apellido_alumno` varchar(45) NOT NULL,
  `legajo_alumno` int(11) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `id_alumno_UNIQUE` (`id_alumno`),
  UNIQUE KEY `legajo_alumno_UNIQUE` (`legajo_alumno`),
  KEY `fk_alumnos_1_idx` (`id_grupo`),
  CONSTRAINT `fk_alumnos_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES
(41,22,'Alejandro','Gómez',241),
(42,22,'Ignacio','Sotomayo',5124),
(43,22,'Leonel','Torres',24124),
(44,23,'Gonzalo','Montiel',24912),
(45,23,'Marcelo','Gallardo',9120),
(46,23,'Fernando','Gago',2949124);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carreras` (
  `id_carrera` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_carrera` varchar(50) NOT NULL,
  PRIMARY KEY (`id_carrera`),
  UNIQUE KEY `id_carrera_UNIQUE` (`id_carrera`),
  UNIQUE KEY `nombre_carrera_UNIQUE` (`nombre_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES
(2,'Licenciatura en Tecnología Educativa'),
(1,'Tecnicatura Universitaria en Higiene y Seguridad');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documentos` (
  `id_documentos` int(11) NOT NULL AUTO_INCREMENT,
  `doc_propuesta_proyecto` varchar(250) DEFAULT NULL,
  `doc_nota_tutor` varchar(250) DEFAULT NULL,
  `doc_cv_tutor` varchar(250) DEFAULT NULL,
  `doc_proyecto` varchar(250) DEFAULT NULL,
  `doc_resolucion_tribunal` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id_documentos`),
  UNIQUE KEY `id_documentos_UNIQUE` (`id_documentos`),
  UNIQUE KEY `doc_propuesta_proyecto_UNIQUE` (`doc_propuesta_proyecto`),
  UNIQUE KEY `doc_nota_tutor_UNIQUE` (`doc_nota_tutor`),
  UNIQUE KEY `doc_cv_tutor_UNIQUE` (`doc_cv_tutor`),
  UNIQUE KEY `doc_proyecto_UNIQUE` (`doc_proyecto`),
  UNIQUE KEY `doc_resolucion_tribunal_UNIQUE` (`doc_resolucion_tribunal`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES
(1,'https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docPropuestaProyecto-6918b6cb4d1cecc88d0449780b5e3e20.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docAceptacionTutor-ad9fd67fc6d59939a5fd6e91dde5f19c.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docCVTutor-c908a45468d454d16dc00c9b29e7de95.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docTesina-293f90ddbeb5c47e5d5c0258a8e5487c.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docResolucionTribunal-1134956b8105ab979b29b9495650760d.pdf'),
(2,'https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docPropuestaProyecto-b6f902d4f239f2c46d79de215038e2bd.pdf',NULL,'https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docCVTutor-d2c8cf024b63d0e204dd0feb39973560.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docTesina-e0ec202d7622992b723ef98622a5ee8e.pdf','https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/docResolucionTribunal-eda5100d83c6009815aeee7361e4bbe8.pdf');
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `etapas`
--

DROP TABLE IF EXISTS `etapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `etapas` (
  `id_etapa` int(11) NOT NULL AUTO_INCREMENT,
  `id_tipo_etapa` int(11) NOT NULL,
  `id_proyecto` int(11) NOT NULL,
  `completa` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_etapa`),
  UNIQUE KEY `id_etapa_UNIQUE` (`id_etapa`),
  KEY `fk_etapas_1_idx` (`id_proyecto`),
  KEY `fk_etapas_2_idx` (`id_tipo_etapa`),
  CONSTRAINT `fk_etapas_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_etapas_2` FOREIGN KEY (`id_tipo_etapa`) REFERENCES `tipo_etapas` (`id_tipo_etapa`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `etapas`
--

LOCK TABLES `etapas` WRITE;
/*!40000 ALTER TABLE `etapas` DISABLE KEYS */;
INSERT INTO `etapas` VALUES
(25,1,19,0),
(26,2,19,0),
(27,1,20,0),
(28,2,20,0);
/*!40000 ALTER TABLE `etapas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extensiones`
--

DROP TABLE IF EXISTS `extensiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `extensiones` (
  `id_extension` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_tipo_extension` int(11) NOT NULL,
  `enlace_archivo_extension` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_extension`),
  UNIQUE KEY `id_extension_UNIQUE` (`id_extension`),
  KEY `fk_extensiones_1_idx` (`id_proyecto`),
  KEY `fk_extensiones_2_idx` (`id_tipo_extension`),
  CONSTRAINT `fk_extensiones_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_extensiones_2` FOREIGN KEY (`id_tipo_extension`) REFERENCES `tipo_extensiones` (`id_tipo_extension`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extensiones`
--

LOCK TABLES `extensiones` WRITE;
/*!40000 ALTER TABLE `extensiones` DISABLE KEYS */;
INSERT INTO `extensiones` VALUES
(23,19,1,NULL),
(24,19,2,NULL),
(25,20,1,NULL),
(26,20,2,NULL);
/*!40000 ALTER TABLE `extensiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechas`
--

DROP TABLE IF EXISTS `fechas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fechas` (
  `id_fecha` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `id_tipo_fecha` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_fecha`),
  UNIQUE KEY `id_fecha_UNIQUE` (`id_fecha`),
  KEY `fk_fechas_1_idx` (`id_proyecto`),
  KEY `fk_fechas_2_idx` (`id_tipo_fecha`),
  CONSTRAINT `fk_fechas_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_fechas_2` FOREIGN KEY (`id_tipo_fecha`) REFERENCES `tipo_fechas` (`id_tipo_fecha`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=109 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechas`
--

LOCK TABLES `fechas` WRITE;
/*!40000 ALTER TABLE `fechas` DISABLE KEYS */;
INSERT INTO `fechas` VALUES
(91,19,1,'2025-02-04'),
(92,19,2,'2025-02-20'),
(93,19,3,'2025-02-13'),
(94,19,4,NULL),
(95,19,5,'2025-02-20'),
(96,19,6,'2025-02-19'),
(97,19,7,NULL),
(98,19,8,'2025-02-26'),
(99,19,9,'2025-02-26'),
(100,20,1,'2025-02-13'),
(101,20,2,'2025-02-19'),
(102,20,3,'2025-02-27'),
(103,20,4,NULL),
(104,20,5,'2025-02-19'),
(105,20,6,'2025-02-26'),
(106,20,7,NULL),
(107,20,8,'2025-02-19'),
(108,20,9,'2025-02-18');
/*!40000 ALTER TABLE `fechas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grupos` (
  `id_grupo` int(11) NOT NULL AUTO_INCREMENT,
  `id_carrera` int(11) NOT NULL,
  PRIMARY KEY (`id_grupo`),
  UNIQUE KEY `id_grupo_UNIQUE` (`id_grupo`),
  KEY `fk_grupos_1_idx` (`id_carrera`),
  CONSTRAINT `fk_grupos_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES
(19,1),
(20,1),
(21,1),
(22,1),
(23,2);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proyectos` (
  `id_proyecto` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(100) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `id_documentos` int(11) NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  UNIQUE KEY `id_proyecto_UNIQUE` (`id_proyecto`),
  UNIQUE KEY `id_grupo_UNIQUE` (`id_grupo`),
  KEY `fk_proyectos_2_idx` (`id_documentos`),
  CONSTRAINT `fk_proyectos_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyectos_2` FOREIGN KEY (`id_documentos`) REFERENCES `documentos` (`id_documentos`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES
(19,'Bucket S3',22,1),
(20,'Prueba AWS S3',23,2);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_etapas`
--

DROP TABLE IF EXISTS `tipo_etapas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_etapas` (
  `id_tipo_etapa` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_etapa` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_etapa`),
  UNIQUE KEY `id_tipo_etapa_UNIQUE` (`id_tipo_etapa`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_etapas`
--

LOCK TABLES `tipo_etapas` WRITE;
/*!40000 ALTER TABLE `tipo_etapas` DISABLE KEYS */;
INSERT INTO `tipo_etapas` VALUES
(1,'Etapa 1'),
(2,'Etapa 2');
/*!40000 ALTER TABLE `tipo_etapas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_extensiones`
--

DROP TABLE IF EXISTS `tipo_extensiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_extensiones` (
  `id_tipo_extension` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_extension` varchar(45) NOT NULL,
  PRIMARY KEY (`id_tipo_extension`),
  UNIQUE KEY `id_tipo_extension_UNIQUE` (`id_tipo_extension`),
  UNIQUE KEY `nombre_tipo_extension_UNIQUE` (`nombre_tipo_extension`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_extensiones`
--

LOCK TABLES `tipo_extensiones` WRITE;
/*!40000 ALTER TABLE `tipo_extensiones` DISABLE KEYS */;
INSERT INTO `tipo_extensiones` VALUES
(1,'Extensión de Etapa 1'),
(2,'Extensión de Etapa 2');
/*!40000 ALTER TABLE `tipo_extensiones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_fechas`
--

DROP TABLE IF EXISTS `tipo_fechas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo_fechas` (
  `id_tipo_fecha` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo_fecha` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_fecha`),
  UNIQUE KEY `id_tipo_fecha_UNIQUE` (`id_tipo_fecha`),
  UNIQUE KEY `nombre_tipo_fecha_UNIQUE` (`nombre_tipo_fecha`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_fechas`
--

LOCK TABLES `tipo_fechas` WRITE;
/*!40000 ALTER TABLE `tipo_fechas` DISABLE KEYS */;
INSERT INTO `tipo_fechas` VALUES
(3,'Fecha de aprobación de la etapa 1'),
(6,'Fecha de aprobación de la etapa 2'),
(2,'Fecha de carga de archivos de la etapa 1'),
(5,'Fecha de carga de archivos de la etapa 2'),
(9,'Fecha de defensa del proyecto'),
(8,'Fecha de designación del tribunal'),
(1,'Fecha de fin de cursada'),
(4,'Fecha de resolución de extensión de la etapa 1'),
(7,'Fecha de resolución de extensión de la etapa 2');
/*!40000 ALTER TABLE `tipo_fechas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tribunales`
--

DROP TABLE IF EXISTS `tribunales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tribunales` (
  `id_tribunal` int(11) NOT NULL AUTO_INCREMENT,
  `id_proyecto` int(11) NOT NULL,
  `integrante_tribunal_1` varchar(150) NOT NULL,
  `integrante_tribunal_2` varchar(150) NOT NULL,
  `integrante_tribunal_3` varchar(150) NOT NULL,
  PRIMARY KEY (`id_tribunal`),
  UNIQUE KEY `id_tribunal_UNIQUE` (`id_tribunal`),
  KEY `fk_tribunales_1_idx` (`id_proyecto`),
  CONSTRAINT `fk_tribunales_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tribunales`
--

LOCK TABLES `tribunales` WRITE;
/*!40000 ALTER TABLE `tribunales` DISABLE KEYS */;
INSERT INTO `tribunales` VALUES
(7,19,'Pedro Sanchez','Bill Gates','Donald Trump'),
(8,20,'Primero','Segundo','TERCERO');
/*!40000 ALTER TABLE `tribunales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `password` varchar(100) NOT NULL,
  `superusuario` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES
(1,'Admin','Admin','admin@gmail.com','3804442366','$2b$10$6nW74rwgX.LNl1sIp8biZev.bP/y3LOxge4S8EnU.ZUra3Vwscv7W',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-02-03 23:42:49
