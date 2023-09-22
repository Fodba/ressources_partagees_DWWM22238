# Wordpress - Gabarits

## Objectifs

Créer un thème (responsive bien sûr) 100% nouveau, celui-ci devra remonter les articles saisis à l'étape 9 et les pages de l'étape 10 du cours _Wordpress - 01 - Présentation_. Pour cela, consultez [ce tutoriel](http://wordpress.bbxdesign.com/structure-contenu-theme-plugins) sur les boucles et les templates.
  
## Les thèmes dans Wordpress

Les thèmes sont totalement dissociés des contenus : on peut changer de design sans modifier le code affichant les données présentes en base (articles, pages). 

Les thèmes gratuits ou payants comportent un nombre conséquent de fonctionnalités dont une partie sera inutile pour votre projet. Leur code (CSS, Javascript...) pourra sembler obscur si vous n'êtes pas un développeur chevronné ou se révéler complexe à adapter. Certains thèmes proposent de faciliter la tâche avec un système de thèmes parents/enfants, mais on y retrouve les mêmes problèmes.  

L'idéal est donc de créer son propre thème de A à Z; vous en maîtrisez le code et il n'y a aucun fichier superflu.  

## Principes généraux des thèmes

* Stockage des fichiers nécessaires au thème dans un répertoire spécifique portant le nom du thème
* Création de fichiers PHP servant de template, c'est-à-dire de modèle de pages dans lequel Wordpress injecte les contenus issus de la base de données (saisis dans l'administration)  
* Les templates doivent respecter une charte de nommage pour savoir quel contenu ils doivent afficher (par exemple les articles sont affichés dans le template _single.php_) 
* Dans les fichiers PHP, utilisation de fonctions PHP spécifiques à Wordpress pour afficher les informations souhaitées  

## Création d'un thème de A à Z

* [Etape 1 : déclaration du thème](etape_01.html)
* [Etape 2 : la hiérarchie de templates](etape_02.html)
* [Etape 3 : le fichier `index.php](etape_03.html)
* [Etape 4 : création d'un fichier `header.php`](etape_04.html)
* [Etape 5 : création d'un fichier `footer.php`](etape_05.html)
* [Etape 6 : Les boucles](etape_06.html)
* [Etape 7 : afficher le détail d'un contenu](etape_07.html)
* [Etape 8 : le fichier `functions.php` en détails](etape_08.html)
* [Etape 9 : afficher le logo du site](etape_09.html)
* [Etape 10 : Construire et afficher un menu](etape_10.html)
* [Etape 11 : Découper le thème en blocs](etape_11.html)
* [Etape 12 : Ajouter un visuel pour le thème](etape_12.html)
* [Etape 13 : Les boucles dans le détail](etape_13.html)
* [Etape 14 : Aller plus loin dans les thèmes](etape_14.html)

## Ressources

* [Documentation officielle](https://codex.wordpress.org/Theme_Development)