# Ecrire des requêtes SQL

## Objectifs

A partir d'un dossier de conception relatif à une application informatique et une base de données relationnelle, vous devez extraire des données :

* selon un ou plusieurs critères de sélection,
* en utilisant les jointures, les fonctions de regroupement mais aussi les fonctions proposées par le moteur de base de données,
* en codant la sélection en langage de requête SQL (LMD).

Vous devez également vous préoccuper d'optimiser les temps d'exécution des requêtes en utilisant par exemple des sous-requêtes.

A l'issue de cette séance, vous serez capable de :

* Formaliser des requêtes avec l'algèbre relationnelle
* Coder des requêtes de manipulation de données avec le langage SQL

<br>

## Cheminement

Les données des entreprises sont en général stockées dans des bases de données relationnelles.

La partie LMD (Langage de Manipulation de Données) du langage SQL permet d'extraire et de manipuler les données issues des SGBDR.

Vous allez découvrir dans les phases suivantes les instructions d'extraction.

* `SELECT`
* `FROM`
* `WHERE`
* `ORDER BY`
* `JOIN` 
* `GROUP BY`
* `HAVING`

<br>

### Phase 1

<div class="alert alert-info">Installez <a href="scripts/BDD_gescom_afpa_complete.sql">cette version de la base Gescom</a> afin d'avoir une base et un jeu de données cohérent et identique pour tous les stagiaires.</div>

* [l'instruction `SELECT` et ses différentes clauses](01_select.html)
* [les opérateurs](https://fr.wikibooks.org/wiki/MySQL/Op%C3%A9rateurs)
* [les jointures](02_jointures.html) 
* [les fonctions](03_fonctions.html)
* [`GROUP BY` et `HAVING`](04_group_by.html)
* [les sous-requêtes](05_sous_requetes.html)

<br>

### Ressources

* [Le langage DML partie II](lmd.html)
* Lisez le support [le langage DML](lmd.html) (concernant les instructions `UPDATE` et `DELETE`) 

<br>