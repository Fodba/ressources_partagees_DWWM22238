<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class ProduitsModele extends CI_Model {
    
    // Récupérer les produits d'une catégorie dont l'id est passé en paramètre
    public function getProduits($id){

        $this->load->database();

        
        $idPrepare = $this->db->escape($id); // Permet de préparer la variable et d'empecher les injections SQL
        $resultat = $this->db->query("SELECT * FROM Products WHERE pro_cat_id =$idPrepare;"); 

        // Avec codeIgniter, on peut également opérer comme suit:
        // $requete = "SELECT * FROM Products WHERE pro_cat_id = ?";
        // $resultat = $this->db->query($requete,array($id));

        // Les 2 métodes permettent d'éviter les injections SQL.


        $produits = $resultat->result();
        
        return $produits;
    }
}