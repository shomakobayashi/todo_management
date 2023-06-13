-- USE
USE dev_training;

-- CREATE
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` varchar(15) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `self_introduction` text NOT NULL,
  `created_tms` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_tms` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  `delete_flag` tinyint(1) NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `todo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `detail` text NOT NULL,
  `remarks` text,
  `start_date` char(10) DEFAULT NULL,
  `end_date` char(10) DEFAULT NULL,
  `issue_person_id` int(11) NOT NULL,
  `person_in_charge_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL,
  `priority` varchar(20) NOT NULL,
  `created_tms` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_tms` timestamp NULL DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` int(11) NOT NULL ,
  `comment` text NOT NULL,
  `created_tms` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `enquiry` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `title` varchar(15) NOT NULL,
 `name` varchar(45) NOT NULL,
 `email` varchar(255) NOT NULL,
 `detail` text NOT NULL,
 `created_tms` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
