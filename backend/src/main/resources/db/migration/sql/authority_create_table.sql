CREATE TABLE `speaker`.`user_authority` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `user_account` INT NULL,
  `authority` INT NULL,
  FOREIGN KEY(`user_account`) REFERENCES user_account(ID),
  FOREIGN KEY(`authority`) REFERENCES authority(ID),
  PRIMARY KEY (`ID`));
