<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Categories extends CI_Controller {
    public function index(){
        $this->load->model("CategoriesModele");
        $categories = $this->CategoriesModele->index();
        $variables["categories"] = $categories;
		$this->load->view('categories',$variables);
    }
}