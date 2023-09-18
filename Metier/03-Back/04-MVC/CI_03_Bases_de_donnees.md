# CodeIgniter - 03 - Bases de données

## Configuration des informations de connexion

Nous allons réaliser une première page permettant d'afficher une liste de produits comme dans l'atelier 4 du cours PHP, ce qui nécessite donc une connexion à une base de données : 

La configuration de la base de données se trouve dans le fichier `application/config/database.php` :

	$db['default'] = array(
		'dsn'	=> '',
        'hostname' => 'localhost:3308',
		'username' => 'root',
		'password' => '',
		'database' => 'jarditou',
		'dbdriver' => 'mysqli',
		'dbprefix' => '',
		'pconnect' => FALSE,
		'db_debug' => (ENVIRONMENT !== 'production'),
		'cache_on' => FALSE,
		'cachedir' => '',
		'char_set' => 'utf8',
		'dbcollat' => 'utf8_general_ci',
		'swap_pre' => '',
		'encrypt' => FALSE,
		'compress' => FALSE,
		'stricton' => FALSE,
		'failover' => array(),
		'save_queries' => TRUE
	);

Ce fichier permet de spécifier les informations de connexion pour la base de données. 

Nous avons besoin de renseigner : 

* ligne 3 : le serveur (`hostname`); pour Wamp : _localhost:3308_.
* ligne 4 : l'utilisateur (`username`) : _root_.s
* ligne 5 : le mot de passe de l'utilisateur, si défini; sinon laisser la chaîne vide. 
* ligne 6 : le nom de la base de données à utiliser (`database`) : _jarditou_. 

## Utilisation de la connexion

Le reste se passe, pour le moment, dans le contrôleur. 

Il faut d'abord charger la librairie de base de données, nommée _database_ : 

	$this->load->database();

Celle-ci crée une instance d'objet représentée par `$this->db`, qu'il faudra **toujours utiliser** pour réaliser une opération (C.R.U.D.) sur la base.  

## Exécuter une requête

Pour effectuer une requête de sélection, il faut utiliser la méthode `query()` :

	$resultat = $this->db->query("SELECT * FROM produits")->result();

La ligne ci-dessus permet de récupérer le résultat de la requête (la liste des produits) sous la forme d'un tableau dont chaque élément contient un objet PHP représentant une ligne de la table (il s'agit là du même comportement que `fetchAll` en PHP normal).

## Afficher la liste des produits

Modifiez la méthode `liste()` du contrôleur de la façon suivante :

	public function liste()
	{
        // Charge la librairie 'database'
		$this->load->database();

        // Exécute la requête 
  	    $results = $this->db->query("SELECT * FROM produits");	

        // Récupération des résultats    
		$aListe = $results->result();	

        // Ajoute des résultats de la requête au tableau des variables à transmettre à la vue  	
        $aView["liste_produits"] = $aListe;
		
        // Appel de la vue avec transmission du tableau  
        $this->load->view('liste', $aView);
	}

* `$this->load->database()` charge la librairie `database` et se connecte à la base de données (création d'un objet `db`),
* `$requete = $this->db->query('SELECT * FROM produits')->result();` exécute la requête,
* `$aView["liste"] = $requete;` charge le résultat de la requête dans la variable `$aView["liste"]`
* `$this->load->view('produits/liste', $aView)` appelle la vue `liste.php` et lui transmet le tableau `$aView`. La vue `liste.php` se trouve dans le répertoire `application/views/liste`.

Dans la vue, une boucle va afficher la liste des produits : 

	<body>
	<h1>Liste des produits</h1>

    <div class="row">
    <div class="col-12">    
	<?php 
    foreach ($liste_produits as $row) 
    {
		echo"<p>".$row->pro_id."</p>";
        echo"<p>".$row->pro_ref."</p>";
        echo"<p>".$row->pro_libelle."</p>";
 	    echo"<p>".$row->pro_libelle."</p>";
		echo"<p>".$row->pro_description."</p>";		
	}
    ?>
    </div>
    </div>

> [Documentation](https://www.codeigniter.com/userguide3/database/index.html).