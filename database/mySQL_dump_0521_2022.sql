-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: localscoop_local
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer` (
  `buyer_id` int NOT NULL AUTO_INCREMENT,
  `buyer_firstname` varchar(45) NOT NULL,
  `buyer_lastname` varchar(45) NOT NULL,
  `buyer_password_hash` varchar(100) NOT NULL,
  `buyer_email` varchar(30) NOT NULL,
  `buyer_phone_number` varchar(20) NOT NULL,
  `buyer_gender` varchar(45) DEFAULT NULL,
  `buyer_date_of_birth` date DEFAULT NULL,
  `buyer_profile_photo` varchar(100) DEFAULT NULL,
  `buyer_address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`buyer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer`
--

LOCK TABLES `buyer` WRITE;
/*!40000 ALTER TABLE `buyer` DISABLE KEYS */;
INSERT INTO `buyer` VALUES (1,'Yoyo','Chen','yoyochen','yoyochen@gmail.com','7780001234','female','1990-04-01','/jksadhfjkasahdf.jpg',NULL),(2,'Yasmina','Amirifar','yasminaamirifar','yasminaamirifar@gmail.com','7780001235','female','1996-07-08',NULL,NULL),(3,'Kevin','Hung','kevinhung','kevinhung@gmail.com','7780023456','taable','1999-01-02','/asdfasdfasdfas.jpg',NULL);
/*!40000 ALTER TABLE `buyer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `buyer_id_idx` (`buyer_id`),
  CONSTRAINT `cart_buyer_id` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`buyer_id`),
  CONSTRAINT `cart_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,1,1),(3,1,2);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Fashion/Beauty'),(2,'Home Appliances'),(3,'Stationary'),(4,'Art'),(5,'Handmade Tools');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_content` varchar(200) NOT NULL,
  `comment_timestamp` timestamp(6) NULL DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `comment_product_id_idx` (`product_id`),
  CONSTRAINT `comment_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'these shoes taste terrible. 10/10 would not recommend','2021-12-22 08:00:00.000000',1);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `buyer_id` int NOT NULL,
  `store_id` int NOT NULL,
  `order_status_id` int NOT NULL,
  `order_timestamp` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `buyer_id_idx` (`buyer_id`),
  KEY `store_id_idx` (`store_id`),
  KEY `order_status_id_idx` (`order_status_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `order_buyer_id` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`buyer_id`),
  CONSTRAINT `order_order_status_id` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`),
  CONSTRAINT `order_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `order_store_id` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,1,1,1,NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `product_order_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`product_order_id`),
  KEY `order_product_id_idx` (`product_id`),
  KEY `order_product_order_id_idx` (`order_id`),
  CONSTRAINT `order_product_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `order_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,1,1);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `order_status_id` int NOT NULL AUTO_INCREMENT,
  `order_status` varchar(45) NOT NULL,
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'pending'),(2,'deliverying'),(3,'deliveryed');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `product_name` varchar(45) NOT NULL,
  `product_category` varchar(45) NOT NULL,
  `product_description` varchar(100) DEFAULT NULL,
  `product_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `product_delivery_fee` decimal(10,2) DEFAULT '0.00',
  `product_timestamp` timestamp(6) NULL DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'Nike 2000','Shoes','Mens and Womens, size 7 to 14',150.00,0.00,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_photo`
--

DROP TABLE IF EXISTS `product_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_photo` (
  `product_photo_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `photo_file_path` varchar(200) NOT NULL,
  PRIMARY KEY (`product_photo_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_photo_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_photo`
--

LOCK TABLES `product_photo` WRITE;
/*!40000 ALTER TABLE `product_photo` DISABLE KEYS */;
INSERT INTO `product_photo` VALUES (1,1,'gdfgdfgdfgfd.png');
/*!40000 ALTER TABLE `product_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `store_id` int NOT NULL AUTO_INCREMENT,
  `store_name` varchar(45) NOT NULL,
  `store_phone_number` varchar(20) NOT NULL,
  `store_email` varchar(45) NOT NULL,
  `store_password_hash` varchar(100) NOT NULL,
  `store_address` varchar(100) DEFAULT NULL,
  `delivery` tinyint DEFAULT '0',
  `pickup` tinyint DEFAULT '0',
  `radius` int DEFAULT NULL,
  `followers` int DEFAULT '0',
  `rating` decimal(3,2) DEFAULT NULL,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Blue Jet','7783332234','bluejet@gmail.com','dfjkfwkejhfiweiuhiwf','222 Clouds Street, Vancouver',0,0,10,432,5.00);
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_category`
--

DROP TABLE IF EXISTS `store_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_category` (
  `store_category_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`store_category_id`),
  KEY `store_category_store_id_idx` (`store_id`),
  KEY `store_category_category_id_idx` (`category_id`),
  CONSTRAINT `store_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  CONSTRAINT `store_category_store_id` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_category`
--

LOCK TABLES `store_category` WRITE;
/*!40000 ALTER TABLE `store_category` DISABLE KEYS */;
INSERT INTO `store_category` VALUES (1,1,2),(2,1,1);
/*!40000 ALTER TABLE `store_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_photo`
--

DROP TABLE IF EXISTS `store_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_photo` (
  `store_photo_id` int NOT NULL AUTO_INCREMENT,
  `store_id` int NOT NULL,
  `photo_file_path` varchar(200) NOT NULL,
  PRIMARY KEY (`store_photo_id`),
  KEY `store_id` (`store_id`),
  CONSTRAINT `store_photo_ibfk_1` FOREIGN KEY (`store_id`) REFERENCES `store` (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_photo`
--

LOCK TABLES `store_photo` WRITE;
/*!40000 ALTER TABLE `store_photo` DISABLE KEYS */;
INSERT INTO `store_photo` VALUES (1,1,'/asdjfhakjsdahfkasjd.jpg');
/*!40000 ALTER TABLE `store_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `buyer_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`wishlist_id`),
  KEY `buyer_id_idx` (`buyer_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `wishlist_buyer_id` FOREIGN KEY (`buyer_id`) REFERENCES `buyer` (`buyer_id`),
  CONSTRAINT `wishlist_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (1,1,1);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-05 12:27:58
