# JS 02 : Introduction au langage Javascript

## Présentation

JavaScript est un langage de scripts intégré aux pages web (HTML) qui permet d'améliorer la présentation et surtout l'interactivité des pages web.

JavaScript rend les pages web « dynamiques » en manipulant le Document Object Model (D.O.M.), c'est-à-dire la représentation objet de la page web (le « document »). Le Javascript est en effet un langage orienté objet et possède des objets dits natifs (par exemple les objets `Window`, `Date`, `XmlHttpRequest`). 
Possibilités offertes par le Javascript :

* Animer du texte et des images
* Ajouter des conditions, des boucles, effectuer des calculs
* Intercepter les événements (souris, clavier etc.)
* Contrôler les formulaires
* Modifier les caractéristiques des éléments HTML et CSS
* Gérer des menus
* Détecter le navigateur
* Aller chercher des données de façon asynchrone (avec Ajax et l'objet `XmlHttpRequest`). 

Aujourd'hui, il existe des librairies et frameworks en Javascript aussi nombreux que perfectionnés tels que Jquery, AngularJS, VueJS, ReactJS, MeteorJS ou encore NodeJS, une application Javascript côté serveur.

** JavaScript est un langage sensible à la casse. Il est donc obligatoire de respecter les majuscules et les minuscules dans le code ou les instructions (évènements, fonctions natives).**

## Un peu d'histoire

Au milieu des années 1990, la société _Netscape_ développe pour son navigateur web homonyme un langage nommé _LiveScript_, lequel est repris par la société _Sun_ (elle-même rachetée depuis par Oracle) à l'origine de Java, qui lui donne le nom de _Javascript_, mais il faut bien retenir que ces 2 langages sont totalement différents (contrairement à ce qu'on peut lire parfois), leurs seuls points communs étant leur nom commercial en lien avec la société _Sun_. 

De son côté, _Microsoft_ créée un langage similaire, le _JScript_, pour son navigateur _Internet Explorer_. Ce langage sera abandonné quelques années plus tard. 

Aujourd'hui, le Javascript est standardisé sous la norme <abbr title="European Computer Manufacturers Association">E.C.M.A.</abbr> qui en est à la version ES6 également connue sous le nom ECMAScript2015 et qui est implémentée par tous les navigateurs récents.    

## Syntaxe

### Bases syntaxiques

Pour l'écriture des instructions JavaScript, on utilisera l'alphabet ASCII classique (à 128 caractères) comme en HTML. 
Les noms de variables et de fonctions ne peuvent comporter d’espaces, d’accents ni de tirets. 
Seul le undercore (_) est autorisé.
La bonne pratique est d'utiliser la méthode camelCase.

Une instruction Javacript est écrite sur une ligne et se termine par un point-virgule : 

	alert("Hello l'AFPA !");

Enfin, JavaScript ignore les espaces, les tabulations et les sauts de lignes.
Pour déclarer une chaîne de caractères, les guillemets " et l'apostrophe ' peuvent être utilisés à condition de ne pas les mélanger. Si vous souhaitez utiliser des guillemets dans vos chaînes de ca-ractères, tapez \" ou \' pour les différencier vis à vis du compilateur.
Mots réservés

En javascript comme dans les autres langages, il existe des mots réservés correspondant aux instructions du langage qu'il ne faut donc pas utiliser donc comme nom de variables.  
<!-- TODO mis un lien ci-dessous-->
* [Liste des mots réservés](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Mots_r%C3%A9serv%C3%A9s)

## Sensibilité à la casse

JavaScript est un langage sensible à la casse. Il est donc obligatoire de respecter les majuscules et les minuscules dans le code ou les instructions (évènements, fonctions natives).


