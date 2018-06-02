DROP DATABASE IF EXISTS clothing_db;

CREATE DATABASE clothing_db;

CREATE TABLE `tops` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT 'Everyday',
  `color` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `link2` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1

