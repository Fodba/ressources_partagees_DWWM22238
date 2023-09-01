<!-- HB, 14/09/2019 -->

# PHP 04 - Les tableaux

## Introduction 

Un tableau est une variable contenant une liste de valeurs regroupées sous forme de lignes et de colonnes. 

Les tableaux ont une grande importance dans la création de scripts PHP, comme dans bien d'autres langages d'ailleurs. Le principe et la manipulation sont les mêmes que ce que vous avez pu voir en Javascript.  

## Déclaration de tableaux

### Tableaux indexés

La forme la plus basique est le tableau indexé numériquement : un numéro appelé _index_ ou encore _indice_, donne la position de chaque élément que contient le tableau.

**Attention, le premier index a pour valeur numérique _0_.**    

#### Déclaration d'un tableau

Un tableau peut être déclaré vide (création de la variable) ou de façon implicite dès qu'on affecte un premier élément.

**Exemple 1 :** 
 
Déclaration d'un tableau vide (déclaration de la variable) :  

	$tab = array(); 

**Exemple 2 :**

Autre syntaxe pour déclarer un tableau vide :  

	$tab = []; 

**Exemple 3 :**
	
Déclaration implicite d'un tableau par attibution d'élément(s) :  

    $tab[] = "Pomme"; 
    $tab[] = "Poire"; 
    $tab[] = "Banane"; 
		
Remarquez que l'index n'est pas spécifié, le premier élément ajouté prendra bien sûr l'index 0. 

**Exemple 4 :**
	
On peut faire une déclaration implicite en spécifiant l'index :   

    $tab[0] = "Pomme"; 
	$tab[1] = "Poire"; 
	$tab[2] = "Banane"; 

### Tableaux à plusieurs dimensions 

Un tableau à plusieurs dimensions est un tableau dont les éléments sont eux-mêmes des tableaux (sous-tableaux).  

**Exemple 1**

    <?php
	$tab = array(array(1, "janvier", "2016"), 
                 array(2, "février", "2017"), 
                 array(3, "mars", "2018"), 
                 array(4, "avril", "2019")
                 );

**Exemple 2 :**

Même tableau que l'exemple 1 mais déclaré différemment : 

    <?php
	$tab[] = array(1, "janvier", "2016"); 
	$tab[] = array(2, "février", "2017"); 
	$tab[] = array(3, "mars", "2018"); 
	$tab[] = array(4, "avril", "2019");

**Accès aux données**

Pour accéder aux informations d'un tableau à plusieurs dimensions 

	// Affiche : 3 mars 2018
	echo $tab[2][0]." ".$tab[2][1]." ".$tab[2][2]."<br>"; 

> le nombre de niveaux est illimité. 

### Tableaux associatifs 

Le tableau associatif permet d'associer une valeur à une autre, les index sont des chaînes au lieu d'être numériques. 

Imaginons que vous vouliez représenter des factures de téléphone mensuelles sur une année. Avec un tableau classique, vous allez associer chaque ligne du tableau aux mois et la colonne aux valeurs :

    <?php
	$facture[0] = 500; // représente Janvier / 500 euros
	$facture[1] = 620; // représente Février 
	// $... 
	$facture[11]= 300; // représente Décembre

Grâce aux tableaux associatifs vous allez représenter le même tableau comme suit : 

	$facture["Janvier"] = 500; 
	$facture["Février"] = 620; 
	// $........ 
	$facture["Décembre"] = 300; 

Vous pouvez aussi l'écrire en utilisant l'opérateur d'association `=>`. 

	$facture = array("Janvier" => 500, "Février" => 620, ..., "Décembre" => 300); 

## Manipulation de tableaux 

Après avoir créé un tableau, il est bien sûr indispensable de pouvoir manipuler les valeurs : PHP offre une multitude de fonctions. 

### Taille d'un tableau

La fonction `count()` retourne le nombre d'éléments (valeurs) que contient un tableau : 

**Exemple :**

    <?php
    $mois = array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
 
    echo count($mois); // Affiche 12 

> La fonction `sizeof()` fait strictement la même chose; il s'agit d'un _alias_ de `count()`.

### Lecture d'un tableau

Un tableau peut être parcouru avec les différentes instructions de boucles : `for`, `while` et `do...while`. 

