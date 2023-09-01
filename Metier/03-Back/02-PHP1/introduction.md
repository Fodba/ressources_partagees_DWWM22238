# PHP > Introduction 

**Le PHP, alias _PHP Hypertext Preprocessor_, est un langage de scripts s'exécutant du côté du serveur (comme l'ASP.Net), permettant de générer spécifiquement des pages dynamiques en code HTML.**

* PHP est un langage multi-plateformes disponible dans plusieurs environnements tels qu'Unix, Windows mais surtout Linux. 
* PHP permet de gérer facilement une base de données (souvent MySQL) 
* Robuste et puissant, il ne ralentit presque pas le serveur à moins d'un très grand trafic 

La première version a été mise au point par [Rasmus Lerdorf](https://fr.wikipedia.org/wiki/Rasmus_Lerdorf), le langage s'appelait alors, en 1994, _PHP/FI_. Cette première version n'avait de grandes ambitions que de pouvoir insérer quelques traitements simples dans une page HTML.

PHP est aujourd'hui un langage de programmation de référence puisqu'il est présent dans 80% des sites web. Ce succès est dû au bon compromis entre puissance, simplicité et la gestion aisée d'une base de données (MySQL le plus souvent). 

PHP est un langage open source (sources et documentation disponibles gratuitement). 

## Pré-requis

* Installation d'un serveur local tel que Wamp.

## Structure d'un programme

Pour que le serveur puisse comprendre qu'il va devoir interpréter un script en PHP, il faut : 

* que le fichier contenant le script porte l'extension `.php`, par exemple _index.php_.
* dans le script, indiquer le début du code PHP avec la balise `<?php` et la fin avec la balise `?>` :  

		<html>	
		<body>
		  <?php 
		    ... 
		    Script à exécuter 
		    ... 
		  ?> 
		</body>
		</html>

* pour être exécuté, ce fichier doit être placé sur un serveur de type <abbr title="Apache MySql PHP">A.M.P.</abbr>, par exemple dans le répertoire `C:/wamp/www`, puis lancé (une fois le serveur démarré) via une url, par exemple, sous Wamp : _http://localhost/monscript.php_. 

Dans un script PHP, les parties, identifiées par `<?php … ?>`, seront traitées par l'interpréteur PHP : 

![images/interpretation_php1.jpg](images/interpretation_php1.jpg)

![images/interpretation_php2.jpg](images/interpretation_php2.jpg)

## Les fonctions de base et les pièges à éviter

### L'instruction `echo`

La première instruction que vous allez utiliser en PHP est `echo` : elle permet d'afficher (écrire) à l'écran une chaîne, une variable, un entier etc. :  

	<html>
	<body>
	  <?php 
	      echo"Bonjour le monde"; 
	  ?> 
	</body>
	</html>

> IMPORTANT : une instruction/ligne de code PHP doit toujours se terminer par un point-virgule (comme en Javascript et bien d'autres langages). 

**Exercice**

* Dans le répertoire _C:/wamp/www/_, créez un répertoire nommé _bonjour/'
* Dans ce répertoire _C:/wamp/www/bonjour/_; créez un fichier nommé _index.php_
* Lancez Wamp puis un navigateur web et ouvrez l'url `http://localhost/index.php`

### PHP et HTML

Le langage PHP est un langage qui peut écrire du HTML (mais aussi du CSS ou même du Javascript) de façon dynamique (on parle de générer du flux HTML)  :

**Exemple 1**	

    <?php
	echo"<h1>Bonjour le monde</h1>"; 

Il peut aussi très bien être inséré entre des balises HTML :   

**Exemple 2**	

    <h1><?php echo Bonjour le monde"; ?></h1>     

Entre ces 2 solutions, la bonne pratique consiste à :

* s'il y a plus de code PHP que de HTML : c'est le PHP qui écrit le HTML (comme dans l'exemple 1 ci-dessus)
* a contrario, si on doit mettre de temps en autre une instruction PHP : le code PHP est à insérer entre les balises HTML (exemple 2 ci-dessus) 

## Les variables en PHP

* Les variables sont précédées du signe dollar `$` (nous verrons plus tard des exceptions). 
* Les règles de nommages sont : pas d'espaces, pas d'accents, ne pas commencer par un nombre
* Les noms de variables sont sensibles à la casse (majuscules différentes des minuscules) 

### Les types 

En PHP, le type de la variable est déterminé au moment de son initialisation, pas de sa déclaration.

	$a = 12 ; 		// un entier
	$b = "Bonjour"; // une chaîne de caractères

### Concaténation 

Peut-être aussi écrit `echo 'Bonjour le monde'`; (utilisation d'apostrophes au lieu des guillemets doubles) si vous n'utilisez pas de variables à l'intérieur de l'instruction comme vous pouvez le voir ci-dessous. 

A l'intérieur des guillemets doubles, vous pouvez insérer du code HTML, ainsi qu'une variable : à l'affichage à l'écran, la variable sera remplacée par sa valeur car la chaîne est entourée par des guillemets doubles (ce n’est pas le cas lorsque la chaîne est entourée par des apostrophes). 

	$bonjour = "Bonjour le monde"; 
	echo "<b>$bonjour</b>"; 

> Remarque : si vous souhaitez afficher un guillemet double dans une fonction `echo` encadrant elle-même la chaîne par des guillemets doubles, vous devez utiliser le caractère `\` :

**Exemple** 

	echo "Affichage d'un \" "; 

De la même façon vous pouvez inclure les caractères spéciaux suivants afin de gérer notamment une meilleure lisibilité de votre code source (touches `CTRL`+`U` dans un navigateur) :

* `\n` : saut de ligne 
* `\r` : fin de ligne 
* `\t` : tabulation 

**Exemple**

	echo "Bonjour le monde\n"; 

> Vous pourrez parfois rencontrer l'instruction `print` qui permet également d'afficher quelque chose. Bien que proche de `echo`, `print` connaît quelques subtilités de fonctionnement, il est donc recommandé d'utiliser `echo` (dont l'exécution est en outre légèrement plus rapide).   

### Commentaires
 
Les commentaires en PHP sont signalés de la même façon qu'en Javascript : 

* `//` pour commenter une seule ligne
* `/*` et `*/` pour commenter un bloc de plusieurs lignes

### Débogage

#### La fonction `var_dump()`

La fonction `var_dump()` permet d'afficher des informations (nom, type, valeur, longueur/nombre d'éléments si tableau) sur n'importe quelle variable, tous types compris (scalaire, tableau, objet...) :

	$myVar = "bonjour";
	var_dump($myVar);

donne :  

	C:\wamp\www\bonjour.php:3:string 'bonjour' (length=7)

**La fonction `error_log()`**

La fonction `error_log()` permet d'ajouter volontairement des informations (messages d'erreurs personnalisés) au fichier `php_error.log` contenant les logs natifs de PHP, situé dans `C:/wamp/logs` :

    $myVar = "KO";

    if ($myVar == "OK") 
    {	
       echo"C'est bon<br>";
    } 
    else 
    {
        echo"Ouh la la pas bien !<br>"; // Message affiché dans la page web
        error_log("Ouh la la pas bien"); // Message enregistré dans le fichier 'C:/wamp/logs/php_error.log' 
    } 

> ATTENTION, la fonction `error_log()` ne doit pas contenir de code HTML ou autre.

Ouvrez le fichier `C:/wamp/logs/php_error.log` et descendez jusqu'au dernier message, vous devriez y trouver un _Ouh la la pas bien_ qui ne nous renseigne cependant pas sur la localisation de l'erreur. 

Dans le script précédent, remplacez les 2 lignes du `else` par les gnes suivantes et relancez votre script :

		echo"Ouh la la pas bien !<br>"; // Message affiché dans la page web
        $message = "Ouh la la pas bien ".__FILE__." ".__LINE__;        
        error_log($message); 
  
Cette fois, le message d'erreur enregistré dans php_error.log indique le chemin complet du fichier _bonjour.php_ et le numéro de ligne du code exécuté. On peut ainsi construire un système de gestion/logs d'erreurs.

<br><br><br><br>