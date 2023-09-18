<?php

// Créer une classe Personnage contenant les attributs suivants:
//  * nom
//  * prenom
//  * age

class Personnage 
{
    private $_nom;
    private $_prenom;
    private $_age;
    private $_sexe;
    
    
    public function setNom($sNom){
        return $this->_nom = $sNom;
    }
    
    public function getNom(){
        return $this->_nom;
    }
    
    public function setPrenom($sPrenom){
        return $this->_prenom = $sPrenom;
    }
    
    public function getPrenom(){
        return $this->_prenom;
    }
    
    public function setAge($sAge){
        return $this->_age = $sAge;
    }
    
    public function getAge(){
        return $this->_age;
    }
    
    public function setSexe($sSexe){
        return $this->_sexe = $sSexe;
    }
    
    public function getSexe(){
        return $this->_sexe;
    }
}