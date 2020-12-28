CREATE TABLE `speaker`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lesson_id` INT NOT NULL,
  `order_index` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `url` VARCHAR(45) NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
