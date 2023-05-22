# Corrigé des exercices Javascript

Ces corrigés proposent **une** solution par exercice, mais il peut exister de nombreuses possibilités obtenant le résultat demandé. La solution présentée est généralement la plus simple, afin de bien vous faire assimiler les bases, et aussi souvent la plus propre en termes de code (c'est-à-dire le moins de code possible, choix de la meilleure structure à utiliser, dialogue avec l'utilisateur...).    

> Bien lire les explications en commentaires dans le code. 

## Afficher du texte 

Créer une page HTML qui demande successivement à l'utilisateur son nom puis son prénom.

La page demande ensuite à l'utilisateur s'il est un homme ou une femme.

Enfin, la page affiche les informations sur l'utilisateur.

    var nom = prompt("Saisir votre nom","Votre nom");
    var prenom = prompt("Saisir votre prénom","Votre prénom");
    
    var civilite1 = confirm("Êtes-vous un homme ?");

    if (civilite1 == true) 
    {
        civilite2 = "Monsieur";
    }
    else 
    {
         civilite2 = "Madame";
    }

    /* On affiche le tout 
    * Retenez le signe \n qui permet un saut de ligne */
    alert("Bonjour "+civilite+" "+prenom+" "+nom+"\nBienvenue sur notre site web !");

## Les conditions 

### 1 - Parité
Ecrivez un programme qui demande un nombre à l'utilisateur puis qui teste si ce nombre est pair. Le
programme doit afficher le résultat « nombre pair » ou « nombre impair ». Vous devez utiliser
l'opérateur **modulo `%`** qui donne le reste d'une division. `a%2` donne le reste de la division de `a` par
2, si ce reste est égal à zéro, `a` est divisible par 2.

    var nb = parseInt(prompt("Saisir un entier"));
    
    // if (nb%2 == 0) 
    // ou bien (identique) : 
    if (nb%2) 
    {
        alert("Le nombre "+nb+" est pair");
    } 
    else 
    {
         alert("Le nombre "+nb+" est impair"); 
    }  

### 2 - Age

Ecrivez un programme qui demande l'année de naissance à l'utilisateur.
En réponse votre programme doit afficher l'âge de l'utilisateur et indiquer si l'utilisateur est majeur
ou mineur.

    var annee_naissance = parseInt(prompt("Saisir année de naissance"));
    
    age = 2019-annee_naissance;
   
    if (age < 18) 
    {
        alert("Vous avez "+age+" ans, vous êtes mineur");
    } 
    else 
    {
        alert("Vous avez "+age+" ans, vous êtes majeur");
    }  

On pouvait éventuellement récupérer l'année en cours grâce à la méthode `getFullYear()` de l'objet javascript `Date` (que nous aborderons plus tard) :
    
Commenter la ligne : 
   
    // age = 2018-annee;

Remplacer par : 
 
    var oDate = new Date();
    var annee_courante = oDate.getFullYear();
    age = annee_courante - annee_naissance;
  
### 3 - Calculette

