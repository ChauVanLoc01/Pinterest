-- Adminer 4.8.1 MySQL 8.0.33 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `cmt_emotion`;
CREATE TABLE `cmt_emotion` (
  `user_id` int NOT NULL,
  `comment_id` int NOT NULL,
  `status` enum('like','love','wow','angry','sad','haha','heart') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `cmt_emotion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `cmt_emotion_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cmt_emotion` (`user_id`, `comment_id`, `status`, `created`) VALUES
(1,	3,	'like',	'2023-04-29 15:25:42'),
(1,	5,	'angry',	'2023-04-29 15:25:42'),
(2,	3,	'like',	'2023-04-29 15:25:42'),
(2,	4,	'haha',	'2023-04-29 15:25:42'),
(3,	3,	'sad',	'2023-04-29 15:25:42'),
(22,	6,	'wow',	'2023-05-06 08:01:45'),
(22,	10,	'haha',	'2023-05-10 06:51:25');

DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`),
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`comment_id`, `content`, `created`, `parent_id`, `user_id`, `image_id`) VALUES
(2,	'Today I am glad when looking a cute cat\'s smile',	'2023-04-28 22:48:00',	NULL,	1,	7),
(3,	'This is very nice with my phone',	'2023-04-28 22:49:43',	NULL,	1,	5),
(4,	'I love image',	'2023-04-28 22:50:21',	NULL,	2,	4),
(5,	'Oh very cool',	'2023-04-28 22:50:47',	NULL,	2,	3),
(6,	'haha',	'2023-04-28 22:51:07',	NULL,	3,	7),
(7,	'oh beatifull',	'2023-05-05 12:43:07',	NULL,	22,	6),
(8,	'oh my gosh',	'2023-05-05 12:43:36',	NULL,	22,	2),
(9,	'oh my gosh',	'2023-05-05 12:59:20',	8,	22,	2),
(10,	'oh my gosh',	'2023-05-05 17:56:42',	NULL,	22,	5),
(11,	'This image is best',	'2023-05-06 07:58:46',	NULL,	22,	2);

DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `path` varchar(2800) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `image` (`image_id`, `name`, `path`, `description`, `created`, `user_id`) VALUES
(1,	'Cat Fat',	'https://i.pinimg.com/564x/4b/a8/c8/4ba8c871d5e3148e29c39bb16923b220.jpg',	'Here has a cat fat',	'2023-04-28 15:29:49',	1),
(2,	'Holiday April 30',	'https://i.pinimg.com/564x/0d/d1/e8/0dd1e8c1bb6688824f8e9dd2fe3a12bf.jpg',	'This is a bigger holiday in my country',	'2023-04-28 15:31:57',	2),
(3,	'Luffy with gear five',	'https://i.pinimg.com/564x/57/c2/78/57c27842ef9d374ed4e55dbbfbc86dd7.jpg',	'Luffy\'s gear 5',	'2023-04-28 15:33:25',	3),
(4,	'Zoro cool',	'https://i.pinimg.com/736x/be/46/80/be46809c2fc8654535693b9ebc60c7d3.jpg',	'Zoro is very cool',	'2023-04-28 15:35:01',	1),
(5,	'background image for smart phone',	'https://i.pinimg.com/564x/87/7a/a1/877aa1c2384356a2756013b2de0f9f40.jpg',	NULL,	'2023-04-28 15:37:37',	3),
(6,	'Leu leu',	'https://i.pinimg.com/564x/df/a5/a5/dfa5a578af03c658ba31cbf7622d6c11.jpg',	'Cat show emotion',	'2023-04-28 15:38:38',	2),
(7,	'Dog\'s smile',	'https://i.pinimg.com/564x/a7/ee/81/a7ee812b5dbcfb1c00a2d841332af1ef.jpg',	NULL,	'2023-04-28 15:40:05',	1),
(26,	'Ảnh đẹp',	'https://i.pinimg.com/564x/81/e1/6d/81e16d1497e713cf6de976a4aa34090c.jpg',	NULL,	'2023-05-10 04:16:33',	22),
(28,	'image bla bla',	'https://i.pinimg.com/564x/87/b7/c8/87b7c8c86995e22411be3373cc5a9fff.jpg',	'con mèo vui nhộn',	'2023-05-10 06:41:50',	22),
(30,	'Ảnh đẹp nè',	'localhost:1234/imgs/1683703215822d999b090-ed81-4fc1-85a6-a940648ad73c-myimg.jpg',	NULL,	'2023-05-10 07:20:16',	22),
(31,	'Con mèo vui nhộn',	'https://i.pinimg.com/564x/c2/bb/0e/c2bb0ea05358ad9cd08f22225519491b.jpg',	'string',	'2023-05-10 11:22:42',	22),
(32,	'con meo toi loi',	'https://i.pinimg.com/564x/eb/b2/a2/ebb2a2adff01a820df55770be357ab7d.jpg',	NULL,	'2023-05-10 11:46:21',	22),
(33,	'conmèomập',	'localhost:1234/imgs/168371932575712f63489-7fa3-4b1e-9411-ca41a0cbf3fb-fatcat.png',	NULL,	'2023-05-10 11:48:46',	22);

