-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: pizza
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `commande`
--

DROP TABLE IF EXISTS `commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `commande` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numeroCommande` varchar(255) NOT NULL,
  `prixtotalCommande` decimal(10,2) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `statusCommande` enum('en cours','payé') DEFAULT 'en cours',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commande`
--

LOCK TABLES `commande` WRITE;
/*!40000 ALTER TABLE `commande` DISABLE KEYS */;
INSERT INTO `commande` VALUES (2,'A001',81.50,'2024-10-30 14:35:26','payé'),(4,'E001',50.50,'2024-11-03 15:08:34','payé'),(5,'E002',8.00,'2024-11-03 16:52:26','payé'),(6,'E003',27.50,'2024-11-03 16:54:08','payé'),(7,'E004',34.00,'2024-11-03 16:55:42','payé'),(8,'E005',50.50,'2024-11-03 16:57:05','payé'),(9,'E006',97.50,'2024-11-03 16:59:10','payé'),(10,'E007',66.50,'2024-11-03 17:15:15','payé'),(11,'E001',32.50,'2024-11-04 08:28:53','payé'),(12,'E002',37.00,'2024-11-04 08:29:18','payé'),(13,'E003',24.00,'2024-11-04 08:29:46','payé'),(14,'E004',34.50,'2024-11-04 08:30:02','payé'),(15,'E005',34.50,'2024-11-04 08:34:57','payé'),(16,'E006',26.00,'2024-11-04 10:20:35','payé'),(17,'E001',32.50,'2024-11-05 12:37:46','payé'),(18,'E001',23.00,'2024-11-06 21:18:20','payé'),(19,'E001',27.50,'2024-11-07 15:00:30','payé'),(20,'E002',11.50,'2024-11-07 15:58:03','payé'),(21,'E001',36.30,'2024-11-08 08:39:49','payé'),(22,'E001',28.50,'2024-11-11 22:03:38','payé'),(23,'E001',11.70,'2024-11-12 13:57:15','payé'),(24,'E001',NULL,'2024-11-15 15:27:41','en cours');
/*!40000 ALTER TABLE `commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prix`
--

DROP TABLE IF EXISTS `prix`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prix` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateprix` date NOT NULL,
  `ancienPrix` decimal(10,2) DEFAULT NULL,
  `nouveauPrix` decimal(10,2) DEFAULT NULL,
  `produit_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `prix_produit_fk` (`produit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prix`
--

LOCK TABLES `prix` WRITE;
/*!40000 ALTER TABLE `prix` DISABLE KEYS */;
INSERT INTO `prix` VALUES (1,'2024-10-20',11.50,11.50,1),(2,'2024-10-20',8.00,8.00,2),(3,'2024-10-20',13.00,13.00,3),(4,'2024-10-20',14.50,14.50,4),(5,'2024-10-20',15.50,15.50,5),(6,'2024-10-20',15.00,15.00,6),(11,'2024-10-20',14.00,14.00,7),(12,'2024-10-20',14.00,14.00,8),(13,'2024-10-20',14.50,14.50,9),(25,'2024-11-11',11.50,11.60,1),(26,'2024-11-11',8.00,7.90,2),(27,'2024-11-11',13.00,13.10,3),(28,'2024-11-11',15.50,15.40,5),(29,'2024-11-12',11.60,11.70,1);
/*!40000 ALTER TABLE `prix` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_translations`
--

DROP TABLE IF EXISTS `product_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_translations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `produit_id` int NOT NULL,
  `language_code` varchar(5) NOT NULL,
  `nomProduit` varchar(255) NOT NULL,
  `descriptionProduit` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_translation` (`produit_id`,`language_code`),
  CONSTRAINT `product_translations_ibfk_1` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_translations`
--

LOCK TABLES `product_translations` WRITE;
/*!40000 ALTER TABLE `product_translations` DISABLE KEYS */;
INSERT INTO `product_translations` VALUES (1,1,'fr','Royale','Sauce tomates, champignons, tomates, oignons, olives noires, jambon, mozzarella, oeufs et herbes fines'),(2,2,'fr','Marguerita','Sauce tomates, mozzarella, olives'),(3,3,'fr','Vegetarienne','Sauce tomate, mozzarella, champignons, poivrons, aubergines, cœurs d’artichauts, oignons rouges caramélisés, olives'),(4,4,'fr','5 Fromages','Sauce tomate, mozzarella, brie, chèvre, reblochon AOP, gorgonzola DOP'),(5,5,'fr','Mexicaine','Sauce tomate, mozzarella, bœuf bolognaise, emmental, maïs, poivrons, oignons rouges caramélisés, épices'),(6,6,'fr','Espagnole','Sauce tomate, mozzarella, chorizo, merguez, poivrons, oignons rouges caramélisés, épices'),(7,7,'fr','Bolognaise','Pates fraiches, sauce tomate, boulettes de boeuf, parmesan'),(8,8,'fr','Carbonara','Pates fraiches, pancetta, oeufs, parmesan, huile d\'olive'),(9,9,'fr','Sorriza','Pates fraiches sous un gratin d\'aubergines a la mozzarella, sauce tomate et parmessan'),(16,1,'gb','Royal','Tomato sauce, mushrooms, tomatoes, onions, olives, mozzarella, ham'),(17,2,'gb','Margherita','Tomato sauce, mozzarella, olives'),(18,3,'gb','Vegetarian','Tomato sauce, mozzarella, mushrooms, peppers, onions'),(19,4,'gb','5 Cheeses','Tomato sauce, mozzarella, brie, goat cheese, reblochon, roquefort'),(20,5,'gb','Mexican','Tomato sauce, mozzarella, bolognese beef, emmental, peppers'),(21,7,'gb','Bolognese','Fresh pasta, tomato sauce, beef meatballs, parmesan'),(22,8,'gb','Carbonara','Fresh pasta, pancetta, eggs, parmesan, olive oil'),(23,9,'gb','Sorriza','Fresh pasta with a gratin of eggplants, mozzarella, tomato sauce, and parmesan'),(24,6,'gb','Spanish','Tomato sauce, mozzarella, chorizo, merguez sausage, peppers, caramelized red onions, spices'),(25,1,'it','Reale','Salsa di pomodoro, funghi, pomodori, cipolle, olive nere, prosciutto, mozzarella, uova e erbe aromatiche'),(26,2,'it','Margherita','Salsa di pomodoro, mozzarella, olive'),(27,3,'it','Vegetariana','Salsa di pomodoro, mozzarella, funghi, peperoni, melanzane, cuori di carciofo, cipolle rosse caramellate, olive'),(28,4,'it','5 Formaggi','Salsa di pomodoro, mozzarella, brie, capra, reblochon DOP, gorgonzola DOP'),(29,5,'it','Messicana','Salsa di pomodoro, mozzarella, carne alla bolognese, emmental, mais, peperoni, cipolle rosse caramellate, spezie'),(30,6,'it','Spagnola','Salsa di pomodoro, mozzarella, chorizo, merguez, peperoni, cipolle rosse caramellate, spezie'),(31,7,'it','Bolognese','Pasta fresca, salsa di pomodoro, polpette di manzo, parmigiano'),(32,8,'it','Carbonara','Pasta fresca, pancetta, uova, parmigiano, olio d\'oliva'),(33,9,'it','Sorriza','Pasta fresca con una gratinatura di melanzane, mozzarella, salsa di pomodoro e parmigiano');
/*!40000 ALTER TABLE `product_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit`
--

DROP TABLE IF EXISTS `produit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photoProduit` varchar(255) DEFAULT NULL,
  `carte` tinyint DEFAULT '1',
  `type_id` int DEFAULT NULL,
  `prix_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type_id` (`type_id`),
  KEY `prix_id` (`prix_id`),
  CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`),
  CONSTRAINT `produit_ibfk_2` FOREIGN KEY (`prix_id`) REFERENCES `prix` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit`
--

LOCK TABLES `produit` WRITE;
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` VALUES (1,'/assets/images/pizza/Royale.webp',1,1,29),(2,'/assets/images/pizza/Marguerita.webp',1,1,26),(3,'/assets/images/pizza/Vegetarienne.webp',1,1,27),(4,'/assets/images/pizza/5-fromages.webp',1,1,4),(5,'/assets/images/pizza/Mexicaine.webp',1,1,28),(6,'/assets/images/pizza/Espagnole.webp',1,1,6),(7,'/assets/images/pates/Bolognaise.webp',1,2,11),(8,'/assets/images/pates/Carbonara.webp',1,2,12),(9,'/assets/images/pates/Sorriza.webp',1,2,13);
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produit_commande`
--

DROP TABLE IF EXISTS `produit_commande`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produit_commande` (
  `produit_id` int NOT NULL,
  `commande_id` int NOT NULL,
  `quantiteCommande` int NOT NULL,
  PRIMARY KEY (`produit_id`,`commande_id`),
  KEY `fk_commande` (`commande_id`),
  CONSTRAINT `fk_commande` FOREIGN KEY (`commande_id`) REFERENCES `commande` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_produit` FOREIGN KEY (`produit_id`) REFERENCES `produit` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produit_commande`
--

LOCK TABLES `produit_commande` WRITE;
/*!40000 ALTER TABLE `produit_commande` DISABLE KEYS */;
INSERT INTO `produit_commande` VALUES (1,2,3),(1,4,3),(1,5,2),(1,6,1),(1,8,1),(1,9,3),(1,10,1),(1,11,1),(1,14,3),(1,15,3),(1,16,1),(1,17,1),(1,18,2),(1,19,1),(1,20,1),(1,21,2),(1,23,1),(2,2,1),(2,4,2),(2,5,1),(2,6,2),(2,7,1),(2,9,3),(2,10,2),(2,11,1),(2,12,3),(2,13,3),(2,17,1),(2,19,2),(3,2,3),(3,5,1),(3,7,2),(3,8,3),(3,9,3),(3,10,3),(3,11,1),(3,12,1),(3,17,1),(3,21,1),(4,16,1),(7,22,1),(9,22,1);
/*!40000 ALTER TABLE `produit_commande` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1),(2),(3),(4),(5),(6);
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_translations`
--

DROP TABLE IF EXISTS `type_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_translations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL,
  `language_code` varchar(5) NOT NULL,
  `nomType` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_translation` (`type_id`,`language_code`),
  CONSTRAINT `type_translations_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_translations`
--

LOCK TABLES `type_translations` WRITE;
/*!40000 ALTER TABLE `type_translations` DISABLE KEYS */;
INSERT INTO `type_translations` VALUES (1,1,'fr','Pizza'),(2,2,'fr','Pate'),(3,3,'fr','Entrée'),(4,4,'fr','Dessert'),(5,5,'fr','Boisson'),(6,6,'fr','Kid'),(7,1,'gb','Pizza'),(8,2,'gb','Pasta'),(9,3,'gb','Starter'),(10,4,'gb','Dessert'),(11,5,'gb','Drink'),(12,6,'gb','Kid'),(13,1,'it','Pizza'),(14,2,'it','Pasta'),(15,3,'it','Antipasto'),(16,4,'it','Dessert'),(17,5,'it','Bevanda'),(18,6,'it','Bambino');
/*!40000 ALTER TABLE `type_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `iduser` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'TOTO','$argon2id$v=19$m=65536,t=5,p=1$FDBd4mLSWtflAHBDNqJiMQ$1EZrixL4BaiAXWRqlT7bosh8QYDU7cvDktOeGDc13FI');
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

-- Dump completed on 2024-11-15 18:21:15
