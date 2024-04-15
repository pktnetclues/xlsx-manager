-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 15, 2024 at 06:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductName` varchar(255) DEFAULT NULL,
  `ID` int(11) NOT NULL,
  `SKU` varchar(50) DEFAULT NULL,
  `VariantID` varchar(10) DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `DiscountPercentage` decimal(5,2) DEFAULT NULL,
  `Description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductName`, `ID`, `SKU`, `VariantID`, `Price`, `DiscountPercentage`, `Description`) VALUES
('Smartphone', 1, 'SKU001', 'V001', 499.00, 10.00, 'High-performance device'),
('Laptop', 2, 'SKU002', 'V002', 899.00, 15.00, 'Thin and lightweight'),
('Headphones', 3, 'SKU003', 'V003', 99.00, 5.00, 'Noise-canceling'),
('Smartwatch', 4, 'SKU004', 'V004', 299.00, 10.00, 'Fitness tracking'),
('Tablet', 5, 'SKU005', 'V005', 399.00, 20.00, 'Large display'),
('Camera', 6, 'SKU006', 'V006', 599.00, 10.00, '4K video recording'),
('Speaker', 7, 'SKU007', 'V001', 149.00, 5.00, 'Bluetooth connectivity'),
('Drone', 8, 'SKU008', 'V002', 799.00, 15.00, 'HD camera included'),
('Gaming Console', 9, 'SKU009', 'V003', 399.00, 10.00, '4K gaming capabilities'),
('Fitness Tracker', 10, 'SKU010', 'V004', 79.00, 5.00, 'Heart rate monitoring'),
('External HDD', 11, 'SKU011', 'V005', 129.00, 10.00, '1TB storage'),
('Wireless Router', 12, 'SKU012', 'V006', 89.00, 5.00, 'High-speed internet'),
('Bluetooth Earbuds', 13, 'SKU013', 'V001', 69.00, 15.00, 'Waterproof design'),
('Portable Charger', 14, 'SKU014', 'V002', 29.00, 10.00, 'Fast charging support'),
('Monitor', 15, 'SKU015', 'V003', 299.00, 10.00, 'Ultra-wide screen'),
('Keyboard', 16, 'SKU016', 'V004', 49.00, 5.00, 'Ergonomic design'),
('Mouse', 17, 'SKU017', 'V005', 19.00, 10.00, 'Wireless connectivity'),
('Graphics Card', 18, 'SKU018', 'V006', 699.00, 20.00, '8GB VRAM'),
('Smart Bulb', 19, 'SKU019', 'V001', 19.00, 5.00, 'RGB color options'),
('Printer', 20, 'SKU020', 'V002', 199.00, 15.00, 'Wireless printing');

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `VariantID` varchar(4) NOT NULL,
  `VariantName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`VariantID`, `VariantName`) VALUES
('V001', 'Black'),
('V002', 'Silver'),
('V003', 'Gold'),
('V004', 'Space Gray'),
('V005', 'Rose Gold'),
('V006', 'Midnight Blue');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`VariantID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