DROP TABLE IF EXISTS `img_emotion`;
CREATE TABLE `img_emotion` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `status` enum('like','love','wow','angry','sad','haha','heart') NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`image_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `img_emotion_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `img_emotion_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `img_emotion` (`user_id`, `image_id`, `status`, `created`) VALUES
(1,	1,	'like',	'2023-04-29 15:18:18'),
(2,	1,	'haha',	'2023-04-29 15:21:52'),
(2,	4,	'love',	'2023-04-29 15:21:52'),
(2,	5,	'haha',	'2023-04-29 15:21:52'),
(3,	1,	'haha',	'2023-04-29 15:21:52'),
(22,	3,	'love',	'2023-05-05 16:01:35');

DROP TABLE IF EXISTS `saved`;
CREATE TABLE `saved` (
  `saved_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `image_id` int DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`saved_id`),
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `saved_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `saved_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `saved` (`saved_id`, `user_id`, `image_id`, `created`) VALUES
(1,	1,	2,	'2023-04-29 15:27:51'),
(2,	2,	4,	'2023-04-29 15:27:51'),
(3,	3,	2,	'2023-04-29 15:27:51'),
(4,	1,	3,	'2023-04-29 15:27:51'),
(5,	2,	1,	'2023-04-29 15:27:51'),
(6,	2,	6,	'2023-04-29 15:27:51'),
(10,	22,	5,	'2023-05-10 06:22:25'),
(11,	22,	6,	'2023-05-10 10:16:34'),
(12,	22,	3,	'2023-05-10 11:21:03'),
(14,	22,	5,	'2023-05-10 11:21:17');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`user_id`, `full_name`, `birth_day`, `description`, `email`, `password`, `token`) VALUES
(1,	'Chau Van Loc',	NULL,	'My name is Chau Van Loc. I am a web developer',	'locchau.220401@gmail.com',	'chauvanloc123@',	''),
(2,	'Le Tan Hai',	NULL,	'Toi ten là Le Tan Hai',	'tanhai@gmail.com',	'111111',	''),
(3,	'Pham Nguyen Thang',	'2022-04-22',	'Toi la gay',	'thangpham@gmail.com',	'111111',	''),
(22,	'cyber soft 2',	'2011-11-22',	'mo ta cybersoft',	'admin@gmail.com',	'$2b$10$EWUcFlngPF8978poFEzM.ehf1H8EZo5iyzeal4DAPHF1C14/UTMyu',	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZ1bGxfbmFtZSI6InRhaSBib25nIGRlbSIsInVzZXJfaWQiOjIyLCJpYXQiOjE2ODM3MTg1MzIsImV4cCI6MTY4Mzc0NzMzMn0.46_6gAR1GuMLbFJtJ5gjyEa7ctlcuLAGOVs_jrDiBVI'),
(23,	'hai co be de',	NULL,	NULL,	'haikhongbede@gmail.com',	'$2b$10$VxmDYg4.KGQuz4y0DQkTFeeN9or.Ej25S1P7uaPZRaBElIFmnDOKW',	NULL),
(24,	'chau van loc',	NULL,	NULL,	'admin1@gmail.com',	'$2b$10$5aEvSK17XEvQS6q2V2jPTePQRNCe5j4JzplC0jWDU17dq5yIzzfW6',	NULL),
(25,	'cyber soft',	NULL,	NULL,	'admin1234@gmail.com',	'$2b$10$jPZoIbfJMJk7yD8OEbm88.7tmL78y06o7IH65XWkG0C/jPRc/.3rG',	NULL),
(26,	'cyber soft',	NULL,	NULL,	'admin12345@gmail.com',	'$2b$10$GuGMfBT5nEA0Fq4gszSyvuICiFUJ8fqEyNm7B65PhOwbGsuFqw6oe',	NULL);

-- 2023-05-10 12:44:56
