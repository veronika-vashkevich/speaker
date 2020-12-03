CREATE TABLE `speaker`.`pupils` (
  `id` INT NOT NULL,
  `firstName` VARCHAR(45) NOT NULL,
  `middleName` VARCHAR(45) NULL,
  `lastName` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `email` VARCHAR(45) NOT NULL,
  `parent` INT NOT NULL,
  `course` INT NULL,
  `teacher` INT NULL,
  `rank` VARCHAR(45) NULL,
  `notes` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `parent_idx` (`parent` ASC) VISIBLE,
  INDEX `teacher_idx` (`teacher` ASC) VISIBLE,
  INDEX `course_idx` (`course` ASC) VISIBLE,
  CONSTRAINT `parent`
    FOREIGN KEY (`parent`)
    REFERENCES `speaker`.`parents` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `course`
    FOREIGN KEY (`course`)
    REFERENCES `speaker`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `teacher`
    FOREIGN KEY (`teacher`)
    REFERENCES `speaker`.`teachers` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
