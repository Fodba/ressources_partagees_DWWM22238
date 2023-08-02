# Créer la base de données > Utilisateurs, privilèges et rôles > Les privilèges

## 1. Création de privilèges

Un privilège est un droit précis accordé à un utilisateur sur une base de données. Il s'agit ici d'appliquer le principe du minimalisme en sécurité en attribuant à l'utilisateur que les opérations dont il a besoin. 

Il faut distinguer 3 niveaux :

* manipulation des données
* gestion d'une base 
* administration du serveur

On peut ainsi autoriser ou interdire à un utilisateur :

* de lire, insérer, modifier ou supprimer des données sur certaines tables
* d'effectuer des actions sur le schéma (structure des tables, colonnes) d'une base
* d'exécuter, créer, modifier ou supprimer des vues, procédures stockées, déclencheurs, transactions 
* de gérer d'autres utilisateurs, rôles et privilèges  

Les privilèges se manipulent avec la commande `GRANT` (= 'accorder' en anglais) :

L'instruction suivante permet d'ajouter un utilisateur ayant tous les droits sur une base de données :

	GRANT ALL PRIVILEGES ON nom_de_la_base.*
    TO 'utilisateur'@'adresse_ip' 
	IDENTIFIED BY 'mot_de_passe'

**Exemple**

	GRANT ALL PRIVILEGES ON afpa_gescom.* 
    TO 'dave_loper'@'%' 
    IDENTIFIED BY '1Ksable'

Ici, l'utilisateur *dave_loper* peut se connecter depuis n'importe quelle machine (spécifié par le joker *%*) sur la base *papyrus* en utilisant le mot de passe *1Ksable*

Par défaut aucun droit n'est défini à un utilisateur nouvellement créé, il faut donc spécifier les autorisations. 

## 2. Affecter des privilèges

	GRANT privilege 
	ON objet 
	TO utilisateur;

* Valeur possibles pour `privilege` : `SELECT`, `INSERT`, `DELETE`, `UPDATE`, `CREATE`, `DROP`...
* **objet** : *nom_base.nomtable* (exemple: *papyrus.fournis*)
* **utilisateur** : nom de l'utilisateur

**Exemple**

	GRANT select 
	ON afpa_gescom.suppliers 
	TO dave_loper
	IDENTIFIED BY '1Ksable'

Ici, l'utilisateur *dave_loper* pourra seulement lire (`SELECT`) la table *suppliers* de la base `afpa_gescom`. Toutes les autres instructions (`INSERT`, `UPDATE`...) sont désactivées pour cet utilisateur. 

**Exemple : accorder plusieurs privilèges simultanément :**

	GRANT SELECT, INSERT, UPDATE 
	ON afpa_gescom.suppliers
	TO dave_loper
	IDENTIFIED BY '1Ksable'

Ici, l'utilisateur *dave_loper* pourra afficher, insérer ou modifier des données de la table *fournis* de la base *papyrus*.

## 3. Suppression de privilèges

Pour retirer (révoquer) des privilèges à un utilisateur, la commande `REVOKE` est requise :

	REVOKE privilege 
    ON objet 
    FROM utilisateur

**Exemple**

	REVOKE INSERT, UPDATE, DELETE 
    ON afpa_gescom.suppliers
    FROM 'dave_loper'

Cet exemple supprime pour l'utilisateur _dave\_loper_ les droits d'insérer, modifier et supprimer des données dans la table _fournis_ de la base _papyrus_. On peut donc indiquer un ou plusieurs privilèges.
