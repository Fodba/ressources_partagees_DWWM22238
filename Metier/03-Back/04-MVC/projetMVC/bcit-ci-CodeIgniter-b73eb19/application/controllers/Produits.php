<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Produits extends CI_Controller {

    public function listeProduits($id){
        // On récupère la catégorie dont l'id est donnée en paramètre
        $this->load->model("CategoriesModele");
        $categorie = $this->CategoriesModele->getOne($id);
        // On récupère les produits de cette catégorie
        $this->load->model("ProduitsModele");
        $produits = $this->ProduitsModele->getProduits($id);
        
        // chargement de la vue "header.php" (avant d'afficher la page produits)
        $this->load->view("header");

        // on envoie les données à la vue "produits.php"
        $donnees["categorie"] = $categorie;
        $donnees["produits"] = $produits;
        $this->load->view("produits",$donnees);

        // chargement de la vue "footer.php"
        $this->load->view("footer");
    }
}