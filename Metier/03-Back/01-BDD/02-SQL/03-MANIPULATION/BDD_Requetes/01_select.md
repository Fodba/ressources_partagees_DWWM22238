# Langage de manipulation de données

## Présentation

Après étude de ce document, vous serez capable de traduire en langage SQL un besoin de sélection de données stockées dans une base de données relationnelle.

MySQL permet d'effectuer l'interrogation des données à travers la commande de sélection de données SQL spécifique `SELECT` du LMD SQL. 

Cette commande `SELECT` permet d'affiner précisément le résultat obtenu et de reconstituer l'information globale disséminée dans les différentes tables (notion de jointure). Pour ce faire, la commande SQL `SELECT` présente de nombreuses variantes et options. 

Cette séance couvre l'ensemble des variantes et options de la commande `SELECT` mais tout cela demande un peu d'entraînement avant de pouvoir traduire correctement un besoin de sélection de données en ordres SQL.

Nous vous conseillons de parcourir une première fois le document dans son ensemble, puis de rechercher au cas par cas les informations nécessaires lors de la résolution de requêtes.

## L'instruction `SELECT` 

Cette commande permet la recherche d'informations en sélectionnant les données selon divers critères.

    SELECT <NOMS DE COLONNES OU EXPRESSIONS>
    FROM <NOMS DE TABLES>
    WHERE <CONDITIONS DE RECHERCHE>
    GROUP BY <NOMS DE COLONNE DU SELECT>
    HAVING <CONDITION DE RECHERCHE>
    ORDER BY <NOM OU POSITION DE COLONNE> 

Le résultat de la commande `SELECT` est une table, sous-ensemble de la (ou des) table(s) de départ :

