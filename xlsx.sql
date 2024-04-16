-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 16, 2024 at 06:34 AM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xlsx`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `CategoryID` varchar(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `CategoryName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryID`, `CategoryName`) VALUES
('V001', 'Black'),
('V002', 'Silver'),
('V003', 'Gold'),
('V004', 'Space Gray'),
('V005', 'Rose Gold'),
('V006', 'Midnight Blue');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `ProductName` varchar(255) DEFAULT NULL,
  `ID` int NOT NULL,
  `SKU` varchar(50) DEFAULT NULL,
  `VariantID` varchar(10) DEFAULT NULL,
  `CategoryID` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `DiscountPercentage` decimal(5,2) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductName`, `ID`, `SKU`, `VariantID`, `CategoryID`, `Price`, `DiscountPercentage`, `Description`) VALUES
('Smart Bulb', 19, 'SKU019', 'V001', 'V001', 19.00, 5.00, 'RGB color options'),
('Monitor', 15, 'SKU015', 'V003', 'V003', 299.00, 10.00, 'Ultra-wide screen'),
('Mouse', 17, 'SKU017', 'V005', 'V005', 19.00, 10.00, 'Wireless connectivity'),
('Graphics Card', 18, 'SKU018', 'V006', 'V006', 699.00, 20.00, '8GB VRAM'),
('Printer', 20, 'SKU020', 'V002', 'V002', 199.00, 15.00, 'Wireless printing'),
('Keyboard', 16, 'SKU016', 'V004', 'V004', 49.00, 5.00, 'Ergonomic design');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
