# Wordpress - Gabarits

## Etape 8 : le fichier `functions.php` en détails

La construction de thèmes repose sur un système de _hooks_ (_crochet_ en français) permettant de modifier le comportement par défaut de Wordpress sur un évènement précis. 

Il existe 2 types de hooks :

* Les **actions** : elles servent à ajouter des actions aux processus Wordpress (enregistrement en base de données, construction/chargement de pages web...)       
* Les **filtres** : ils servent à modifier (formatage) des données en sortie, c'est-à-dire avant affichage dans le thème/envoi au navigateur

En outre, il existe des [fonctions de gestion](https://codex.wordpress.org/fr:Plugin_API) des filtres et des actions.

Concrètement, en termes de code, ce sont des fonctions PHP qui doivent être regroupées dans un fichier nommé  `functions.php` situé à la racine de votre répertoire de thème. Ce fichier peut contenir autant de fonctions que nécessaire à votre thème/configuration de Wordpress. 

**Exemple**

Pré-formatage de l'affichage d'un extrait en gras lors de l'appel de la fonction `the_excerpt()` : nous écrivons ici un filtre.

Tout d'abord on déclare une fonction dont le nom est libre mais qui doit rester explicite. Remarquez en argument la valeur de l'extrait (`$texte`), que Wordpress fournit automatiquement :
 
     function excerpt_display_strong($texte) 
     {
         return "<strong>".$texte."</strong>";
     }        

Ensuite, on "accroche", via `add_filter()`, notre fonction (passée en 2ème argument) à l'évènement `get_the_excerpt` (1er argument) :  
     
     add_filter('get_the_excerpt', 'excerpt_display_strong');
 
* [Liste des hooks d'actions](https://codex.wordpress.org/Plugin_API/Action_Reference)
* [Liste des hooks de filtres](https://codex.wordpress.org/Plugin_API/Filter_Reference)

Autres exemples :

* [Ressource 1](http://www.guillaumevoisin.fr/tips-tricks/bien-comprendre-et-utiliser-les-hooks-wordpress)
* [Ressource 2](https://www.damoiseau.me/wordpress-filtres-actions-partie-1)
