#create database springboot;

use springboot;

/*CREATE TABLE `book` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`id`)
);*/

#INSERT INTO `book` VALUES (1,'Java',12),(2,'PHP',10),(3,'CSS',121),(4,'JS',21);

/*CREATE TABLE `user` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'mã hóa pass',
  `login_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
);*/

#INSERT INTO `user` VALUES (1,'Nguyễn Văn Huyện','$2a$10$EhY5P8NCuFiSp8KIAIbaseX/5OSDKMQQGOmmUwoxoKsngioXyaw0G','huyennv','huyennv@gmail.com');