<?php
/* --------------------------------------------------------
*  Classe parente 
*  -------------------------------------------------------- */
class Vehicule 
{   
   private $_id;
   private $_marque;
   private $_modele;
   private $_version;   
   
   /*
   protected $immatriculation;  
   private $nbKm = 0;
   public $prix;
   */
 
   public $remise = 0.1; // remise par défaut (10%) 
 
   // Constante : la valeur ne peut être modifiée 
   const TVA = 1.2;   
 
   public function rouler($nbKm2) 
   {
	   $this->$nbKm = $this->$nbKm + $nbKm2;
       return $nbKm; 	   
   }      
   
    public function remise(int $prix, int $taux = 0) 
   {
	   if ($taux > 0) 
	   {
	         $remise2 = $prix * $taux;	   
	   } 
	   else 
	   {
	       $remise2 = $prix * $this->$remise;
	   }
	 
       return $remise2; 	   
   }     
   
   public setMarque() 
   {
	   return $this->marque;
   }
   
   public getMarque($marque) {
	  $this->marque = $marque; 
      return $this->marque;
   }	   
} // -- fin classe Véhicule