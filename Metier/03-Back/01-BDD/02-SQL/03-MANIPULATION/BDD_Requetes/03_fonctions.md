# Langage de manipulation de données

<table>
	<thead>
		<tr>
		<th></th>
		<th></th>
		</tr>
	</thead>
	<tbody>
		<tr>
		<td></td>
		<td></td>
		</tr>
		<tr>
		<td></td>
        <td></td>
		</tr>
		<tr>
	    <td></td>
        <td></td>
	    </tr>
	    <tr>
	    <td></td>
        <td></td>
	    </tr>
	    <tr>
	    <td></td>
        <td></td>
	    </tr>
	    <tr>
	    <td></td>
        <td></td>
	    </tr>
	</tbody>
</table>

## Les fonctions 

SQL offre la possibilité d'intégrer dans les expressions des fonctions retournant :

* Une valeur dépendant du contenu de colonnes (fonction sur les colonnes)
* Une valeur dépendant d'opérandes (fonctions scalaires)

> NB : à utiliser avec précaution ! Dans ce domaine des fonctions intégrées de chaque SGBD apporte son lot d'extensions par rapport aux standards du langage SQL.

**Exemple 1**

Lister le salaire maximum du département 45 :
	
	SELECT MAX(SALAIRE) 
    FROM employes
	WHERE wdept = '45'

Lorsqu'une fonction d'agrégation est exécutée, SQL effectue la synthèse des valeurs d'une colonne spécifique pour la table complète ou pour des groupes de lignes de la table (clause `GROUP BY`) : une valeur d'agrégation unique est alors générée pour la table complète ou pour chaque groupe de lignes.

**Exemple 2** 

Lister le nombre de caractères du nom des employés :

	SELECT LENGTH(nom) FROM employes

Les fonctions scalaires effectuent une opération sur une valeur unique et renvoie ensuite une valeur unique. Elles peuvent être utilisées pour autant que l’expression est valide.
 
### Les fonctions d'agrégation

Les fonctions d'agrégation effectuent un calcul sur un ensemble de valeurs et renvoient une valeur unique. 

A l'exception de la fonction `COUNT(*)`, les fonctions d'agrégation ignorent les valeurs `NULL`. 

Pour les fonctions pour lesquelles ces valeurs sont précisées :

`DISTINCT` spécifie que la fonction doit seulement être appliquée à chaque instance unique d'une valeur, quel que soit le nombre d'occurrences de la valeur. 

`AVG ([ALL | DISTINCT] expr )`
Calcul de la moyenne des valeurs de la collection de nombres précisés par l'expression entre parenthèses.

	SELECT AVG(salaire) FROM employes

ou :

	SELECT AVG(DISTINCT salaire) FROM employes

`SUM ([ALL | DISTINCT] expr )`

Somme des valeurs des nombres d'une colonne de type numérique

	SELECT SUM(salaire) FROM employes
	WHERE wdept = '45'

`MAX(expr ) et MIN(expr )`

Obtention de la valeur maximum (minimum) d'une collection de valeurs.

`COUNT (*)`

Dénombrement d'une collection de lignes 

	SELECT COUNT(*) FROM employes

La fonction `COUNT` renvoie le nombre d'employés. 

La fonction `COUNT(*)` ne requiert aucun paramètre et calcule le nombre de lignes de la table spécifiée sans supprimer les doublons. Elle compte chaque ligne séparément, même les lignes contenant des valeurs `NULL`. 

	COUNT ([DISTINCT] expr )

Dénombrement de toutes les expressions non nulles ou non nulles uniques 

	SELECT COUNT(DISTINCT wdept) FROM employes

La fonction `COUNT` renvoie le nombre de département non nuls uniques. 

### Les fonctions scalaires mathématiques

Les fonctions scalaires effectuent une opération sur une valeur ou sur un nombre fixe de valeurs, et non sur une collection de valeurs.

