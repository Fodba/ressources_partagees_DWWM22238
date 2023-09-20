<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class CategoriesModele extends CI_Model {

    public function index(){
        $this->load->database();
        $requete = $this->db->query("SELECT * FROM Categories");
        $categories = $requete->result();
        
        return $categories;
    }

}