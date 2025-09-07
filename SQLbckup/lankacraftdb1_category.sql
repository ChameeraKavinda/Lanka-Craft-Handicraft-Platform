-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: lankacraftdb1
-- ------------------------------------------------------
-- Server version	8.0.43

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL,
  `level` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `parent_category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  KEY `FKs2ride9gvilxy2tcuv7witnxc` (`parent_category_id`),
  CONSTRAINT `FKs2ride9gvilxy2tcuv7witnxc` FOREIGN KEY (`parent_category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,1,'Wood',NULL),(2,2,'Decor',1),(3,3,'boxes',2),(4,3,'frames',2),(5,3,'Tables',2),(52,1,'lll',NULL),(53,2,'Decor',52),(102,3,'Box',2),(103,1,'Brass',NULL),(104,2,'Decor',103),(105,3,'Cups',104),(106,1,'Art',NULL),(107,2,'Sculptures',106),(108,3,'Wood Sculptures',107),(152,3,'Brass Sculptures',107),(202,2,'Painting',106),(203,3,'Miniature Art',202),(252,1,'Art ',NULL),(253,2,'Paintings',252),(254,3,'Wall Paintings',253),(302,2,'Paintings',106),(303,3,'Canvas Paintings',302),(304,3,'Brass Sculptures',302),(305,3,'wall_Art',202),(352,3,'Boxe',2),(402,2,'utensils',103),(403,3,'Cups',402),(404,2,'Brass',1),(405,3,'Boxes',404),(452,1,'Wood ',NULL),(453,2,'Decor ',452),(454,3,'Art',453),(455,1,'Ark',NULL),(456,2,'Decor',455),(457,3,'Bowls',456),(458,3,'Bowls',404),(459,1,'Mask',NULL),(460,2,'Dance Masks',459),(461,3,'KolamMasks',460),(462,3,'SanniMasks',460),(463,2,'Decorative Masks',459),(464,3,'WallMasks',463),(502,1,'',NULL),(503,2,'',502),(504,3,'Tables',503);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-06 20:16:10
