CREATE TABLE `speaker`.`enrollments` (
  `id` INT NOT NULL,
  `course` INT NULL,
  `pupil` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `course_idx` (`course` ASC) VISIBLE,
  INDEX `pupil_idx` (`pupil` ASC) VISIBLE,
  CONSTRAINT `courseId`
    FOREIGN KEY (`course`)
    REFERENCES `speaker`.`courses` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pupilId`
    FOREIGN KEY (`pupil`)
    REFERENCES `speaker`.`pupils` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
