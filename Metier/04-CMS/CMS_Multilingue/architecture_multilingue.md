# Prendre en compte les contraintes des applications multilingues

# Partie 1 : Généralités

Construire un site multilingue est un besoin courant dans les projets web : 

* entreprises présentes dans plusieurs pays ou qui ciblent une clientèle étrangère
* réservation de vacances/locations (hôtels, campings etc.)
* grands médias (presse, TV...)    
 
## Les problématiques

### Pays, langues, fuseaux horaires

* Un pays peut avoir plusieurs langues officielles (Belgique, Suisse, Canada etc.)
* Fuseau horaire (configuration serveur, solutions de géolocalisation par IP)

### Nom de domaine

Plusieurs options au niveau du nom de domaine :

* Une seule page avec code langue passé dans l'url : `www.jarditou.com/fr`, `www.jarditou.com/en`
* Sous-domaine par langue : `fr.jarditou.com`, `en.jarditou.com`
* Un nom de domaine par pays, avec extension régionale : `www.jarditou.fr`, `_www.jarditou.co.uk_` (rappel : il existe des pays avec plusieurs langues), nécessite plus de budget, adapté aux sociétés réellement implantées dans un pays. 

Le choix relève de la stratégie marketing, pas de la technique (toutes les solutions sont simples, fiables et éprouvées).

### Traductions  

Il faut tout traduire :

* Textes : pages de contenus, liens de navigation, catégories, fiches produits, mention légales, conditions générales de vente,  
* balises `<title>` et méta, valeurs des attributs `alt` et `title`, 
* messages d'erreur, page 404...,
* mails : confirmation d'inscription, de commande, de récupération de mot de passe...,
* textes dans les images,
* vidéos (option : les sous-titrer),
* documents (notices, factures...),
* thèmes et plugins des CMS (problème fréquent : ils sont en anglais et non traduits)

> Pour la traduction, faire appel aux services de traducteurs professionnels car en termes de référencement, Google pénalise les fautes d'orthographe et grammaticales, notamment celles générées par des services tels que ... Google Traduction !   

### Référencement 

