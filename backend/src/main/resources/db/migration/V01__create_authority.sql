CREATE TABLE `speakmast`.`authorities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `authority` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));


INSERT INTO `speakmast`.`authorities` (`authority`) VALUES ('ADMIN');
INSERT INTO `speakmast`.`authorities` (`authority`) VALUES ('TEACHER');
INSERT INTO `speakmast`.`authorities` (`authority`) VALUES ('STUDENT');
