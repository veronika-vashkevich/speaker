CREATE TABLE `speaker`.`homeworks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `lesson_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `order_index` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
