# JS 06 : Opérateurs

> Dans tous les exemples de ce cours, on considère que la valeur initiale de `x` est égale à _11_.

## Les opérateurs de calcul

|  Signe | Nom    | Signification | Exemple | Résultat |
|--------|------- |---------------|---------|----------|
|  `+`   | Plus   | Addition      | x + 3   |   14     |
|  `-`   | Moins  | Soustraction  |  x - 3  |   8      |
|  `*`   | Multiplié par  | Multiplication  |  x*2   | 22  |
|  `/`   | Divisé par | Division  | x/2  |  5.5 |
|  `%`   | Modulo  | Reste de la division  | x%5  | 1  |
|  `=`   | Egal    | Reçoit la valeur de droite | x = 5 | 5 |

> L'opérateur `+` sert aussi à concaténer des chaînes de caractères. 


## Les opérateurs associatifs 

On appelle ainsi les opérateurs qui réalisent un calcul dans lequel une variable intervient des deux côtés du signe `=` (ce sont donc en quelque sorte des opérateurs d'attribution).

Dans les exemples suivants `x` vaut toujours _11_ et `y` aura comme valeur _5_.
 
<table>
	<thead>
	   <tr>
    	<th>Signe</th>
        <th>Description</th>
        <th>Exemple</th>
        <th>Signification</th>
        <th>Résultat</th> 
      </tr> 
	</thead>
    <tbody>
        <tr>
            <td>`+=`</td>
			<td>plus égal</td>
			<td>`x += y`</td>
			<td>`x = x + y`</td>
			<td>16</td>
       </tr>  
       <tr>
            <td>`-=` </td>
			<td>moins égal</td>
			<td>`x -= y`</td>
			<td> `x = x - y`</td>
			<td>6</td>
       </tr>  
       <tr>
            <td>`*=`</td>
			<td> multiplié égal</td>
			<td>`x *= y`</td>
			<td>`x = x * y`</td>
			<td>55</td>
       </tr>          
       <tr>
            <td>`/=`</td>
			<td>divisé égal</td>
			<td> `x /= y`</td>
			<td>`x = x / y`</td>
			<td>2.2</td>
       </tr>                         
    </tbody>
</table>

## Les opérateurs logiques

Aussi appelés opérateurs booléens, ils servent à vérifier deux ou plusieurs conditions.

<table>
	<thead>
      <tr>
		<th>Signe</th>
        <th>Nom</th>
        <th>Exemple</th>
        <th>Signification</th> 
      </tr>  	
    </thead>
    <tbody>
         <tr>
            <td>`&&`</td>
			<td>et</td>
			<td>(condition1) && (condition2)</td>
			<td>condition1 et condition2</td>		
       </tr>         
       <tr>
            <td>`||`</td>
			<td>ou</td>
			<td>(condition1) `||` (condition2)</td>
			<td>condition1 ou condition2</td>			
       </tr>                
    </tbody>
</table>

## Les opérateurs d'incrémentation 

Ces opérateurs vont augmenter ou diminuer la valeur de la variable d'une unité. Ce qui sera fort utile, par exemple, pour mettre en place des boucles.

> Dans les exemples ci-dessous, `x` vaut 3.

<table>
	<thead>
       <tr>
		<th>Signe</th>
        <th>Description</th>
        <th>Exemple</th>
        <th>Signification</th> 
        <th>Résultat</th>
       </tr> 
	</thead>
    <tbody>
         <tr>
            <td>x++</td>
			<td>incrémentation ()</td>
			<td>y = x++</td>
            <td>x++ est la même chose que x = x + 1</td>		
           	<td>x vaut 4</td>
       </tr>         
       <tr>
            <td>x--</td>
			<td>décrémentation</td>
            <td>y = x--</td>
			<td>x-- est la même chose que x = x - 1</td>
          	<td>y vaut 2</td>			
       </tr>       
    </tbody>
</table>

## La priorité des opérateurs JavaScript

Les opérations s'effectuent dans l'ordre suivant de priorité (du degré de priorité le plus faible au degré de priorité le plus élevé).

Dans le cas d'opérateurs de priorité égale, de gauche à droite.

<table>
	<thead>
		<tr><th>Opération</th><th>Opérateur</th></tr>
    </thead>
    <tbody>
        <tr><td>,</td><td>virgule ou séparateur de liste</td></tr>
        <tr><td>= += -= *= /= %=</td><td>affectation</td></tr>
        <tr><td>? :</td><td>opérateur conditionnel</td></tr>
        <tr><td>||</td><td>ou logique</td></tr>
        <tr><td>&&</td><td>et logique</td></tr>
        <tr><td>== !=</td><td>égalité, différence</td></tr>
        <tr><td>< <= >= ></td><td>relationnel</td></tr>   
        <tr><td>+ -</td><td>addition, soustraction</td></tr>   
        <tr><td>* /</td><td>multiplication, soustraction</td></tr>   
        <tr><td>!- ++ --</td><td>unaire</td></tr>
        <tr><td>!- ++ --</td><td>parenthèses</td></tr>     
    </tbody>
</table> 

## Exercices

### Exercice 1
<!-- TODO modifier ? a="Ceci est une chaîne de caractères :" pour une leilleur compréhension -->
Soit les variables suivantes : 

* `a` qui contient la chaîne de caractères 100
* `b` = 100
* `c` qui contient la valeur 1,00
* `d` booléen qui vaut vrai

A réaliser :

* Affichez _Ceci est une chaîne de caractères : 100_; concaténez cette chaîne avec la variable `a` pour afficher le _100_.
* Appliquez à `b` l'opérateur de décrémentation
* Ajoutez à `c` la valeur de `a` 
* Inversez la valeur de `d`

<!--

### Exercice 2

+++ TODO : https://www.dummies.com/web-design-development/javascript-operator-precedence +++

Soit le code suivant :

	var ht = 100;
	var tva = 1.20;
	var ttc = ht / 1 + taxRate;
	alert("The pre-tax price is " + retailPrice);
-->