Faire la saisie de 2 nombres entiers, puis la saisie d'un opérateur '+', '-', '*' ou '/'.
Si l'utilisateur entre un opérateur erroné, le programme affichera un message d'erreur.
Dans le cas contraire, le programme effectuera l'opération demandée (en prévoyant le cas d'erreur
"division par 0"), puis affichera le résultat.

    var nb1 = parseInt(prompt("Entrez votre premier nombre entier"));
    var nb2 = parseInt(prompt("Entrez votre deuxième nombre entier"));
    var operateur = prompt("entrez un opérateur +, -, * ou /");
 
    /* On traite d'abord le cas de la division par 0 :
    * si l'opérateur est division et le 2ème entier vaut 0
    * on affiche un message d'erreur 
    */   
    if (operateur=="/" && nb2==0) 
    {
 	   alert("Division par zéro : impossible");
    } 
    else 
    { /* Sinon, tout est OK pour effectuer le calcul demandé,
      * la structure conditionnelle 'switch' est parfaitement adaptée  
      */ 
		switch (operateur) 
	    {
	 		case "+":
	 			resultat = nb1 + nb2;
	 			break;
	
	 		case "-":
	 			resultat = nb1 - nb2;
	 			break;
	
	 		case "*":
	 			resultat = nb1 * nb2;
	 			break;
	
	 		case "/":
	 			resultat = nb1 / nb2;
	 			break;
	        
            /* Si on n'est pas rentré dans l'un des cas précédents, c'est que l'opérateur saisi est invalide,
            * on peut alors utiliser le cas par défaut pour afficher un message d'erreur */
	 		default:
	 			alert("Opérateur '"+operateur+"' invalide");
	 	 } // fin du switch  
     } // fin du else

     /* Si la variable resultat est de type entier, on l'affiche
	 * mettre une condition ici permet de ne pas afficher 
	 * le message s'il y a une des 2 erreurs divison par zéro ou opérateur invalide 
	 * donc pas de résultat 
	 */ 
	 if (typeof resultat === 'number') 
	 {	        	    
	     alert(nb1+operateur+nb2+" = "+resultat);
	 }         

### 4 - Remise

A partir de la saisie du prix unitaire PU d'un produit et de la quantité commandée QTECOM, afficher
le prix à payer PAP, en détaillant le port PORT et la remise REM, sachant que :

* le port est gratuit si le prix des produits TOT est supérieur à 500 €. Dans le cas contraire, le
port est de 2% de TOT
* la valeur minimale du port à payer est de 6 €
* la remise est de 5% si TOT est compris entre 100 et 200 € et de 10% au-delà

Dans cet exercice, il fallait respecter cet ordre : 

* 1 - Calculer le prix initial TOT = PU*QTE,
* 2 - traiter les conditions de remise,
* 3 - Une fois la remise calculée, la déduire de TOT pour obtenir le prix remisé,
* 4 - Ensuite seulement on pouvait s'attaquer aux conditions de frais de port,
* 5 - Enfin, ajouter les frais de port au prix remisé.


	     // La remise est initialisée, à 0
	     var REM = 0;
	
	     // En initialisant les frais de port à 6, ils vaudront, quoiqu'il arrive, 6 € minimum  
	     var PORT = 6; 
	 
	     var PU = parseInt(prompt("Ecrivez le prix unitaire d'un produit"));
	     var QTECOM = parseInt(prompt("Ecrivez la quantité commandée"));
	    
	     // Calcul du total initial 
	     TOT = PU * QTECOM;
	
	     console.log("Total initial :"+TOT);
	
	     if (TOT >= 100 && TOT <= 200) 
	     {
	        REM = TOT - (0.95 * TOT);
	        console.log("Prix entre 100 et 200, remise = "+REM);
	     }
	
	     if (TOT>200)
	     {
	        REM = TOT - (0.90 * TOT); 
	        console.log("prix > 200, remise = "+REM);     
	     }
	
	     // La remise finale peut toujours valoir 0 si on n'est pas passé dans les deux conditions ci-dessus
	     console.log("Remise finale = "+REM);
	
	     TOT = TOT-REM; // Total avec remise déduite  
	     console.log("Nouveau total, remise déduite = "+TOT);     
	
	     if (TOT>500)    
	     {
	        PORT = 0;
	        console.log("total > 500, port gratuit");
	     } 
	     else 
	     { // TOT<500
	        PORT = TOT*(2/100);
	        console.log("total < 500, port : "+PORT);        
	     }
	
	     if (PORT < 6) 
	     {
	        PORT = 6;
	        console.log("port < 6, port : "+PORT);        
	     }
	
	     /* On a le montant final de frais de port : on les ajoute au total, on 
	     * a alors le prix final à payer par le client */
	     TOT = TOT + PORT;   
	
	     console.log("Au final\n- Le prix à payer remise déduite et port compris est de "+TOT+",\nLe montant de la remise est de : "+REM+"\nLe montant des frais de port est de : "+PORT);

### 5 - Participation

