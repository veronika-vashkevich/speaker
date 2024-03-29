CREATE TABLE `speaker`.`courses` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `created_date` TIMESTAMP NULL,
  `modified_date` TIMESTAMP NULL,
  `teacher_id` INT NOT NULL,
  `number_ofLessons` VARCHAR(45) NULL,
  `lessonsPerWeek` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `teacher_idx` (`teacher` ASC) VISIBLE,
  CONSTRAINT `teacher`
    FOREIGN KEY (`teacher`)
    REFERENCES `speaker`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
