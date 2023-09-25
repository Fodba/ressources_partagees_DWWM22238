<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class CategoriesModele extends CI_Model {

    public function index(){
        $this->load->database();
        $requete = $this->db->query("SELECT * FROM Categories");
        $categories = $requete->result();
        
        return $categories;
    }

    // Permet de récupérer une catégorie à partir de son id
    public function getOne($id){
        $this->load->database();
        $requete = "SELECT * FROM Categories WHERE cat_id = ?";
        $resultat = $this->db->query($requete,array($id));
        $categories = $resultat->result()[0]; // result renvoit un tableau mais on ne veut qu'un seul résultat.
        
        return $categories;
    }


}