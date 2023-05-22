# JS 13 : Les objets natifs

Les objets sont des composants essentiels de JavaScript.

Ils sont constitués de propriétés (variables) et de méthodes (fonctions).

JavaScript possède ses propres objets, dits « natifs ».

## L'objet String

L'objet `String` est très utile à la manipulation des caractères.

On crée un objet String avec la syntaxe suivante :

```js
var str = new String("toto");
var str = "toto";  // toute chaîne de caractère est un objet String.
```
La position du premier caractère d’une chaîne est 0.

<table>
<thead>
    <tr>
        <th>Introduction
        </th>
        <th>Description
        </th>
    </tr>
</thead>
    <tr>
        <td>length
        </td>
        <td>Propriété de type entier qui indique la longueur de la chaîne de caractères.
        </td>
    </tr>
    <tr>
        <td>charAt(int)<br>
        chartAt(string, int)
        </td>
        <td>Méthode qui permet d'accéder à un caractère isolé d'une chaîne.
        </td>
    </tr>
    <tr>
        <td>indexOf(string)<br>
        indexOf(string, int)
        </td>
        <td>Méthode qui retourne la position d'une chaîne partielle à partir d'une position déterminée. (position 0 par défaut)
        </td>
    </tr>
    <tr>
        <td>lastIndexOf(string)<br>
        lastIndexOf(string, int)
        </td>
        <td>Méthode qui retourne la position d'une chaîne partielle en partant d'une position déterminée puis en reculant.	
(position par défaut égale à length  moins 1).
        </td>
    </tr>
    <tr>
        <td>match(regExp)
        </td>
        <td>Méthode qui retourne un tableau si l’expression régulière est présente dans la chaîne de caractères, null sinon.
        </td>
    </tr>
    <tr>
        <td>replace(regExp,string)
        </td>
        <td>Méthode qui remplace l’expression régulière trouvée par le texte string.
        </td>
    </tr>
    <tr>
        <td>substring(x,y)
        </td>
        <td>Méthode qui retourne une chaîne partielle située entre la position x et la position (y-1).
        </td>
    </tr>
    <tr>
        <td>toLowerCase()
        </td>
        <td>Méthode qui transforme toutes les lettres en minuscules.
        </td>
    </tr>
    <tr>
        <td>toUpperCase()
        </td>
        <td>Méthode qui transforme toutes les lettres en majuscules.
        </td>
    </tr>
</table>

## L'objet Math

L’objet Math sert à manipuler les nombres.

On utilise les Méthodes et propriétés de l’objet Math directement sans créer d’instance (new).

```js
var maxVal = Math.max(10,20);
```
<table>
<thead>
    <tr>
        <th>Introduction
        </th>
        <th>Description
        </th>
    </tr>
</thead>
    <tr>
        <td>abs(x)
        </td>
        <td>Méthode qui retourne la valeur absolue de x.
        </td>
    </tr>
    <tr>
        <td>ceil(x)
        </td>
        <td>Méthode qui retourne l'entier supérieur ou égal à x.
        </td>
    </tr>
    <tr>
        <td>floor(x)
        </td>
        <td>Méthode qui retourne l’entier inférieur ou égal à x.
        </td>
    </tr>
    <tr>
        <td>round(x)
        </td>
        <td>Méthode qui arrondit le nombre x à l’entier le plus proche.
        </td>
    </tr>
    <tr>
        <td>max(x, y)
        </td>
        <td>Méthode qui retourne le plus grand des 2 nombres x et y.
        </td>
    </tr>
    <tr>
        <td>min(x, y)
        </td>
        <td>Méthode qui retourne le plus petit des 2 nombres x et y.
        </td>
    </tr>
    <tr>
        <td>pow(x,y)
        </td>
        <td>Méthode qui calcule la valeur du nombre x à la puissance y.
        </td>
    </tr>
    <tr>
        <td>sqrt(x)
        </td>
        <td>Méthode qui calcule la racine carrée du nombre x.
        </td>
    </tr>
    <tr>
        <td>random()
        </td>
        <td>Méthode qui retourne la valeur d'un nombre aléatoire compris entre 0 et 1.
        </td>
    </tr>
</table>

L’objet Math possède également des méthodes trigonométriques et logarithmiques.

JavaScript possède également d’autres fonctions utiles pour les nombres :

<table>
<thead>
    <tr>
        <th>Introduction
        </th>
        <th>Description
        </th>
    </tr>
