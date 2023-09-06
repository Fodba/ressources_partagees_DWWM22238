<!-- [HB, 02/10/2019] -->

# PHP 07 - Les fichiers

Avant d'aborder un exemple de manipulation de fichiers en PHP nous allons voir les différentes façons d'ouvrir un fichier.

## Ouverture d'un fichier

* Ouverture en lecture seulement depuis le début du fichier ("r") : `$fp = fopen(string fichier, "r");` 
* Ouverture en écriture seulement depuis le début du fichier ("w") : `$fp = fopen(string fichier, "w");` 
* Ouverture en écriture seulement depuis la fin du fichier ("a") : `$fp = fopen(string fichier, "a");` 

**Exemples** 

	$fp = fopen("/home/rasmus/file.txt", "r"); 
	$fp = fopen("../exemple.txt","a"); 
	$fp = fopen("http://www.php.net/", "r"); 
	$fp = fopen("ftp://user:password@example.com/", "w"); 

Il faut garder à l'esprit que l'on définit ici les fichiers au sens général du terme, vous pouvez donc grâce à ces instructions manipuler des fichiers _html_, _txt_, _php_ etc. 
 
> `$fp` étant une variable, son nommage est bien entendu libre; il s'agit ici de la convention adoptée dans la documentation officielle PHP.  

## Les instructions principales 

### Ecriture dans un fichier 

La fonction `fputs()` permet de lire un fichier; elle reçoit 2 arguments obligatoires et troisième faculatif `fputs($fp, $str, length);` :  

* `$fp` : pointe sur le numéro de fichier ouvert par `fopen()` 
* `$str` : représente la variable à enregistrer 
* `length` : 3<sup>ème</sup> argument, faculatif, qui représente la longueur de la variable 

**Exemple** 

* Créez dans Wamp/Laragon un nouveau projet; créez un fichier texte nommé _essai.txt_.
* Créez un fichier PHP avec le code suivant :  

        // On déclare une variable dont la valeur (contenu) sera écrite dans le fichier
        $myVar = "Bonjour le monde";

        // Ouverture en écriture seule 
	    $fp = fopen("essai.txt", "a"); 

        // Ecriture du contenu ($myVar) 
	    fputs($fp, $myVar); 
	
        // Fermeture du fichier  
        fclose($fp); 

Ouvrez le fichier _essai.txt_ et vérifiez que la phrase _Bonjour le monde_ s'y trouve. 

### Lecture dans un fichier 

La fonction `fgets()` permet de lire un fichier; elle reçoit 2 arguments : `fgets($fp, length);` : 

* `$fp` : pointe sur la ressource de fichier ouvert avec `fopen()` 
* `length` : représente la longueur d'enregistrement à lire (en octets) 

**Exemple**

	// Ouverture en lecture seule  
	$fp = fopen("essai.txt", "r"); 

	// Boucle jusqu'à la fin du fichier
	while (!feof($fp)) 
	{ 
        // Lecture d'une ligne, le contenu de la ligne est affecté à la variable $ligne  
	    $ligne = fgets($fp, 4096); 
	    echo $ligne."<br>"; 
	} 

En fait l'instruction `fgets()` lit la ligne jusqu'à ce qu'elle rencontre un caractère de retour à la ligne `\n`.
Par sécurité il est préférable de lui indiquer de lire 4096 caractères pour qu'elle puisse lire une ligne entière. 
Pour lire l'ensemble d'un fichier, vous pouvez aussi utilisez la fonction `file()`.

## Les autres fonctions de gestion de fichiers 

Consultez la [documentation PHP](https://www.php.net/manual/fr/intro-whatis.php) de ces fonctions pour comprendre leur usage : 

* `basename()`
* `copy()` 
* `dirname()`
* `file()` 
* `file_exists()` 
* `is_dir()` 
* `is_file()` 

## Exercice : un compteur texte en PHP

Les compteurs offerts par votre provider ne vous plaisent pas ? 

Vous voulez avoir un compteur différent pour toutes les pages de votre site ? 

Voici un petit script en PHP qui fera l'affaire :

	<?php 
	// On ouvre le fichier moncompteur.txt
	$fichier = fopen("moncompteur.txt","r+");
	
	// on lit le nombre indiqué dans ce fichier dans la variable
	$visiteurs = fgets($fichier,255);
	
	// on ajoute 1 au nombre de visiteurs
	$visiteurs++;
	
	// on se positionne au début du fichier
	fseek($fichier,0);
	
	// on écrit le nouveau nombre dans le fichier
	fputs($fichier,$visiteurs);
	
	// on referme le fichier moncompteur.txt
	fclose($fichier);
	
	// on indique sur la page le nombre de visiteurs
	print("$visiteurs personnes sont passées par ici");
	
_Quelques précisions et explications :_ 

* Vous devez placer sur votre site un fichier _moncompteur.txt_ avec juste le chiffre 0 dedans. Bien entendu si vous désirez que votre compteur démarre à 1254, vous pouvez le faire.
* La fonction `fopen()` permet d'ouvrir un fichier présent sur votre site. L'attribut _r+_ permet de l'ouvrir en lecture et écriture.
* La fonction `fgets()` permet de lire le texte écrit dans le fichier. Le nombre 255 permet de ne lire que la première ligne, mais on pourrait également mettre 4 si l'on sait que le compteur ne dépassera pas 9999.
* `fseek()` permet de se repositionner au début du fichier. Ainsi, lorsque l'on réécrit le nouveau nombre de visiteurs, on est sûr d'effacer l'ancien.
* `fputs()` permet de réécrire la variable incrémentée dans le fichier.
* `fclose()` permet de refermer le fichier _moncompteur.txt_ que l'on a ouvert au début du script.

Si vous désirez ajouter un compteur différent par page, vous n'avez qu'à recopier ce script sur vos différentes pages, en changeant juste _moncompteur.txt_ en _moncompteur2.txt_, _moncompteur3.txt_ etc. et en créant autant de fichiers _.txt_ associés.

## Parcourir un répertoire

Il est souvent utile de parcourir un répertoire pour lister les fichiers qu'il contient. 

Recherchez comment faire.  

Cela devient un peu plus complexe quand un répertoire contient des sous-répertoires. La boucle de lecture doit alors devenir récursive.

## La sécurité des fichiers 

+++ TODO [12/11/2018] : types MIME, droits/chmod() +++

## Exercices

Téléchargez le fichier [ListeLiens.zip](ListeLiens.zip) contenant des adresses web et écrire un programme qui lit ce fichier pour construire une page web contenant une liste de liens hypertextes.






