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
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`user` (
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
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`brand` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brand_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`color`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `color_name_en` VARCHAR(45) NOT NULL,
  `color_name_fr` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`model`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `model_name` VARCHAR(100) NOT NULL,
  `screen_size_inch` VARCHAR(45) NOT NULL,
  `screen_size_cm` VARCHAR(45) NOT NULL,
  `brand_model_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_model_brand1` FOREIGN KEY (`brand_model_id`) REFERENCES `emmaus_phone`.`brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_model_color1` FOREIGN KEY (`color_id`) REFERENCES `emmaus_phone`.`color` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`OS_version`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`OS_version` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `version` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`OS`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`OS` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `OS_name` VARCHAR(45) NOT NULL,
  `OS_version_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_OS_OS_version1` FOREIGN KEY (`OS_version_id`) REFERENCES `emmaus_phone`.`OS_version` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`accessory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`accessory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `weighting` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`state`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`state` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(45) NOT NULL,
  `weighting` INT NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`phone`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`phone` (
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
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_phone_brand` FOREIGN KEY (`brand_id`) REFERENCES `emmaus_phone`.`brand` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_model1` FOREIGN KEY (`model_id`) REFERENCES `emmaus_phone`.`model` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_OS1` FOREIGN KEY (`OS_id`) REFERENCES `emmaus_phone`.`OS` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_accessory1` FOREIGN KEY (`accessory_id`) REFERENCES `emmaus_phone`.`accessory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_phone_state1` FOREIGN KEY (`state_id`) REFERENCES `emmaus_phone`.`state` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `emmaus_phone`.`FAQ`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `emmaus_phone`.`FAQ` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

INSERT INTO
  user(
    mail,
    hashed_password,
    lastname,
    firstname,
    phone,
    is_admin
  )
VALUES
  (
    'test1@mail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$lA0CshE6soYhU4RLw+ewUA$jnT+zkdbVyizxpJfmf0l+iXhysMnkmzyxD1hNRUp2Fc',
    'admin1',
    'Matthieu',
    '3288378372',
    1
  ),
  (
    'test2@mail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$wjdWSneXyxonKcEETwhMhA$JUx8zYvhHFKX4rIVGWhveM71uzEQ6XE5NK/GpKZJQRc',
    'user1',
    'Charlie',
    '3288378372',
    0
  ),
  (
    'test3@mail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$xKhEzkcmRjH0NRcK9ryxTw$YipahP4fvXJrlgmLELFG52kQU5H/B/db6l0GEJY4d8c',
    'user2',
    'Cyrille',
    '3288378372',
    0
  ),
  (
    'test4@mail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$u4uJNhimrSnTEDK4QTJ5Rg$XvMBccZ2IL35URYzqOG9WXDqf3vR12PkTADwxFWp+mo',
    'user3',
    'Junior',
    '3288378372',
    0
  ),
  (
    'test5@mail.com',
    '$argon2id$v=19$m=65536,t=5,p=1$GXlL4dZR4x1LcSJfwZrtXA$40fJ+jJk4e24pv9k5dHMHGiqNagR069wLlA+Mj58Hm0',
    'user4',
    'Alain',
    '3288378372',
    0
  );

INSERT INTO
  `accessory`(name, weighting)
VALUES
  ('Aucun', 40),
  ('Chargeur', 25),
  ('Écouteurs', 25),
  ('Verre trempé', 30),
  ('Chargeur + Écouteurs', 40),
  ('Chargeur + Verre trempé', 35),
  (
    'Écouteurs + Verre trempé',
    35
  ),
  (
    'Chargeur + Écouteurs + Verre trempé',
    0
  );

INSERT INTO
  `brand`
VALUES
  (1, 'Apple'),
  (2, 'Samsung'),
  (3, 'Huawei'),
  (4, 'Xiaomi'),
  (5, 'OnePlus'),
  (6, 'Google'),
  (7, 'Sony'),
  (8, 'LG'),
  (9, 'Motorola'),
  (10, 'Nokia'),
  (11, 'Oppo'),
  (12, 'Vivo'),
  (13, 'Realme'),
  (14, 'HTC'),
  (15, 'Asus'),
  (16, 'Blackberry'),
  (17, 'Alcatel'),
  (18, 'ZTE'),
  (19, 'Meizu');

INSERT INTO
  `color`
VALUES
  (1, 'black', 'noir'),
  (2, 'white', 'blanc'),
  (3, 'silver', 'argent'),
  (4, 'gray', 'gris'),
  (5, 'gold', 'or'),
  (6, 'rose', 'rose'),
  (7, 'blue', 'bleu'),
  (8, 'red', 'rouge'),
  (9, 'green', 'vert'),
  (10, 'purple', 'violet'),
  (11, 'yellow', 'jaune'),
  (12, 'blue sky', 'bleu ciel'),
  (13, 'bronze', 'bronze'),
  (14, 'brown', 'marron');

INSERT INTO
  `model`
VALUES
  (
    1,
    'Galaxy S23',
    '5.8',
    '14.5',
    2,
    2
  ),
  (
    2,
    'Galaxy S10e',
    '5.8',
    '14.5',
    2,
    11
  ),
  (3, 'Reno6', '6.4', '16.2', 11, 8),
  (
    5,
    'iPhone 12',
    '6.1',
    '15.4',
    1,
    1
  ),
  (
    6,
    'iPhone 7',
    '6.1',
    '15.4',
    1,
    7
  ),
  (
    7,
    'iPhone 13',
    '6.1',
    '15.4',
    1,
    8
  ),
  (
    8,
    'Galaxy S21',
    '6.2',
    '15.7',
    2,
    3
  ),
  (9, 'Pixel 6', '6.4', '16.2', 6, 1),
  (10, '9 Pro', '6.7', '17.1', 5, 13),
  (
    11,
    'Mi 11',
    '6.81',
    '17.2',
    4,
    11
  ),
  (
    12,
    'P 40Pro',
    '6.58',
    '16.7',
    3,
    9
  ),
  (
    13,
    'Xperia III',
    '6.5',
    '16.5',
    7,
    5
  ),
  (14, 'Velvet', '6.8', '17.2', 8, 4),
  (
    15,
    'Find X3 Pro',
    '6.7',
    '17.1',
    11,
    7
  );

INSERT INTO
  `os_version`
VALUES
  (1, '12'),
  (2, '13'),
  (3, '1.0'),
  (4, '2.0');

INSERT INTO
  `os`
VALUES
  (1, 'Android', 1),
  (2, 'iOS', 2),
  (3, 'Windows10 mobile', 3),
  (4, 'HarmonyOS', 4);

INSERT INTO
  `state`
VALUES
  (1, 'DEEE', 100),
  (2, 'Réparable', 50),
  (3, 'Bloqué', 10),
  (4, 'Reconditionnable', 5),
  (5, 'Reconditionné', 0);

INSERT INTO
  `phone`
VALUES
  (1, 2, 1, 1, 8, 128, '5G', 2, 5, 620),
  (2, 2, 2, 1, 8, 128, '4G', 5, 4, 170),
  (3, 1, 5, 2, 16, 128, '5G', 4, 5, 700),
  (4, 4, 11, 1, 16, 256, '5G', 1, 3, 500),
  (5, 6, 9, 1, 8, 128, '5G', 3, 3, 420);

INSERT INTO
  `faq` VALUE (
    1,
    "Qu'est-ce qu'un smartphone reconditionné ?",
    "Un smartphone reconditionné est un appareil qui a été préalablement utilisé, puis remis à neuf pour être vendu à nouveau. Il a subi des tests, des réparations éventuelles et a été remis en état de fonctionnement. Les smartphones reconditionnés offrent une alternative moins coûteuse par rapport aux nouveaux modèles, tout en garantissant une qualité satisfaisante."
  ),
  (
    2,
    "Quelles sont les différences entre un smartphone reconditionné et un smartphone neuf ?",
    "La principale différence réside dans le fait qu'un smartphone reconditionné a déjà été utilisé, tandis qu'un smartphone neuf est tout juste sorti de l'emballage et n'a jamais été utilisé. Les smartphones reconditionnés peuvent présenter de légères marques d'usure, mais ils sont généralement testés et réparés pour assurer leur bon fonctionnement, tout comme les smartphones neufs."
  ),
  (
    3,
    "Comment savoir si un smartphone est reconditionnable ?",
    "La reconditionnabilité d'un smartphone dépend de son état initial et de la disponibilité des pièces de rechange nécessaires. Un professionnel peut évaluer l'appareil et déterminer s'il est possible de le reconditionner en effectuant les réparations nécessaires. Cependant, il est important de noter que tous les smartphones ne sont pas reconditionnables, surtout s'ils sont très anciens ou s'ils présentent des dommages irréparables."
  ),
  (
    4,
    "Qu'est-ce qu'un smartphone bloqué ?",
    "Un smartphone bloqué fait référence à un appareil qui est verrouillé sur un seul réseau ou opérateur spécifique. Cela signifie que vous ne pouvez utiliser la carte SIM que de cet opérateur particulier. Pour utiliser une autre carte SIM d'un opérateur différent, vous devrez soit déverrouiller le smartphone, soit utiliser une méthode de déblocage appropriée."
  ),
  (
    5,
    "Puis-je réparer moi-même mon smartphone ?",
    "La réparation d'un smartphone peut varier en fonction de la complexité du problème. Certaines réparations mineures, comme le remplacement d'une batterie ou d'un écran, peuvent être effectuées par des utilisateurs expérimentés à l'aide de tutoriels en ligne et d'outils appropriés. Cependant, pour des réparations plus complexes ou pour éviter d'endommager davantage l'appareil, il est recommandé de faire appel à un professionnel de la réparation de smartphones."
  );