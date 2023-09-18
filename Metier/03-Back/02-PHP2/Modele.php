<?php

class ProduitModele{
    private $_connexion;
    private $host = "localhost";
    private $base = 'afpa_gescom';
    private $utilisateur = 'root';
    private $motdepasse = '';


    function __construct(){
        try {
            // Code dont l'execution peut entrainer un crash
            $this->_connexion = new PDO('mysql:host='.$this->host.';charset=utf8;dbname='.$this->base, $this->utilisateur, $this->motdepasse);
        
            $this->_connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
            echo "connection réussie";
        }
        catch (Exception $e){
            echo 'Erreur : ' . $e->getMessage() . '<br />';
            echo 'N° : ' . $e->getCode();
            die('Fin du script');
        }
    }


    // CRUD sur la table Produits de la base afpa_gescom

    // READ
    public function getAll(){

        $requete = "SELECT * FROM Products";
        $resultat = $this->_connexion->query($requete);
        $produits = $resultat->fetchAll();

        return $produits;
    }

    public function getOne($id)
    {
        $requete = "SELECT * FROM Products WHERE pro_id = :id";
        $resultat = $this->_connexion->prepare($requete);
        $resultat->bindParam(':id', $id, PDO::PARAM_INT);
        $resultat->execute();
        $donnees = $resultat->fetchAll();
        return $donnees;

    }
    // CREATE
    public function newProduit($donnees){

    }
    // UPDATE
    public function update($id){

    }
    // DELETE
    public function delete($id){
        
    }
}


?>