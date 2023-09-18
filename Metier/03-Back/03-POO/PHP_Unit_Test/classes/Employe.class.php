<?php

class Employe
{
    // PROPRIETES
    private $_nom;
    private $_prenom;
    private $_dateEmbauche;
    private $_fonction;
    private $_salaire;
    private $_service;
    private $_agence;
    private $_chequeVacances;
    private $_chequeNoel;
    
    public static $nbrEmploye;
    
    
    
    // CONSTRUCTEUR
    public function __construct(){
        self::$nbrEmploye++;
    }
    
    
    
    //  ACCESSEURS ET MUTATEURS    
    public function getNom(){return $this->_nom;}
    public function setNom($sNom){$this->_nom = $sNom;}
    
    public function getPrenom(){return $this->_prenom;}
    public function setPrenom($sPrenom){$this->_prenom = $sPrenom;}
    
    public function getDateEmbauche(){return $this->_dateEmbauche;}
    // Exemple d'utilisation d'un mutateur
    public function setDateEmbauche($sDdateEmbauche){
        $format = "d/m/Y";
        $date = DateTime::createFromFormat($format,$sDdateEmbauche);
        $this->_dateEmbauche = $date;
    }
    
    public function getFonction(){return $this->_fonction;}
    public function setFonction($sFonction){$this->_fonction = $sFonction;}
    
    public function getSalaire(){return $this->_salaire;}
    public function setSalaire($sSalaire){$this->_salaire = $sSalaire;}
    
    public function getService(){return $this->_service;}
    public function setService($sService){$this->_service = $sService;}
    
    public function getAgence(){return $this->_agence;}
    public function setAgence($sAgence){$this->_agence = $sAgence;}
    
    
    // Exemple d'utilisation d'un accesseur pour un champ en lecture seul (donc pas de mutateur)
    public function isChequeVacance(){
        if($this->getAnciennete()>0)
        $this->_chequeVacances = true;
        else
        $this->_chequeVacances = false;
        return $this->_chequeVacances;
    }
    
    public function isChequeNoel(){
        // if($this->getAnciennete()>0)
        // $this->_chequeNoel = true;
        // else
        // $this->_chequeNoel = false;
        return $this->_chequeNoel;
    }
    
    
    
    // METHODES

    // 1er algorithme

    // public function getAnciennete(){
    //     $today = new DateTime();
    //     $embauche = $this->getDateEmbauche();
    //     $anneeAnciennete = $today->format("Y") - $embauche->format("Y");
    //     if($today->format("m") < $embauche->format("m")){
    //         $anneeAnciennete -= 1;
    //     }
    //     else if($today->format("m") == $embauche->format("m") && 
    //     $today->format("d") < $embauche->format("d")){
            
    //         $anneeAnciennete -= 1;
    //     }
    //     return $anneeAnciennete;
    // }

    // 2e algorithme
    public function getAnciennete(){
        $today = new DateTime();
        $embauche = $this->getDateEmbauche();
        $today->diff($embauche);
        $anneeAnciennete = date_diff($embauche,$today);

        return $anneeAnciennete->y;
    }
    
    public function calculerPrime(){
        $primeSalaire = (5 * $this->getSalaire()) / 100;
        $anciennete = (2 * $this->getAnciennete());
        $primeAnciennete =  ($anciennete * $this->getSalaire())/100;
        $primeTotale = $primeAnciennete + $primeSalaire;
        
        return $primeTotale;
    }
}

?>