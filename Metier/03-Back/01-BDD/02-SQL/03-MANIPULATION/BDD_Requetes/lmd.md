# LE LANGAGE DML: Mise à jour des données

 
Pour modifier les données d'une base, l'utilisateur dispose de 3 ordres SQL :
- `INSERT` 
- `UPDATE`
- `DELETE`

## INSERT
L'ajout de lignes dans une table (ou une vue) répond à la syntaxe suivante :


	INSERT INTO NOM_DE_TABLE (NOMS DE COLONNES)
	VALUES (LISTE DE VALEURS)


Le mode principal dans l'ordre `INSERT` pour ajouter des lignes est l'insertion directe avec la clause VALUES

L'attribution de valeurs est faite aux colonnes.

__Exemples__

	EMPLOYES et DEPART de structure
	EMPLOYES (NOEMP, NOM, PRENOM, DEPT, SALAIRE)
	DEPART (NODEPT, NOMDEPT)


Insérer l'employé _00140_, de nom _REEVES_, de prénom _HUBERT_ dans le département _A00_, de salaire 2100€ :

	INSERT INTO employes (NOEMP, NOM, PRENOM, DEPT, SALAIRE)
	VALUES (00140, 'REEVES', 'HUBERT', 'A00', 2100)

On donne une valeur pour chacun des attributs spécifiés dans l'ordre `INSERT`; les valeurs de la clause `VALUES` doivent correspondre avec la liste des colonnes, les attributs non spécifiés prennent la valeur `NULL`.

Insérer l'employé _00140_, de nom _REEVES_, de prénom _HUBERT_ dans le département _A00_

	INSERT INTO employes (NOEMP, NOM, PRENOM, DEPT)
	VALUES (00140,'REEVES','HUBERT','A00')

La colonne _salaire_ prendra la valeur `NULL` pour cette ligne.
Si cette colonne n'a pas été spécifiée comme pouvant être nulle, une erreur sera générée.
La liste des colonnes peut être omise à condition que l'ordre d'insertion concerne toutes les colonnes de la table.

Nous pouvons insérer plusieurs lignes dans la table (avec un seul `VALUES`) :

	INSERT INTO employes (NOEMP, NOM, PRENOM, DEPT, SALAIRE)
	VALUES 
    (00140,'REEVES','HUBERT','A00', 2100), 
    (00150,'JACQUARD','ALBERT','B00', 1800),
    (00999,'LOPER", 'DAVE', 'C00', 900)

Une colonne ayant une propriété `AUTO_INCREMENT` ne fait pas partie de la liste des colonnes :
On peut toutefois forcer sa valeur en spécifiant la colonne.
 

## UPDATE

L'ordre `UPDATE` est utilisé pour modifier des lignes de tables existantes et est composé de trois clauses :

	UPDATE <NOM DE TABLE>
	SET <NOM COLONNE 1> = <VALEUR 1> [,… <NOM COLONNE n> = <VALEUR n>]
	WHERE <condition>

* `SET` : Nom des colonnes et leurs valeurs ou expressions mises à jour.
* `WHERE` : Critère de sélection pour la mise à jour d'une ligne (optionnel)

__Exemple 1__ : Modifier le salaire de l'employé _LOPER_, qui gagne désormais 1000 € (au lieu de 900 €): 

	UPDATE employes
	SET 
    salaire = 1000
    WHERE nom = 'LOPER'

__Exemple 2__ : Modifier plusieurs valeurs d'un coup (on modifie les nom, prénom et adresse de l'employé 3) :
	
    UPDATE employes
	SET 
    nom = 'LOPER',
    prenom = 'Dave',
    adresse = '15 avenue Tella'
    WHERE noemp = '00999'  

__Exemple 3__ : Augmenter le salaire de 20% de tous les employés 

	UPDATE employes
	SET 
    salaire = salaire * 1.2

> Attention, l'absence de clause `WHERE` impacte donc tous les enregistrements de la table

__Exemple 3__ : Augmenter le salaire de 20% de l'employé de matricule _00040_.

	UPDATE employes
	SET salaire = salaire * 1.2
	WHERE noemp = 00040

__Exemple 4__ : Modifier le salaire (augmentation de 20%) de l'employé de matricule _00040_, et son affectation dans le service _A40_ :

	UPDATE employes
	SET salaire = salaire * 1.2, 
    dept = 'A40'
	WHERE noemp = 00040
 
## DELETE

L'ordre `DELETE` utilise trois clauses pour supprimer une ou plusieurs lignes d'une table.

	DELETE [FROM] <NOM DE TABLE>
	WHERE <CLAUSE>

* `FROM` spécifie le nom de la table ou les lignes seront supprimées
* `WHERE` : spécifie le(s) critère(s) de sélection (optionnel)

> Attention, en l'absence de clause `WHERE`, toutes les lignes seront supprimées (table vide). 

__Exemple 1__ : Supprimer **tous** les employés de la table _EMPLOYES_ :

	DELETE FROM employes

__Exemple 2__ : Supprimer les employés du département _E21_ :

	DELETE FROM employes
	WHERE nodept = 'E21'

__Exemple 3__ : Supprimer les employés du département _E21_ qui habitent Amiens :

	DELETE FROM employes
	WHERE nodept = 'E21'
    AND ville = 'Amiens'