Outre la traduction des différentes balises méta et `<title>`, il faudra recommencer le travail de référencement autant de fois qu'il y a de pays cibles et définir autant de stratégies de mots-clés : d'un pays à l'autre les internautes n'ont pas la même façon de chercher/acheter. De nombreuses [bonnes pratiques](https://www.seoh.fr/referencement-seo/bonnes-pratiques-seo-multilingue.html) sont à respecter, celles-ci dépendent de l'architecture adoptée.  

### E-commerce

Si vous vendez des produits sur un site, quelques points supplémentaires : 

* Monnaies, taux de conversion
* Frais de port, taxes douanières, logistique (réglementation transports) etc.
* Réglementations : produits ou composants interdits à la vente dans certains pays (drogues, armes, enfants, reins... mais pas toujours que des produits illicites), informations obligatoires, taxes diverses, recyclage...

## Implémentation technique 

### HTML

* Bien spécifier la langue de votre page avec l'attribut `lang` de la balise `<html>` : 

		<html lang="fr">
 
* Lorsque le site est multilingue, rendre dynamique via une variable (voir ci-après) l'affichage du code langue actif dans l'attribut  :

		<html lang="<?php echo $_SESSION["lang"]; ?>">
	

* Bien spécifier l'encodage (UTF-8 en général) dans la balise `<meta charset>`
* Indiquer le sens de lecture du texte (certaines langues se lisent de droite à gauche, par exemple l'arabe) : ceci se fait dans l'attribut `dir` de la balise `<html>` pour toute la page : 
 
	`<html lang="ar" dir="rtl">`

	* `ltr` : left to right = de gauche à droite, par défaut si non présent. 
	* `rtl` : right to left = de droite à gauche (langues arabes par exemple)

mais peut aussi être spécifié au cas par cas dans une balise : par exemple `<blockquote dir='rtl'>` dans le cas d'une citation dans une langue différente de l'ensemble de la page web/site.

### Langage côté serveur (PHP)

#### Pré-requis : choix de la langue

* Traditionnellement, des icônes des drapeaux des pays/langues sont présentes en haut à droite des pages web, ces icônes sont des liens (images cliquables) qui envoient vers une page un paramètre `$_GET` ayant pour valeur le code de la langue (_fr_, _en_) choisie. 

	**Exemple**

    <?php
    /* fichier index.php et autres pages */
    
    session_start(); // ne pas oublier, car on va utiliser les sessions

    /* s'il n'y a de code langue défini en session,
    * on prend la langue par défaut du site, ici le français
    */ 
    if (!isset($_SESSION["lang"])) 
    { 
          $_SESSION["lang"] = "fr";      
    }     
    ?>
   
    <!-- un lien sur chaque icône drapeau : -->   
    <a href="traduction.php?lang=en" title="Traduire en anglais"><img src="drapeaux/en.png" title="Traduire en anglais" alt="Traduire en anglais"></a>
 
    <h1>Bonjour</h1>

* Le code langue est stocké dans une session (ou un cookie)  
* Tant qu'une langue n'est pas choisie, la page est affichée dans une langue par défaut; il faut donc déterminer celle-ci. 

	<?php
    /* fichier traduction.php vers lequel un clic sur une icône de drapeau renvoie */
    
    session_start(); // ne pas oublier, car on va utiliser les sessions

    if (isset($_GET["lang"])) 
    {
         $_SESSION["lang"] = $_GET["lang"];      
    }

    // Redirection vers la page souhaitée (ici accueil)
    header("Location:index.php");
    exit; // toujours un exit après la fonction header(), cf. doc PHP de header()

Une fois la langue choisie, on va pouvoir aller chercher les traductions de 3 façons différentes :

* soit via un fichier PHP avec un tableau
* soit en base de données
* soit dans des fichiers au format CSV, XML, JSON etc. 

#### La traduction via un tableau PHP

* Dans un répertoire _langues/_, on va créer un fichier de traductions _[code_langue].php_ pour chaque langue souhaitée. Ces fichiers contiendront tous un tableau PHP nommé pareil, par exemple, `$aLang`  

	/* langues/fr.php */
    $aLang["bonjour"] = "Bonjour";

Pour l'anglais (par exemple) :

    /* langues/en.php */
    $aLang["bonjour"] = "Hello";
    
Ces fichiers de traductions devront contenir absolument tous les textes de votre site (menus de navigation, ancres de liens, balises `<alt>` et `<title>` etc.) !

> Conseil : classer les clés de votre tableau de traductions par ordre alphabétique afin de pouvoir retrouver une valeur d'un fichier à l'autre.

Dans les pages web à traduire, par exemple _index.php_, on va inclure le fichier de traductions correspondant au code langue actif en session :

	<?php
    /* fichier index.php et autres pages */
    
    session_start(); // ne pas oublier, car on va utiliser les sessions

    /* s'il n'y a de code langue défini en session,
    * on prend la langue par défaut du site, ici le français
    */ 
    if (!isset($_SESSION["lang"])) 
    { 
          $_SESSION["lang"] = "fr";
          // On inclut le fichier de traductions 'par défaut'   
          require_once "langues/fr.php";    
    } 
    else 
    { 
         // Si une session existe, on inclut le fichier de traductions actif en session 
         require_once "langues/fr.php";    
    }     
    ?>
   
    <!-- un lien sur chaque icône drapeau : -->   
    <a href="traduction.php?lang=en" title="Traduire en anglais"><img src="drapeaux/en.png" title="Traduire en anglais" alt="Traduire en anglais"></a>
 
    <!-- La valeur correspondant à la clé du tableau de langue sera affichée dans la bonne langue --> 
    <h1><?php echo $aLang["bonjour"]; ?></h1>

**Conclusion**

Cette approche fonctionne très bien mais présente un défaut majeur : un non développeur ne saurait mettre les fichier de traduction à jour (nécessite de connaître l'arborescence du projet, la syntaxe PHP, avoir accès au serveur d'hébergement etc.).  

### Bases de données

Stocker les traductions en base de données paraît une évidence, mais nécessite une réflexion sur la structure des tables.  

Si ce n'est pas déjà fait, nous aborderons ce point dans la séance Conception de bases de données/Merise. 
 
### Frameworks

Les frameworks MVC côté serveur proposent des solutions pour gérer les sites multilingues. 

**Exemples pour CodeIgniter 3**

* [Enable Multi Language Capability in CodeIgniter](https://www.cloudways.com/blog/multi-language-codeigniter)
* [Language Class](https://www.codeigniter.com/userguide3/libraries/language.html)

### CMS

Les CMS aussi offrent des solutions natives ou via des extensions pour gérer les sites multilingues. Pour rappel, les CMS sont conçus pour pouvoir être traduits lors de leur installation.

[Wordpress multilingue](wordpress_multilingue.html) 

## Ressources complémentaires

* [Comment construire un site bilingue](https://www.scriptol.fr/creation-site-web/site-bilingue.php)
* [Codes ISO des pays](http://www.atlas-monde.net/codes-iso) et [des langues](http://www.loc.gov/standards/iso639-2/php/code_list.php), [icônes Drapeaux](http://www.drapeauxdespays.fr/telecharger)
* [La norme i18n](https://fr.wikipedia.org/wiki/Internationalisation_(informatique))
* [Optimiser le code HTML et la configuration du serveur (fuseau horaires etc.)](http://www.openvalley.fr/e-marketing/optimisation-technique-site-multilingue)

<br><br><br><br>
 

 