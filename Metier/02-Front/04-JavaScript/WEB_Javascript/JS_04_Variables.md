 # JS 04 : Les variables

## La déclaration de variables

Les variables contiennent des données qui peuvent être modifiées lors de l'exécution d'un pro-gramme. On y fait référence par le nom de cette variable.
Pour nommer une variable ou une fonction, le développeur définit des identificateurs.
Un identificateur doit commencer par une lettre (alphabet ASCII) ou le signe `_` et se composer de lettres, de chiffres et des caractères `_` et `$` (à l'exclusion du blanc). 

Pour rappel JavaScript est sensible à la casse. 

Les variables se déclarent avec l'instruction `var`. 

<!--
* avec l'instruction `let`, disponible depuis ES6 : le comportement de `let` est similaire à `var`, sauf que `let` n'est pas reconnu par les navigateurs anciens.
-->

** Exemple :**

	var num = 1 ;
	var prenom = "Jean" ;

    alert(num);
    alert(prenom);




Testez l'exemple de code.

## Les types de données

JavaScript utilise 5 types de données :

* Nombre : Tout nombre entier ou avec virgule tel que `22` ou `3.1416`. Tout entier en octal ou hexadécimal tel que `0387`, `0xFFA8`.              
* Chaîne :	toute suite de caractères comprise entre guillemets ou côtes telle que "suite de caractères" ou 'suite de caractères'
* Booléen : les mots `true` pour vrai et `false` pour faux
* Objet	: toute utilisation de variable par référence vers tout objet natif JavaScript (Array, Date, String …) ou tout objet du DOM. 
* `null` : mot réservé qui ne représente pas de valeur. La valeur null est affectée volontairement à une variable. 
* `undefined` : mot réservé qui est renvoyé par une variable référencée qui n'a pas encore été définie (la variable existe mais n'a reçu aucune affectation de valeur).

Exemples :

	var myVar; // le type de la variable myVar est undefined
	myVar = 324;	// type number
	myVar = "Bonjour";	// type string
	myVar = true; // type boolean
	myVar = new Array(); // type object

> Notez que, contrairement au langage C ou C++, il ne faut pas obligatoirement déclarer le type de données d'une variable (pas besoin  de préciser `int`, `float`, `char` etc.).

#### Connaître le type d'une donnée

Une variable peut changer de type après une affectation. On peut vérifier le type en cours d'une variable avec l'instruction `typeof` :

	console.log(typeof 42); // Affiche "number"
	console.log(typeof 'blubber'); // Affiche "string"
	console.log(typeof true); // Affiche "boolean"

	var myVar;
	console.log(typeof myVar); // Affiche 'undefined'
