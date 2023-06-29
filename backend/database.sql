-- -----------------------------------------------------

-- Schema emmaus_phone

DROP DATABASE IF EXISTS `emmaus_phone`;

CREATE DATABASE `emmaus_phone`;

USE `emmaus_phone`;

-- -----------------------------------------------------

-- CREATE SCHEMA IF NOT EXISTS `emmaus_phone` DEFAULT CHARACTER SET utf8;

-- USE `emmaus_phone` ;

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
        `base_price` INT NOT NULL,
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
        '$argon2id$v=19$m=65536,t=5,p=1$lA0CshE6soYhU4RLw+ewUA$jnT+zkdbVyizxpJfmf0l+iXhysMnkmzyxD1hNRUp2Fc',
        'testeur2',
        'Jean',
        '3288378372',
        1
    );

INSERT INTO
    `accessory`(name, weighting)
VALUES ('Aucun', 0), ('Chargeur', 0), ('Ecouteur', 0), ('Verre trempé', 0), ('Chargeur + Ecouteur', 0), ('Chargeur + Verre trempé', 0), ('Ecouteur + Verre trempé', 0), (
        'Chargeur + Ecouteur + Verre trempé',
        0
    );

INSERT INTO `brand`
VALUES (1, 'Apple'), (2, 'Samsung'), (3, 'Huawei'), (4, 'Xiaomi'), (5, 'OnePlus'), (6, 'Google'), (7, 'Sony'), (8, 'LG'), (9, 'Motorola'), (10, 'Nokia'), (11, 'Oppo'), (12, 'Vivo'), (13, 'Realme'), (14, 'HTC'), (15, 'Asus'), (16, 'Blackberry'), (17, 'Alcatel'), (18, 'ZTE'), (19, 'Meizu');

INSERT INTO `color`
VALUES (1, 'black', 'noir'), (2, 'white', 'blanc'), (3, 'silver', 'argent'), (4, 'gray', 'gris'), (5, 'gold', 'or'), (6, 'rose', 'rose'), (7, 'blue', 'bleu'), (8, 'red', 'rouge'), (9, 'green', 'vert'), (10, 'purple', 'violet'), (11, 'yellow', 'jaune'), (12, 'blue sky', 'bleu ciel'), (13, 'bronze', 'bronze'), (14, 'brown', 'marron');

INSERT INTO `model`
VALUES (
        1,
        'Galaxy S23',
        '5.8',
        '14.5',
        2,
        2
    ), (
        2,
        'Galaxy S10e',
        '5.8',
        '14.5',
        2,
        5
    ), (3, 'Reno6', '6.4', '16.2', 11, 8), (
        5,
        'iPhone12',
        '6.1',
        '15.4',
        1,
        3
    ), (
        6,
        'iPhone 7',
        '6.1',
        '15.4',
        1,
        7
    ), (
        7,
        'iPhone13',
        '6.1',
        '15.4',
        1,
        8
    ), (
        8,
        'Galaxy S21',
        '6.2',
        '15.7',
        2,
        3
    ), (
        9,
        'Pixel 6',
        '6.4',
        '16.2',
        6,
        14
    ), (10, '9 Pro', '6.7', '17.1', 5, 13), (
        11,
        'Mi 11',
        '6.81',
        '17.2',
        4,
        11
    ), (
        12,
        'P 40Pro',
        '6.58',
        '16.7',
        3,
        9
    ), (
        13,
        'Xperia III',
        '6.5',
        '16.5',
        7,
        5
    ), (14, 'Velvet', '6.8', '17.2', 8, 4), (
        15,
        'Find X3 Pro',
        '6.7',
        '17.1',
        11,
        7
    );

INSERT INTO `os_version`
VALUES (1, '12'), (2, '13'), (3, '1.0'), (4, '2.0');

INSERT INTO `os`
VALUES (1, 'Android', 1), (2, 'iOS', 2), (3, 'Windows10 mobile', 3), (4, 'HarmonyOS', 4);

INSERT INTO `state`
VALUES (1, 'DEEE', 0), (2, 'Réparable', 0), (3, 'Bloqué', 0), (4, 'Reconditionnable', 0), (5, 'Reconditionné', 0);

INSERT INTO `phone`
VALUES (1, 2, 1, 1, 8, 0, '4G', 2, 5, 670), (2, 2, 2, 1, 8, 16, '4G', 5, 4, 170), (3, 1, 5, 2, 16, 32, '5G', 4, 5, 580), (4, 4, 11, 1, 16, 48, '5G', 1, 3, 500), (5, 6, 9, 1, 8, 4, '3G', 3, 3, 450);