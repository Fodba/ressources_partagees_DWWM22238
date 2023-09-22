<!-- HB, 10/01/2020 -->

# Wordpress - Développer des composants dynamiques en utilisant les bibliothèques d'une application de gestion de contenu	

## Objectifs (REAC)

* Développer des composants dynamiques en utilisant les bibliothèques d'une application de gestion de contenu
* Intégrer un module complémentaire
* Développer un module complémentaire
* Tester la sécurité du site en suivant un guide reconnu

<!--
* Mise en situation "Elaborer et mettre en œuvre des composants dans une application de gestion de contenu ou e-commerce"
* Evaluer "Développer la partie back-end d'une application web ou web mobile en intégrant les recommandations de sécurité"
-->

A l'issue de la séance et à partir d'un cahier des charges, vous serez capable de :

* Installer, paramétrer, organiser le contenu et gérer les utilisateurs en utilisant le back-office d'un CMS
* * Installer ou créer des fonctionnalités supplémentaires via des extensions (plugins)
* Sécuriser un site réalisé avec un C.M.S.  

## Introduction

Plugin, extension, module... les C.M.S. sont construits sur un ensemble de briques indépendantes les unes des autres, c'est-à-dire que si l'on en supprime une cela n'impacte pas le reste du site (sauf que la fonctionnalité proposée ne sera bien sûr plus disponible). 
 
Cela peut présenter des avantages :

* flexibilité (installation/désinstallation, installer que ce dont a besoin pour un projet) 
* large choix, des plugins pour tout et même des plugins pour gérer d'autres plugins ! 
* [Pourquoi créer un plugin ?](https://wpformation.com/creer-plugin-wordpress)

mais aussi des inconvénients : 

* trop de plugins tue le plugin : il en existe environ [55000 pour Wordpress](https://fr.wordpress.org/plugins) et le choix n'est pas toujours aisé : souvent une dizaine de bons plugins pour une même fonctionnalité (cherchez, par exemple, un plugin pour faire un carrousel).
* des plugins parfois trop lourds : beaucoup de réglages, de fichiers CSS ou JS, complexes à modifier, on n'a pas toujours besoin de tout ce que peuvent proposer certains plugins  
* des plugins présentant parfois des problèmes de sécurité

Heureusement, de nombreux sites proposent des essais détaillés et des comparatifs des plugins les plus utilisés pour vous aider à faire le bon choix. 

Comme pour les thèmes, les plugins peuvent être gratuits, payants/freemium ou être développés selon une architecture propre à chaque C.M.S. 

## Création d'un plugin : les bases

Vous trouverez sur [cette page](plugin.html) des instructions détaillées pour développer un premier plugin.

## Création d'un plugin : aller plus loin

* [Installation de tables MySql](https://www.supinfo.com/articles/single/252-initiation-creation-plugin-wordpress)
* [Un autre exemple de création d'un plugin avancé](http://rpcnufrlkr.cluster006.ovh.net/mouny/creation-de-plugin-wordpress)

## Documentation officielle

* [Codex](https://codex.wordpress.org/Writing_a_Plugin)
* [Codex pour les entêtes](https://codex.wordpress.org/File_Header)