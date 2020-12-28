CREATE TABLE `speaker`.`classes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `is_paid` TINYINT NOT NULL,
  `student_id` INT NOT NULL,
  `lesson_id` INT NOT NULL,
  `is_attended` TINYINT NULL,
  `teacher_id` INT NOT NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
