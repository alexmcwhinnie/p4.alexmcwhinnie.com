-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 22, 2013 at 12:28 PM
-- Server version: 5.1.68-cll
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `alexmcwh_p4_alexmcwhinnie_com`
--

-- --------------------------------------------------------

--
-- Table structure for table `game_sessions`
--

CREATE TABLE IF NOT EXISTS `game_sessions` (
  `game_session_id` int(11) NOT NULL AUTO_INCREMENT,
  `room_number` int(11) NOT NULL,
  `inventory` varchar(255) NOT NULL,
  `door_locks` varchar(500) DEFAULT NULL,
  `visible_items` varchar(500) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`game_session_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=131 ;

--
-- Dumping data for table `game_sessions`
--

INSERT INTO `game_sessions` (`game_session_id`, `room_number`, `inventory`, `door_locks`, `visible_items`, `user_id`) VALUES
(105, 3, 'watch,potato,key', 'true', '', 1),
(106, 4, 'watch,potato,key', 'false', '', 1),
(107, 3, 'watch,potato, chair', 'true', '', 2),
(108, 4, 'watch,potato,key', 'false', '', 2),
(109, 2, 'key', 'false', '', 2),
(110, 3, 'watch,potato,stool', 'true', '', 2),
(111, 1, '', 'true', '', 2),
(112, 1, '', 'true', '', 2),
(113, 1, 'watch,potato', 'true', '', 2),
(114, 2, 'watch,potato', 'true', '', 2),
(115, 2, 'watch,potato', 'true', '', 2),
(116, 2, 'watch,potato', 'true', '', 2),
(117, 2, 'watch,potato', 'true', '', 2),
(118, 1, 'watch,potato', 'true', '', 2),
(119, 2, 'watch,potato', 'true', '', 2),
(120, 2, 'watch,potato', 'true', '', 2),
(121, 1, 'watch,potato', 'true', '', 2),
(122, 2, 'watch,potato', 'true', '', 2),
(123, 2, 'watch,potato', 'true', '', 2),
(124, 1, 'watch,potato', 'true', '', 2),
(125, 1, 'watch,potato', 'true', '', 2),
(126, 1, 'watch,potato', 'true', '', 2),
(127, 1, 'watch,potato', 'true', '', 2),
(128, 1, 'watch,potato', 'true', '', 2),
(129, 5, 'watch,potato,empty glass,keys', 'false,false,false,false!false,true,true,false!false,false,false,false!false,false,true,false!false,false,false,false!false,false,false,false!false,false,false,false!', 'doormat,firewood!!poker,bell,book,candle!lighter,gravy boat,centerpiece!kettle,lantern!towel,soap,hairbrush!rug,curtains!', 1),
(130, 2, 'watch,potato,keys', 'false,false,false,false!false,true,true,false!false,false,false,false!false,false,true,false!false,false,false,false!false,false,false,false!false,false,false,false!', 'doormat,firewood!empty glass!poker,bell,book,candle!lighter,gravy boat,centerpiece!kettle,lantern,potato!towel,soap,hairbrush!rug,curtains!', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary',
  `created` int(11) NOT NULL,
  `modified` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `last_login` int(11) NOT NULL,
  `timezone` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `user_id_2` (`user_id`),
  UNIQUE KEY `user_id_3` (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `created`, `modified`, `token`, `password`, `last_login`, `timezone`, `username`, `email`) VALUES
(1, 1387301037, 1387301037, '133c923e3bb2b178290cbfd2ac4ae35a5951564a', 'e39dad0519ae16aa3cd7bb5428180a95b88169bd', 0, '', 'Larex', 'alexmcwhinnie@gmail.com'),
(2, 1387317865, 1387317865, '9c8a7e120b74fc501ea531e6dfcef486357d28bf', '01a5a10946753ebe661a0cf929ccd0c3ea1be9c1', 0, '', 'darionlar', 'dar@gmail.com'),
(3, 1387584976, 1387584976, '92b54545526188c5e621eb477078a70ccf44bdee', '73750f15bb0b8040f5d602f369c8670bf32bcf2a', 0, '', '', ''),
(4, 1387689244, 1387689244, 'd4094c88dfe5bd8ad59b06e296deecfdb4315488', '80a681c91c5a4ecd7b725494d0c639b49452414c', 0, '', 'nicko', 'nickgrodzicki@yahoo.com.au');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