</thead>
    <tr>
        <td>eval(string)
        </td>
        <td>Méthode qui évalue la chaîne passée en argument comme un script JavaScript.<br>
        Exemples :<br>
	var total = eval("10 + 20");<br>
	eval("x=10;y=20;document.write(x*y)");
        </td>
    </tr>
    <tr>
        <td>isNaN(x)
        </td>
        <td>Méthode qui retourne true si le paramètre x n’est pas un nombre.
        </td>
    </tr>
    <tr>
        <td>parseFloat(string)
        </td>
        <td>Méthode qui convertit la chaîne en nombre à virgule flottante.<br>
<font color=red>Si la chaîne ne contient pas que des nombres, JavaScript ne prendra en compte que les nombres en début de chaîne.<br>	
Si le premier caractère n'est pas un caractère admis, la méthode renverra "NaN" (Not A Number).
        </td>
    </tr>
    <tr>
        <td>parseInt(string)
        </td>
        <td>Méthode qui convertit la chaîne en entier.
        </td>
    </tr>
</table>

## L'objet Date

L’objet Date sert à manipuler les dates.

La création d’un objet Date peut se faire de plein de façons différentes :

````js
var myDate = new Date() ;	// Date du jour
var myDate = new Date(millisecondes) ;	// Date depuis le 1er janvier 1970
var myDate = new Date(annee, mois, jour) ;
var myDate = new Date(annee, mois, jour, heure, minute, seconde);
var myDate = new Date(chaîne de caractère représentant une date);
````

<table>
<thead>
    <tr>
        <th>Introduction
        </th>
        <th>Description
        </th>
    </tr>
</thead>
    <tr>
        <td>getYear()
        </td>
        <td>Méthode qui retourne les 2 derniers chiffres de l’année.
        </td>
    </tr>
    <tr>
        <td>getMonth()
        </td>
        <td>Méthode qui retourne le mois compris entre 0 et 11 !
        </td>
    </tr>
    <tr>
        <td>getDate()
        </td>
        <td>Méthode qui retourne le jour du mois compris entre 1 et 31.
        </td>
    </tr>    
    <tr>
        <td>getDay()
        </td>
        <td>Méthode qui retourne le jour de la semaine compris entre 0 et 6. (0 pour dimanche)
        </td>
    </tr>
    <tr>
        <td>getHours()
        </td>
        <td>Méthode qui retourne les heures comprises entre 0 et 23.
        </td>
    </tr>
    <tr>
        <td>getMinutes()
        </td>
        <td>Méthode qui retourne les minutes comprises entre 0 et 59.
        </td>
    </tr>
    <tr>
        <td>getSeconds()
        </td>
        <td>Méthode qui retourne les secondes comprises entre 0 et 59.
        </td>
    </tr>
    <tr>
        <td>getTime()
        </td>
        <td>Méthode qui retourne l’heure courante sous forme d’un entier représentant le nombre de millisecondes écoulées depuis le 1er janvier 1970 00:00:00.
        </td>
    </tr>
    <tr>
        <td>getTimezoneOffset()
        </td>
        <td>Méthode qui retourne la différence entre l’heure locale et l’heure GMT (Greenwich, UK Mean Time) sous forme d'un entier représentant le nombre de minutes (et pas en heures).
        </td>
    </tr>
    <tr>
        <td>toLocaleString()
        </td>
        <td>Méthode qui retourne la date sous forme de chaîne de caractères.
        </td>
    </tr>
    <tr>
        <td>parse(Date)
        </td>
        <td>Méthode statique qui retourne la date passée en paramètre en millisecondes depuis le 1er janvier 1970 00:00:00.
        </td>
    </tr>
</table>

L’objet Date possède l’équivalent des méthodes getXXX() en méthodes setXXX(x) pour assigner une nouvelle valeur x à la date. 

Exemple : *setMonth(10)*.


### Testez l'exemple ci-dessous

```html
<!DOCTYPE html>
<html>
<head>
<title>Objet Date - Exemples</title>
</head>
<body>
<script>
var myDate1 = new Date() ;	// Date du jour
var myDate2 = new Date(3600*24*365*40) ;	// Date depuis le 1er janvier 1970
var myDate3 = new Date(2012, 9, 19) ;
var myDate4 = new Date(2012, 9, 19, 10, 33, 12);
var myDate5 = new Date("Jan 1, 2000 00:00:00");

console.log('new Date() : ' + myDate1.toLocaleString()); 
console.log('new Date(3600*24*365*40) : ' + myDate2.toLocaleString());
console.log('new Date(2012, 9, 19) : ' + myDate3.toLocaleString());
console.log('new Date(2012, 9, 19, 10, 33, 12) : ' + my-Date4.toLocaleString());
console.log('new Date("Jan 1, 2000 00:00:00") : ' + my-Date5.toLocaleString());
console.log("");
var annee = 1900 + myDate1.getYear();
var mois  = myDate1.getMonth() + 1;
var jour  = myDate1.getDate();
console.log('date du jour : ' + jour + "/" + mois + "/" + annee);
</script>
</body>
</html>
```

