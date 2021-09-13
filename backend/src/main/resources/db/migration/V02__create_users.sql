CREATE TABLE `speakmast`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `enabled` VARCHAR(45) NULL,
  `authority` VARCHAR(45) NULL,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  PRIMARY KEY (`id`));


INSERT INTO `speakmast`.`users` (`name`, `email`, `password`) VALUES ('test', 'test', 'test');
