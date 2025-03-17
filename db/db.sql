CREATE DATABASE  IF NOT EXISTS `proyecto-pps` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto-pps`;
-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto-pps
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `id_grupo` int NOT NULL,
  `nombre_alumno` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apellido_alumno` varchar(45) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `legajo_alumno` int DEFAULT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `id_alumno_UNIQUE` (`id_alumno`),
  UNIQUE KEY `legajo_alumno_UNIQUE` (`legajo_alumno`),
  KEY `fk_alumnos_1_idx` (`id_grupo`),
  CONSTRAINT `fk_alumnos_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (430,74,'Alejandro','Gómez',2941),(431,74,'','',NULL),(432,74,'','',NULL),(433,75,'Leonel','Torres',2314),(434,75,'','',NULL),(435,75,'','',NULL),(436,76,'Nacho','Sotomayor',2415),(437,76,'','',NULL),(438,76,'','',NULL),(439,77,'Guillero','Herrera',24993),(440,77,'','',NULL),(441,77,'','',NULL),(445,85,'Mateo','Giménez',4352),(446,85,'','',NULL),(447,85,'','',NULL),(448,86,'Lionel','Messi',1010),(449,86,'','',NULL),(450,86,'','',NULL),(451,87,'Julián','Álvarez',2414),(452,87,'','',NULL),(453,87,'','',NULL),(457,88,'Ángel','Di Mari',84858),(462,90,'Leandro','Paredes',59345),(463,90,'','',NULL),(464,90,'','',NULL),(473,89,'Alejandro','Garnacho',8424);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carreras`
--

