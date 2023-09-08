<?php
/* --------------------------------------------------------
*  Classe crud 
*  -------------------------------------------------------- */
class Voiture 
{   
   private $_id;
   private $_marque;
   private $_modele;
   private $_version;   
    
   public function create(array $aDatas) 
   {
	  // requete insert
   }      
   
   public function read(array $aDatas) 
   {
	     // requete select
		 
		 
		 $aDatas["marque"] = "Renault";
		 
		 $db = new PDO();
         $pdo->query("SELECT * FROM voitures where 	...);	 
		 
		 
		 
		 
   }     
   
    public function update(array $aDatas) 
   {
	     // requete update
   }      
   
   public function delete(int $id) 
   {
	     // requete delete
   }      
  
} // -- fin classe Véhicule