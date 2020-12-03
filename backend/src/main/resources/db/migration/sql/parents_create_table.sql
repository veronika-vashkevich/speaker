CREATE TABLE `speaker`.`parents` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `middleName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `pupil` INT NULL,
  PRIMARY KEY (`id`));

