# Héritage

La P.O.O. présente un mécanisme dit d'héritage :

* Une classe B peut utiliser les membres d'une classe A; on dit alors que B hérite de A (ou : dérive, étend),
* La classe A est alors appelée classe parente (ou : mère, super-classe),
* La classe B est alors appelée classe fille (ou : enfant, héritée, dérivée, sous-classe) 

L'héritage peut être résumé par la formule _la classe B est une sorte (sous-espèce) de la classe A_, la classe B ayant des caractéristiques communes avec la classe parente A. 

Par exemple : voiture, camion, bus, moto, bateau sont des types de véhicules : 

* ils ont en commun des attributs (un nom de marque, de modèle, une puissance, une couleur etc.) et des méthodes (avancer, freiner...)
* mais ils ont certains points de différences : un camion possède un poids maxi, un bus un nombre de passagers etc. 
    
**Possibilités et limites de l'héritage :** 

* Une classe fille ne peut posséder qu'une seule classe parente mais avoir une infinité de classes filles.  
* Une classe mère peut posséder une infinité de classes filles (ex : la classe `Vehicule` pourraient avoir pour  classes filles `voiture`, `moto`, `camion`, `bus`, `velo`, `bateau` etc.).  

L'héritage peut se faire faire sur plusieurs niveaux hiérarchiques : par exemple une classe C hérite de la classe B qui hérite elle-même de la classe A (donc ici sur 3 niveaux).    

Pour implémenter l'héritage, la classe fille doit utiliser le mot-clé `extends` suivi du nom de la classe parente (ou classe mère) dans la définition de la classe : 

	<?php
	class Voiture extends Vehicule
	{	
	    [ CODE ]
	} // -- fin de la classe
	
* Ici, la classe `Voiture` hérite de la classe `Vehicule` : la classe `Voiture` est donc la classe fille (ou classe dérivée) et la classe `Vehicule` la classe parente.  
* La classe `Voiture` aura accès (selon la visibilité des membres) aux attributs et méthodes de la classe `Vehicule` parente. Le mot clé `parent::` devra être utilisé pour appleer un attribut/méthode de la classe parente. (par exemple `parent::avancer()` appelle la méthode `avancer()` de la classe parente).  

<br><br><br><br> 