## Mutateurs et accesseurs

L'encapsulation et les principes de visibilité édictent que les attributs d'une classe ne devraient jamais être manipulés directement à l'extérieur de la classe (pour éviter des accidents tels que suppression, mauvaise valeur etc.). 

¨Par conséquent, les attributs devraient toujours être déclarés comme privés, avec le mot-clé `private`.  et être manipulés ensuite par des méthodes appelées [accesseurs et mutateurs](https://openclassrooms.com/fr/courses/1665806-programmez-en-oriente-objet-en-php/1666060-utiliser-la-classe) (_getters_ et _setters_ en anglais).  

### Mutateur

La méthode qui sert de mutateur permet de définir la valeur d'un attribut. Elle reçoit en argument la variable qui contient cette valeur.    

Par convention, les mutateurs ont le préfixe `set` et il est pratique de leur donner le nom de l'attribut concerné :  
  
    <?php
    // vehicule.class.php  

    // Mutateur : définit/modifie la valeur passée en argument à l'attribut 
    public function setMarque($sMarque) 
    {
       return $this->_marque = $sMarque;
    }

> Il faut écrire une méthode mutateur **pour chaque attribut**.  

### Accesseur

     <?php
    // vehicule.class.php  

    // Accesseur : renvoie la valeur d'un attribut  
    public function getMarque() 
    {
        return $this->_marque;
    }


<div style="margin-bottom: 45px;"></div>