Un patron décide de calculer le montant de sa participation au prix du repas de ses employés de la
façon suivante :

* si il est célibataire : participation de 20%
* si il est marié : participation de 25%
* si il a des enfants : participation de 10% supplémentaires par enfant

La participation est plafonnée à 50%.

Si le salaire mensuel est inférieur à 1200 €, la participation est majorée de 10%.

Ecrire le programme qui lit les informations au clavier et affiche pour chaque salarié, la participation
à laquelle il a droit.

    var salaire = parseInt(prompt("Entrez votre salaire"));
	var mar = prompt("Etes-vous marié?");
	var enf = parseInt(prompt("Nombre d'enfants ?"));
	var perc = 0;
	
    console.log("Salaire : "+salaire);
    console.log("Marié : "+mar);
    console.log("Nombre d'enfants : "+enfant);

	if (salaire < 1200)
	{
	    if (mar=="oui")
	    {
	        perc = 25 + (10* enf) + 10;
	        
	    }
	    else
	    {   
	        perc =  20 + (10 * enf) + 10;
	        
	    }
	}
	else // Cas > 1200 
	{
	    if (mar=="oui")
	    {
	        perc = 25 + (10* enf);   
	    }
	    else
	    {   
	        perc =  20 + (10 * enf);
	    }    
	}
	
    // Pour limiter au minimum de 50, on le force lorsque c'est supérieur
	if (perc > 50)
	{
	    perc = 50;	    
	}
	
	alert("Le taux de participation final est : "+perc);
  
## Les boucles 

### 1 - Saisie

Créer une page HTML qui demande à l'utilisateur un prénom.
La page doit continuer à demander des prénoms à l'utilisateur jusqu'à ce qu'il laisse le champ vide.
Enfin, la page affiche sur la console le nombre de prénoms et les prénoms saisis.

    var compteur = 1;
    var prenom = null;
    var liste = "";

    while (prenom != "") 
    {
       prenom = prompt("Entrer un prénom");        
       liste += prenom." ";
       compteur++;          
    }

    console.log("Liste des prénoms saisis : "+liste);
    console.log("Nombre de prénoms saisis : "+compteur);

Autre solution :

    var compteur = 1;
    var lstPrenoms = "";

    do {
		var prenom = window.prompt("Saisissez le prénom n°" + compteur + "\n ou clic sur Annuler pour arrêter la saisie");
		console.log(prenom);
	
		if (prenom == null || prenom == "") { break; }
	
		compteur++;
		if (lstPrenoms == "") {
			lstPrenoms += (prenom);
			continue;
		}
		lstPrenoms += (", " + prenom);	
	} while (prenom != "" && prenom != null)

    console.log(compteur-1);
    alert((compteur-1) + " prénom.s saisi.s : \n" + lstPrenoms);

### 2 - Entiers inférieurs à N

Ecrivez un programme qui affiche les nombres inférieurs à N.

    var n = parseInt(prompt("Saisir un nombre"));  
       
    for (i = n; i!=0; i--)
    {
        console.log(i); 
    }            

### 3 - Somme des entiers inférieurs à N

Ecrivez un programme qui affiche la somme des nombres inférieurs à N.

    var n = parseInt(prompt("Saisir un nombre"));  
    var total = 0;      
   
    for (i = n; i!=0; i--)
    {
        total+= i;  // La syntaxe += est équivalente à total = total + i 
    }   

    console.log(total);          

### 4 - Somme d'un intervalle

Ecrivez un programme qui saisit deux nombres n1 et n2 et qui calcule ensuite la somme des entiers de 
n1 à n2.

    var n1 = parseInt(prompt("Saisir un 1er entier"));  
    var n2 = parseInt(prompt("Saisir un 2ème entier"));  
    var total = 0;      
   
    for (i = n1; i<=n2; i++)
    {
        total = total + i; 
    }         

    console.log("Total = "+total);

Exemple : 3 et 6 saisis; on a donc la somme de 3+4+5+6 = 18.      

### 5 - Moyenne

