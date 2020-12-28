CREATE TABLE `speaker`.`progress` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `task_id` INT NULL,
  `is_task_done` TINYINT NULL,
  `homework_id` VARCHAR(45) NOT NULL,
  `is_homework_done` TINYINT NULL,
  `class_id` INT NOT NULL,
  PRIMARY KEY (`id`));
