# CodeIgniter - 02 - Les urls et les routes

Le routage est un mécanisme qui va permettre d'associer les contrôleurs aux URLs (nous l'avons déjà utilisé sous la forme *contrôleur/methode/paramètre*) mais aussi de construire les URLs et en [contrôler les paramètres](https://www.codeigniter.com/userguide3/general/routing.html).

Les frameworks proposent un mécanisme appelé **routage** qui permet d'associer les contrôleurs aux URLs (= un route), de construire les URLs et d'en contrôler les paramètres. 

Avant d'utiliser les routes à bon escient, quelques éléments sont à configurer.

## Pré-chargement du helper `url`

Pour utiliser les routes, il est nécessaire d'utiliser le helper `url`.

Ouvrez le fichier `application/config/autoload.php` et modifiez la ligne 92 :  

    $autoload['helper'] = array();

pour :

    $autoload['helper'] = array('url');

Cette modification permettra à CodeIgniter de charger automatiquement le helper `url` une seule fois pour tout votre projet (sinon il aurait fallut le charger dans chaque méthode de contrôleur). 

## Définir l'url de base

On va ensuite indiquer à notre application quelle est l'url de base (la racine) : ouvrez le fichier `config/config.php` et rechercher la ligne `$config['base_url'] = '';`, renseigner comme valeur l'url de votre projet :

	$config['base_url'] = 'http://localhost/ci/';  

> Attention, l'url doit se terminer par un `/`. 

## Utilisation 

Désormais, on pourra utiliser la fonction `site_url()` pour écrire un lien :    

	echo site_url(); // http://localhost/ci/index.php

**Exemple**

    <a href="<?php echo site_url("produits/modifier/".$produits->id); ?>">
        Modifier
    </a> 

Ce code affichera :  
	
 	http://localhost/ci/index.php/produits/modifier/10
 
## Contrôleur par défaut 

Il est possible d'indiquer quel sera le contrôleur et laa méthode à exécuter au lancement de l'application (page d'accueil) : 

Editez le fichier `config/routes.php` et recherchez la ligne `$route['default_controller'] = 'welcome';`, remplacez la valeur par **le contrôleur et la méthode** affichant la vue souhaitée comme page d'accueil; dans notre cas il s'agit donc de `produits/liste` : 

	$route['default_controller'] = 'produits/liste';

> Si le contrôleur possède une méthode nommée `index()`, celle-ci se comporte comme une méthode par défaut, dans ce cas seul le nom du contrôleur peut-être indiqué dans les routes (par exemple 'produits' au lieu de 'produits/index'). 

## Fichiers de ressources 

Les fichiers de ressources CSS, JS, images etc., nommés _assets_ dans le monde du web, peuvent être chargés selon la procédure suivante : 

* créer un répertoire nommé `assets` à la racine de votre projet (dans `ci`).
* Dans ce nouveau répertoire, créer les 3 répertoires suivants : `css`, `js` et `images`.

Ensuite, on va pouvoir appeler les fichiers via la fonction `base_url()` en indiquant en paramètre le chemin vers la ressource :

    <link rel="stylesheet" href="<?php echo base_url("assets/css/style.css"); ?>"> 

génère le code HTML suivant (pour un fichier CSS, adapter bien sûr le code ci-dessus en fonction du type de ressource) :

    <link rel="stylesheet" href="http://localhost/ci/assets/css/style.css">

**Exemple pour un fichier JS**

	<script src="<?php echo base_url("assets/js/script.js"); ?>"></script>		

**Exemple pour une image**

	<img src="<?php echo base_url("assets/images/photo.jpg"); ?>" alt="photo" title="photo" class="img-fluid"> 

## Astuce mnémotechnique 
   
<table>
<thead>
<tr>
<th>Fonction</th>
<th>Usage</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>site_url()</code></td>
<td>Pour l'url des pages; l'url contiendra <i>index.php</i>fonction <code>site_url()</code> avec un <b>i</b> comme dans le mot <i>index</i></td>
<td>http://localhost/ci/<b>index.php</b>/controleur/methode</td>
</tr>
<tr>
<td><code>base_url()</code></td>
<td>Pour l'url des ressources : <code>base_url()</code> avec un *a* comme dans le mot <i>assets</i> : pour les fichiers CSS, Javascript et aussi les images.</td>
<td>http://localhost/ci/<b>assets</b>/css/style.css</td>
</tr>
</tbody>
</table>

## Routes avancées

Le routage permet également :

* de construire des urls personnalisées au lieu du motif de base _controleur/methode_.
* de redéfinir l'association url - contrôleur/méthode.  
* de contrôler le type de paramètres passés dans une url.   

[Consultez la documentation](https://www.codeigniter.com/userguide3/general/routing.html).       

<br><br><br><br>

