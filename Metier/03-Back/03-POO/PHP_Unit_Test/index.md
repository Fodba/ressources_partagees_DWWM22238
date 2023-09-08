# Tester les composants en PHP

## Objectifs (REAC)

* Connaître le principe de développement piloté par les tests (**Test Driven Development** = TDD)   
* Mettre en oeuvre des tests unitaires à l'aide d'un framework dédié
* Tester unitairement les composants dans une optique fonctionnelle et de vulnérabilité
* Réaliser les tests avec un jeu d'essai

> Rappel : les différents [types de tests](http://www-igm.univ-mlv.fr/~dr/XPOSE/TesTs/SiteWeb/typestests.htm)

## Cheminement 

Mettre en oeuvre les tests unitaires. 

## Définition 

Un test unitaire permet de s'assurer du bon fonctionnement d'un programme en testant chaque partie de celui-ci, ces parties étant appellées une **unité**. Une unité peut être une fonction/méthode, une classe... 

Il s'agit d'écrire un test pour chaque unité, mais le problème est qu'écrire des conditions de tests dans chaque méthode alourdit considérablement le code. 

**Exemple**

Soit une classe PHP `Calcul.class.php`, comprenant la méthode `ajouter()`, située dans un répertoire _classe_ : 

	<?php
	class Calcul
	{
	    public function ajouter($a, $b)
	    {
	       return $a + $b;
	    }
	}
	
Pour tester la méthode  `ajouter()`, il faudrait écrire le code suivant : 

	<?php
	require_once './classes/calcul.class.php';
	
	$calc = new Calcul();
	
	if ($calc->add(3, 4) == 7)
	{
	   echo 'Succès';
	}
	else
	{
	   echo 'Echec';
	}
	
Le problème est qu'il faudrait écrire des conditions de tests pour chaque résultat envisagé (impossible) et pour chaque méthode, ce qui alourdirait considérablement le code, c'est même impossible. 

Pour remédier à ce problème, il existe des frameworks de tests unitaires qui présentent 2 avantages :

* séparer les tests du code fonctionnel métier
* fournir des fonctions prêtes à l'emploi qui implémentent les types de tests unitaires couramment rencontrés   

> Il existe des frameworks de tests unitaires pour les principaux langages (Java, Python, Javascript etc.). Ceux-ci sont généralement basés sur l'architecture dite xUnit. Certains langages intègrent directement une solution de tests (c'est le cas des langages Microsoft).   

