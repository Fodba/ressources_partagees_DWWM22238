# Code Igniter - L'essentiel

## Activer le debuger - profiler

	$this->output->enable_profiler(TRUE);

Permet d'afficher les informations de débogage de votre page

## Configurer la base de données 
La configuration de la base de données se trouve dans application/config/database.php

	$db['default'] = array(
		'dsn'	=> '',
		'hostname' => 'localhost',
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

Ce fichier permet de spécifier les informations de connexion pour la base de données par défaut.

Dans votre contrôleur, vous pouvez utiliser le code suivant pour vous connecter a la base de données

	$this->load->database();

## SQL - Lire un ensemble de résultat

Dans un contrôleur :

	$this->load->database();
	$tableau = $this->db->query('SELECT * FROM produits')->result();

`$tableau` contient un tableau avec le jeu de résultat complet, chaque case du tableau contient un objet décrivant la ligne de la base de données.

Vous pouvez transmettre des paramètres à votre requête

	$this->load->database();
	$tableau = $this->db->query("SELECT * FROM produits WHERE bloque=?", 1)->result();

### Ecriture de requêtes automatique

	$tableau = $this->db->query('SELECT * FROM produits')->result();

peut s'écrire

	$this->db->get('produits')->result();

## SQL - Lire une ligne unique

Dans un contrôleur

	$this->load->database();
	$ligne = $this->db->query("SELECT * FROM produits")->row();

`$ligne` contient un objet représentant la première ligne du jeu de résultat.

	$this->load->database();
	$requete = $this->db->query('SELECT * FROM produits WHERE id=?', 7);
	$ligne = $requete->row();

`$ligne` contient un objet représentant la seule ligne du jeu de résultat.

## SQL - insérer une ligne

	$this->load->database();
	$data = array("Cage", "Luke", "Harlem");
	$this->db->query('insert into client (nom, prenom, ville) values (?, ?, ?)', $data);

**Ou bien :**

	$this->load->database();
	$data["nom"] = "Cage";
	$data["prenom"] = "Luke";
	$data["ville"] = "Harlem";
	$this->db->insert('client', $data);

## SQL - modifier une ligne

	$this->load->database();
	$data = array("Cage", "Luke", "Harlem", 25);
	$this->db->query('update client set nom=?, prenom=?, ville=? where id=?', $data);

**Ou bien :**

	$this->load->database();
	$data["nom"] = "Cage";
	$data["prenom"] = "Luke";
	$data["ville"] = "Harlem";
	$this->db->update("client", $data, "id=25");

**Ou bien :**

	$this->load->database();
	$data["nom"] = "Cage";
	$data["prenom"] = "Luke";
	$data["ville"] = "Harlem";
	$this->db->where('id', $id);
	$this->db->update("client", $data);

## SQL - supprimer une ligne

	$this->load->database();
	$this->db->query('delete from client where id=?', 25);

**Ou bien :**

	$this->load->database();
	$this->db->where('id', $id);
	$this->db->delete("client", $data);

## Capter les paramètres GET

Si vous transmettez vos paramètres de cette façon

	http://localhost/index.php/produits/detail/7/Aramis

déclarez vos paramètres dans la fonction (dans l'exemple id=7 nom=Aramis)

	public function modif($id, $nom)
	{
	
	}

Si vous transmettez vos paramètres de cette façon

	http://localhost/index.php/produits/detail?id=7&nom=Aramis

`$this->input->get()` vous permet de décoder l'url pour capter vos paramètres 

	public function modif()
	{
		$params = $this->input->get();
		$id = $params["id"];
		$nom = $params["nom"];
		// ou
		$id = $this->input->get("id");
		$nom = $this->input->get("nom");
	}

## Capter les paramètres POST

Les paramètres postés (transmis avec la mèthode *POST*) sont captés de la façon suivante:

	$params = $this->input->post();
	// ou
	$id = $this->input->post("id");
	$nom = $this->input->post("nom");

## Helpers pour les urls

Pour utiliser les fonction suivantes, n'oubliez pas de charger la bibliothèque URL en utilisant la ligne ci-dessous.

	$this->load->helper('url');

Dans `application/config/config.php`  modifiez `$config['base_url'] = 'http://monsite.yoyo.fr/';` pour refléter l'adresse URL de votre site.

### Effectuer un redirection

	$this->load->helper('url');
	redirect('http://localhost/index.php/produits/index');

L'appel de la fonction redirect effectue une redirection 

### site_url - déclencher un controleur

La fonction `site_url` permet de générer une url qui déclenche un contrôleur.

	<a href="<?= site_url("produits/ajout")?>">Ajouter</a>

permet de générer l'url suivante

	<a href="http://monsite.yoyo.fr/index.php/produits/ajout"></a>

### base_url - charger un fichier CSS/JS ou une image

La fonction `base_url` permet de générer une url pour charger une ressource statique.

	<link rel="stylesheet" href="<?= base_url("css/bootstrap.min.js") ?>">

permet de générer l'url suivante

	<link rel="stylesheet" href="http://monsite.yoyo.fr/css/bootstrap.min.js">