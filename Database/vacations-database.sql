-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2023 at 03:36 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations-database`
--
CREATE DATABASE IF NOT EXISTS `vacations-database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations-database`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `contactId` int(11) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`contactId`, `fullName`, `email`, `phone`, `message`) VALUES
(4, 'Or Poplinger', 'orpoplinger14@gmail.com', '0543557687', 'Hi please contact me!!');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(13, 14),
(13, 7),
(13, 50),
(13, 5),
(13, 62),
(13, 2),
(13, 10),
(13, 8),
(13, 1),
(24, 1),
(24, 49),
(24, 47),
(24, 14);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` int(11) NOT NULL,
  `vactionId` int(11) NOT NULL,
  `fullName` varchar(60) NOT NULL,
  `adults` int(11) NOT NULL,
  `kids` int(11) NOT NULL,
  `roomsNumber` int(11) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `vactionId`, `fullName`, `adults`, `kids`, `roomsNumber`, `phoneNumber`) VALUES
(4, 1, 'David Levi', 2, 2, 2, '0504464602'),
(22, 14, 'Bart Ofir Cohen', 3, 2, 2, '0546460999');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(40) NOT NULL,
  `lastName` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `roleId`) VALUES
(12, 'or', 'poplinger', 'orpoplinger777@gmail.com', '3053fc25962c741fa130e230d6e43090666fba1821b5590797b262a81f83093e9e0eac806f5c4f8f5d6e06b7eb8353408540c39203feb3096ea29db0b2adec99', 1),
(13, 'Bart ', 'Simps', 'bart@gmail.com', '3053fc25962c741fa130e230d6e43090666fba1821b5590797b262a81f83093e9e0eac806f5c4f8f5d6e06b7eb8353408540c39203feb3096ea29db0b2adec99', 2),
(24, 'Meir ', 'Natan', 'Meir47@gmail.com', 'ed962e57a58c9ba428bf7aadfb5c2c9817894f639795497a27305e9f0b2fad84c7777c42e9f2a498b78e9b07e3e5458fd0e0e8399d794b59e415ae3ab6a795c1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(30) NOT NULL,
  `vacationDescription` varchar(1000) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(1, 'Rome', 'You can create your dream vacation\r\nAnd the most suitable place for this is Rome\r\nYou can enjoy fine restaurants and amazing views\r\nthere are ancient wonders at every corner – The Colosseum, Pantheon, Spanish Steps, Trevi Fountain\r\nand more...', '2023-07-09 10:00:00', '2023-07-16 15:00:00', 2329.00, 'rome.jpg'),
(2, 'London', 'It\'s time to take the family on an amazing vacation in London, you and your family can enjoy a spectacular and satisfying destination.\r\nYou can enjoy places like: Big Ben, the Tower of\r\nLondon and Trafalgar Square, The city is also a thriving culture known for its divers and this will surely add to your experience.', '2023-06-10 09:30:00', '2023-06-19 17:00:00', 1429.00, 'london.jpg'),
(4, 'Hawaii', 'Treat yourself to a luxurious getaway to Hawaii, where you can enjoy spectacular views of the Pacific Ocean.In addition to enjoying recreational pools and a bar overlooking Queens. Popular attractions in Hawaii are Pearl Harbor, Honolulu Zoo and Waikiki Aquarium. Enjoy a variety of quality restaurants that will never leave you hungry.', '2023-08-02 12:30:00', '2023-08-09 16:00:00', 880.00, 'hawaii.jpg'),
(5, 'Toronto', 'Hyatt Place Toronto/Mississauga Center is located in Gateway, a neighborhood in Mississauga, and is in a shopping district and near the airport. Looking to enjoy an event or a game? See what\'s going on at Paramount Fine Foods Center or Woodbine Racetrack. Spend some time exploring the area\'s activities, including winery tours and outlet shopping.', '2023-07-20 09:00:00', '2023-07-25 15:00:00', 1195.00, 'toronto.jpg'),
(6, 'Montreal', 'Montreal is located in Downtown Montreal, a and is in the entertainment district and near a metro station. Christ Church Cathedral and Notre Dame Basilica are notable landmarks and Montreal Botanical Garden is a popular area attraction. Looking to enjoy an event or a game? See what\'s going on at Bell Centre or Olympic Stadium. ', '2023-08-04 10:30:00', '2023-08-10 17:00:00', 2700.00, 'montreal.jpg'),
(7, 'San Diego', 'This elegant destination welcomes guests with panoramic views of the Pacific Ocean, Mission Bay and downtown San Diego. The hotel\'s chic, stylish ambience is inspired by the beauty of the bay and the vibrant California Coast.', '2023-09-01 08:00:00', '2023-09-08 13:00:00', 1950.00, 'san-diego.jpg'),
(8, 'Orlando', 'This destinaion offers exceptional service and superior amenities and is a quick drive to all Walt Disney World® Resort Theme Parks and Disney Springs®. The resort spans 63 acres and includes shopping, restaurants, the Relâche Spa & Salon, and the Cypress Springs Family Fun Water Park. ', '2023-07-25 09:00:00', '2023-07-30 17:00:00', 1565.00, 'orlando.jpg'),
(9, 'Costa Rica', 'Whether you seek an adventure, a family-friendly retreat, or a romantic getaway for two, you\'ll find it in Costa Rica.\r\nIncredible wildlife, thick jungles, laid-back beaches, and magnificent volcanoes are just a few things that set Costa Rica apart.', '2023-08-14 11:00:00', '2023-08-20 16:00:00', 3100.00, 'costa-rica.jpg'),
(10, 'Las Vegas', 'In Las Vegas you will enjoy views you have never seen before and a magnificent and vibrant city\r\nEat like kings. worded bet. Get world class entertainment. Hand-painted murals to award-winning restaurants and lounges.', '2023-07-30 10:00:00', '2023-08-05 18:00:00', 2900.00, 'las-vegas.jpg'),
(11, 'Chicago', 'Chicago is known for its museums, including the Art Institute of Chicago with its Impressionist and Post-Impressionist works and the Field Museum, History meets the modern age in Chicago, with its skyscrapers and bold architecture. Here you can enjoy iconic sights and an award-winning culinary scene.', '2023-09-11 00:00:00', '2023-09-19 16:00:00', 3500.00, 'chicago.jpg'),
(12, 'Washington', 'Home of the U.S. Federal Government, with all its monuments, memorials and museums, a vacation to Washington D.C. is a learning opportunity like no other. take advantage of member savings on your flight, hotel and rental car.', '2023-10-03 09:00:00', '2023-10-09 15:00:00', 1350.00, 'washington.jpg'),
(13, 'Atlanta', 'Atlanta is filled with history and played important parts in both the American Civil War and the 1960s Civil Rights Movement. Atlanta offers so many historic attractions and activities that there\'s guaranteed to be something for everyone', '2023-09-28 08:00:00', '2023-10-04 18:00:00', 2045.00, 'atlanta.jpg'),
(14, 'Arizona', 'Discover the cultural heritage of the Pima tribes at  Horse Pass. Browse brand-name stores at the premium outlets or try your luck at Wild Horse Pass Casino. Rejuvenate at Aji Spa with refined spa treatments such as body wraps, facials and massages. ', '2023-07-23 11:30:00', '2023-07-29 15:30:00', 2659.00, 'arizona.jpg'),
(15, 'Naples', 'Nestled amid rolling greens, tropical palm trees, and a shimmering lake stands The Ritz Carlton, Naples, Tiburón, an exceptional retreat just three miles away from the Gulf of Mexico. Here, guests can surrender to the serene atmosphere of a stately country club while enjoying luxury amenities.', '2023-11-04 09:00:00', '2023-11-10 16:00:00', 1800.00, 'naples.jpg'),
(47, 'Da Balaia', 'Perched up on the red cliffs of the Algarve, this all-inclusive family resort in Portugal is perfect for golf fans. With a balance of grown-up spaces and places where children can let loose, Club Med Da Balaia has something for all ages. While you’re teeing off at the neighbouring golf courses or relaxing ', '2023-10-08 00:00:00', '2023-10-17 00:00:00', 6250.00, 'e15aa356-a4f2-490e-9ed0-7ef2be14982c.jpg'),
(48, 'Palmiye', 'South of Antalya under the Taurus mountains, Club Med Palmiye lies across a pearl grey beach on the edge of the Mediterranean Sea. Tucked amongst fragrant gardens, this all-inclusive family resort is a true Turkish delight', '2023-09-30 00:00:00', '2023-10-06 00:00:00', 3650.00, 'f220451a-d68c-4cac-a8c5-cfda6a8115e8.jpg'),
(49, 'Gregolimano', 'Set on the island of Evia along a secluded beach, Club Med Gregolimano is a paradise for watersport lovers and active families. This spacious all-inclusive family resort in Greece has so much to explore, from wakeboarding and diving in the Aegean Sea to beach pilates and our flying trapeze. Kids can find adventure among the trees with our all-day kid\'s clubs and family fun.', '2023-09-25 00:00:00', '2023-10-02 00:00:00', 2989.00, '4c1cf734-863a-4da1-8b96-58fecb219e63.jpg'),
(50, 'Valmorel', 'Experience the heart of Savoie\r\nHidden behind a curtain of spruce trees at 1,460 metres, Club Med Valmorel is inspired by Beaufortain mansions, with colourful facades and stone roofs. Watch the kids sled in the snow garden, race down the Grand Domaine slopes or snowshoe across the Aigueblanche valley. In the evening, play with the kids in the indoor pool then delight your taste buds with a variety of gourmet savoyard dishes.For a truly luxurious escape, book one of the elegant suites in our 5Ψ Exclusive Collection space, Le Lodge, complete with a dedicated ski room, room service breakfasts and champagne from 6pm.', '2023-08-31 00:00:00', '2023-09-05 00:00:00', 2204.00, 'f251a51b-3735-43c7-8a27-056c05cc6efd.jpg'),
(52, 'Santorini', '\r\nSuch a pleasant stay- It exceeded our expectations! Beautiful villa with amazing views. Our room was so clean and the breakfast food was delicious. Loved that there were marked trails to walk from one city to the next. We will be back again one day.', '2023-07-27 00:00:00', '2023-08-04 00:00:00', 3144.00, 'b3eae68f-d97c-47a4-a428-6b2d43a7d021.jpg'),
(53, 'Milan - Bianca Relais', 'Beautiful area with a great view! The room had great amenities! We really enjoyed our stay!\r\n\r\n\r\n\r\n\r\n', '2023-08-18 00:00:00', '2023-08-24 00:00:00', 4513.00, '491409bd-6204-4986-bd4c-d0bf2ae1b52b.jpg'),
(62, 'France - Arcs Extrême', 'For exhilarating winter sports and amazing après ski, Club Med Arcs Extrême is the place to be. This adults-only resort sits at 2,000 metres in the spectacular Savoie region, with ski-in ski-out access to Les Arcs. With 200 km of runs and snow sports galore, from skiing and snowboarding to skating, this all-inclusive ski resort lives up to its reputation for intensely sporty ski breaks. Off the slopes, the party’s only just begun', '2023-06-29 00:00:00', '2023-07-05 00:00:00', 2700.00, '27e3bd0a-20d5-49c7-929a-4a3dc4458859.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contactId`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vactionId` (`vacationId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderId`),
  ADD KEY `vactionId` (`vactionId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`vactionId`) REFERENCES `vacations` (`vacationId`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
