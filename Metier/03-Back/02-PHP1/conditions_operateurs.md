# PHP 02 - Les instructions conditionnelles

> Le fonctionnement des conditions en PHP est proche de celui vu en Javascript.

## Instruction `if` 

L'instruction `if` est l'instruction conditionnelle incontournable. Elle exécute une ou plusieurs instructions, suivant une ou plusieurs conditions. 

La syntaxe générale est : 

	if ( condition ) 
	{ 
	     Instructions; 
	} 
	else if ( condition ) 
	{ 
	     Instructions; 
	} 
	else 
	{ 
	     Instructions; 
	} 
	
Exemple : 

	if ($a > $b) 
    { 
       echo "$a est plus grand que $b"; 
    }
 
Peut s'interpréter par : si `$a` est plus grand que `$b`, alors exécuter l'instruction ci-dessous.
En fait la condition renvoi une valeur vrai ou faux.

Si plusieurs instructions doivent être exécutées par la suite il faut ouvrir et fermer des accolades pour indiquer le début et la fin des instructions. 

	if ($a > $b) { 
	    echo "$a est plus grand que $b"; 
	    $b = $a; 
	} 
	else 

Exemple : 

	if ($a > $b) { 
	    echo "$a est plus grand que $b"; 
	} else { 
	   echo "$a est moins grand que $b"; 
	} 

Peut s'interpréter par : si `$a est plus grand que `$b`, alors exécuter l'instruction ci-dessous, sinon ( si `$a` n'est pas plus grand que `$b` ) exécuter l'instruction ci-dessous.

## Instruction `switch`

L'instruction `switch` est similaire à une série de conditions `if` sur une même variable, avec l'avantage d'être beaucoup plus claire au niveau du code :

	$a = 2; 

	switch ($a) { 
	  case 0 : 
	  	echo"$a = 0"; 
	  break; 
	  
      case 1 : 
	  	echo "$a = 1"; 
	  break; 
	  
      case 2 : 
	     echo "$a = 2"; 
	  break; 
	} 

La variable est testée sur les valeurs définies par case X : 

> Les instructions `breaks` peuvent être optionnelles; mais dans ce cas, même si la condition de `case` est remplie, les instructions suivantes continueront à être exécutées. 

De plus le script peut être complété par une ligne du type : 

	default : 
	    echo "$a n'est pas égale à 1,2 ou 3"; 

`default` sera exécuté automatiquement en dernier lieu si les `case X` du dessus ne répondent pas aux conditions. 

## Exercices

Les exercices sur les conditions se trouvent à la fin de la séquence suivante sur les boucles.