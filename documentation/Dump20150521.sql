-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: 127.0.0.1    Database: 1clicktrips
-- ------------------------------------------------------
-- Server version	5.6.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subject` varchar(300) DEFAULT NULL,
  `user_id` int(11) DEFAULT '-1',
  `booked` tinyint(1) DEFAULT '0',
  `reference` int(11) DEFAULT NULL,
  `origin` varchar(160) DEFAULT NULL,
  `destination` varchar(160) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking_segment`
--

DROP TABLE IF EXISTS `booking_segment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_segment` (
  `booking_id` int(11) DEFAULT NULL,
  `segment_id` varchar(20) DEFAULT NULL,
  `segment_selected` tinyint(1) DEFAULT '0',
  `provider_id` varchar(30) DEFAULT NULL,
  `provider_booking_id` varchar(30) DEFAULT NULL,
  `segment_price` decimal(10,2) DEFAULT NULL,
  `segment_tax` decimal(10,2) DEFAULT NULL,
  `segment_currency` varchar(10) DEFAULT NULL,
  `segment_start_time` datetime DEFAULT NULL,
  `segment_start_location_longitude` varchar(20) DEFAULT NULL,
  `segment_start_location_latitude` varchar(20) DEFAULT NULL,
  `segment_start_location_name` varchar(160) DEFAULT NULL,
  `segment_end_time` datetime DEFAULT NULL,
  `segment_end_location_longitude` varchar(20) DEFAULT NULL,
  `segment_end_location_latitude` varchar(20) DEFAULT NULL,
  `segment_end_location_name` varchar(160) DEFAULT NULL,
  `segment_type` smallint(5) unsigned DEFAULT NULL,
  `segment_order` smallint(5) unsigned DEFAULT NULL,
  `segment_checkin_url` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `booking_user`
--

DROP TABLE IF EXISTS `booking_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `booking_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) DEFAULT NULL,
  `first_name` varchar(160) DEFAULT NULL,
  `last_name` varchar(160) DEFAULT NULL,
  `email` varchar(160) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address_street` varchar(160) DEFAULT NULL,
  `address_city` varchar(100) DEFAULT NULL,
  `address_postal` varchar(20) DEFAULT NULL,
  `address_country` varchar(100) DEFAULT NULL,
  `company_name` varchar(160) DEFAULT NULL,
  `company_tax_no` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `code` varchar(3) NOT NULL,
  `name` varchar(160) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `start` varchar(160) DEFAULT NULL,
  `end` varchar(160) DEFAULT NULL,
  `transport` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `start_location_latitude` decimal(20,15) DEFAULT NULL,
  `start_location_longitude` decimal(20,15) DEFAULT NULL,
  `end_location_latitude` decimal(20,15) DEFAULT NULL,
  `end_location_longitude` decimal(20,15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_favorite_user1_idx` (`user_id`),
  CONSTRAINT `fk_favorite_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hotel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `booking_id` int(11) NOT NULL,
  `name` varchar(160) DEFAULT NULL,
  `street` varchar(160) DEFAULT NULL,
  `address_other` varchar(255) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(3) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_hotel_booking1_idx` (`booking_id`),
  KEY `fk_hotel_1_idx` (`country`),
  CONSTRAINT `fk_hotel_booking` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hotel_country` FOREIGN KEY (`country`) REFERENCES `country` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `content` varchar(255) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `read` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `run_on` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_name` varchar(160) DEFAULT NULL,
  `first_name` varchar(160) DEFAULT NULL,
  `last_name` varchar(160) DEFAULT NULL,
  `street` varchar(160) DEFAULT NULL,
  `address_other` varchar(45) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `city` varchar(10) DEFAULT NULL,
  `country` varchar(10) DEFAULT NULL,
  `language` varchar(10) DEFAULT 'en',
  `registration_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `setting`
--

DROP TABLE IF EXISTS `setting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `setting` (
  `user_id` int(11) NOT NULL,
  `key` varchar(45) NOT NULL,
  `value` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`key`),
  KEY `fk_setting_user1_idx` (`user_id`),
  CONSTRAINT `fk_setting_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `twitter_id` varchar(255) DEFAULT NULL,
  `twitter_token` varchar(255) DEFAULT NULL,
  `twitter_username` varchar(255) DEFAULT NULL,
  `twitter_display` varchar(255) DEFAULT NULL,
  `licence` int(1) DEFAULT '0',
  `profile_id` int(11) DEFAULT NULL,
  `reset_password_token` varchar(255) DEFAULT NULL,
  `reset_password_expire` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `twitter_id_UNIQUE` (`twitter_id`),
  KEY `fk_user_profile1_idx` (`profile_id`),
  CONSTRAINT `fk_user_profile1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user_has_message`
--

DROP TABLE IF EXISTS `user_has_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_has_message` (
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`message_id`),
  KEY `fk_user_has_message_message1_idx` (`message_id`),
  KEY `fk_user_has_message_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_message_message1` FOREIGN KEY (`message_id`) REFERENCES `message` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_has_message_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-05-21  1:49:10