## L'objet Array

L'objet Array (ou tableaux) est une liste d'éléments indexés dans lesquels on pourra ranger (écrire) des données ou aller reprendre ces données (lire).

**L’indexation commence à 0**.

Pour faire un tableau, il faut créer la structure du tableau en premier. Les éléments du tableau sont vides. Ensuite, affecter des valeurs dans les cases ainsi définies.

```js
var tab = new Array (x); // où x est le nombre d'éléments du tableau.
tab[i] = "élément";
```
On peut également créer et affecter un tableau en une seule étape :

```js
var tab = new Array (10, 5, 4, 20); 
```

JavaScript étant un langage peu typé, il n'est pas nécessaire de déclarer le nombre d'éléments du tableau (soit x). 

JavaScript prendra comme nombre d'éléments, le nombre i le plus élevé lors de "l'alimentation" de la structure (en fait i + 1). 

Ainsi la formulation suivante serait aussi correcte pour un tableau à 3 éléments :

```js
var tCarnet = new Array();
//ou
var tCarnet = [];
tCarnet[2] = "Philippe"; 
```

<table>
<thead>
    <tr>
        <th>Introduction
        </th>
        <th>Description
        </th>
    </tr>
</thead>
    <tr>
        <td>length
        </td>
        <td>Donnée membre qui retourne le nombre d'éléments du tableau.
        </td>
    </tr>
    <tr>
        <td>join()<br>join(string)
        </td>
        <td>Méthode qui regroupe tous les éléments du tableau dans une seule chaîne.<br> Les différents éléments sont séparés par un caractère séparateur spécifié en argument.<br>Par défaut, ce séparateur est une virgule.
        </td>
    </tr>
    <tr>
        <td>reverse()
        </td>
        <td>Méthode qui inverse l'ordre des éléments (ne les trie pas).
        </td>
    </tr>
    <tr>
        <td>sort()
        </td>
        <td>Méthode qui trie les éléments par ordre alphabétique (à condition qu'ils soient de même nature)
        </td>
    </tr>
    <tr>
        <td>push()
        </td>
        <td>Méthode qui ajoute un nouvel élément à la fin du tableau.
        </td>
    </tr>
    <tr>
        <td>pop()
        </td>
        <td>Méthode qui supprime le dernier élément du tableau.
        </td>
    </tr>
    <tr>
        <td>unshift()
        </td>
        <td>Méthode qui ajoute un nouvel élément au début du tableau.
        </td>
    </tr>
    <tr>
        <td>shift()
        </td>
        <td>Méthode qui supprime le premier élément du tableau.
        </td>
    </tr>
    <tr>
        <td>slice(deb, fin)
        </td>
        <td>Méthode qui retourne la partie du tableau commençant à l’indice deb et se terminant à l’indice fin-1.
        </td>
    </tr>
</table>

## L'objet Image

L'objet image permet avec JavaScript de pré charger des images qui pourront être affichées ultérieurement. 

Ce procédé est utile notamment pour améliorer les effets visuels.

Ces images sont mises en mémoire au chargement de la page.

Une fois chargée, une image est affichée plus rapidement. En revanche, le chargement de la page prend plus de temps. 

Pour pré-charger une image, il faut créer un objet image en JavaScript :

```js
var img1 = new Image();  
img1.src = "images/logo2.gif";
```

Pour afficher l’image, il faut passer par une balise `<img>`, puis lui affecter l’objet Image pré chargé :

```html
<img src="images/logo1.gif" onMouseOver="this.src=img1.src;"> 
```
>Ne pas confondre l’objet image avec la balise `<img>`.

Autres propriétés de l’objet Image : `name`, `height`, `width`, `hspace` et `vspace`.

## Exercice

Ecrivez un programme permettant de saisir différentes valeurs numérique (avec l'instruction `window.prompt`), ces valeurs seront rangées dans un tableau. 

La saisie s'arrête quand l'utilisateur entre la valeur 0.

A la fin de la saisie, votre programme doit afficher le nombre de valeurs saisies, la somme et la moyenne.




	
	
	
	
	
	
	
	
	
	
	


	
	
	
		
	
	
	

	
	
	

	

	

	

	
	
	
	
	