Il peut aussi être lu avec l'instruction `foreach` qui permet d'extraire une valeur ou  couple (clé, valeur) à chaque tour de boucle.

La syntaxe est la suivante : 

	foreach ($tableau as $value) 
	{ 
	   // instructions 	    
	}   

* Le premier argument est le nom du tableau
* Puis l'instruction `as` affecte à la variable située à sa droite (ici `$value`) la valeur du tableau en cours de lecture; la valeur de la variable `$value` change donc à chaque tour de boucle.

**Exemple :**
 
	$factures = array("Janvier" => 500, "Février" => 620, "Mars" => 300, "Avril" => 130, "Mai" => 560, "Juin" => 350); 

    $total_annuel = 0;

	foreach ($factures as $value) 
	{ 
	   echo $value." &euro;<br>"; 
       $total_annuel += $value;	    
	} 

	echo "Total annuel de vos factures téléphoniques : ".$total_annuel." &euro;"; 
	?> 

L'instruction `foreach` permet aussi d'extraire le couple clé/valeur. Dans l'exemple précédent, on affiche le montant des factures mensuelles mais ion ne sait pas à quel mois elles correspondent : il faudrait donc aussi afficher la clé. On peut le faire aisèment en ajoutant avant la variable `$value` une seconde variable (ici `$key`) suivie du signe `=>`; cette nouvelle variable recevra le nom de la clé (dans notre cas, les mois) :

	foreach ($tableau as $key => $value) 
	{ 
	   // instructions 	    
	}   

**Exemple**    
    
	foreach ($factures as $key => $value) 
	{ 
	   echo "Facture du mois de ".$key." : ".$value." &euro;<br>"; 
       $total_annuel += $value;	    
	} 

### La fonction `array_push()`; 

Cette instruction permet d'ajouter un élément à la fin d'un tableau.

	$tab = array("Lundi", "Mardi", "Mercredi", "Jeudi"); 
	array_push($tab, "Vendredi"); 

La valeur _Vendredi_ a été ajoutée en dernière position du tableau.

### La fonction `array_pop()` 

Extrait le dernier élément d'un tableau et le supprimé du tableau : 

	$tab = array("Lundi", "Mardi", "Mercredi"); 
	$jour = array_pop($tab); 

Après cette opération, `$tab` ne contient plus que _Lundi_ et _Mardi_.

### La fonction `array_unshift()` 

Ajoute un ou plusieurs éléments en début de tableau :

	$tab = array("Jeudi", "Vendredi"); 
	array_unshift($tab, "Lundi", "Mardi", "Mercredi"); 

Après cette opération `$tab` contient _Lundi_, _Mardi_, _Mercredi_, _Jeudi_, _Vendredi_, dans cet ordre. 

### La fonction `array_shift()` 

Dépile un élément (et un seul) en début du tableau 

	$tab = array("Jeudi", "Vendredi"); 
	$jour = array_shift($tab); 

Après cette opération, `$tab` contient _Vendredi_ et la variable `$jour` contient _Jeudi_.

### La fonction `unset()` 

Pour retirer un élément d'un tableau, quelque soit sa position, il faut utiliser la fonction `unset()` :

**Exemple :**

    $tab = array("Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"); 

    // Suppression de l'élément 2 (Mercredi)
    unset($tab[2]);

Désormais, `var_dump($tab);` donne :

	array (size=4)
	  0 => string 'Lundi' (length=5)
	  1 => string 'Mardi' (length=5)
	  3 => string 'Jeudi' (length=5)
	  4 => string 'Vendredi' (length=8)

