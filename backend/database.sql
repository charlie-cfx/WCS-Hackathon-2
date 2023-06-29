-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)

--

-- Host: localhost    Database: emmaus_phone

-- ------------------------------------------------------

-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */

;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

--

-- Current Database: `emmaus_phone`

--

CREATE DATABASE
    /*!32312 IF NOT EXISTS*/
    `emmaus_phone`
    /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */
    /*!80016 DEFAULT ENCRYPTION='N' */
;

USE `emmaus_phone`;

--

-- Table structure for table `accessory`

--

DROP TABLE IF EXISTS `accessory`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `accessory` (
        `id` int NOT NULL AUTO_INCREMENT,
        `name` varchar(255) NOT NULL,
        `weighting` int NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `accessory`

--

LOCK TABLES `accessory` WRITE;

/*!40000 ALTER TABLE `accessory` DISABLE KEYS */

;

INSERT INTO `accessory`
VALUES (1, 'Chargeur', 0), (2, 'Ecouteur filaire', 0), (3, 'coque', 0), (4, 'verre trempé', 0), (5, 'Aucun', 0);

/*!40000 ALTER TABLE `accessory` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `brand`

--

DROP TABLE IF EXISTS `brand`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `brand` (
        `id` int NOT NULL AUTO_INCREMENT,
        `brand_name` varchar(100) NOT NULL,
        `weighting` int NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 20 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `brand`

--

LOCK TABLES `brand` WRITE;

/*!40000 ALTER TABLE `brand` DISABLE KEYS */

;

INSERT INTO `brand`
VALUES (1, 'Apple', 0), (2, 'Samsung', 0), (3, 'Huawei', 0), (4, 'Xiaomi', 0), (5, 'OnePlus', 0), (6, 'Google', 0), (7, 'Sony', 0), (8, 'LG', 0), (9, 'Motorola', 0), (10, 'Nokia', 0), (11, 'Oppo', 0), (12, 'Vivo', 0), (13, 'Realme', 0), (14, 'HTC', 0), (15, 'Asus', 0), (16, 'Blackberry', 0), (17, 'Alcatel', 0), (18, 'ZTE', 0), (19, 'Meizu', 0);

/*!40000 ALTER TABLE `brand` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `color`

--

DROP TABLE IF EXISTS `color`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `color` (
        `id` int NOT NULL AUTO_INCREMENT,
        `color_name_en` varchar(45) NOT NULL,
        `color_name_fr` varchar(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `color`

--

LOCK TABLES `color` WRITE;

/*!40000 ALTER TABLE `color` DISABLE KEYS */

;

INSERT INTO `color`
VALUES (1, 'black', 'noir'), (2, 'white', 'blanc'), (3, 'silver', 'argent'), (4, 'gray', 'gris'), (5, 'gold', 'or'), (6, 'rose', 'rose'), (7, 'blue', 'bleu'), (8, 'red', 'rouge'), (9, 'green', 'vert'), (10, 'purple', 'violet'), (11, 'yellow', 'jaune'), (12, 'blue sky', 'bleu ciel'), (13, 'bronze', 'bronze'), (14, 'brown', 'marron');

/*!40000 ALTER TABLE `color` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `faq`

--

DROP TABLE IF EXISTS `faq`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `faq` (
        `id` int NOT NULL AUTO_INCREMENT,
        `question` varchar(255) NOT NULL,
        `answer` varchar(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `faq`

--

LOCK TABLES `faq` WRITE;

/*!40000 ALTER TABLE `faq` DISABLE KEYS */

;

/*!40000 ALTER TABLE `faq` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `model`

--

DROP TABLE IF EXISTS `model`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `model` (
        `id` int NOT NULL AUTO_INCREMENT,
        `model_name` varchar(100) NOT NULL,
        `screen_size_inch` varchar(45) NOT NULL,
        `screen_size_cm` varchar(45) NOT NULL,
        `weighting` int NOT NULL,
        `brand_id` int NOT NULL,
        `color_id` int NOT NULL,
        PRIMARY KEY (`id`, `brand_id`, `color_id`),
        KEY `fk_model_brand1_idx` (`brand_id`),
        KEY `fk_model_color1_idx` (`color_id`),
        CONSTRAINT `fk_model_brand1` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
        CONSTRAINT `fk_model_color1` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `model`

--

LOCK TABLES `model` WRITE;

/*!40000 ALTER TABLE `model` DISABLE KEYS */

;

INSERT INTO `model`
VALUES (
        1,
        'GALAXY S23',
        '5.8',
        '14.5',
        0,
        2,
        2
    ), (
        2,
        'GALAXY S10e',
        '5.8',
        '14.5',
        0,
        2,
        5
    ), (
        3,
        'Reno6',
        '6.4',
        '16.2',
        0,
        11,
        8
    ), (
        5,
        'iPhone12',
        '6.1',
        '15.4',
        0,
        1,
        3
    ), (
        6,
        'iPhone 7',
        '6.1',
        '15.4',
        0,
        1,
        7
    ), (
        7,
        'iPhone13',
        '6.1',
        '15.4',
        0,
        1,
        8
    ), (
        8,
        'GALAXY S21',
        '6.2',
        '15.7',
        0,
        2,
        3
    ), (
        9,
        'Pixel 6',
        '6.4',
        '16.2',
        0,
        6,
        14
    ), (
        10,
        '9 Pro',
        '6.7',
        '17.1',
        0,
        5,
        13
    ), (
        11,
        'Mi 11',
        '6.81',
        '17.2',
        0,
        4,
        11
    ), (
        12,
        'P 40Pro',
        '6.58',
        '16.7',
        0,
        3,
        9
    ), (
        13,
        'Xperia III',
        '6.5',
        '16.5',
        0,
        7,
        5
    ), (
        14,
        'Velvet',
        '6.8',
        '17.2',
        0,
        8,
        4
    ), (
        15,
        'Find X3 Pro',
        '6.7',
        '17.1',
        0,
        11,
        7
    );

/*!40000 ALTER TABLE `model` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `os`

--

DROP TABLE IF EXISTS `os`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `os` (
        `id` int NOT NULL AUTO_INCREMENT,
        `OS_name` varchar(45) NOT NULL,
        `weighting` int NOT NULL,
        `OS_version_id` int NOT NULL,
        PRIMARY KEY (`id`, `OS_version_id`),
        KEY `fk_OS_OS_version1_idx` (`OS_version_id`),
        CONSTRAINT `fk_OS_OS_version1` FOREIGN KEY (`OS_version_id`) REFERENCES `os_version` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `os`

--

LOCK TABLES `os` WRITE;

/*!40000 ALTER TABLE `os` DISABLE KEYS */

;

INSERT INTO `os`
VALUES (3, 'Androïd', 0, 1), (4, 'iOS', 0, 2), (5, 'Windows10 mobile', 0, 3), (6, 'HarmonyOS', 0, 4);

/*!40000 ALTER TABLE `os` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `os_version`

--

DROP TABLE IF EXISTS `os_version`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `os_version` (
        `id` int NOT NULL AUTO_INCREMENT,
        `version` varchar(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `os_version`

--

LOCK TABLES `os_version` WRITE;

/*!40000 ALTER TABLE `os_version` DISABLE KEYS */

;

INSERT INTO `os_version`
VALUES (1, '12'), (2, '13'), (3, '1.0'), (4, '2.0');

/*!40000 ALTER TABLE `os_version` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `phone`

--

DROP TABLE IF EXISTS `phone`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `phone` (
        `id` int NOT NULL AUTO_INCREMENT,
        `brand_id` int NOT NULL,
        `model_id` int NOT NULL,
        `OS_id` int NOT NULL,
        `ram` int NOT NULL,
        `memory` int NOT NULL,
        `network` varchar(45) NOT NULL,
        `accessory_id` int NOT NULL,
        `state_id` int NOT NULL,
        PRIMARY KEY (
            `id`,
            `brand_id`,
            `model_id`,
            `OS_id`,
            `accessory_id`,
            `state_id`
        ),
        KEY `fk_phone_brand_idx` (`brand_id`),
        KEY `fk_phone_model1_idx` (`model_id`),
        KEY `fk_phone_OS1_idx` (`OS_id`),
        KEY `fk_phone_accessory1_idx` (`accessory_id`),
        KEY `fk_phone_state1_idx` (`state_id`),
        CONSTRAINT `fk_phone_accessory1` FOREIGN KEY (`accessory_id`) REFERENCES `accessory` (`id`),
        CONSTRAINT `fk_phone_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`id`),
        CONSTRAINT `fk_phone_model1` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
        CONSTRAINT `fk_phone_OS1` FOREIGN KEY (`OS_id`) REFERENCES `os` (`id`),
        CONSTRAINT `fk_phone_state1` FOREIGN KEY (`state_id`) REFERENCES `state` (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `phone`

--

LOCK TABLES `phone` WRITE;

/*!40000 ALTER TABLE `phone` DISABLE KEYS */

;

INSERT INTO `phone`
VALUES (1, 2, 1, 3, 8, 0, '4G', 2, 5), (2, 2, 2, 3, 8, 16, '4G', 5, 4), (3, 1, 5, 4, 16, 32, '5G', 4, 5), (4, 4, 11, 3, 16, 48, '5G', 1, 3), (5, 6, 9, 3, 8, 4, '3G', 3, 3);

/*!40000 ALTER TABLE `phone` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `state`

--

DROP TABLE IF EXISTS `state`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `state` (
        `id` int NOT NULL AUTO_INCREMENT,
        `state` varchar(45) NOT NULL,
        `weighting` int NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `state`

--

LOCK TABLES `state` WRITE;

/*!40000 ALTER TABLE `state` DISABLE KEYS */

;

INSERT INTO `state`
VALUES (1, 'DEEE', 0), (2, 'Réparable', 0), (3, 'Bloqué', 0), (4, 'Reconditionnable', 0), (5, 'Reconditionné', 0);

/*!40000 ALTER TABLE `state` ENABLE KEYS */

;

UNLOCK TABLES;

--

-- Table structure for table `user`

--

DROP TABLE IF EXISTS `user`;

/*!40101 SET @saved_cs_client     = @@character_set_client */

;

/*!50503 SET character_set_client = utf8mb4 */

;

CREATE TABLE
    `user` (
        `id` int NOT NULL AUTO_INCREMENT,
        `mail` varchar(255) NOT NULL,
        `hashed_password` varchar(255) NOT NULL,
        `lastname` varchar(100) DEFAULT NULL,
        `firstname` varchar(100) DEFAULT NULL,
        `phone` varchar(18) DEFAULT NULL,
        `is_admin` tinyint NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

/*!40101 SET character_set_client = @saved_cs_client */

;

--

-- Dumping data for table `user`

--

LOCK TABLES `user` WRITE;

/*!40000 ALTER TABLE `user` DISABLE KEYS */

;

INSERT INTO `user`
VALUES (
        1,
        'test1@mail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$xSZenb4qmCK5FEdUeaPCvw$8EF2vMXW9EUA1XgmF9KXvhk58WCiEa7T+MJBFMldTpM',
        'testeur2',
        'Jean',
        '3288378372',
        1
    ), (
        2,
        'mail@mail.com',
        '$argon62rf95=fkhjjhgr56989',
        'vendeur',
        'junior',
        '5896789254',
        0
    );

/*!40000 ALTER TABLE `user` ENABLE KEYS */

;

UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */

;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */

;

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */

;

/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */

;

/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */

;

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */

;

-- Dump completed on 2023-06-28 20:26:40

INSERT INTO
    `accessory`(name, weighting)
VALUES ('Aucun', 0), ('Chargeur', 0), ('Ecouteur', 0), ('Verre trempé', 0), ('Chargeur + Ecouteur', 0), ('Chargeur + Verre trempé', 0), ('Ecouteur + Verre trempé', 0), (
        'Chargeur + Ecouteur + Verre trempé',
        0
    );

INSERT INTO `brand`
VALUES (1, 'Apple', 0), (2, 'Samsung', 0), (3, 'Huawei', 0), (4, 'Xiaomi', 0), (5, 'OnePlus', 0), (6, 'Google', 0), (7, 'Sony', 0), (8, 'LG', 0), (9, 'Motorola', 0), (10, 'Nokia', 0), (11, 'Oppo', 0), (12, 'Vivo', 0), (13, 'Realme', 0), (14, 'HTC', 0), (15, 'Asus', 0), (16, 'Blackberry', 0), (17, 'Alcatel', 0), (18, 'ZTE', 0), (19, 'Meizu', 0);

INSERT INTO `color`
VALUES (1, 'black', 'noir'), (2, 'white', 'blanc'), (3, 'silver', 'argent'), (4, 'gray', 'gris'), (5, 'gold', 'or'), (6, 'rose', 'rose'), (7, 'blue', 'bleu'), (8, 'red', 'rouge'), (9, 'green', 'vert'), (10, 'purple', 'violet'), (11, 'yellow', 'jaune'), (12, 'blue sky', 'bleu ciel'), (13, 'bronze', 'bronze'), (14, 'brown', 'marron');

INSERT INTO `model`
VALUES (
        1,
        'Galaxy S23',
        '5.8',
        '14.5',
        0,
        2,
        2
    ), (
        2,
        'Galaxy S10e',
        '5.8',
        '14.5',
        0,
        2,
        5
    ), (
        3,
        'Reno6',
        '6.4',
        '16.2',
        0,
        11,
        8
    ), (
        5,
        'iPhone12',
        '6.1',
        '15.4',
        0,
        1,
        3
    ), (
        6,
        'iPhone 7',
        '6.1',
        '15.4',
        0,
        1,
        7
    ), (
        7,
        'iPhone13',
        '6.1',
        '15.4',
        0,
        1,
        8
    ), (
        8,
        'Galaxy S21',
        '6.2',
        '15.7',
        0,
        2,
        3
    ), (
        9,
        'Pixel 6',
        '6.4',
        '16.2',
        0,
        6,
        14
    ), (
        10,
        '9 Pro',
        '6.7',
        '17.1',
        0,
        5,
        13
    ), (
        11,
        'Mi 11',
        '6.81',
        '17.2',
        0,
        4,
        11
    ), (
        12,
        'P 40Pro',
        '6.58',
        '16.7',
        0,
        3,
        9
    ), (
        13,
        'Xperia III',
        '6.5',
        '16.5',
        0,
        7,
        5
    ), (
        14,
        'Velvet',
        '6.8',
        '17.2',
        0,
        8,
        4
    ), (
        15,
        'Find X3 Pro',
        '6.7',
        '17.1',
        0,
        11,
        7
    );

INSERT INTO `os_version`
VALUES (1, '12'), (2, '13'), (3, '1.0'), (4, '2.0');

INSERT INTO `os`
VALUES (1, 'Android', 0, 1), (2, 'iOS', 0, 2), (3, 'Windows10 mobile', 0, 3), (4, 'HarmonyOS', 0, 4);

INSERT INTO `state`
VALUES (1, 'DEEE', 0), (2, 'Réparable', 0), (3, 'Bloqué', 0), (4, 'Reconditionnable', 0), (5, 'Reconditionné', 0);

INSERT INTO `phone`
VALUES (1, 2, 1, 1, 8, 0, '4G', 2, 5), (2, 2, 2, 1, 8, 16, '4G', 5, 4), (3, 1, 5, 2, 16, 32, '5G', 4, 5), (4, 4, 11, 1, 16, 48, '5G', 1, 3), (5, 6, 9, 1, 8, 4, '3G', 3, 3);