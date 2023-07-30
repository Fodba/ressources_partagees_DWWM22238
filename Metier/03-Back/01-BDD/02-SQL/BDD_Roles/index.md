# Créer la base de données : utilisateurs, privilèges et rôles

Comment autoriser l'accès au serveur SQL à un utilisateur ? Comment lui autoriser l'accès à une base de données ? 

> Les exemples de cette séance sont fondés sur la base _papyrus_.

> Cette séance est rédigée pour **la version 8 de MySql**. Certaines commandes peuvent varier légèrement par rapport aux versions antérieures, que vous pourriez être amené à rencontrer en entreprise. 

> Afin de ne pas vous retrouvez coincé en bloquant l'accès à votre serveur de base de données par accident, il est préférable de faire une sauvegarde de vos bases avant de commencer cette séance.

## Définitions

Il convient tout d'abord de bien distinguer certaines notions qui, par abus de langage, prêtent à confusion :
  
<table>
	<thead>
		<tr>
		<th>Notion</th>
		<th>Définition</th>
		</tr>
	</thead>
	<tbody>
		<tr>
		<td>Utilisateur</td>
		<td>Personne ou plutôt profil qui va effectuer des opérations sur une base de données et/ou le serveur. On peut distinguer 3 niveaux : manipulation des données, gestion d'une base et administration du serveur.</td>
		</tr>
	    <tr>
	    <td>Privilège</td>
        <td>Un privilège est une action (opération) précise qui peut être réalisée sur la base : gestion des données, des structures (bases, tables), des utilisateurs etc.</td>
	    </tr>
       	<tr>
	    <td>Droit</td>
        <td>Un droit est la même chose qu'un privilège.</td>
	    </tr>
        <tr>
		<td>Rôle</td>
        <td>Un rôle est un ensemble de privilèges qui peut être attribué à plusieurs utilisateurs (= un groupe) en même temps. On pourrait par exemple créer un rôle "Administrateur" (mais avec des droits moindres que "root").</td>
		</tr>	    
	</tbody>
</table>

## Les utilisateurs

[Utilisateurs](utilisateurs.html)

## Les privilèges

[Privilèges](privileges.html)

## Les rôles

[Rôles (MySql 8)](roles.html)

## Pour résumer   

Le bon processus de gestion des utilisateurs, rôles et privilèges est le suivant : 

1. Créer le rôle   
2. Accorder (`GRANT`) des privilèges au rôle
3. Créer un utilisateur
4. Attribuer (`GRANT`) le rôle à l'utilisateur
5. Définir (`SET`) le rôle - par défaut ou temporaire - de l'utilisateur 

## Utilisation en PHP

> Important : il ne faut pas confondre les utilisateurs SQL de votre base/serveur avec ceux de votre application gérés par des sessions.  

En PHP, l'utilisateur sera indiqué dans la chaîne de connexion <abbr title="Data Source Name">DSN</abbr> de PDO.

**Exemple**

	<?php
    $oPdo = new PDO('mysql:host=localhost:3308;dbname=papyrus', 'dave_loper', '1Ksable');

Les rôles et/ou privilèges attachés à cet utilisateur seront alors appliqués. Si votre application tentait d'effectuer des opérations sur la base de données non autorisées par les rôles/privilèges de l'utilisateur, elles ne seront pas exécutées et des erreurs SQL seront retournées.  
 
## Gestion dans PhpMyAdmin

* Au niveau du serveur seul : l'onglet _Comptes Utilisateurs_ montre la liste des utilisateurs. Différents liens (_Editez les privilèges_, _Ajouter un utilisateur_) accèdent à des écrans dans lesquels on peut configurer tout ce que l'on souhaite.     
* Au niveau d'une base de données : l'onglet _Privilèges_ affiche les utilisateurs de la base sélectionnée et les rôles/privilèges spécifiques à celle-ci. 
* Au niveau d'une table : l'onglet _Privilèges_ indique les utilisateurs de la table et les rôles/privilèges attribués pour celle-ci. 

## Ressources 

* [Documentation](https://dev.mysql.com/doc/mysql-security-excerpt/8.0/en/roles.html)
* [Tutoriel (EN)](https://www.mysqltutorial.org/mysql-roles)

## Mise en pratique

> En local uniquement, pas possible sur _dev.amorce.org_.

A partir de la base de données _afpa\_gescom_, écrivez les requêtes suivantes (n'utilisez PhpMyAdmin que pour vérifier !) :

1. Créez trois utilisateurs _util1_, _util2_, _util3_
2. _util1_ doit pouvoir effectuer toutes les actions
3. _util2_ ne peut que sélectionner les informations dans la base
4. _util3_ n'a aucun droit sur la base de données, sauf d'afficher la table _suppliers_

Une fois les utilisateurs créés, testez en vous connectant et en envoyant les requêtes adaptées.
