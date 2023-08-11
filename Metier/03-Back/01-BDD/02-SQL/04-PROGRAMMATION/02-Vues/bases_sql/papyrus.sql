-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           10.2.14-MariaDB - mariadb.org binary distribution
-- SE du serveur:                Win64
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Export de la structure de la base pour papyrus
CREATE DATABASE IF NOT EXISTS `papyrus` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `papyrus`;

-- Export de la structure de la table papyrus. fournis
CREATE TABLE IF NOT EXISTS `fournis` (
  `numfou` varchar(25) NOT NULL,
  `nomfou` varchar(25) DEFAULT NULL,
  `ruefou` varchar(30) DEFAULT NULL,
  `posfou` char(5) DEFAULT NULL,
  `vilfou` varchar(30) DEFAULT NULL,
  `confou` varchar(15) DEFAULT NULL,
  `satisf` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`numfou`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Export de données de la table papyrus.fournis : ~6 rows (environ)
/*!40000 ALTER TABLE `fournis` DISABLE KEYS */;
INSERT INTO `fournis` (`numfou`, `nomfou`, `ruefou`, `posfou`, `vilfou`, `confou`, `satisf`) VALUES
	('120', 'GROBRIGAN', '20 rue du papier', '92200', ' Papercity', 'Georges', 8),
	('540', 'ECLIPSE', '53, rue laisse flotter les rub', '78250', ' Bugbugville', 'Nestor', 7),
	('8700', 'MEDICIS', '120 rue des plantes ', '75014', 'Paris', 'Lison', 0),
	('9120', 'DISCOBOL', '11 rue des sports', '85100', ' La Roche sur Yon', 'Hercule', 8),
	('9150', 'DEPANPAP', '29 avenue des locomotives ', '59987', 'Coroncountry', 'Pollux', 5),
	('9180', 'HURRYTAPE', '68, boulevard des octets ', '4044', ' Dumpville', 'Track', 0);
/*!40000 ALTER TABLE `fournis` ENABLE KEYS */;

-- Export de la structure de la table papyrus. produit
CREATE TABLE IF NOT EXISTS `produit` (
  `codart` char(4) NOT NULL,
  `libart` varchar(30) DEFAULT NULL,
  `unimes` char(5) DEFAULT NULL,
  `stkale` int(10) DEFAULT NULL,
  `stkphy` int(10) DEFAULT NULL,
  `qteann` int(10) DEFAULT NULL,
  PRIMARY KEY (`codart`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Export de données de la table papyrus.produit : ~15 rows (environ)
/*!40000 ALTER TABLE `produit` DISABLE KEYS */;
INSERT INTO `produit` (`codart`, `libart`, `unimes`, `stkale`, `stkphy`, `qteann`) VALUES
	('B001', 'Bande magnétique 1200', 'unite', 20, 87, 240),
	('B002', 'Bande magnétique 6250', 'unite', 20, 12, 410),
	('D035', 'CD R slim 80 mm', 'B010', 40, 42, 150),
	('D050', 'CD R-W 80mm', 'B010', 50, 4, 0),
	('I100', 'Papier 1 ex continu', 'B1000', 100, 557, 3500),
	('I105', 'Papier 2 ex continu', 'B1000', 75, 5, 2300),
	('I108', 'Papier 3 ex continu', 'B500', 200, 557, 3500),
	('I110', 'Papier 4 ex continu', 'B400', 10, 12, 63),
	('P220', 'Pré-imprimé commande', 'B500', 500, 2500, 24500),
	('P230', 'Pré-imprimé facture', 'B500', 500, 250, 12500),
	('P240', 'Pré-imprimé bulletin paie', 'B500', 500, 3000, 6250),
	('P250', 'Pré-imprimé bon livraison', 'B500', 500, 2500, 24500),
	('P270', 'Pré-imprimé bon fabrication', 'B500', 500, 2500, 24500),
	('R080', 'ruban Epson 850', 'unite', 10, 2, 120),
	('R132', 'ruban impl 1200 lignes', 'unite', 25, 200, 182);
/*!40000 ALTER TABLE `produit` ENABLE KEYS */;

-- Export de la structure de la table papyrus. entcom
CREATE TABLE IF NOT EXISTS `entcom` (
  `numcom` int(10) NOT NULL AUTO_INCREMENT,
  `obscom` varchar(50) DEFAULT NULL,
  `datcom` date DEFAULT NULL,
  `numfou` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`numcom`),
  KEY `numfou` (`numfou`),
  CONSTRAINT `entcom_ibfk_1` FOREIGN KEY (`numfou`) REFERENCES `fournis` (`numfou`)
) ENGINE=InnoDB AUTO_INCREMENT=70630 DEFAULT CHARSET=latin1;

-- Export de données de la table papyrus.entcom : ~10 rows (environ)
/*!40000 ALTER TABLE `entcom` DISABLE KEYS */;
INSERT INTO `entcom` (`numcom`, `obscom`, `datcom`, `numfou`) VALUES
	(70010, '', '2007-02-10', '120'),
	(70011, 'commande urgente', '2007-03-01', '540'),
	(70020, '', '2007-04-25', '9180'),
	(70025, 'Commande urgente', '2007-04-30', '9150'),
	(70210, 'Commande cadencée', '2007-05-05', '120'),
	(70250, 'Commande cadencée', '2007-10-02', '8700'),
	(70300, '', '2007-06-06', '9120'),
	(70620, '', '2007-10-02', '540'),
	(70625, '', '2007-10-09', '120'),
	(70629, '', '2007-10-12', '9180');
/*!40000 ALTER TABLE `entcom` ENABLE KEYS */;

-- Export de la structure de la table papyrus. ligcom
CREATE TABLE IF NOT EXISTS `ligcom` (
  `numcom` int(10) NOT NULL,
  `codart` char(4) DEFAULT NULL,
  `numlig` tinyint(3) NOT NULL,
  `qtecde` int(10) DEFAULT NULL,
  `priuni` varchar(50) DEFAULT NULL,
  `qteliv` int(10) DEFAULT NULL,
  `derliv` datetime DEFAULT NULL,
  PRIMARY KEY (`numcom`,`numlig`),
  KEY `codart` (`codart`),
  CONSTRAINT `ligcom_ibfk_1` FOREIGN KEY (`numcom`) REFERENCES `entcom` (`numcom`),
  CONSTRAINT `ligcom_ibfk_2` FOREIGN KEY (`codart`) REFERENCES `produit` (`codart`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Export de données de la table papyrus.ligcom : ~21 rows (environ)
/*!40000 ALTER TABLE `ligcom` DISABLE KEYS */;
INSERT INTO `ligcom` (`numcom`, `codart`, `numlig`, `qtecde`, `priuni`, `qteliv`, `derliv`) VALUES
	(70010, 'I100', 1, 3000, '470', 3000, '2007-03-15 00:00:00'),
	(70010, 'I105', 2, 2000, '485', 2000, '2007-07-05 00:00:00'),
	(70010, 'I108', 3, 1000, '680', 1000, '2007-08-20 00:00:00'),
	(70010, 'D035', 4, 200, '40', 250, '2007-02-20 00:00:00'),
	(70010, 'P220', 5, 6000, '3500', 6000, '2007-03-31 00:00:00'),
	(70010, 'P240', 6, 6000, '2000', 2000, '2007-03-31 00:00:00'),
	(70010, 'P220', 11, 10000, '3500', 10000, '2007-08-31 00:00:00'),
	(70011, 'I105', 1, 1000, '600', 1000, '2007-05-16 00:00:00'),
	(70020, 'B001', 1, 200, '140', 0, '2007-12-31 00:00:00'),
	(70020, 'B002', 2, 200, '140', 0, '2007-12-31 00:00:00'),
	(70025, 'I100', 1, 1000, '590', 1000, '2007-05-15 00:00:00'),
	(70025, 'I105', 2, 500, '590', 500, '2007-05-15 00:00:00'),
	(70210, 'I100', 1, 1000, '470', 1000, '2007-07-15 00:00:00'),
	(70250, 'P230', 1, 15000, '4900', 12000, '2007-12-15 00:00:00'),
	(70250, 'P220', 2, 10000, '3350', 10000, '2007-11-10 00:00:00'),
	(70300, 'I110', 1, 50, '790', 50, '2007-10-31 00:00:00'),
	(70620, 'I105', 1, 200, '600', 200, '2007-11-01 00:00:00'),
	(70625, 'I100', 1, 1000, '470', 1000, '2007-10-15 00:00:00'),
	(70625, 'P220', 2, 10000, '3500', 10000, '2007-10-31 00:00:00'),
	(70629, 'B001', 1, 200, '140', 0, '2007-12-31 00:00:00'),
	(70629, 'B002', 2, 200, '140', 0, '2007-12-31 00:00:00');
/*!40000 ALTER TABLE `ligcom` ENABLE KEYS */;

-- Export de la structure de la table papyrus. vente
CREATE TABLE IF NOT EXISTS `vente` (
  `numfou` varchar(25) NOT NULL,
  `codart` char(4) NOT NULL,
  `delliv` smallint(5) DEFAULT NULL,
  `qte1` int(10) DEFAULT NULL,
  `prix1` varchar(50) DEFAULT NULL,
  `qte2` int(10) DEFAULT NULL,
  `prix2` varchar(50) DEFAULT NULL,
  `qte3` int(10) DEFAULT NULL,
  `prix3` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`numfou`,`codart`),
  KEY `codart` (`codart`),
  CONSTRAINT `vente_ibfk_1` FOREIGN KEY (`codart`) REFERENCES `produit` (`codart`),
  CONSTRAINT `vente_ibfk_2` FOREIGN KEY (`numfou`) REFERENCES `fournis` (`numfou`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Export de données de la table papyrus.vente : ~27 rows (environ)
/*!40000 ALTER TABLE `vente` DISABLE KEYS */;
INSERT INTO `vente` (`numfou`, `codart`, `delliv`, `qte1`, `prix1`, `qte2`, `prix2`, `qte3`, `prix3`) VALUES
	('120', 'D035', 0, 0, '40', 0, '0', 0, '0'),
	('120', 'I100', 90, 0, '700', 50, '600', 120, '500'),
	('120', 'I105', 90, 10, '705', 50, '630', 120, '500'),
	('120', 'I108', 90, 5, '795', 30, '720', 100, '680'),
	('120', 'P220', 15, 0, '3700', 100, '3500', 0, '0'),
	('120', 'P230', 30, 0, '5200', 100, '5000', 0, '0'),
	('120', 'P240', 15, 0, '2200', 100, '2000', 0, '0'),
	('120', 'P250', 30, 0, '1500', 100, '1400', 500, '1200'),
	('540', 'I100', 70, 0, '710', 60, '630', 100, '600'),
	('540', 'I105', 70, 0, '810', 60, '645', 100, '600'),
	('8700', 'B001', 15, 0, '150', 50, '145', 100, '140'),
	('8700', 'B002', 15, 0, '210', 50, '200', 100, '185'),
	('8700', 'I105', 30, 0, '720', 50, '670', 100, '510'),
	('8700', 'P220', 20, 50, '3500', 100, '3350', 0, '0'),
	('8700', 'P230', 60, 0, '5000', 50, '4900', 0, '0'),
	('9120', 'D035', 5, 0, '40', 100, '30', 0, '0'),
	('9120', 'I100', 60, 0, '800', 70, '600', 90, '500'),
	('9120', 'I105', 60, 0, '920', 70, '800', 90, '700'),
	('9120', 'I108', 60, 0, '920', 70, '820', 100, '780'),
	('9120', 'I110', 60, 0, '950', 70, '850', 90, '790'),
	('9120', 'P250', 30, 0, '1500', 100, '1400', 500, '1200'),
	('9120', 'R080', 10, 0, '120', 100, '100', 0, '0'),
	('9120', 'R132', 5, 0, '275', 0, '0', 0, '0'),
	('9150', 'I100', 90, 0, '650', 90, '600', 200, '590'),
	('9150', 'I105', 90, 0, '685', 90, '600', 200, '590'),
	('9180', 'I100', 30, 0, '720', 50, '670', 100, '490'),
	('9180', 'I110', 90, 0, '900', 70, '870', 90, '835');
/*!40000 ALTER TABLE `vente` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
