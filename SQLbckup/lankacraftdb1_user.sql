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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,NULL,'chamee11@gmail.com','chameera','senarathna','074565275','$10$GIWrph4LRdr7uo6S9J8ztuuuKqR41GUh6ZbH94I0cqsjGGqUR7cJG','ADMIN'),(2,NULL,'11ee@gmail.com','Test','kavidu','0967889899','$2a$10$GIWrph4LRdr7uo6S9J8ztuuuKqR41GUh6ZbH94I0cqsjGGqUR7cJG',NULL),(52,NULL,'chamee111@gmail.com','dsad','456','0753998444','$2a$10$AILmnNd6prfJKcwUukn5X.TTSIwb0x5c2i82v6Rk/OTCDgCdwYHMO','CUSTOMER'),(53,NULL,'cha111mee@gmail.com','dsad','456','0753998444','$2a$10$zw5LjZ4TtuGcWYrX/iW6ZOfDpZDvZrqsyqbZYN9AbWg.NRpG48Dfq','ARTISAN'),(54,NULL,'ch111111mee@gmail.com','dsad','456','0753998444','$2a$10$T.sBntElEQtzzpP7okgpF.PfM8h1CYWHITLjrLtuGOmvnZUsF9/TK','ARTISAN'),(55,NULL,'ch444411111mee@gmail.com','cccccccc','456','0753998444','$2a$10$HZjd3qhP7ac.s6MQb3o/MepqZtNtRiYkgeZfoUpfWjaAAzvVrcnXi','ARTISAN'),(56,NULL,'ch46768781mee@gmail.com','ddfsfsfsfdfdfdfdf','456','0753998444','$2a$10$NDBbDzfFAPrhi7pPLyW.JOk7uGQH0out01S6jZPwoS51qOZjewpEe','ARTISAN'),(57,NULL,'cha22mee@gmail.com','dsad','456','0753998444','$2a$10$GjovihrR3fkQQCdaQUfjOuFsDptVmPQvjO3lSRwGIja3UJ6j8G.Cm','CUSTOMER'),(102,NULL,'chameeadmin@gmail.com','Kavinda','Senarathna','0753998444','$2a$10$xpU11C5xXquqEzdDDYKc1.1jUqKvzCXN4rI5leDjOK/dk0rSxlmdq','ADMIN'),(103,NULL,'gihan@hmail.com','gihan','bandara','899797790','$2a$10$HBSFH9qD6jcoFopfIdKx1e.kiJq5HtkqPk1gPTXmHvfbcELAU9ayO','CUSTOMER'),(152,NULL,'kavinda@gmail.com','Kavinda','Senarathna','0753998444','$2a$10$uhTqpLgR2WmOh4qOjB.gw.WR0yZ26vBbThAuawG0G/gNZBO5m9kDm','ADMIN'),(153,NULL,'chamee@gmail.com','Kavinda','Senarathna','0753998444','$2a$10$tY4K2o5/PSBFhos9hVUMP.i7sV.jbj7DfPRTSsI9MOJSO1at8fT.6','ADMIN'),(202,NULL,'saman1@gmail.com','saman bandara','saman','3453666','$2a$10$1aI4TsFqpybNiLmp6poucu7jqzNFh7u0JXhwRIsLyDkJTZWbqAs5u','ARTISAN'),(252,NULL,'chameerakavinda513@gmail.com','chameera','kavinda','0753998444','$2a$10$SVBEwjgXL44kPksuGkg/kuflTylMRGPee.k8HAkHM2WeDitIFoyP6','CUSTOMER'),(302,NULL,'sam111an1@gmail.com','dsad','456','0753998444','$2a$10$6t4qLumd5ggUAVDWpOrNsu.a0qRdZMBkGq5n6yogC9Eb5Xw8EaWqW','CUSTOMER'),(352,NULL,'chameerasenarathna14@gmail.com','Kavinda','Chameers','0753998444','$2a$10$e2WGVn98JcZHsU4HuNLcruELWws4y/Dj/Z3Rlpbaq.g9dCA71G9/W','CUSTOMER'),(402,NULL,'1111@gmail.com','Kavinda','Kavinda','+94753998444','$2a$10$D7d78K8UzZi4IR33b3iR0OZazQCxWkVYKA7831oRB0smBHdRnO/9u','CUSTOMER'),(403,NULL,'1111ee@gmail.com','dsad','456','0753998444','$2a$10$rASS2O1KQJV67lUVZZy3f.yYeo50XJ1aWDmZaHIBCaIGxauxWVsqe','CUSTOMER'),(404,NULL,'bandaamee@gmail.com','Banda','Amarasinghe','0771234567','$2a$10$n/UbbzAAEmMU7nsfOqfwQu/rh3yx7.Agqbg4juOf454BORUZ2BQKG','CUSTOMER'),(452,NULL,'chamodsenarathna1234@gmail.com','chamod','senarathna','','$2a$10$1Shaa5kWl6p1I7V8bCNlhOJGbqPLoc0aFHO0djhkrEgsNo305bVea',NULL),(453,NULL,'','chamod','senarathna','','$2a$10$7fe.VDwpX.he9maLpW641.G82F9ZM8XPviuS5Ty2A.DG5UKPAKQOO',NULL),(502,NULL,'111n1@gmail.com','Kavinda','Chameers','0753998444','$2a$10$8KziOwttIs1qDyZawunaxOhQ6jQUXs4e8r/tqd26lEb/PGJ37o5du','CUSTOMER'),(503,NULL,'supun123@gmail.com','Supun','Sandeepa','0753997856','$2a$10$35XafaIqqoQoc36M9IdiCO335oPXIdhqM3y7C649LDd1.nq6fxSoK','customer'),(504,NULL,'supun1123@gmail.com','Supun','Sandeepa','0753997856','$2a$10$mlYo7jP8bPtNtIwgiFu8a.iHTRN8pto7ixRupwI6YmCC4nS9t1c2y','customer'),(552,NULL,'supun11123@gmail.com','Supun','Sandeepa','0753997856','$2a$10$LTZWS8gJbJWLTa85UgOJjehhkRDG9mb.Wq6myOV0yGkw1eL1rPCUe','customer'),(602,NULL,'supun55123@gmail.com','Supun','Sandeepa','0753997856','$2a$10$yzz37k5g.RM.ThSIAZ3BTuCtWqvUMqjoIrK.u0BhfbtVkzAgEAI/S','customer'),(652,NULL,'supun111@gmail.com','Supun','Perera','0776543210','$2a$10$AYMZIfrxrKYVR/OIbUcoze5WUKJxhLZWi5wg0VyS1qps1Sn3hsHOG','customer'),(702,NULL,'kumara@gmail.com','kumara','darmasena','0776543210','$2a$10$vVNvmx0pO4bLvpHHV/4a4OM4Fj2ENScNyNOmL4esZhtKe3au5oipG','ARTISAN'),(703,NULL,'admin@gmail.com','Admin','Success','0753997856','$2a$10$hhPV7OTeK.aahH.F2uGgyOra1Yukmg0lSt8J6bFvPWzgeSReYAnjS','ADMIN'),(752,NULL,'fffe@gmail.com','Kavinda','Kavinda','0967889899','$2a$10$Vgdd9ugWzAdpKmxoXfplnu8xGa9IirUJQntsQC3BWNCZn2j.uQj2u','CUSTOMER'),(753,NULL,'66666ee@gmail.com','Kavinda','Kavinda','0967889899','$2a$10$Ls/LVtAFjnrKIm.ShD6r6.EKALzDignq6TzNjctMozPErmxFmucPu','ARTISAN'),(754,NULL,'chharshaamee@gmail.com','Kavinda','Saman','0967889899','$2a$10$8oonaKT2OtnKVpd6U1G7LuC1jYaWecB1q4vIvyCsSr5O5zoIBrflq','ARTISAN'),(755,NULL,'chameerasenarathna5614@gmail.com','Chamaaa','Kavinda','+94753998444','$2a$10$F/90VCNa5TXRbo..2lIJGOXLxQUokGgcn5lbrNnKJXMiI5A/WkcgC','CUSTOMER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-06 20:16:09
