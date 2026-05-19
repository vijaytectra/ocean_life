-- Management team (Employee) table for production MySQL
-- Run: mysql -u USER -p DATABASE < scripts/mysql-employee-setup.sql

CREATE TABLE IF NOT EXISTS `Employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `image` VARCHAR(512) NULL,
  `priority` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Employee_priority_idx` (`priority`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default management team (skip if you already have rows)
INSERT INTO `Employee` (`name`, `role`, `image`, `priority`) VALUES
('Mr. S. K. Peter ', 'Managing Director & CEO', '/peter k.jpeg', 80),
('Mrs. Anitha Peter', 'Director I Operations', '/about/anitha-peter.png', 70),
('Mr. Durai Raj L', 'Chief Financial Officer', '/about/durai.png', 60),
('Mr. Arul Arumugam', 'Senior Director', '/about/Arul1.jpg', 50),
('Mr. Sarat Kadambi', 'Chief Operating Officer', '/about/Sarat.jpg', 40),
('Mr. Vinod Vishwanath', 'Senior Director I Marine', '/about/vinod.webp', 30),
('Mr. Balu K', 'Director - Civil', '/about/balu.jpg', 20),
('Mr. Prabhu P', 'Head -  EHS', '/about/prabhu.jpg', 10);