DROP TABLE IF EXISTS `carreras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carreras` (
  `id_carrera` int NOT NULL AUTO_INCREMENT,
  `nombre_carrera` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_carrera`),
  UNIQUE KEY `id_carrera_UNIQUE` (`id_carrera`),
  UNIQUE KEY `nombre_carrera_UNIQUE` (`nombre_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carreras`
--

LOCK TABLES `carreras` WRITE;
/*!40000 ALTER TABLE `carreras` DISABLE KEYS */;
INSERT INTO `carreras` VALUES (2,'Licenciatura en Tecnología Educativa'),(1,'Tecnicatura Universitaria en Higiene y Seguridad');
/*!40000 ALTER TABLE `carreras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documentos`
--

DROP TABLE IF EXISTS `documentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documentos` (
  `id_documentos` int NOT NULL AUTO_INCREMENT,
  `doc_propuesta_proyecto` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_nota_tutor` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_cv_tutor` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_proyecto` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_resolucion_tribunal` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_resolucion_ext_etapa1` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_resolucion_ext_etapa2` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `doc_acta_tesina` varchar(250) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id_documentos`),
  UNIQUE KEY `id_documentos_UNIQUE` (`id_documentos`),
  UNIQUE KEY `doc_propuesta_proyecto_UNIQUE` (`doc_propuesta_proyecto`),
  UNIQUE KEY `doc_nota_tutor_UNIQUE` (`doc_nota_tutor`),
  UNIQUE KEY `doc_cv_tutor_UNIQUE` (`doc_cv_tutor`),
  UNIQUE KEY `doc_proyecto_UNIQUE` (`doc_proyecto`),
  UNIQUE KEY `doc_resolucion_tribunal_UNIQUE` (`doc_resolucion_tribunal`),
  UNIQUE KEY `doc_resolucion_ext_etapa1_UNIQUE` (`doc_resolucion_ext_etapa1`),
  UNIQUE KEY `doc_resolucion_ext_etapa2_UNIQUE` (`doc_resolucion_ext_etapa2`),
  UNIQUE KEY `doc_acta_tesina_UNIQUE` (`doc_acta_tesina`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documentos`
--

LOCK TABLES `documentos` WRITE;
/*!40000 ALTER TABLE `documentos` DISABLE KEYS */;
INSERT INTO `documentos` VALUES (53,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(54,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(55,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(56,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(57,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(58,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(59,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(60,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(61,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(62,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(63,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(64,'https://proyecto-pps-utn-frlr.s3.sa-east-1.amazonaws.com/file-f6540339259261ebcd606a16d983e637.pdf',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(65,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `documentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fechas`
--

DROP TABLE IF EXISTS `fechas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fechas` (
  `id_fecha` int NOT NULL AUTO_INCREMENT,
  `id_proyecto` int NOT NULL,
  `id_tipo_fecha` int NOT NULL,
  `fecha` date DEFAULT NULL,
  PRIMARY KEY (`id_fecha`),
  UNIQUE KEY `id_fecha_UNIQUE` (`id_fecha`),
  KEY `fk_fechas_1_idx` (`id_proyecto`),
  KEY `fk_fechas_2_idx` (`id_tipo_fecha`),
  CONSTRAINT `fk_fechas_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE,
  CONSTRAINT `fk_fechas_2` FOREIGN KEY (`id_tipo_fecha`) REFERENCES `tipo_fechas` (`id_tipo_fecha`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1292 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fechas`
--

LOCK TABLES `fechas` WRITE;
/*!40000 ALTER TABLE `fechas` DISABLE KEYS */;
INSERT INTO `fechas` VALUES (1231,71,4,NULL),(1232,72,4,NULL),(1233,73,4,NULL),(1234,74,4,NULL),(1235,82,4,NULL),(1236,83,4,NULL),(1237,84,4,NULL),(1239,85,4,NULL),(1240,85,2,NULL),(1241,85,3,NULL),(1242,85,4,NULL),(1243,85,5,NULL),(1244,85,6,NULL),(1245,85,7,NULL),(1246,85,8,NULL),(1247,85,9,NULL),(1248,85,10,NULL),(1260,87,4,NULL),(1272,86,4,NULL),(1273,86,2,NULL),(1274,86,3,NULL),(1275,86,4,NULL),(1276,86,5,NULL),(1277,86,6,NULL),(1278,86,7,NULL),(1279,86,8,NULL),(1280,86,9,NULL),(1281,86,10,NULL);
/*!40000 ALTER TABLE `fechas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `id_grupo` int NOT NULL AUTO_INCREMENT,
  `id_carrera` int NOT NULL,
  PRIMARY KEY (`id_grupo`),
  UNIQUE KEY `id_grupo_UNIQUE` (`id_grupo`),
  KEY `fk_grupos_1_idx` (`id_carrera`),
  CONSTRAINT `fk_grupos_1` FOREIGN KEY (`id_carrera`) REFERENCES `carreras` (`id_carrera`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (74,1),(75,1),(76,1),(86,1),(87,1),(88,1),(89,1),(90,1),(77,2),(78,2),(79,2),(80,2),(81,2),(82,2),(83,2),(84,2),(85,2);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proyectos` (
  `id_proyecto` int NOT NULL AUTO_INCREMENT,
  `nombre_proyecto` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `id_grupo` int NOT NULL,
  `id_documentos` int NOT NULL,
  PRIMARY KEY (`id_proyecto`),
  UNIQUE KEY `id_proyecto_UNIQUE` (`id_proyecto`),
  UNIQUE KEY `id_grupo_UNIQUE` (`id_grupo`),
  KEY `fk_proyectos_2_idx` (`id_documentos`),
  CONSTRAINT `fk_proyectos_1` FOREIGN KEY (`id_grupo`) REFERENCES `grupos` (`id_grupo`) ON DELETE CASCADE,
  CONSTRAINT `fk_proyectos_2` FOREIGN KEY (`id_documentos`) REFERENCES `documentos` (`id_documentos`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proyectos`
--

LOCK TABLES `proyectos` WRITE;
/*!40000 ALTER TABLE `proyectos` DISABLE KEYS */;
INSERT INTO `proyectos` VALUES (71,'Primer proyecto',74,53),(72,'Segundo proyecto',75,54),(73,'Tercer proyecto',76,55),(74,'Cuarto proyecto',77,56),(79,'Quinto proyecto',82,57),(80,'Sexto proyecto',83,58),(81,'Sexto proyecto',84,59),(82,'Sexto proyecto',85,60),(83,'Quinto proyecto',86,61),(84,'Séptimo proyecto',87,62),(85,'Octavo proyecto',88,63),(86,'Noveno proyecto',89,64),(87,'Décimo proyecto',90,65);
/*!40000 ALTER TABLE `proyectos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_fechas`
--

DROP TABLE IF EXISTS `tipo_fechas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_fechas` (
  `id_tipo_fecha` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo_fecha` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_tipo_fecha`),
  UNIQUE KEY `id_tipo_fecha_UNIQUE` (`id_tipo_fecha`),
  UNIQUE KEY `nombre_tipo_fecha_UNIQUE` (`nombre_tipo_fecha`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_fechas`
--

LOCK TABLES `tipo_fechas` WRITE;
/*!40000 ALTER TABLE `tipo_fechas` DISABLE KEYS */;
INSERT INTO `tipo_fechas` VALUES (10,'Fecha de acta de tesina'),(3,'Fecha de aprobación de la etapa 1'),(6,'Fecha de aprobación de la etapa 2'),(2,'Fecha de carga de archivos de la etapa 1'),(5,'Fecha de carga de archivos de la etapa 2'),(9,'Fecha de defensa del proyecto'),(8,'Fecha de designación del tribunal'),(1,'Fecha de fin de cursada'),(4,'Fecha de resolución de extensión de la etapa 1'),(7,'Fecha de resolución de extensión de la etapa 2');
/*!40000 ALTER TABLE `tipo_fechas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tribunales`
--

DROP TABLE IF EXISTS `tribunales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tribunales` (
  `id_tribunal` int NOT NULL AUTO_INCREMENT,
  `id_proyecto` int NOT NULL,
  `integrante_tribunal_1` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `integrante_tribunal_2` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `integrante_tribunal_3` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id_tribunal`),
  UNIQUE KEY `id_tribunal_UNIQUE` (`id_tribunal`),
  KEY `fk_tribunales_1_idx` (`id_proyecto`),
  CONSTRAINT `fk_tribunales_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id_proyecto`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tribunales`
--

LOCK TABLES `tribunales` WRITE;
/*!40000 ALTER TABLE `tribunales` DISABLE KEYS */;
INSERT INTO `tribunales` VALUES (56,71,'','',''),(57,72,'','',''),(58,73,'','',''),(59,74,'','',''),(60,82,'','',''),(61,83,'','',''),(62,84,'','',''),(63,85,'','',''),(64,86,'','',''),(65,87,'','','');
/*!40000 ALTER TABLE `tribunales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `apellido` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `superusuario` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `id_usuario_UNIQUE` (`id_usuario`),
  UNIQUE KEY `password_UNIQUE` (`password`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `telefono_UNIQUE` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Admin','Admin','admin@gmail.com','3804442366','$2b$10$6nW74rwgX.LNl1sIp8biZev.bP/y3LOxge4S8EnU.ZUra3Vwscv7W',1),(6,'Alejandro','Gómez','gmz248alejandro@gmail.com','3835695313','$2b$10$12VvzqJREVMBh1ZBnpbQ1eAZM6m3534Eprr7CrO1BXnvxbV2KO3VW',0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 20:01:47
