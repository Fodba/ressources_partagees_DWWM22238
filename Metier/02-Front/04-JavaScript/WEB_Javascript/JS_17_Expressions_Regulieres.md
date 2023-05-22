# JS 17 : Les expressions régulières

## Définition

Une expression régulière (du mot « règle ») ou encore expression rationnelle est une suite de caractère qui va permettre, associée à des fonctions d’un langage, de travailler sur des chaînes de caractères pour : 

* vérifier la validité d’une chaîne (nombre et/ou présence de caractères, longueur)

* effectuer des recherches dans une chaîne (par exemple trouver une mot ou une portion de mot)

* effectuer des remplacements de caractères ou de mots dans une chaîne   

En fait, une **expression régulière** agit comme un **filtre de vérification** ou une **contrainte** que l’on applique à une chaîne de caractères.

Les expressions régulières existent dans différents langages (Javascript, PHP, C#…) : 

les filtres (écriture des expressions) restent les mêmes d’un langage à l’autre, par contre les fonctions d’exécution de ces filtres seront propres à chaque langage.  

Les expressions régulières sont plutôt efficaces en termes de contrôle des données, la difficulté réside dans l’écriture des règles qui peut paraître complexes pour les débutants.

### Exemples 

L’expression régulière suivante, très simple, va contrôler que le mot « javascript », une chaîne de caractères donc, comporte bien uniquement des lettres et uniquement en minuscules :  

```js
var filtre = new RegExp("^[a-z]+$");
var resultat = filtre.test("javascript");
console.log(resultat);
```

* Ligne 1 : on crée un filtre, qui est en fait un objet expression régulière RegExp de Javascript.

Cet objet prend en argument la règle d’écriture `^[a-z]+$`.

L’ensemble est affecté à une variable, ici la variable nommée **filtre**.

* Ligne 2 : on va évaluer la chaîne passée en argument **"javascript"**, avec le **filtre** en utilisant la `fonction` nommée `test()`, une méthode de l’objet RegExp de Javascript. 

Cette **méthode renvoie** un **booléen**, ici resultat vaut TRUE puisque la condition évaluée par le filtre est correcte.  

## Ecriture des règles

Deux types de caractères peuvent être utilisés dans les expressions régulières :

les méta caractères   <strong>. \ ? * + { } ( ) [ ] </strong>  et les caractères normaux tout autre caractère, y compris les symboles précédents qui devront être alors représentés par des séquences d'échappement.

### Les chaînes alphabétiques

**[A-Za-z]** permet de vérifier qu'un caractère fait partie des lettres **"A" à "Z"** et **"a" à "z"** (en dehors de tout caractère accentué). 

Les slashes / délimitent l'expression régulière. 

Mais on peut aussi bien mettre des guillemets :

**/[A-Za-z]/**  ou  **"[A-Za-z]"**

Pour indiquer que nous ne voulons QUE des caractères alphabétiques, il faut écrire :**/^[A-Za-z]+$/**

Les 2 caractères « **^** » et « **$** » indiquent qu'il faut établir le contrôle du **début à la fin de la chaîne**. 

Le caractère « **+** » **indique** que le caractère alphabétique doit être **présent au moins une fois**. 

### Les chaînes numériques

<strong>/^[0-9]*$/</strong>

L'expression [0-9] indique qu'on n'attend que des chiffres. 

On peut aussi utiliser « \d » à la place de [0-9].

L'astérisque «<strong>*</strong>» signifie que le caractère peut être absent ou présent plusieurs fois (alors que « **+** » implique que le caractère soit présent au moins une fois). 

Donc si la chaîne est vide, elle sera considérée comme correcte, selon l'expression régulière. 

### Les dates

*	**/^[0-9]+\/[0-9]+\/[0-9]+$/**   

 Il s'agit seulement d'une date au format numérique, dans le style "14/7/2003". Dans l'expression régulière, on a 3 parties : 
 
 le jour, le mois et l'année, qui sont des chiffres répétés plusieurs fois. 
 
 Ils sont séparés par le signe « \/ » : on ne peut pas mettre simplement « / », parce que ce signe indique l'encadrement de l'expression régulière, donc il faut « échapper » le slash par un antislash (« \ »). 

*	**/^[0-9][0-9]?\/[0-9][0-9]?\/[0-9][0-9]([0-9][0-9])?$/**   

Avec cette expression régulière on est obligé d'écrire le jour et le mois avec un ou 2 chiffres, et on doit écrire l'année sur 2 ou 4 chiffres. 

C'est-à-dire : « 14/7/03 » ou « 14/7/2003 » ou « 14/07/2003 » 

On a introduit quelques nouveautés :

*	le ? indique que le caractère précédent peut être présent 0 fois ou 1 fois, donc [0-9][0-9]? signifie qu'on peut écrire un ou 2 chiffres;

* les parenthèses permettent d'affecter le quantificateur (+, *, ?) à la série de caractères entre ces parenthèses : ([0-9][0-9])? signifie que ces 2 caractères peuvent être présents 0 fois ou 1 fois. 

Si l'on souhaite d'autre séparateur que le / pour la date, il faudra utiliser « **(\/|-|\.)** » qui autorise soit le slash, soit le tiret, soit le point par exemple

### Les adresses mail

Une adresse e-mail, par exemple `nom.prenom@site.fr`  est constituée de 3 parties :  

**L'utilisateur** (ici : `nom.prenom`) : 

est donc contrôlé par la séquence [_a-z0-9-]+(\.[_a-z0-9-]+)* où [_a-z0-9-] représente les caractères alphanumériques, plus le caractère de soulignement, plus le tiret. La 2ème partie (\.[_a-z0-9-]+)* permet d'ajouter des mots séparés par un point. 

**Le nom de domaine** (ici : `site`) :

Il suit l'arobase et ne peut contenir que des caractères alphanumériques, le caractère de souligne-ment, et le tiret : **[a-z0-9-]+**

**L’extension TLD** (top level domain) (ici : `fr`) :

Il est constitué seulement d'un point suivi de caractères alphanumériques, éventuellement répété plusieurs fois : « (\.[a-z0-9]+) » 

Dans les faits, l’écriture d’une expression régulière de validation d’une adresse mail s’avère assez complexe car elle doit répondre aux différents standards (normes RFC) qui régissent l’envoi des mails.

Voici donc un exemple qui permet de valider 99.99% des formes d’adresses mail : 

[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?

On vous avait prévenu, c’est plutôt compliqué !

### Autres cas 

<table>
<thead>
	<tr>
		<th>Type</th>
		<th>Règle à vérifier</th>
        <th>Regex à appliquer</th>
	</tr>
</thead>
<tr>
	<td>Chaîne alphanumérique
	</td>
	<td>On peut aussi utiliser le caractère « \w », qui autorise les caractères alphanumériques ou le caractère de soulignement (_)
	</td>
    <td>/^[0-9A-Za-z]+$/ 
	</td>
</tr>
<tr>
	<td>Code couleur
	</td>
	<td>Un code couleur est constitué d'un « # », suivi d'un nombre hexadécimal, qui ne peut contenir que des chiffres ou des lettres de A à F.
	</td>
    <td>/^#[0-9A-F]+$/
	</td>
</tr>
</table>

### Caractères spéciaux

Voici les principaux caractères spéciaux que vous pourrez utiliser dans vos expressions régulières.

<table>
<thead>
	<tr>
		<th>Caractères spéciaux</th>
		<th>Signification</th>        
	</tr>
</thead>
<tr>
	<td>\
	</td>
	<td>Si le caractère suivant est n'est pas un caractère spécial, cela signifie que ce caractère doit être considéré comme un caractère spécial.<br>Exemple :<br>\d signifie un chiffre<br>Si le caractère suivant est un caractère spécial, cela signifie qu'il faut prendre ce caractère de façon littérale.<br>Exemple \* cherche la présence d'un astérisque *
	</td>    
</tr>
<tr>
	<td>^
	</td>
	<td>indique l'emplacement où doit commencer la chaîne de caractère à contrôler
	</td>    
</tr>
<tr>
	<td>$
	</td>
	<td>indique l'emplacement où doit finir la chaîne de caractère à contrôler
	</td>    
</tr>
<tr>
	<td>*
	</td>
	<td>indique que le caractère précédent doit être présent 0 fois ou plusieurs fois (soit absent soit présent ou répété)
	</td>    
</tr>
<tr>
	<td>+
	</td>
	<td>indique que le caractère précédent doit être présent 1 fois ou plusieurs fois (donc au moins une fois)
	</td>    
</tr>
<tr>
	<td>?
	</td>
	<td>indique que le caractère précédent doit être présent 0 ou 1 fois (soit absent soit présent mais pas répété)
	</td>    
</tr>
<tr>
	<td>(x)
	</td>
	<td>le caractère doit correspondre à x et permet de mettre ce caractère en mémoire (sert pour la fonction "exec" qui découpe la chaîne testée dans un tableau)
	</td>    
</tr>
<tr>
	<td>|
	</td>
	<td>ex : x|y, le caractère doit correspondre à x OU à y ("|" est le caractère CTL-ALT 6 ou AltGr 6 sur PC)
	</td>    
</tr>
<tr>
	<td>{n}
	</td>
	<td>si n est un nombre, le caractère précédent doit être présent n fois
	</td>    
</tr>
<tr>
	<td>{n, p}
	</td>
	<td>si n et p sont des nombres, le caractère précédent doit être présent au minimum n fois et au maximum p fois
	</td>    
</tr>
<tr>
	<td>[abc]
	</td>
	<td>le caractère doit correspondre aux caractères entre crochets ("a", "b" ou "c")
	</td>    
</tr>
<tr>
	<td>[^abc]
	</td>
	<td>le caractère ne doit pas correspondre aux caractères entre crochets ("a", "b" ou "c")
	</td>    
</tr>
<tr>
	<td>\s
	</td>
	<td>le caractère doit correspondre à un espace, un retour chariot, ou un caractère de tabulation
	</td>    
</tr>
<tr>
	<td>\S
	</td>
	<td>correspond à tous les caractères sauf l'espace
	</td>    
</tr>
<tr>
	<td>\d
	</td>
	<td>correspond à [0-9], c'est-à-dire à un chiffre
	</td>    
</tr>
<tr>
	<td>\D
	</td>
	<td>tout caractère sauf un chiffre
	</td>    
</tr>
<tr>
	<td>\w
	</td>
	<td>correspond aux caractères alphanumériques + le "_" (équivalent à [A-Za-z0-9_])
	</td>    
</tr>
<tr>
	<td>\W
	</td>
	<td>correspond à tous les caractères sauf les caractères alphanumériques et le "_" (équivalent à [^A-Za-z0-9_])
	</td>    
</tr>
</table>

### Fonctions 

<table>
<thead>
	<tr>
		<th>Fonction</th>
		<th>Objet et exemples</th>        
	</tr>
</thead>
<tr>
	<td>test
	</td>
	<td>Retourne vrai si la chaîne respecte l’expression régulière, faux sinon.
	</td>    
</tr>
<tr>
	<td>exec
	</td>
	<td>applique l’expression régulière à la chaîne et renvoie le résultat
	</td>    
</tr>
<tr>
	<td>match
	</td>
	<td>applique l’expression régulière à la chaîne et renvoie le(s) résultat(s)
	</td>    
</tr>
<tr>
	<td>replace
	</td>
	<td>remplace le(s) sous-chaîne(s) vérifiant l’expression régulière par la 2ème chaîne passée en argument et renvoie le résultat
	</td>    
</tr>
<tr>
	<td>search
	</td>
	<td>renvoie la position de la première sous-chaîne vérifiant l’expression régulière 
	</td>    
</tr>
<tr>
	<td>split
	</td>
	<td>découpe une chaîne selon l’expression régulière
	</td>    
</tr>
</table>


### Ressources

* [MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/RegExp) 
* [OpenclassRooms](https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1920128-les-expressions-regulieres-partie-1-2)
		
		  

	
	
	
 	
	
	





	
	
	
	
	
 	
	
	
	

	
	
	
	
	
	

