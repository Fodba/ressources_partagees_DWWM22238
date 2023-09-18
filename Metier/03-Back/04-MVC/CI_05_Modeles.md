# CodeIgniter - 05 - Modèles

Jusqu'ici, nous avons :

* utilisé les contrôleurs, 
* créé des vues, 
* travaillé avec la base de données 
 
Mais dans le design pattern M.V.C. les requêtes SQL doivent se trouver dans les modèles. Il va donc falloir y déplacer toutes les requêtes présentes dans nos contrôleurs.

## Conventions d'écriture pour les modèles

Dans le répertoire `application/models`, créez un fichier nommé `ProduitsModel.php` et y copier le code suivant :

    <?php 
    if (!defined('BASEPATH')) exit('No direct script access allowed');

    class ProduitsModel extends CI_Model
    {
   
    } 	  

> Comme pour un contrôleur, le nom de classe de modèle doit **commencer par une majuscule** et le fichier php **doit porter le même nom.**
 
> Il est recommandé d'ajouter le suffixe `_model` au nom de la classe (et donc au fichier aussi puisqu'ils doivent porter le même nom); c'est facultatif mais on se retrouverait avec 2 classes nommées de façon identique et cela produirait une erreur. 
 
Comme on peut le voir, les modèles héritent la classe `CI_model`.  

## Exécuter une requête 

On va transférer les appels à la base de données (requêtes) du contrôleur vers le modèle.

Dans le fichier `ProduitsModel.php`, ajoutez une méthode nommée `liste()` destinée à sélectionner la liste des produits en base :   
 
    <?php 
    if (!defined('BASEPATH')) exit('No direct script access allowed');

    class ProduitsModel extends CI_Model
    {
         public function liste() 
         {
             $this->load->database();
             $requete = $this->db->query("SELECT * FROM produits");
             $aProduits = $requete->result();  

             return $aProduits;            
         } // -- liste()    
    } // -- ProduitsModel

CodeIgniter fournit de nombreuses fonctions pour manipuler les données : [documentation](https://www.codeigniter.com/userguide3/database/index.html) (à consulter selon vos besoins).
 
## Communication contrôleur/modèle

Dans le contrôleur (méthode `liste()` du fichier `application\controllers\Produits.php`, on va remplacer notre connexion à la base et la requête (les 3 lignes en commentaires _ANCIEN CODE_) par l'utilisation de modèles (_NOUVEAU CODE_) : 

	public function liste()
	{
		/* ANCIEN CODE 
    	$this->load->database();
		$requete = $this->db->query('SELECT * FROM produits');
		$aView["liste"] = $requete->result();
    	*/

    	// NOUVEAU CODE 

        // Chargement du modèle 'produitsModel'
    	$this->load->model('produitsModel');
 
        /* On appelle la méthode liste() du modèle,
        * qui retourne le tableau de résultat ici affecté dans la variable $aListe (un tableau) 
        * remarque la syntaxe $this->nomModele->methode()       
    	*/
        $aListe = $this->produitsModel->liste();

        $aView["liste"] = $aListe;
 
    	$this->load->view('liste', $aListe);

        // -- fin NOUVEAU CODE
	} // -- liste()    

## Exercices : méthodes C.R.U.D.

Le modèle contient généralement les méthodes qui effectuent les actions C.R.U.D. : il faudra écrire une méthode par action. 

On pourra passer des arguments à ces méthodes pour exécuter des requêtes avec critères (clauses `WHERE`).  



