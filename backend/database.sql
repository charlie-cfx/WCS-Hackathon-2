-- -----------------------------------------------------

-- Schema emmaus_phone

-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `emmaus_phone` DEFAULT CHARACTER SET utf8;

USE `emmaus_phone` ;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`user`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `mail` VARCHAR(255) NOT NULL,
        `hashed_password` VARCHAR(255) NOT NULL,
        `lastname` VARCHAR(100) NULL,
        `firstname` VARCHAR(100) NULL,
        `phone` VARCHAR(18) NULL,
        `is_admin` TINYINT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`brand`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`brand` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `brand_name` VARCHAR(100) NOT NULL,
        `weighting` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`color`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`color` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `color_name_en` VARCHAR(45) NOT NULL,
        `color_name_fr` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`model`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`model` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `model_name` VARCHAR(100) NOT NULL,
        `screen_size_inch` VARCHAR(45) NOT NULL,
        `screen_size_cm` VARCHAR(45) NOT NULL,
        `weighting` INT NOT NULL,
        `brand_id` INT NOT NULL,
        `color_id` INT NOT NULL,
        PRIMARY KEY (`id`, `brand_id`, `color_id`),
        INDEX `fk_model_brand1_idx` (`brand_id` ASC) VISIBLE,
        INDEX `fk_model_color1_idx` (`color_id` ASC) VISIBLE,
        CONSTRAINT `fk_model_brand1` FOREIGN KEY (`brand_id`) REFERENCES `emmaus_phone`.`brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_model_color1` FOREIGN KEY (`color_id`) REFERENCES `emmaus_phone`.`color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`OS_version`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`OS_version` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `version` VARCHAR(45) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`OS`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`OS` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `OS_name` VARCHAR(45) NOT NULL,
        `weighting` INT NOT NULL,
        `OS_version_id` INT NOT NULL,
        PRIMARY KEY (`id`, `OS_version_id`),
        INDEX `fk_OS_OS_version1_idx` (`OS_version_id` ASC) VISIBLE,
        CONSTRAINT `fk_OS_OS_version1` FOREIGN KEY (`OS_version_id`) REFERENCES `emmaus_phone`.`OS_version` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`accessory`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`accessory` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NOT NULL,
        `weighting` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`state`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`state` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `state` VARCHAR(45) NOT NULL,
        `weighting` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`phone`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`phone` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `brand_id` INT NOT NULL,
        `model_id` INT NOT NULL,
        `OS_id` INT NOT NULL,
        `ram` INT NOT NULL,
        `memory` INT NOT NULL,
        `network` VARCHAR(45) NOT NULL,
        `accessory_id` INT NOT NULL,
        `state_id` INT NOT NULL,
        PRIMARY KEY (
            `id`,
            `brand_id`,
            `model_id`,
            `OS_id`,
            `accessory_id`,
            `state_id`
        ),
        INDEX `fk_phone_brand_idx` (`brand_id` ASC) VISIBLE,
        INDEX `fk_phone_model1_idx` (`model_id` ASC) VISIBLE,
        INDEX `fk_phone_OS1_idx` (`OS_id` ASC) VISIBLE,
        INDEX `fk_phone_accessory1_idx` (`accessory_id` ASC) VISIBLE,
        INDEX `fk_phone_state1_idx` (`state_id` ASC) VISIBLE,
        CONSTRAINT `fk_phone_brand` FOREIGN KEY (`brand_id`) REFERENCES `emmaus_phone`.`brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_phone_model1` FOREIGN KEY (`model_id`) REFERENCES `emmaus_phone`.`model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_phone_OS1` FOREIGN KEY (`OS_id`) REFERENCES `emmaus_phone`.`OS` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_phone_accessory1` FOREIGN KEY (`accessory_id`) REFERENCES `emmaus_phone`.`accessory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `fk_phone_state1` FOREIGN KEY (`state_id`) REFERENCES `emmaus_phone`.`state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB;

-- -----------------------------------------------------

-- Table `emmaus_phone`.`FAQ`

-- -----------------------------------------------------

CREATE TABLE
    IF NOT EXISTS `emmaus_phone`.`FAQ` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `question` VARCHAR(255) NOT NULL,
        `answer` VARCHAR(255) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB;

INSERT INTO
    `user`(
        mail,
        hashed_password,
        lastname,
        firstname,
        phone,
        is_admin
    )
VALUES (
        'test1@mail.com',
        '$argon2id$v=19$m=65536,t=5,p=1$xSZenb4qmCK5FEdUeaPCvw$8EF2vMXW9EUA1XgmF9KXvhk58WCiEa7T+MJBFMldTpM',
        'testeur2',
        'Jean',
        '3288378372',
        1
    );