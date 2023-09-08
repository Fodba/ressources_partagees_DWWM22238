# La méthode constructeur

## Points particuliers

### Constructeur 

Le constructeur est une méthode qui permet de lancer des opérations automatiquement lors d'une instanciation

Le constructeur doit être déclaré avec la méthode suivante : `__construct()` et peut recevoir des arguments. 

> Le constructeur est facultatif en PHP (mais obligatoire dans certains langages).  

**Exemple**

Dans cet exemple, on initiale le nombre de roues 

	class Voiture 
	{
	   public $_marque;
       public $_modele;
	   private $_nbRoues;
	
       // Définition du constructeur de la classe
	   function __construct($marque, $modele, $nbRoues, ) 
       {
     		$this->_marque = $marque;
            $this->_modele = $modele;
            $this->_roues = $nbRoues;
	   }

	   // [ AUTRES METHODES ]

    } // -- fin de la classe

Appel de la classe : on doit alors passer les valeurs des arguments à initialiser :

    $oVoiture = new Voiture("Renault", "Clio", 2018);

### Destructeur

L'inverse du constructeur est le destructeur : `__destruct()` qui permet de déréférencer des valeurs (attributs de l'objet). 

Cette méthode reste optionnelle en PHP et peu utilisée. Elle revêt une utilité dans certains cas, par exemple pour fermer une ressource, par exemple un fichier ouvert avec la fonction `fopen()`. 

[Constructeurs et destructeurs PHP](http://php.net/manual/fr/language.oop5.decon.php)  

<div style="margin-bottom: 45px;"></div>