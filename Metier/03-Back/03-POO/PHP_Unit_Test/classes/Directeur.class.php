<?php
    require_once "Employe.class.php";

class Directeur extends Employe
{
    public function calculerPrime(){
        $primeSalaire = (7 * $this->getSalaire()) / 100;
        $anciennete = (3 * $this->getAnciennete());
        $primeAnciennete =  ($anciennete * $this->getSalaire())/100;
        $primeTotale = $primeAnciennete + $primeSalaire;
        
        return $primeTotale;
    }
}


?>