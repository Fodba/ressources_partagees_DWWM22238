# La clause `GROUP BY` 

### Définition 

Ces options permettent de définir et de traiter des groupes. Un groupe est formé à partir d'un ensemble de lignes d'une table ayant une ou plusieurs caractéristiques (valeurs) communes.

+++ TODO : exemple +++ 

L'intérêt d'un groupe est de conserver la trace des éléments qu'il contient, par exemple pour les dénombrer ou effectuer des opérations telles que somme ou moyenne.

## Pré-requis : variable de configuration `ONLY_FULL_GROUP_BY` 

<div class="alert alert-danger">Ce cours est adapté aux versions de MySql supérieure à 5.7.5 - et donc MySql 8 - qui implémente la configuration <code>ONLY_FULL_GROUP_BY</code>.</div>

Cette configuration plutôt contraignante par défaut du serveur MySql produit le message d'erreur suivant lors de l'utilisation de la clause `GROUP BY` :

	Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'XXXXX' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by

L'erreur est due au fait que MySql ne sait pas quelles lignes choisir pour le regroupement. On aurait aimé vous mettre un exemple plus démonstratif mais nous ne sommes pas sûr que ça vous éclaire davantage car nous non plus nous n'avons pas tout bien compris. 

Il existe 2 solutions pour y remédier :

**Solution 1**

Les requêtes doivent être écrites en tenant compte de la configuration `ONLY_FULL_GROUP_BY`, c'est-à-dire que chaque colonne appelée par l'instruction `SELECT`, à l'exception de la colonne qui se voit appliquée la clause `GROUP_BY`, doit se voir appliquer une fonction d'agrégation telle que `SUM()`, `MAX()`/`MIN()`, `COUNT()` etc. ou, à défaut, la fonction `ANY_VALUE()` (exemples plus loin dans ce cours).  

**Solution 2**

Désactiver totalement la configuration `ONLY_FULL_GROUP_BY` : cela supprime les contraintes d'agrégation des colonnes. Cela peut très bien fonctionner dans la phase dévelopement de votre projet, mais il existe le risque que vos requêtes ne sortent pas les mêmes résultats (en outre les différences seront dificilement identifiables) lors de la livraison si le serveur de production ne eput pas avoir la même configuration.  

Commande pour désactiver l'option `ONLY_FULL_GROUP_BY` :

	SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));

Cette commande remplace la valeur `ONLY_FULL_GROUP_BY` de la variable `sql_mode` par vide. 

Pour rétablir l'option, aller dans PhpMyAdmin, niveau serveur, onglet _Variables_, dans le chmpa _Contenant le mot_ rechercher `sql_mode`. Cliquer sur _Editer_, dans le champ saisir _ONLY_FULL_GROUP_BY_ puis cliquer sur _Enregistrer_ :

![images/only_full_group_by.jpg](images/only_full_group_by.jpg)

## Alors que faire ?

<div class="mt-3 alert alert-success">L'option à retenir est donc la solution 1 : utilisation de la fonction `ANY_VALUE()` sur les colonnes qui ne font pas l'objet d'une autre fonction d'aggrégation.</div>
 
*Ressources :*

* [Grafikart](https://www.grafikart.fr/tutoriels/only-full-group-by-sql-1206) 
* [Documentation officielle](https://dev.mysql.com/doc/refman/5.7/en/group-by-handling.html)
* [la fonction `ANY_VALUE()`](https://dev.mysql.com/doc/refman/5.7/en/miscellaneous-functions.html#function_any-value)

### Utilisation de `GROUP BY`

L'intérêt d'un groupe est de conserver la trace des éléments qu'il contient, par exemple pour les dénombrer ou effectuer des opérations telles que somme ou moyenne (fonctions d'agrégation).

Il y a autant de groupes que de valeurs de `wdept` distinctes.

Ces groupes apparaissent en séquence croissante car un classement est nécessaire en interne pour constituer les groupes.

`GROUP BY` est suivi du nom d'une ou plusieurs colonnes présentes dans le `SELECT` appelées colonnes de regroupement. 

La liste de colonnes suivant `SELECT` ne peut comporter que les noms des colonnes de regroupement, ou des noms de fonctions.

**Exemple**

Quel est le salaire moyen et le salaire minimum des employés à l'intérieur de chaque département pour les n° employés > 00010
 
	SELECT  wdept, AVG(salaire), MIN(salaire) 
	FROM employes 
	WHERE NOEMP > 00010
	GROUP BY wdept 

* Les colonnes ` wdept` et `salaire` sont sélectionnées seulement pour les N° d'employés supérieurs à 00010.
* Ces lignes sont triées dans la séquence `GROUP BY`
* La moyenne et le Min des salaires sont calculés, et une ligne par groupe est générée. 
 
### La clause `HAVING`

**La clause `HAVING` est utilisée en conjonction avec la clause `GROUP BY`.**

La clause `HAVING` agit comme critère de sélection pour les groupes renvoyés avec la clause `GROUP BY`.

**Exemple 1**

Quel est le salaire moyen et le salaire minimum des employés à l'intérieur de chaque département pour les n° employés > 00010 ?

Lister uniquement les groupes pour lesquels la moyenne est supérieure a 16 000 :

	SELECT  wdept, AVG(salaire), MIN(salaire) 
    FROM employes
	WHERE noemp > 00010
	GROUP BY wdept
	HAVING AVG(salaire) >= 16000

La condition de recherche suivant HAVING ne peut porter que sur des colonnes de regroupement définies par la clause `GROUP BY`, ou sur des fonctions.

**! Il ne faut pas confondre les clauses WHERE et HAVING**

* `WHERE` permet de sélectionner des lignes avant la formation des groupes.
* `HAVING` permet de ne retenir que certains des groupes constitués par la clause `GROUP BY`.

	SELECT wdept, AVG(salaire), MIN(salaire)
	FROM employes
	WHERE noemp > 00010
	GROUP BY wdept
	HAVING AVG(salaire) >= 16000 

Les étapes suivantes sont réalisées :

**1.**	Les colonnes` wdept` et salaire sont sélectées seulement pour les N° d’employées supérieurs à 00010.

**2.**	Ces lignes sont triées dans la séquence `GROUP BY`.

**3.**	La moyenne et le minimum des salaires sont calculés.

**4.**	Seuls les groupes ayant une moyenne des salaires supérieure à 1600 sont renvoyés.

**Exemple 2**

Quelle est la moyenne des salaires, le salaire minimum des employés des départements ayant plus d'un salarié ?

	SELECT wdept, AVG(salaire), MIN(salaire) 
    FROM employes
	WHERE noemp > 00010
	GROUP BY wdept
	HAVING COUNT(*) > 1