La pratique des tests unitaires en PHP nécessite le framework [PhpUnit](https://phpunit.de).

> Il existe plusieurs frameworks de tests pour PHP (__Atoum__ notamment).

## Installer PhpUnit

1. Créez un répertoire nommé `bin` à la racine de `C:/`.`
2. [Téléchargez](https://phpunit.de/getting-started/phpunit-9.html) le fichier d'installation de PhpUnit (version 9 au 15/07/2020) : cliquez sur le lien __here__ pour obtenir le fichier _phpunit-9.phar_ : 

![images/phpunit_here.jpg](images/phpunit_here.jpg)

Déplacez ce fichier le fichier dans `C:/bin` et renommez-le `phpunit.phar` (supprimez le numéro de version).    

3. Ouvrez les _Paramètres_ (roue dentée) dans le menu _Démarrer_ de Windows
4. Cliquez sur __Système__, puis sur __Informations système__ (dans le menu à gauche) et enfin sur __Informations système__ (partie __Paramètres associés__ en haut à droite).
5. Dans la petite fenêtre qui s'ouvre, cliquer sur le bouton __Variables d'environnement__.
6. Dans la nouvelle fenêtre qui s'ouvre, dans le second cadre ___Variables système__, recherchez la ligne __Path__ et cliquez dessus.
7. Dans nouvelle fenêtre, cliquez sur le bouton __Nouveau__ (en haut à droite), dans la ligne éditable créée, renseignez la valeur `C:\bin`. 
8. Renouvellez les opérations 3 à 7. Pour l'étape 7, si vous utilisez Wamp, indiquez `C:\wamp\bin\php\php7.3.12` (vérifier le numéro de la version utilisée). 

9. Lancez l'invite de commande Windows (touches `Windows + R` puis saisir `cmd`), tapez la commande :

        cd C:/bin 
   
Puis copiez-collez : 

    echo @php "%~dp0phpunit.phar" %* > phpunit.cmd

Pour vérifier que l'installation s'est bien déroulée, exécutez la commande de vérification de la version: 

    phpunit --version

qui affiche quelque chose de similaire à `PHPUnit 9.2.6 by Sebastian Bergmann and contributors.` :

Si vous voyez le message d'erreur _php n'est pas reconnu..._, fermez le terminal puis rouvrez-le. Si l'erreur persiste, vérifiez que vous avez indiqué la bonne version de PHP comme variable d'environnement.  

> Nous venons d'installer PhpUnit sous Windows, de façon dite globale, c'est-à-dire que l'installation pourra servir à différents projet Wamp. Conçu à l'origine pour Linux, vous pourrez rencontrer d'autres procédures/outils d'installation.   

## Concepts 

Les tests unitaires font appel à de nombreux concepts, voici les principaux : 

* Les assertions : proposition, de forme affirmative ou négative, qu'on avance et qu'on donne comme vraie, pour faire plus simple on vérifie "une vérité", par exemple que le résultat de 10 / 2 est égal à 5 [en savoir plus](http://www.test-recette.fr/tests-techniques/deployer-tests-unitaires/materialisation-test-unitaire.html), [explications](http://onpk.net/php/simpletest/first_test_tutorial.php),
* Les bouchons : utilisation d'une fausse classe uniquement pour les tests, copie simplifiée de la classe d'origine à tester mais dont les méthodes renvoient le même résultat (on a peut être enlevé certaines méthodes) [en savoir plus](http://www.test-recette.fr/tests-techniques/deployer-tests-unitaires/simulacres-bouchons.html). 
* les simulacres : utilisation d'une fausse c
* lasse, mais cette fois ce sont les résultats des méthodes (comportement) qui sont simplifiés [en savoir plus](http://www.test-recette.fr/tests-techniques/deployer-tests-unitaires/simulacres-bouchons.html). 

Les frameworks de tests implémentent ces cas via des méthodes, que l'on retrouve dans la [documentation](https://phpunit.readthedocs.io/fr/latest/assertions.html) de PhpUnit. 

## Ecrire un test unitaire avec PhpUnit

Pour écrire un test, par exemple pour tester une classe PHP complète (c'est-à-dire chacune de ses méthodes), il faut créer une classe spécifique qui comportera nos tests. 

> Notez qu'il est possible de faire plusieurs tests différents pour une seule et même unité (par exemple un test quand vrai, un test quand faux).

Mais il faut d'abord quelque chose à tester ! Créez la classe suivante, enregistrez un fichier `calcul.class.php` dans un répertoire _classes/_ :  

	<?php 
	class Calcul
    {
	    public function divide($number, $divisor)
	    {
	        if (empty($number) || $number <= 0 || empty($divisor) || $divisor <= 0) 
	        { // Erreurs
	            return FALSE;
	        }
	        
	        return $number / $divisor;
	    }
    }
	?>

Cette classe présente la méthode `divide()` à tester.

Créons maintenant la classe de test, que nous localiserons dans un répertoire nommé _tests/_.

Les conventions suivantes doivent être respectées pour nommer les classes et méthodes de test :

* La classe de test doit être appellée du nom de la classe à tester, suffixée de `Test`; dans notre cas : `CalculTest`, le nom de fichier doit s'appeler pareil, par exemple donc `CalculTest.php`;
* Les méthodes à tester doivent être préfixées par le mot `test` : on aura donc `testDivide()` auxquelles on peut adjoinre un suffixe libre, par exemple `testDivideOk()` pour tester si le résultat retourné est bon.         
  
		<?php
        /* Charger impérativement avec 'require_once', ne fonctionne dans certains cas avec 'require' */
        require_once "./classes/calcul.class.php";
      
        use PHPUnit\Framework\TestCase; // Charge le framework PhpUnit

        class CalculTest extends TestCase
        {   
		    public function testDivideOk()
		    {
		        $oCalcul = new Calcul();
		        
		        $number = 10;
		        $divide = 2;
		                
		        $result = $oCalcul->divide($number, $divide);
		        
		        // On attend le que le résultat de 10/2 soit 5 :
		        $this->assertEquals(5, $result);
		    }        
		}
				
## Exécuter un test

Pour exécuter un test, lancer le terminal Windows. 

Placez vous dans le répertoire de votre projet (modifiez le chemin selon le vôtre) :

    cd c:/wamp/www/projet

puis dans le terminal exécutez la commande :

    phpunit tests

`tests` correspond ici au répertoire nommé _tests/_. Dans ce cas, toutes les classes de tests contenues dans le répertoire indiqué et chacune de leur méthode sont testées, mais on peut préciser une classe/méthode en particulier.

L'invite de commande vous informe alors sur le résultat obtenu : _OK_ ou _Failure_ si échec. [interprétation des résultats](https://phpunit.readthedocs.io/fr/latest/textui.html) 

Pour exécuter un test de façon isolée, il faut utiliser l'option `--filter` suivie du nom de la méthode + le chemin/nom du fichier de classe de tests dans lequel elle se trouve, par exemple :
    
    phpunit --filter testDivideOk tests/CalculTest.php

Cette commande exécutera uniquement le test. 

Il est aussi possible d'exécuter une suite de tests, à configurer via un fichier XML.  
 
## Exercice

* Installer PhpUnit
* Reproduire l'exemple 
* Ecrire le test qui permet de s'assurer que la méthode `divide()` renvoie bien `false` lors d'une tentative de division par zéro. 
* CodeIgniter présente ses propres [classes de TU](https://www.codeigniter.com/user_guide/libraries/unit_testing.html). Implémentez-les sur votre projet _Jarditou_. 

## A savoir 

* Les logiciels IDE peuvent intégrer les frameworks de tests unitaires, cependant la configuration peut s'avérer complexe. 
* Les frameworks (et CMS) peuvent embarquer nativement PhpUnit (c'est le cas de Symfony), sinon il est possible de les y intégrer, là aussi ce n'est pas toujours simple.  

## Ressources 

* [PhpUnit, documentation officielle](https://phpunit.readthedocs.io/fr/latest/writing-tests-for-phpunit.html)
* [Qu'est-ce qu"un test unitaire](http://www.test-recette.fr/tests-techniques/bases/tests-unitaires.html)
* [Déployer des tests unitaires](http://www.test-recette.fr/tests-techniques/deployer-tests-unitaires)
 
<!-- 
- Windows C:/bin : https://stackoverflow.com/questions/12655136/install-phpunit-on-windows ou https://phpunit.de/manual/6.5/en/installation.html

URL corrigé de l'exercice : 
https://foad.amorce.org/ressources/Pool/Developper_Test_Web/corrige_exercice_assetequals.html
-->   