On constate que les index numériques ne se suivent plus, ce qui peut parfois poser problème dans certains cas (par exemple exécution d'une boucle `for` qui parcourt le tableau de 1 en 1). Pour y remédier, il faut procéder à la réindexation du tableau avec la fonction `array_values()` :

	$tab = array_values($tab);

   `var_dump($tab);` affiche cette fois :

	array (size=4)
	  0 => string 'Lundi' (length=5)
	  1 => string 'Mardi' (length=5)
	  2 => string 'Jeudi' (length=5)
	  3 => string 'Vendredi' (length=8)

## Tris de tableaux 

PHP propose un ensemble complet de fonctions pour le tri des éléments de tableaux. 

### La fonction `sort()` 

Cette fonction vous permet de trier dans l'ordre alphabétique les données de type chaîne d'un tableau, ou par ordre croissant pour les données numériques.
	
    $prenoms = array("Franck", "Laurent", "Caroline", "Magali", "Véronique");	

    sort($prenoms);

	for ($i = 0; $i <= count($prenoms)-1; $i++) 
	{
	   echo $prenoms[$i]."<br>";
	}

Le résultat affiche _Caroline, Franck, Laurent, Magali, Véronique_.

### La fonction `rsort()`; 

Tri décroissant d'un tableau 
	
    $prenoms = array("Franck", "Laurent", "Caroline", "Magali", "Véronique");	

    rsort($prenoms);

	for ($i = 0; $i <= count($prenoms)-1; $i++) 
	{
	   echo ".$prenoms[$i]."<br>";
	}

Le résultat affiche _Véronique Magali Laurent Franck Caroline_.

### La fonction `asort()` 

Tri décroissant sur un tableau associatif, l'indexation des clefs est conservée. Le tri se fait sur les valeurs, pas sur les clés : 

    $tab = array("a" => "Lundi",
                 "b" => "Mardi",
                 "c" => "Mercredi",
                 "d" => "Jeudi",
                 "e" => "Vendredi"
            ); 

    asort($tab);  

	foreach ($tab as $cle => $valeur) 
	{ 
	   echo $cle ." : ".$valeur."<br>"; 
	}

Le résultat donne :
 
	  Jour["a"] = Lundi 
	  Jour["b"] = Mardi 
      Jour["c"] = Mercredi 	
      Jour["d"] = Jeudi
      Jour["e"] = Vendredi

### La fonction `arsort()` 

Tri décroissant sur un tableau associatif, l'indexation des clefs est conservée. Le tri se fait sur les valeurs, pas sur les clés : 

	$tab = array("a" => "Lundi",
                 "b" => "Mardi",
                 "c" => "Mercredi",
                 "d" => "Jeudi");

    arsort($tab);  

	foreach ($tab as $key => $item) 
	{ 
	    echo $key ." : ".$item."<br>"; 
	} 

Le résultat donne : _Jour[c] = Mercredi Jour[b] = Mardi Jour[a] = Lundi Jour[d] = Jeudi_. 

## Autres fonctions

Pour en comprendre le fonctionnement, reproduisez les exemples donnés dans la documentation officielle de ces autres fonctions utiles pour les tableaux PHP :

* `array_reverse()`
* `array_key_exists()`
* `array_keys()`
* `array_merge()`
* `array_diff()`
* `array_intersect()`
* `array_column()`
* `array_count_values()`
* `array_search()`
* `array_slice()`
* `array_splice()`
* `array_unique()`
* `explode()`
* `extract()`
* `implode()` (= `join()`) 
* `list()` 
* `in_array()`
* `shuffle()`
* [Vous en voulez encore ?](http://php.net/manual/fr/ref.array.php) 

## Exercices

> Cet exercice est issu d'un cas réel de développement d'une application de gestion de plannings. 

* Le tableau `$a` ci-dessous représente les plannings de groupes de stagiaires. 
* Le code _19XXX_ représente le numéro de groupe.
* Les positions correspondent aux numéros de semaines dans l'année (peu importe quelle année).
* Les valeurs vides (`""`) en début et fin de tableau indiquent respectivement que la formation n'a pas commencé / est terminée.
* Quand une formation a débuté, les cellules vides indiquent des vacances. 

		$a = array("19001" => array("Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "", "", "Centre", "Centre", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Validation", "Validation"), 
	           "19002" => array("Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Validation", ""), 
	           "19003" => array("", "", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Centre", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "Stage", "", "", "Validation") 
	         );

### Exercice 0 

Testez les différents exemples du cours, à l'aide de la fonction `var_dump()`.  

### Exercice 1

Quelle semaine a lieu la validation du groupe 19002 ?

### Exercice 2

Trouver la position de la dernière occurrence de _Stage_ pour le groupe 19001. 

### Exercice 3

Extraire, dans un nouveau tableau, les codes des groupes.

### Exercice 4

Combien de semaines dure le stage du groupe 19003 ?

**Présentez votre travail à un formateur.**