Les fonctions scalaires mathématiques effectuent un calcul, généralement basé sur les valeurs d'entrée transmises comme arguments et elles renvoient une valeur numérique

Mathématiques | Description
--- | ---
`ABS (expr )` | valeur absolue 
`CEILING (expr ), FLOOR(expr )` | Plus petit (grand) entier supérieur(inférieur) ou égal à expr
`SIGN (expr )` | Renvoie 1 si expr positive, -1 si expr est négative, 0 si nulle
`SQRT (expr )` | racine carrée
`POWER (expr,n )` |  élève expr à la puissance n
`SQUARE (expr )` |  calcul le carré de expr
`SIN(expr ), COS(expr ), TAN(expr ), COTAN(expr )` | 
`ASIN(expr ), ACOS(expr ), ATAN(expr )` | 
`PI()`  | renvoie la valeur PI : 3.14159265358979
`DEGREES(expr ),RADIANS(expr )`  | Conversion de degrés (radians) en radians (degrés)
`LOG(expr ), EXP(expr ), LOG10(expr )` | 
`RAND (expr )` |  rend un nombre aléatoire entre 0 et 1 , expr représente la valeur de départ
`ROUND (expr, n )`  | arrondit expr à la précision n
 
### Les fonctions scalaires de chaîne

Les fonctions scalaires de chaîne effectuent une opération sur une valeur d'entrée de type chaîne et renvoient une valeur numérique ou de type chaîne.

Fonction  | Description
--- | ---
`CHAR (expr), NCHAR (expr)` | Convertit expr en un caractère ASCII ou un caractère UNICODE <br>`CHAR(65) donne A`
`ASCII (expr), UNICODE (expr)` | Renvoie le code ASCII ou unicode de expr <br>`ASCII (A) donne 65`
`LENGTH (expr)` | Renvoie le nombre de caractères d’une expression de chaîne <br>`LEN ('MARTIN') donne 6`
`LOWER (expr), UPPER (expr)`  | Renvoie expr après avoir transformé les caractères majuscules en caractères minuscules, ou monuscules en majuscules <br>`LOWER ('MARTIN') donne martin` `UPPER ('martin') donne MARTIN`
`LEFT (expr, n) RIGHT (expr, n)` | Renvoie les n caractères les plus à gauche (droite) de expr <br>`LEFT (‘MARTIN’, 2) donne MA` `RIGHT (‘MARTIN’, 2) donne IN`
`LTRIM (expr), RTRIM (expr)` | Supprime les espaces à gauche (droite) de expr <br>`LTRIM (‘  MARTIN’) donne MARTIN` `RTRIM (‘MARTIN  ’) donne MARTIN`
`SUBSTRING (expr, p, n)` | Renvoie n caractères de la chaîne. expr  à partir de la position spécifiée par p <br>`SUBSTRING (‘HUGO’, 2, 3) donne 'UGO'`

### Les fonctions scalaires de date et heure

Les fonctions scalaires de date et heure effectuent une opération sur une valeur d'entrée de type date et heure et renvoient soit une valeur numérique, de type date ou heure, ou de type chaîne. 

`CURRENT_TIMESTAMP` Renvoie la date et l’heure courante 

`DAY (expr), MONTH (expr), YEAR (expr) ` Obtention d'un jour, mois ou année à partir de expr	

`DAY (CURRENT_TIMESTAMP)` donne le jour courant

`YEAR (CURRENT_TIMESTAMP)` extrait l'année courante


`DATEDIFF( date_début , date_fin)`
Renvoie un entier spécifiant le nombre de jours compris entre date_début et date_fin.

`DATEDIFF (‘21/06/2001’, 01/07/2001’ )` renvoie 10

`DATEDIFF (‘21/06/2001’, ‘01/01/2002’)` renvoie 7
 
### Les fonctions de conversion

Conversion explicite d’une expression d'un type de données en une expression d'un type de données différent.

`CONVERT (expr, type_de_donnée)`

Permet de convertir l’expression dans le type spécifié.