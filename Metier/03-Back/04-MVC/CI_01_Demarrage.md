# CodeIgniter - 01 - Démarrage 

> [Site officiel](https://codeigniter.com) de CodeIgniter. 

## Mise en place du framework

<div class="alert alert-danger">Assurez-vous de bien télécharger la version 3 et non pas la version 4 (sortie récemment et qui nécessite une mise à jour importante de ce cours). Suivre aussi la documentation en [version 3 ici](https://codeigniter.com/userguide3/index.html).</div>

* [Téléchargez la version 3.1.11](https://api.github.com/repos/bcit-ci/CodeIgniter/zipball/3.1.11) de CodeIgniter.

* Extraire le contenu du fichier ZIP dans votre répertoire `www`. Le répertoire a un nom du genre `CodeIgniter-3.x.x` (où 3.x.x = version). 
* **Renommez-le `ci`** (par exemple) pour plus de simplicité.
* Supprimez tous les fichiers et répertoires sauf `application`, `system` et `index.php`.  
  
L'installation est terminée, vous pouvez déjà tester CodeIgniter à partir de l'url `http://localhost/ci`. Vous devriez voir une page d'exemple `Welcome` de CodeIgniter.  

## Organisation des fichiers

* Le répertoire `application` contient tous les fichiers de votre site web : c'est là que vous mettrez tout ce que vous allez créer (modèles, contrôleurs, vues, images, fichiers CSS et Javascript). 
* Le répertoire `system` contient les fichiers (classes etc.) spécifiques à CodeIgniter (son noyau ou *core*) : vous ne devez jamais y modifier quoi que ce soit.

Le répertoire `application` contient :

* `config` : fichiers de configuration du site
* `controllers` : classes PHP servant de contrôleurs
* `models` : classes PHP servant de modèles
* `views` : fichiers HTML/PHP contenant les vues

## Les contrôleurs et le système de routage

Le système de routage de CodeIgniter décompose l'url demandée pour la faire correspondre au schéma suivant :

	http://localhost/ci/index.php/controller/methode/parametre

ainsi, en demandant l'url suivante :

	http://localhost/ci/index.php/produits/liste

Vous déclenchez la méthode `liste` de la classe `Produits`.

> La classe `Produits` (en UpperCase) doit se trouver dans le fichier `Produits.php` situé dans le répertoire `application/controlers`. 

    <?php
	defined('BASEPATH') OR exit('No direct script access allowed');      
 
	class Produits extends CI_Controller 
    {
		public function liste()
		{
			echo "Votre première page !";
		}
	}

L'exécution de cette méthode doit produire une page, donc du code HTML (ici avec `echo`).

Plutôt que d'écrire du code HTML directement, la méthode `liste()` peut charger une vue (une page HTML) comme dans l'exemple ci-dessous. Dans ce cas la vue doit se situer dans le répertoire `application/views`.

	class Produits extends CI_Controller 
	{
		public function liste()
	    {
			$this->load->view('nom_de_la_vue');
	    }
	}

## Création du contrôleur

Le contrôleur est un fichier PHP contenant le code d'une classe (objet). Ce fichier devra être placé dans le répertoire `application/controllers`.

### Attention

> CodeIgniter impose des conventions d'écriture : le nom d'un contrôleur **doit commencer par une majuscule** : `Produits` et le **nom de fichier du contrôleur** également : `Produits.php`.
   
Créer un fichier `Produits.php` et y copier le code ci-dessous :

	<?php
    // application/controllers/Produits.php

	defined('BASEPATH') OR exit('No direct script access allowed');
	
	class Produits extends CI_Controller 
	{
	
		public function liste()
		{
			$this->load->view('liste');
		}
	}
	
* Ligne 2 : instruction de sécurité qui empêche l'accès direct au fichier.
* Ligne 4 : la classe `Produits` hérite de la classe `CI_Controller`.
* La méthode `liste` va nous permettre d’afficher la liste des produits.
* Pour l'instant elle se contente d'afficher la vue `liste.php` se trouvant dans le répertoire `application/views/liste.php`

> Notez qu'une vue est apellée par son nom de fichier sans l'extension `.php`. 
 
## Création de la vue

Dans le répertoire `views`, créer un fichier `liste.php`. Ce fichier contiendra à la fois du HTML et des variables PHP : 

	<!-- application/views/liste.php -->
	<!DOCTYPE html>
	<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Liste des produits</title>
	</head>
	<body>
		<h1>Liste des produits</h1>
	</body>
	</html>

Une fois les deux fichiers contrôleur et vue créés, lancez votre navigateur en utilisant l'adresse `http://localhost/ci/index.php/produits/liste`.

Vérifiez que votre page fonctionne correctement.

## Communication entre le contrôleur et la vue  

Dans le design pattern M.V.C., le contrôleur transmet des données (issues de la base ou variables) à la vue pour affichage. 

Avec CodeIgniter, ces données sont transmises via un tableau associatif (`$aView` dans l'exemple ci-dessous) :  

**Exemple 1**
        
		public function liste()
		{
            // Déclaration du tableau associatif à tranmettre à la vue
            $aView = array();

            // Dans le tableau, on créé une donnée 'prénom' qui a pour valeur 'Dave'	
            $aView["prenom"] = "Dave";          

            // On passe le tableau en second argument de la méthode 
			$this->load->view('liste', $aView);
		}

Dans la vue, CodeIgniter reconstitue les données à partir du tableau pour recréer autant de variables que de cases dans le tableau.
	
Modifiez la vue de la façon suivante : 

	<!DOCTYPE html>
	<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Liste des produits</title>
	</head>
	<body>
		<h1>Liste des produits</h1>
        <p>Bonjour <?php echo $prenom; ?> !</p>
	</body>
	</html>

Testez le résultat.

Remarquez que dans la vue l'entrée de tableau _prenom_ est transformée en variable, on a écrit `echo $prenom` et non pas `echo $aView["prenom"]`.

## Exercices

### Exercice 1

Encore plus fort, passons 2 variables à la vue ! 

Transmettez une variable _nom_ ayant pour valeur _Loper_ à votre vue, en plus du prénom. Votre vue doit afficher _Bonjour Dave Loper_.   

### Exercice 2

Transmettez à la vue le tableau PHP suivant et affichez-le dans une liste HTML : 

	$aProduits = ["Aramis", "Athos", "Clatronic", "Camping", "Green"];   

> Dans le design pattern M.V.C., seul le contrôleur communique avec la vue, mais pas l'inverse : une vue n'envoie jamais de données au contrôleur. 