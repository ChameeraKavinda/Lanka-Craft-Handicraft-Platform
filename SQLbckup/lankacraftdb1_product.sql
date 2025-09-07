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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount_present` int NOT NULL,
  `discount_price` int NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `num_ratings` int DEFAULT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `artisan_email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Sampath Caft','2025-08-27 11:26:35.670733','A beautifully handcrafted Wood Item.',10,0,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbB5QcZH8PR24W4dLCo3x1XuuBn-HKNgrJwg&s',0,800,15,'Wood ',3,'kavindakavinda2705@gmail.com'),(2,'Udana Caft','2025-08-27 11:27:31.932041','A Colorful handcrafted Wood Item.',10,0,'https://theceyloncraft.com/wp-content/uploads/2024/07/il_794xN.5611914587_lcoo.jpg',0,500,15,'Wood ',3,'chameerakavinda513@gmail.com'),(3,'Lanka Caft','2025-08-27 11:28:14.458961','A  handcrafted Wood Item.',10,0,'https://lakshilpa.com/wp-content/uploads/2021/04/bl_1.jpg',0,6000,15,'Wood ',3,'chameerakavinda513@gmail.com'),(4,'Lanka Caft','2025-08-27 11:30:04.006271','A  handcrafted Elephant Wood Box.',10,0,'https://i.etsystatic.com/24227672/c/2227/2227/22/773/il/63cece/5490640360/il_300x300.5490640360_jjn6.jpg',0,8000,15,'Wood ',3,'chameerakavinda513@gmail.com'),(5,'Lanka Caft','2025-08-27 11:31:02.141989','A  handcrafted  Wood Box.',10,0,'https://static-01.daraz.lk/p/3d1520bdf078e2314c1393c702e0a2b9.jpg',0,4000,15,'Wood',3,'chameerakavinda513@gmail.com'),(7,'Hela Caft','2025-08-27 12:18:49.205344','A  handcrafted  Wood Box.',20,0,'https://thumbs.dreamstime.com/b/old-sri-lankan-wood-carved-window-frame-pannels-koggala-sri-lanka-carved-window-frame-pannels-koggala-sri-lanka-269020010.jpg',0,4000,15,'Wood ',4,'chameerakavinda513@gmail.com'),(8,'Hela Niyamu','2025-08-27 12:21:20.908255','A  handcrafted  Wood Box.',15,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,40000,15,'Wood ',5,'chameerakavinda513@gmail.com'),(53,'Lanka Craft','2025-08-28 10:33:31.717044','\"A  handcrafted Elephant Wood Box',25,0,'https://i.etsystatic.com/24227672/c/2227/2227/22/773/il/63cece/5490640360/il_300x300.5490640360_jjn6.jpg',0,12000,1,'Handicraft',3,'chameerakavinda513@gmail.com'),(54,'fuck','2025-08-28 10:33:51.893060','\"A  handcrafted Elephant Wood Box',25,0,'https://i.etsystatic.com/24227672/c/2227/2227/22/773/il/63cece/5490640360/il_300x300.5490640360_jjn6.jpg',0,12000,4,'Handicraft',3,'chameerakavinda513@gmail.com'),(153,'Lanka Craft','2025-08-30 01:45:33.947109','This is Sample',0,70,'https://lakshilpa.com/wp-content/uploads/2021/11/clay2.png',0,600,1,'Wood',3,'chameerakavinda513@gmail.com'),(154,'bandara','2025-08-30 02:37:13.364277','kamanal',0,50,'https://lakshilpa.com/wp-content/uploads/2021/11/clay.png',0,400,20,'gihan',105,'chameerakavinda513@gmail.com'),(402,'Lanka','2025-08-31 09:58:56.663951','gANNSS',4,560,'https://lakshilpa.com/wp-content/uploads/2023/11/4-1-400x400.jpg',0,5000,45,'Mask',108,'chameerakavinda513@gmail.com'),(510,'Hela Niyamu','2025-08-31 17:37:24.785512','A  handcrafted  Wood Box.',35,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,8000,15,'Wood ',5,'chameerakavinda513@gmail.com'),(511,'Hela Niyamu','2025-08-31 17:39:12.616435','A  handcrafted  Wood Box.',35,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,8000,15,'Wood ',5,'chameerakavinda513@gmail.com'),(512,'Hela Niyamu','2025-08-31 17:41:06.071802','A  handcrafted  Wood Box.',35,80,'https://lakshilpa.com/wp-content/uploads/2021/11/119.08-scaled-400x400.jpg',0,8000,10,'Wood',5,'chameerakavinda513@gmail.com'),(514,'Lanka Craft','2025-08-31 17:49:46.416831','Mask Kolam',5,500,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3XisRJUEH9fsX16gZ57RQANGBKGP6puOh-w&s',0,4000,8,'Mask',461,'chameerakavinda513@gmail.com'),(515,'Colam','2025-08-31 17:56:28.792780','Kolam Mask',10,900,'https://www.teardrop-hotels.com/fort-bazaar/wp-content/uploads/sites/3/2024/07/Traditional-Mask-Carving-and-Painting-500x620-1.jpg',0,9000,70,'Mask',462,'chameerakavinda513@gmail.com'),(516,'Lanka Carft','2025-08-31 18:18:27.387667','Kolam Mask',3,50,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0TbRTY34PIoDj3YWhismvwJU9Fe-N_faEg&s',0,8000,7,'Mask',464,'chameerakavinda513@gmail.com'),(552,'Hela Niyamu','2025-09-06 10:08:55.409447','A  handcrafted  Wood Box.',35,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,8000,15,'Wood ',504,'kumara@gmail.com'),(553,'Hela Niyamu','2025-09-06 10:09:21.091885','A  handcrafted  Wood Box.',35,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,8000,15,'Wood ',5,''),(554,'Hela Niyamu','2025-09-06 10:13:26.428843','A  handcrafted  Wood Box.',35,0,'https://furniture.lk/images/andys/NadunDiningTablewithChairs_13_920.jpeg',0,8000,15,'Wood ',5,'kumara@gmail.com');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-06 20:16:11
