<?php

// $host = "localhost";
// $base = 'afpa_gescom';
// $utilisateur = 'root';
// $motdepasse = '';

// try {
//     // Code dont l'execution peut entrainer un crash
//     $connexion = new PDO('mysql:host='.$host.';charset=utf8;dbname='.$base, $utilisateur, $motdepasse);

//     $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

//     echo "connection réussie";
// }
// catch (Exception $e){
//     echo 'Erreur : ' . $e->getMessage() . '<br />';
//     echo 'N° : ' . $e->getCode();
//     die('Fin du script');
// }

// $requete = "SELECT * FROM Products";
// $resultat = $connexion->query($requete);
// $donnees = $resultat->fetchAll();
// var_dump($donnees);

// // OU
// $id = 7;
// $requete = "SELECT * FROM Products WHERE pro_id = :id;";
// $resultat = $connexion->prepare($requete);
// $resultat->bindParam(":id",$id);
// $resultat->execute();
// $donnees = $resultat->fetchAll();
// var_dump($donnees);


require("Modele.php");

$modele = new ProduitModele();
// var_dump($modele);
$monProduit = $modele->getOne(7);
var_dump($monProduit);
var_dump("espace");
$listeProduits = $modele->getAll();
var_dump($listeProduits);