Ecrire un programme qui saisit des entiers et en affiche la somme et la moyenne (on arrête la saisie avec la valeur 0)

    var total = 0;
    var compteur = 0;
    var moyenne = null;
    var entier = null;
     
    while (entier != 0)
    {
        total = total + entier;
        compteur++;
        var entier = parseInt(prompt("Saisir un nombre entier"));        
    } // fin while
          
    moyenne = total/compteur;
    console.log("Moyenne : "+moyenne);

### 6 - Mini et maxi

Modifiez le programme de la moyenne pour afficher le minimum et le maximum

    var total = 0;
    var avg = 0;
    var moyenne = null;
    var entier = parseInt(prompt("Saisir un nombre entier"));
    var min = null;
    var max = 0;
    
    while (entier != 0)
    {
        
        if (min == null) 
        {
           min = entier;   
        }
        else if (entier < min) 
        {
           min = entier;
           console.log(min);
        }
    
        if (entier > max) 
        {
            max = entier;
        }    
     
	    total = total + entier;
	    compteur++;
	    var entier = parseInt(prompt("entier"));
    } // fin while
        
    moyenne = total / compteur;
    console.log("Moyenne : "+moyenne);

    // Affichage du minimum et du maximum
    console.log("min : " + min);
    console.log("max : " + max);

### 7 - Multiples

Ecrire un programme qui calcule les N premiers multiples d'un nombre entier X, N et X étant entrés au clavier.
Exemple pour N=5 et X=7 :

1 x 7 = 7<br>
2 x 7 = 14<br>
3 x 7 = 21<br>
4 x 7 = 28<br>
5 x 7 = 35<br>

