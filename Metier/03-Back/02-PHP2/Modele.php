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
        $requeteOk = $resultat->execute();
        if($requeteOk){
            $donnees = $resultat->fetch();
            return $donnees;
        }
        else{
            return $requeteOk;
        }

    }
    // CREATE
    public function newProduit($donnees){
        // le tableau de donnees contient les données récupérées depuis un formaulaire d'ajout de produit
        $today = date_format(new DateTime(),'Y-m-d h:i:s'); // La date d'ajout est la date d'aujourd'hui
        $requete = "INSERT INTO Products (
            'pro_cat_id','pro_price', 'pro_ref','pro_ean','pro_stock','pro_stock_alert','pro_color','pro_name','pro_desc','pro_publish','pro_sup_id','pro_add_date'
        )
        VALUES (
            :cat_id,:price,:reference,:ean,:stock,:stock_alert,:color,:pro_name,:pro_desc,:publish,:sup_id,:add_date,
        );";
        $resultat = $this->_connexion->prepare($requete);
        // on insère toutes les variables à la raquête préparée.
        $resultat->bindParam(':cat_id', $donnees['catID'], PDO::PARAM_INT);
        $resultat->bindParam(':price', $donnees['price'], PDO::PARAM_INT);
        $resultat->bindParam(':reference', $donnees['reference'], PDO::PARAM_STR);
        $resultat->bindParam(':ean', $donnees['ean'], PDO::PARAM_STR); // Ici le paramètre attendu est une chaine de caratères
        $resultat->bindParam(':stock', $donnees['stock'], PDO::PARAM_INT);
        $resultat->bindParam(':stock_alert', $donnees['stock_alert'], PDO::PARAM_INT);
        $resultat->bindParam(':color', $donnees['color'], PDO::PARAM_STR);
        $resultat->bindParam(':pro_name', $donnees['pro_name'], PDO::PARAM_STR);
        $resultat->bindParam(':pro_desc', $donnees['pro_desc'], PDO::PARAM_STR);
        $resultat->bindParam(':publish', $donnees['publish'], PDO::PARAM_BOOL);
        $resultat->bindParam(':sup_id', $donnees['sup_id'], PDO::PARAM_INT);
        $resultat->bindParam(':pro_add_date', $today, PDO::PARAM_STR);
        // on récupère le retour de l'execution pour savoir si tout s'est bien passé (on aurait aussi pu mettre tout le bloc dans un try... catch)
        $requeteOk = $resultat->execute();
        // si ok on réupère les données
        if($requeteOk){
            // lastInsertId permet de récupérer le dernier id inserer dans la base de données.
            $lastId = $this->_connexion->lastInsertId();
            $donnees = $this->getOne($lastId);
            return $donnees;
        }
        // sinon on renvoie le retour de l'execution (càd "false")
        else{
            return $requeteOk;
        }
    }
    // UPDATE
    public function update($id,$donnees){
        // Ici je ne modifie que le champs pro_update_date mais l'idée est de modifier en fonction des données reçues.
        $today = date_format(new DateTime(),'Y-m-d h:i:s');
        $requete = "UPDATE Products set pro_update_date = :today WHERE pro_id = :id";
        $resultat = $this->_connexion->prepare($requete);
        $resultat->bindParam(':id', $id, PDO::PARAM_INT);
        $resultat->bindParam(':today', $today, PDO::PARAM_STR);
        $requeteOk = $resultat->execute();
        if($requeteOk){
            $donnees = $this->getOne($id);
            return $donnees;
        }
        else{
            return $requeteOk;
        }
    }
    // DELETE
    public function delete($id){
        $requete = "DELETE FROM Products WHERE pro_id = :id";
        $resultat = $this->_connexion->prepare($requete);
        $resultat->bindParam(':id', $id, PDO::PARAM_INT);
        $requeteOk = $resultat->execute();
        return $requeteOk;
    }
}


?>