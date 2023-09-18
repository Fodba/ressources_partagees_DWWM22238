# Pagination dans Codeigniter étapes par étapes

<hr>
 
## Le Model 

(Voir aussi les Modèles: <a href="https://foad.amorce.org/ressources/Pool/WEB_MVC/modeles.html">Utiliser les modèles</a>)

Créer un modèle Pagination_model dans application/models

Ajouter le code suivant


	<?php
	
	class Pagination_model extends CI_Model {
	
	    protected $table = 'produits';
	
	    public function __construct() {
	        parent::__construct();
	    }
	
	    public function get_counter() {
	        return $this->db->count_all($this->table);
	    }
	
	    public function get_prod($limit, $start) {
	        $this->db->limit($limit, $start);
	        $query = $this->db->get($this->table);
	
	        return $query->result();
	    }
	}

Ci-dessus,

* `protected $table = 'produits';` protected variable qui définit le nom de la table pour le modèle
* `public function __construct() {…}` appelle de la méthode parent constructor
* `public function get_count() {…}` retourne la totalité des enregistrements de la table "produits".
* `public function get_prod($limit, $start) {…}` cette méthode sera utilisée pour récupérer les résultats de pagination de la table. `limit` definit le nombre total d'enregistrements à retourner tandis que 'start' définit le nombre d'enregistrements qui sont sautés.

Créons maintenant la route qui correspondra à notre résultat de paginations.

## Pagination Route

Ouvrir le fichier dans _application/config/routes.php_ 

Ajouter le code suivant
 
	$route['pagination/(:num)'] = 'pagination';

On définit la route 'pagination' qui pred un paramètre optionnel ':num'. La route ainsi définit appelle la méthode 'index' dans le contrôlleur 'Pagination'.

## Pagination Controller

Voyons maintenant le contrôleur qui affichera les résultats de la pagination.

	<?php defined('BASEPATH') OR exit('No direct script access allowed');
	
	class Pagination extends CI_Controller {
	
	    public function __construct() {
	        parent:: __construct();
	
	        $this->load->helper('url');
	        $this->load->model('pagination_model');
	        $this->load->library("pagination");
	    }
	
	    public function index() {
	        $config = array();
	        $config["base_url"] = site_url() . "/pagination";
	        $config["total_rows"] = $this->pagination_model->get_counter();
	        $config["per_page"] = 3;
	        $config["uri_segment"] = 2;
	
	        $this->pagination->initialize($config);
	
	        $page = ($this->uri->segment(2)) ? $this->uri->segment(2) : 0;
	
	        $data["links"] = $this->pagination->create_links();
	
	        $data['pagination'] = $this->pagination_model->get_prod($config["per_page"], $page);
	
	        $this->load->view('paginations/index', $data);
	    }
	}

Anlysons le code ci-dessus

* `class Pagination extends CI_Controller {…}` on définit la classe `Pagination`
* `public function __construct() {…} Cette méthode initialise la méthode parent constructor et charge l url helper, * `pagination_model` et `pagination` dans la librairie.

> Vous pouvez aussi configurer le fichier _application/config/autoload.php_ ce qui dispense d'écrire les trois lignes suivantes :

	$this->load->helper('url');<br>
    $this->load->model('pagination_model');<br>
    $this->load->library("pagination");

* `public function index() {…}` définit la méthode qui répond à notre route.
* `$config["base_url"] = base_url() . "pagination";` UrL de pagination qui sera utilsée pour générer les liens de pagination.
* `$config["total_rows"] = $this->pagination_model->get_counter();` fixe les lignes totales à paginer. La valeur est récupérée de 'pagination_model' en appelant la méthode 'get_count'.
* `$config["per_page"] = 5;` définit les lignes qui seront affichées par page ici 5.
* `$config["uri_segment"] = 2;` spécifie que le segment d URL est composé de 2 segments; dans l'exemple: pagination/nombre-de-pages-sautés
* `$this->pagination->initialize($config);` initialise la librairie pagination utilisant la config array.
* if ($this->uri->segment(2)) 
        {
            $page =  $this->uri->segment(2);
        }
        else {
            $page = 0;
        } vérifie que le nombre des pages sautées est dans la seconde partie du segment de l'URI et s'il n'y est pas la valeur 0 est fixée à la variable $page
* $data["links"] = $this->pagination->create_links(); créer les liens de paginationet les fixent dans la variable * * $data array.
* $data['pagination'] = $this->pagination_model->get_prod($config["per_page"], $page); récupère les enregistrements par page les assignent dans la variable $data array.
* $this->load->view('paginations/index', $data); charge l index (view) dans le dossier 'paginations' et le passe dans la variable $data.

> Attention : `$config["uri_segment"]` et `$page` doivent avoir la même valeur ici 2 parce que deux éléments dans l'URI : `pagination/number`

## Pagination View

Créer maintenant le dossier 'paginations' dans application/views

Créer un fichier 'index.php' dans application/views/paginations/index.php

Ajouter le code suivant

	<!DOCTYPE html>
	<html>
	    <head>
	        <title>CodeIgniter Pagination</title>
	        <meta charset="UTF-8">
	        <meta name="viewport" content="width=device-width, initial-scale=1.0">
	        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.min.css">
	    </head>
	    <body>
	        <div class="container">
	            <h3 class="title is-3">CodeIgniter Database Pagination</h3>
	            <div class="column">
	                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
	                    <thead>
	                        <tr>
	                            <th>ID</th>
	                            <th>Référence</th>
	                            <th>Libellé</th>
	                            <th>Description</th>
	                        </tr>
	                    </thead>
	                    <tbody>
	                        <?php foreach ($pagination as $key): ?>
	                            <tr>
	                                <td><?= $key->pro_id ?></td>
	                                <td><?= $key->pro_ref ?></td>
	                                <td><?= $key->pro_libelle ?></td>
	                                <td><?= $key->pro_description ?></td>
	                            </tr>
	                        <?php endforeach; ?>
	                    </tbody>
	                </table>
	                <p><?php echo $links; ?></p>
	            </div>
	        </div>
	    </body>
	</html>

Anlysons le code ci-dessus

* `<?php foreach ($pagination as $key): ?>` boucle de résultats de la variable `$pagination` qui écrit les résultats de la table.
* `<?php echo $links; ?>` écrit les liens de pagination au pied de vtre table.

####  Tester le résultat

_http://localhost/votre-dosssier-ci/index.php/pagination_
