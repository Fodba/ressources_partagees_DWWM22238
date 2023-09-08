<?php
/* --------------------------------------------------------
*  Classe fille 1
*  -------------------------------------------------------- */

class Voiture extends Vehicule 
{   
   public $nbRoues = 4;
   private $nbPortes;
      
   public function acheter($prixHt) 
   {
	   $prixTtc = $prixHt*TVA; // TVA est située dans la classe parente !
       return $prixTtc; 	   
	   
	   parent::remise(10);
	   
	   $this->$nbRoues = 12;
   }   
   
   // Appel d'une méthode de la classe parente
   
   
   
   static function debug() 
   {
	   
	   
	   echo"- Classe : ".__CLASS__."<br>";
	   echo"- Méthode : ".__METHOD__."<br>";
	   echo"- Fichier : ".__FILE__."<br>";       
   }      
} // -- fin classe Voiture