Il est demandé de choisir la structure répétitive (`for`, `while`, `do...while`) la mieux appropriée au pro-
blème.

    var n = parseInt(prompt("Multiplier jusqu'à :));
    var x = parseInt(prompt("Table de mulitplication du nombre :)); 

	for (j=1; j<=10; j++)
	{
	    var resultat = j*nombre;
	    console.log(nombre+ "x" +j+ "=" +resultat);
	}

### 8 - Nombre de voyelles.

Ecrire le programme qui compte le nombre de voyelles d'un mot saisi au clavier, en utilisant :
* `myVar.length` : retourne le nombre de lettres de la chaîne myVar.
* `myVar.substr(p, n)` : extrait de la chaîne `myVar` une sous-chaîne de `n` caractères à partir de la position `p` 
(attention, en Javascript, le 1<sup>er</sup> caractère se trouve à la position 0).
* `myVar.indexOf(chaine)` : retourne le rang de la première occurrence de `chaine` dans la variable donnée (`myVar`). Si la sous-chaîne n'est pas trouvée, `indexOf` Retourne la valeur -1. 

        var voyelles = 0;
        var mot = prompt("Saisir un mot :");
				
		for (i=0;i<mot.length;i++)
		{
		   if (mot[i] == "a" || mot[i] == "e" || mot[i] == "i" || mot[i] == "o" || mot[i] == "u" || mot[i] == "y") 
		   {	
 	          voyelles++;
		   }
		}
		
        alert("le nombre de voyelles dans :"+mot+" est de "+voyelles);
   
### 9 - Calcul du nombre de jeunes, de moyens et de vieux

Il s'agit de dénombrer les personnes d'âge strictement inférieur à 20 ans, les personnes d'âge strictement supérieur à 40 ans et celles dont l'âge est compris entre 20 ans et 40 ans (20 ans et 40 ans y compris).
Le programme doit demander les âges successifs.
Le comptage est arrêté dès la saisie d'un centenaire. Le centenaire est compté.
Donnez le programme Javascript correspondant qui affiche les résultats.

### 10 - Un nombre est-il premier

Ecrivez un programme qui permet de tester si un nombre est premier.

[Lire cette ressource](http://chatinais.pagesperso-orange.fr/coursjs/exercice/frprem0.htm).

    var nombre = parseInt(prompt("Entrez un nombre"));
    var premier = true;  
        
    for (i=nombre; i>0; i--) 
    {   
    	for (j=2; j < nombre; j++)
    	{
    	    if (nombre%j == 0) 
    	    { 
    	    	premier = false; 
    	    }
    	} 	
    } 
    	
	if (premier == true) 
	{ 
	   console.log("Le nombre "+nombre+" est premier");
	}

### 11 - Nombre magique 

Ecrire un programme qui met en œuvre le jeu du nombre magique : l'ordinateur choisit un nombre aléatoire 
et l'utilisateur doit trouver ce nombre. A chaque fois que l'utilisateur saisit une valeur, il reçoit une indication lui indiquant "plus petit" ou "plus grand".
Vous aurez besoin de générer un nombre aléatoire avec la    
fonction `random` de l'objet `Math` : 

    var magic = parseInt(Math.random()*100);
    var nombre = 0;
    var play = true;

    do {
	   nombre = parseInt(window.prompt("Saisissez un nombre\n(ou cliquez sur Annuler pour arrêter)"));
	
       if (nombre == magic) 
       {
		   alert("Gagné !\nLe nombre était bien " + magic);
		   break;
	   }
	   else if (nombre > magic) 
	   {
	       play = window.confirm("Trop grand ! Rejouer ?")
	   }
	   else 
	   {
			play = window.confirm("Trop petit ! Rejouer ?");
		}
    } while (nombre != magic && nombre != null && play == true);

    if (nombre == null || play == false) 
    {
	   alert("Le nombre à trouver était " + magic);
    }

## Les fonctions 

### 1 - Créer les 2 fonctions suivantes

* `produit(x, y)` qui retourne le produit des 2 variables `x`, `y` passées en paramètres.
* `afficheImg(image)` qui affiche l'image passée en paramètre. Créer la page HTML correspondant au résultat ci-dessous.

+++ NON TERMINE (APPELS) +++

    var nombre;
    var multiple;
    var image = "";
	
    function cube(nombre) 
    {
       nombre = prompt("Saisissez un nombre entier");
       cube = nombre * nombre * nombre;
	   document.write("Le cube de " + nombre + " est égal à " + cube);
	   return cube;
    }

    function produit(nombre, multiple) 
    {
	    produit = nombre * multiple;
	    document.write("Le produit de " + nombre + " x " + multiple + " est égal à " + produit);
	    return produit;
    }

    function afficheImg(image) 
    {
       // Comme on a besoin d'afficher du HTML, il faut utiliser la fonction document.write(); 
      
       // Attention au guillements pour la concaténation, il faut échapper avec des \ les guillemets des attributs HTML
	   document.write("<img src=\""+image+"\">");
    }

    // Appels des fonctions
    var resultat = cube(3);

    console.log("");
    afficheImg("papillon.jpg");

### Exercice 2 : Compter le nombre de lettres

Ecrivez une fonction qui prend deux paramètres :

* `phrase` de type _string_
* `lettre` de type _string_

La fonction compte le nombre de fois ou `lettre` apparaît dans `phrase`. 

        var compteur = 0;
        var phrase = prompt("Saisir une phrase");
        var lettre = prompt("Saisir une lettre");
				
		for (i=0; i<phrase.length; i++)
		{
		   if (phase[i] == lettre) 
		   {	
 	          compteur++;
		   }
		}
		
        alert("La lettre '"+lettre+"' est présente "+compteur+" fois dans '"+phrase+"'");

### Exercice 3 : Menu

A partir du menu affiché à l'écran (avec `prompt`), vous exécuterez, par les 3 premières options, les exercices 
déjà réalisés, appelés sous forme de fonction.   

L'option 4 est une généralisation de la recherche du nombre de voyelles dans un mot : elle permet de rechercher la présence de n'importe quel caractère dans une chaîne.

La recherche de voyelles dans une chaîne constitue une surcharge de cette fonction, dans la mesure où les caractères à rechercher seront fournis sous forme de chaîne.

     function multiple() 
     {
         var nombre = parseInt(prompt("entrez un nombre"));
         var multi = parseInt(prompt("entrez un nombre"));
         
         while (multi > 0) 
         {
             alert(nombre*multi); 
             multi--;
         }
     }

     function somme_moyenne() 
     {
          var i=0;
          var somme=0;
          var moyenne=0;
          var nombre=0;
	      nb = parseInt(prompt("moyenne"));
	      notes = new Array(nb);
	
          for(i=1;i<=nb;i++)
	      {
	         x = parseInt(prompt("entre un nombre"));
	         notes[i-1] = parseInt(prompt("entre un second nombre"));
	         somme = x + notes[i-1];
	      }
	
	    moyenne = somme/nb;
		alert("la somme des nombres est :"+somme);
		alert("la moyenne des nombres est :"+moyenne);
	} 

    function nb_voyelles()
	{
	    var voyelles = 0;
        var mot = prompt("Saisir un mot :");
				
		for (i=0;i<mot.length;i++)
		{
		   if (mot[i] == "a" || mot[i] == "e" || mot[i] == "i" || mot[i] == "o" || mot[i] == "u" || mot[i] == "y") 
		   {	
 	          voyelles++;
		   }
		}
		
        alert("le nombre de voyelles dans :"+mot+" est de "+voyelles);
	}

    function comptelettre()
	{ 
        var phrase = prompt("entrez un mot ou une phrase");
	    var lettre = prompt("entrez une lettre");
    
        var compteur=0;
	    var longueur=texte.length;
	    alert(longueur);
		
        for(i=0;i<=longueur;i++)
	    {
	       var d=texte.substr(i,1);
		       
           if (lettre==d)
	       {
	          compteur++;
	       }
		}
	
    	alert(compteur);
	}

     var choix = prompt("entrz le chiffre voulue selon l'operation \n1-multiple \n2-somme et moyenne \n3-recherche du nombre de voyelles \n4-recherche du nombre des caractères suivants");
    
     switch (choix) 
     {
         case "1":
            multiple();
            break;
    
         case "2":
            somme_moyenne();
         	break;
	
	     case"3":
	        nb_voyelles();
		    break;

		 case"4":
            comptelettre();
            break;

         default:
            alert("Choix non valide");
     } 

### Exercice 5 : String Token

Concevez la fonction `strtok` qui prend 3 paramètres `str1`, `str2`, `n` en  entrée  et  renvoie  une 
chaîne de caractères : 

* `str1` est composée d'une liste de mots séparés par le caractère `str2`.
* `strtok` sert à extraire le n<sup>ième</sup> mot de `str1`.

Exemple : pour str1 = « robert ;dupont ;amiens ;80000 » , strtok (str1, « ; », 3) doit retourner
_amiens_.

    function strtok(str1, str2, n) 
    {
        var res = str1.split(str2);
        console.log(res[n]);
     }  

     var str1 = "robert ;dupont ;amiens ;80000";
     var str2 = ";";
     var n = 2;
     
     strtok(str1, str2, n);

## Les tableaux 
 
### Exercice 1

Créer le programme qui fournira un menu permettant d'obtenir les fonctionnalités suivantes à partir 
d'un tableau à une dimension :

* Affichage du contenu de tous les postes du tableau,
* Affichage du contenu d’un poste dont l'index est saisi au clavier,
* Affichage du maximum et de la moyenne des postes du tableau

Ce programme sera structuré de la manière suivante :

* une fonction `GetIntege()` pour lire un entier au clavier, 
* une fonction `InitTab()` pour créer et initialiser l’instance de tableau : le nombre de postes souhaité sera entré au clavier,
* une fonction `SaisieTab()` pour permettre la saisie des différents postes du tableau,
* une fonction `AfficheTab()` pour afficher tous les postes du tableau,
* une fonction `RechercheTab()` pour afficher le contenu d’un poste de tableau dont le rang est saisi au clavier
* une fonction `InfoTab()` qui affichera le maximum et la moyenne des postes.

Les fonctions seront appelées successivement.

** NON VERIFIE **

	var taille=0;
	var max;
	var donnee;
	var somme =0;
	var recherche;
	var resultat;
	var nbposte;
	var nbdonnee = 0;

	function Getinteger()
	{
	    integer = parseInt(prompt('entrez un entier au clavier'));
	    return integer;
	}
	
	function IniTab()
	{
	    nbposte = parseInt(prompt('entrez le nombre de postes'));
	    var myTableau = new Array(nbposte);
	    return myTableau;
	}
	
	function SaisieTab(myTableau)
	{
	    for (i=0; i<myTableau.length; i++)
	    {  
	       myTableau[i]= parseInt(prompt('entrez un entier'));
	    }
	return myTableau;
	}
	
	function AfficheTab(myTableau)
	{
	    console.log(myTableau);
	}
	
	function RechercheTab(myTableau)
	{
	    recherche=parseInt(prompt('afficher un poste en particulier'));
	    recherche--;
	    console.log(myTableau[recherche]);
	}
	
	function InfoTab(myTableau, somme)
	{
	    console.log(Math.max([0], [i]));
	    for (i = 0; i < myTableau.length; i++) 
	{
	    somme += myTableau[i];
	}	
	
	   console.log(somme/myTableau.length);
	   return somme;
	}

	integer = Getinteger();
	myTableau = IniTab();
	myTableau = SaisieTab(myTableau);
	AfficheTab(myTableau);
	RechercheTab(myTableau);
	InfoTab(myTableau, somme);

### Exercice 2 : Tri d'un tableau

Ecrire le programme qui réalise le tri à bulles.

    var tableau = [5, 18, 14, 4, 26]; 

	console.log("Début: "+tableau); 
    
    // On parcourt le tableau à l'envers (décrémentation)
    for (i = tableau.length; i >= 0; i--) 
    { 
        var valeur; 
    
	    for (j = tableau.length; j > 0; j--) 
	    { 
		    if (tableau[j] < tableau[i]) 
		    { 
		    	valeur = tableau[j]; 
			    console.log("valeur : "+valeur);		    			    			    	
		    	tableau[j] = tableau[i]; 
			    	    	
		    	tableau[i] = valeur; 
		    	console.log("tableau[j] : "+tableau[j]);
		    	console.log("tableau : "+tableau);
		    } 
    	}
    } 

    console.log("Fin : "+tableau); 

## Les évènements

### Exercice 1

Le clic sur le bouton _Contrôler_ engendre l'appel à la fenêtre d'information.

### Exercice 2 : Nombre Magique (the Magic Number)

Reprenez l'exercice du nombre magique.

Votre programme doit générer un nombre aléatoire à l'aide de la fonction _Math.random_. 
Ecrivez  la  fonction verif qui  doit  vérifier  si  la  saisie  de  l'utilisateur  (dans
textBox1) correspond au nombre magique, elle affiche des informations (trop grand, trop petit dans le 
label1.

Quand votre programme fonctionne, modifiez-le pour rendre le javascript non intrusif.

    var magic = parseInt(Math.random()*100);

    document.getElementById("lab").innerHTML = "Entrez votre proposition de nombre (entre 0 et 100) :";

Code HTML :

    <form>
		<input type="text" id="nombre">
		<input type="button" id="verif" value="Vérifier">
	</form>

Code JS :

    var magic = parseInt(Math.random()*100);

    document.getElementById("verif").addEventListener('click',function() 
    {
		if (parseInt(document.getElementById("nombre").value) == magic) 
        {
			window.alert("Gagné !");
			document.getElementById("lab").innerHTML = "Entrez votre proposition de nombre (entre 0 et 100) :";
			magic = parseInt(Math.random()*100);
		}
		else if (parseInt(document.getElementById("nombre").value) > magic) 
        {
			document.getElementById("lab").innerHTML = "Plus petit !";
		}
		else 
        {
			document.getElementById("lab").innerHTML = "Plus grand !";
		}

		document.getElementById("nombre").value = "";
    });