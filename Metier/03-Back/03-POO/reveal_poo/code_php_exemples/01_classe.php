<?php
/* --------------------------------------------------------
*  Classe parente ou mère
*  -------------------------------------------------------- */
class Vehicule 
{   
   public $marque;
   public $modele;
   public $version;   
   protected $immatriculation;  
   private $nbKm = 0;
   public prix;
   const TVA = 1.2;    
  
   public function rouler(int $nbKm2) 
   {
	   $this->$nbKm = $this->$nbKm + $nbKm2;
       return $nbKm; 	   
   }   
   
} // -- fin classe Véhicule

/* --------------------------------------------------------
*  Classe fille 1
*  -------------------------------------------------------- */
class Voiture extends Vehicule 
{   
   public $nbRoues = 4;
   private $nbPortes;
      
   public function acheter($prixHt) 
   {
	   $prixTtc = $prixHt*TVA;
       return $prixTtc; 	   
   }   
} // -- fin classe Voiture

/* --------------------------------------------------------
*  Classe fille 2
*  -------------------------------------------------------- */
class Moto extends Vehicule 
{   
   public $nbRoues = 2;
        
   public function methode1() 
   {
	   ... 	   
   }   
} // -- fin classe Moto

/* --------------------------------------------------------
*  Instanciation
*  -------------------------------------------------------- */
$maVoiture = new Voiture();
$prixHt = 100000;
$prixTtc = $maVoiture->acheter($prixHt);
echo'La voiture coûte '.$prixTtc.' euros TTC, va falloir bosser dur !'; 