* dont les colonnes dépendent des rubriques citées après `SELECT` (colonnes directement issues de la table d'origine, valeurs calculées, constantes, etc. ...)
* dont les lignes satisfont tant par leur contenu que pour leur présentation, aux options suivant, le cas échéant, le nom de la table.

**Exemple 1** 

Lister le contenu de la table _employes_ : 

    SELECT * FROM employees

L'astérisque (*) inséré dans la liste de sélection permet d'extraire toutes les colonnes d'une table.

**Exemple 2** 

Afficher les noms des employés contenus dans la table _employees_ :

    SELECT emp_lastname 
    FROM employees

> Une bonne pratique consiste à mettre chaque instruction SQL sur une ligne différente, cela facilite grandement la lecture d'une requête complexe.

**Exemple 3** 

Lister le nom et le salaire des employés de la table _employees_ :

    SELECT emp_lastname, emp_salary 
    FROM employees

### L'instruction `SELECT` avec expression

Une ou plusieurs expressions peuvent suivre le mot-clé `SELECT`. Une expression spécifie un mode de calcul.

Elle peut être :

* Un nom de colonne
* Une constante (numérique ou chaîne de caractères)
* Une fonction (`CURRENT_TIMESTAMP`, `GETDATE()`...)
* Une combinaison de ces valeurs séparées :

	* par l'opérateur de concaténation + (chaînes de caractères)
	* par l'un des opérateurs arithmétiques binaires (*, /, +, - évalués dans cet ordre) ou unaires (+, -) (numériques). 

Si l'un des opérandes a la valeur `NULL`, le résultat de l'expression est `NULL`.

EXEMPLE : Lister le nom et le salaire en centimes de chaque employé.

	SELECT CONCAT(emp_lastname,' ', emp_firstname), 'salaire :', emp_salary * 100, ' euros'
	FROM employees

La lisibilité des noms de colonne peut être améliorée en utilisant le mot clé `AS` (pour _alias_ : les noms de colonne par défaut seront remplacés par des alias dans la liste de sélection. 

	SELECT CONCAT(emp_lastname,' ', emp_firstname), AS 'nom du salarié', emp_salary * 100 AS ' euros'
	FROM employees

## L'option `DISTINCT`

L'option `DISTINCT` permet de n'afficher qu'une seule fois une même valeur qui concerne plusieurs lignes dans une table.

**Exemple**

Afficher les différents magasins que l'on peut trouver dans la table _employees_ :

	SELECT DISTINCT emp_shop_id 
    FROM employees

### La clause `LIMIT`

**Exemple**

Lister les 5 premiers employés de la table _employees_ :

	SELECT emp_lastname, emp_firstname
    FROM employees
    LIMIT 5

> [En savoir plus](https://sql.sh/cours/limit)

### La clause `WHERE`

La clause `WHERE` permet de préciser les conditions de recherche sur les lignes d'une table.

Les conditions peuvent contenir une liste illimitée de prédicats – expressions renvoyant la valeur `TRUE` (vrai), `FALSE` (faux) ou `UNKNOWN` (inconnu) , combinés à l'aide des opérateurs logiques `AND` ou `OR` .

	PRIX < 100.00 OR PRIX > 135.00
	NOT (AUTEUR = 'DUMAS')

**Conditions de recherche de la clause `WHERE`** 

Pour spécifier la condition de recherche dans la clause `WHERE`, on utilise indifféremment l'un des opérateurs conditionnels ci-après :

Description | Opérateurs conditionnels 
------ | -------
Opérateurs de comparaison | =, <>, >, >=,  <, <=,  
Comparaisons de plage | `BETWEEN` et `NOT BETWEEN `
Comparaisons de listes | `IN` et` NOT IN` 
Comparaisons de chaîne de caractères | `LIKE` et `NOT LIKE` 
Valeurs inconnues | `IS NULL` et `IS NOT NULL` 

Pour utiliser les opérateurs de comparaison
 
* Les 2 expressions doivent être de même type
* Les nombres sont comparés selon leur valeur algébrique (conversion)
* Les chaînes de caractères sont comparées de gauche à droite.
* Les données de type _char_, _nchar_, _varchar_, _nvarchar_, _text_, _datetime_ et _smalldatetime_ doivent être encadrées par des apostrophes.

**Exemple 1**

Pour effectuer une recherche sur plusieurs colonnes : on utilise l'opérateur `AND`. 

Rechercher dans la table _employees_, les données concernant les employés de sexe féminin qui travaillent dans le magasin 1 :
 	
    SELECT * 
    FROM employees 
    WHERE emp_gender = 'F' 
    AND emp_shop_id = 1

> On peut utiliser autant de `AND` que nécessaire sauf que plus on affine les critères plus le risque que la requête ne sorte pas de résultats augmente.  

**Exemple 2**

Pour effectuer une recherche sur des valeurs différentes dans une même colonne, on utilise l'opérateur `OR`.   

Rechercher dans la table _employees_, les données concernant les employés qui travaillent dans les magasins 1 et 3

	SELECT * 
    FROM employees 
    WHERE emp_shop_id = 1 
    OR emp_shop_id = 3
 
> Attention à la formulation de la question où il est écrit _dans les magasins 1 **et** 3_ qu'il faut pourtant bien traduire traduire par _magasins 1 **et** 3_.

**Exemple 3**

Rechercher dans la table _employes_, les données concernant les employés dont le matricule est supérieure à 10 et dont le salaire est égal à 13000.
 
	SELECT emp_lastname, emp_salary, emp_id 
    FROM employees
	WHERE emp_id > 19 
    AND emp_salary = 15240

**Exemple 4**

Rechercher dans la table _employees_, les données concernant les employés dont le salaire est égal à 22500 ou 23000 et dont l'id est supérieur à 10

	SELECT * 
    FROM employees
	WHERE (emp_salary = 22500 OR emp_salary = 23000) 
	AND emp_id > 10

Ici, les opérateurs `OR` et `AND` sont combinés, mais il est nécessaire d'isoler les conditions du `OR` dans un groupe de parenthèses. 

#### L'opérateur `BETWEEN`

L'opérateur `BETWEEN` de la clause `WHERE` permet d'extraire des lignes appartenant à une plage de valeurs donnée.

Lister le prénom et le nom des employés dont le salaire est compris entre 20000 et 30000 euros. 

	SELECT emp_firstname, emp_lastname, emp_salary 
    FROM employees
	WHERE emp_salary BETWEEN 20000 AND 30000

* `BETWEEN` précise les bornes (comprises) entre lesquelles s'effectuera la sélection.
* `NOT BETWEEN` précise les bornes en dehors desquelles s'effectuera la sélection.

On aurait pu écrire :

	SELECT emp_firstname, emp_lastname, emp_salary 
    FROM employees
	WHERE emp_salary >= 20000 
    AND emp_salary <= 30000

#### L'opérateur `LIKE`

L'opérateur `LIKE` de la clause `WHERE` conjointement aux caractères génériques, permet de comparer des chaînes de caractères inexactes.

Pour une comparaison de chaîne exacte, remplacer l'opérateur `LIKE` par un opérateur de comparaison, par exemple, utiliser `nom = 'BALZAC'` plutôt que `nom LIKE 'BALZAC'`.

`LIKE` ne peut être utilisé qu'avec des données de type _char_, _nchar_, _varchar_, _nvarchar_ ou _datetime_.

Types de caractères génériques

Caractères génériques	|		Description
--- | ---
%		|				N'importe quelle chaîne comprise entre zéro et plusieurs caractères
_ (trait de soulignement)	|		N’importe quel caractère unique
[ ]			|			N'importe quel caractère unique dans la plage (par exemple [s-w] ou [aeiouy])
[^]			|			N'importe quel caractère unique n’appartenant pas à la plage (par exemple [^s-w] ou [^aeiouy])

**Exemple** 

Lister les données de la table _employees_ dont le nom commence par la lettre _B_ :
 
	SELECT * 
    FROM employees
    WHERE emp_lastname LIKE 'B%'

**Autres exemples**

* `LIKE 'BAL%'` : tous les noms commençant par les lettres _BAL_
* `LIKE '%BAL%'` : tous les noms contenant les lettres _BAL_
* `LIKE '--LZ--'` : tous les noms de 6 caractères contenant _LZ_ en 3ème et 4ème positions
* `LIKE '[S-V]ENT'` : tous les noms de 4 lettres se terminant par les lettres _ENT_ et commençant par n'importe quelle lettre comprise entre _S_ et _V_.

L'instruction `NOT LIKE` est l'inverse de `LIKE`. 

**Exemple**

La requête suivant e affichera tous les noms qui ne contiennent pas les lettres _BAL_ :

	SELECT * 
    FROM employees
    WHERE emp_lastname NOT LIKE '%BAL%'

#### Le prédicat `IS NULL`

L'opérateur `IS NULL` de la clause `WHERE` est utilisé pour extraire des lignes pour lesquelles il manque des informations dans une colonne donnée.

Une colonne prend la valeur `NULL` si aucune valeur n'y est entrée au moment de la saisie des données et si aucune valeur par défaut n'a été définie pour cette colonne 

> Pour qu'une valeur soit enregistrée comme nulle, il faut que le type de colonne ait été défini comme tel lors de la création de la table/colonne.

**Exemple**

Lister le nom et le prénom des employés qui n'ont pas de numéro de téléphone :
 
	SELECT emp_lastname, emp_firstname 
    FROM employees 
	WHERE emp_phone IS NULL

On pourrait vouloir le contraire, c'est-à-dire extraire les valeurs qui ont été renseignées, en l'occurrence les employés qui ont un numéro de téléphone : on utilise pour cela l'instruction `NOT NULL`.

	SELECT emp_lastname, emp_firstname 
    FROM employees 
	WHERE emp_phone IS NOT NULL

## LES AUTRES CLAUSES DU SELECT

### La clause `ORDER BY`

La clause `ORDER BY` permet de préciser une séquence de tri (classement) pour le résultat d'une requête.

* `ASC` séquence croissante : c'est la valeur par défaut, il n'est donc pas utile de l'indiquer
* `DESC` séquence décroissante

**Exemple 1**

Lister le contenu de la table _employees, trié par nom croissant et ville décroissante :

	SELECT emp_lastname, emp_firstname, emp_city 
    FROM employees
	ORDER BY emp_lastname ASC, emp_city DESC

est donc équivalent à (absence du `ASC` pour le nom) :

	SELECT * 
    FROM employees
	ORDER BY emp_lastname, emp_city DESC

<div class='alert alert-danger'>La clause <code>ORDER BY</code> doit être la dernière clause dans l'ordre <code> SELECT</code> et peut être spécifiée avec n'importe quelle colonne.</div>
 
**Exemple 2**

Lister par salaire décroissant, le prénom, le nom, et ville décroissante des employés.

	SELECT emp_salarY, emp_firstname, emp_lastname 
    FROM employees
	ORDER BY 1 DESC, emp_city DESC

La valeur `NULL` occupe la position la plus élevée.

## Les alias (l'instruction `AS`) 

[Les alias](https://sql.sh/cours/alias) ou [encore](https://fr.wikibooks.org/wiki/MySQL/Alias) 

<br><br><br><br>