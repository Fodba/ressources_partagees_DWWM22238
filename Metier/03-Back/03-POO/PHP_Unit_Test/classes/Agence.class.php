<?php

class Agence
{
    private $_nom;
    private $_adresse;
    private $_codePostal;
    private $_ville;
    private $_restauration;

    
    public function getNom() {return $this->_nom; }
    public function setNom($sNom){$this->_nom = $sNom;}

    public function getAdresse(){return $this->_adresse;}
    public function setAdresse($sAdresse){ $this->_adresse = $sAdresse;}

    public function getCodePostal(){return $this->_codePostal;}
    public function setCodePostal($sCodePostal){$this->_codePostal = $sCodePostal;}

    public function getVille(){return $this->_ville; }
    public function setVille($sVille){$this->_ville = $sVille;}

    
    public function getModeRestauration() {return $this->_restauration; }
    public function setModeRestauration($bHasRestaurant){$this->_restauration = $bHasRestaurant;}
}
?>