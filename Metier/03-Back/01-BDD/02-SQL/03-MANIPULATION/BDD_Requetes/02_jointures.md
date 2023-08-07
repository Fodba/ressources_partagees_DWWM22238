# Langage de manipulation de données
 
## L'opérateur de jointure `JOIN`

Une jointure est une opération qui permet d'interroger plusieurs tables en relation pour obtenir un jeu de résultats unique intégrant des lignes et des colonnes de chaque table.

La plupart des conditions de jointure sont basées sur la **clé primaire** d'une table et la **clé étrangère** d'une autre table, c'est-à-dire les relations. 

Quand la jointure se fait sur des tables ayant des noms de colonnes identiques, les noms en double doivent être préfixés par leur nom de table ou un nom associé.

Il existe trois types de jointure : 

* les jointures internes
* les jointures externes 
* les jointures croisées

**Syntaxe**

	SELECT nom_colonne1, nom_colonne2, ... nom_colonne n
	FROM nom_table1
	[INNER | {LEFT | RIGHT | FULL} [OUTER]} JOIN
	nom_table2 ON conditions _recherche

* Le mot clé `JOIN` et ses options spécifient les tables à joindre et la manière de les joindre.
* Le mot clé `ON` spécifie les colonnes communes aux tables.

La plupart des conditions de jointure sont basées sur l'égalité entre la clé primaire d'une table avec la clé étrangère d'une autre table.

<div class="alert alert-danger">A retenir : dans une jointure, l'adjectif <i>gauche</i> désigne la table la plus à gauche, celle qui est précédée de l'instruction <code>FROM</code>, tandis que la <i>droite</i> représente la table visée par une l'instruction <code>JOIN</code>.</div>

###	Utilisation des jointures internes

**Exemple**

Liste des employés avec le nom du département dans lequel ils sont affectés :

	SELECT nom, prenom, salaire, nomdept 
    FROM employees
	INNER JOIN depart ON wdept = nodept

La jointure interne renvoie uniquement les lignes en correspondance.

On aurait pu aussi coder la requête suivant la syntaxe suivante :

	SELECT nom, prenom, salaire, nomdept
	FROM employes, depart
	WHERE wdept = nodept

###	Utilisation des jointures externes gauche ou droite

* La jointure externe gauche `LEFT JOIN` permet d’afficher toutes les lignes de la première table nommée (table située à gauche de la clause JOIN).
* La jointure externe droite `RIGHT JOIN` permet d’afficher toutes les lignes de la seconde table nommée (table située à droite de la clause JOIN).
* La jointure externe complète `FULL OUTER JOIN` renvoie les lignes en correspondance `INNER JOIN` + les lignes sans correspondance des 2 tables.

**Exemple**

Liste des employés avec le nom du département dans lequel ils sont affectés :

	SELECT nom, prenom, salaire, nomdept 
	FROM employes
	LEFT JOIN depart ON wdept = nodept

La jointure externe renvoie toutes les lignes de la table `employes`. La colonne `nomdept` contient la valeur `NULL` pour les départements n'existant pas dans la table `depart`.
 
###	Jointure de plus de deux tables

Il est possible de joindre jusqu'à **256 tables** dans une seule requête !

L'utilisation de plusieurs jointures peut être ramenée à une combinaison de jointures indépendantes :

**Exemple : jointure entre les tables A, B et C** 

La première jointure combine les tables **A et B** pour produire un jeu de résultats, lui-même combiné à la table **C** dans la deuxième jointure pour produire le jeu de résultats final.

La requête pourra se coder sous la forme :

	SELECT colonne_1, colonne_2, ..., colonne_n
	FROM table_1
	JOIN table_2 ON table_1.colonne_i = table_2.colonne_j
	JOIN table_3 ON table_2.colonne_x = table_3.colonne_y

La qualification des colonnes est nécessaire lorsque deux tables possèdent des colonnes de même nom.

###	L'auto-jointure

Pour trouver des lignes ayant des valeurs en commun avec d'autres lignes de la même table, une table peut être jointe avec une autre instance d'elle-même

* **Des alias de tables sont nécessaires pour référencer deux copies de la table**. Un alias de table est spécifié dans la clause `FROM` après le nom de la table.
* Il peut être nécessaire d'utiliser des conditions dans la clause `WHERE` pour exclure les lignes en double.

**Exemple**

Liste des employés ayant le même prénom 

	SELECT a.nom, b.prenom, a.wdept 
	FROM employes a
	JOIN employes b ON a.prenom = b.prenom
	WHERE a.nom <> b.nom

## Les différents types de jointure

![images/join.jpg](images/join.jpg)

<table>
<thead>
<tr>
<th>Type</th>
<th>Résultats obtenus</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>LEFT JOIN</code></td>
<td> Sélectionne l'enregistrement de la première table (la plus à gauche) avec les enregistrements correspondants de la droite.</td>
</tr>
<tr>
<td><code>JOIN</code></td>
<td>Sélectionne des enregistrements ayant des valeurs correspondantes dans l'ensemble des tables.</td>
</tr>
<tr>
<td><code>FULL JOIN</code></td>
<td>Sélectionne tous les enregistrements correspondant aux enregistrements de gauche ou de droite.</td>
</tr>
<tr>
<td><code>RIGHT JOIN</code></td>
<td>Sélectionne l'enregistrement de la deuxième table (la plus à droite) avec les enregistrements de table correspondants de gauche.</td>
</tr>
<tr>
<td><code>NATURAL JOIN</code></td>
<td>+++ TODO +++</td>
</tr>
<tr>
<td><code>CROSS JOIN</code></td>
<td>+++ TODO +++</td>
</tr>
</tbody>
</table>

<br><br><br><br>