# JS 15 : Les évènements

## Définition

Les évènements correspondent à des actions effectuées soit par un utilisateur, soit par le navigateur lui-même.

Ce sont les évènements qui permettent la grande interactivité du Javascript.

Vous connaissez déjà des évènements sans les connaître : cliquer sur un lien est un évènement, charger une page web l’est aussi ou encore envoyer un formulaire en cliquant sur le bouton de type `submit`.

## Liste des événements

Il existe des évènements dits **standard**, c’est-à-dire validés par la norme ECMA, et des évènements dits non standards non reconnus par la norme ECMA, ces évènements sont spécifiques aux naviga-teurs.  

Voici la liste des principaux évènements Javascript : 

<table>
<thead>
	<tr>
		<th>Evènement</th>
		<th>Description</th>
	</tr>
</thead>
<tr>
	<td>blur
	</td>
	<td>Lorsqu’un élément de formulaire perd le focus
	</td>
</tr>
<tr>
	<td>change
	</td>
	<td>Lorsque la valeur d'un champ de formulaire est modifiée
	</td>
</tr>
<tr>
	<td>click
	</td>
	<td>Lorsque l'utilisateur clique sur un bouton, un lien ou tout autre élément
	</td>
</tr>
<tr>
	<td>focus
	</td>
	<td>Lorsqu’un élément de formulaire prend le focus
	</td>
</tr>
<tr>
	<td>load
	</td>
	<td>Lorsque la page est chargée par le navigateur
	</td>
</tr>
<tr>
	<td>mouseover
	</td>
	<td>Lorsque l'utilisateur place le pointeur de la souris sur un lien ou tout autre élément
	</td>
</tr>
<tr>
	<td>mouseout
	</td>
	<td>Lorsque le pointeur de la souris quitte un lien ou tout autre élément
	</td>
</tr>
<tr>
	<td>select
	</td>
	<td>Lorsque l'utilisateur sélectionne un champ dans un élément de formulaire
	</td>
</tr>
<tr>
	<td>submit
	</td>
	<td>Lorsque l'utilisateur clique sur le bouton de soumission d’un formulaire
	</td>
</tr>
<tr>
	<td>unload
	</td>
	<td>Lorsque l'utilisateur quitte la page
	</td>
</tr>
</table>

*[Liste complète des évènements](https://www.w3schools.com/jsref/dom_obj_event.asp)* 

> **N’appelez jamais la fonction *`document.write()`*; depuis un évènement car cela remplacerait tout le contenu de la page !**

## Les événements en pratique

Lorsqu’un évènement a lieu, Javascript va le capter et exécuter du code (situé généralement dans une fonction) pour exécuter des actions consécutives à l’évènement (par exemple modifier une couleur ou une dimension, contrôler la saisie dans un champ de formulaire, mettre à jour du contenu HTML ou des données).

### Gestionnaire d’évènement 

Les évènements Javascript sont interceptés via un gestionnaire d’évènement.

Le nom de l’évènement doit être écrit en **CamelCase** préfixé par « **on** », par exemple :
	
<table>
<thead>
	<tr>
		<th>Evènement</th>
		<th>Attribut HTML</th>
	</tr>
</thead>
<tr>
	<td>click
	</td>
	<td>onClick
	</td>
</tr>	
<tr>
	<td>mouseover
	</td>
	<td>onMouseOver
	</td>
</tr>
</table>
	
> `onEvenement="fonction()";`

Par exemple, 

```html
<p onClick="alert('OK')">Clique ici</p>
```

Dans cet exemple, au clic de la souris, une boîte d'alerte avec le message indiqué s’ouvre.

### Javascript « non intrusif » 

Vous lirez souvent sur le web des exemples Javascript similaires à celui du paragraphe précédent où le code de l’évènement se situe directement dans la balise HTML (`onClick, onBlur` etc.).
	
<font color="red" >**<h3>CETTE PRATIQUE EST A OUBLIER COMPLETEMENT**</h3></font>

Depuis la sortie du HTML 5 (mais aussi déjà avant, en HTML 4), la bonne pratique est de séparer (voire d’externaliser complètement dans un fichier) le Javascript. 

On appelle ça le javascript « **non intrusif** ».

Outre une meilleure visibilité du code de la page web (le javascript étant alors centralisé à un seul endroit), cela permet de diminuer le temps de chargement de la page.

Par conséquent, il est nécessaire d’utiliser les évènements d’une autre manière, en les associant à des écouteurs d’évènements via les méthodes `addEventListener/getElementById` ou encore `QuerySelector`.

### Méthodes `addEventListener` et `getElementById`
	
En **Javascript non intrusif**, on peut intercepter un évènement grâce aux 2 méthodes `getElement-ById` qui va cibler l’identifiant de la balise HTML et `AddEventListener` qui va créer un « gestion-naire d’écoute » sur l’objet ciblé, c’est-à-dire créer connecter cet objet à l’évènement concerné. 

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p id="button1">Clique-moi</p>
    <script>
var element = document.getElementById("button1");

element.addEventListener("click", function() 
{
   alert("OK");
});
</script>
  </body>
</html>
```
Notez que dans ce cas le nom de l’évènement n’est pas préfixé par « `on`».

### Exercice 

Testez l'exemple ci-dessus.

### Méthodes `querySelector`

La méthode `querySelector` présente une autre syntaxe mais effectue la même chose que le couple `getElementById/AddEventListener` :

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p id="button1">Clique-moi</p>
    <script>
document.querySelector('#lien').onclick = function() 
{
    alert('Vous avez cliqué !');
}   
</script>
</body>
</html>
```

### Autres méthodes
	
D’autres méthodes permettent de récupérer des éléments : 

* `getElementsByClassName(nom_classe)` : cible les éléments sur lesquels une (ou plusieurs) classe CSS spécifique est appliquée et retourne un tableau de ces éléments. 

-> [documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/getElementsByClassName) 

* `getElementsByTagName(nom_balise)` : cible la balise HTML (tag)  passée en argument (une seule possible) 

-> [documentation](https://developer.mozilla.org/fr/docs/Web/API/Element/getElementsByTagName) 

Attention : ne pas oublier le ‘**s**’ dans ces **2 méthodes** : `getElement`**`s`**`By`…

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <p id="button1">Clique-moi</p>
  <script>
  document.querySelector('#lien').onclick = function() 
  {
    alert('Vous avez cliqué !');
  }   
  </script>
  </body>
</html>
```

### Gestionnaires d'événements disponibles en Javascript 

Il nous semble utile dans cette partie "avancée" de présenter la liste des objets auxquels correspondent des gestionnaires d'événement bien déterminés.

<!-- TODO peut on inclure les balises <> dans les cellules ??-->
	 
<table>
<thead>
	<tr>
		<th>Objets</th>
		<th>Balises</th>
        <th>Evenements</th>
	</tr>
</thead>
<tr>
	<td>Fenetre
	</td>
	<td>body     
	</td>
    <td>load, unload,
focus, blur, error
	</td>
</tr>
<tr>
	<td>Ancre
	</td>
	<td>a
	</td>
    <td>click,mouseover, mouseout
	</td>
</tr>
<tr>
	<td>Formulaire
	</td>
	<td>form
	</td>
    <td>reset, submit
	</td>
</tr>
<tr>
	<td>Eléments de formulaire
	</td>
	<td>input<br> select<br>textarea
	</td>
    <td>	click, focus, blur, change,
    select  (select et textarea)
    </td>
</tr>
<tr>
	<td>Elément de zone de texte
	</td>
	<td>area<br> map
	</td>
    <td>click,  focus, blur
    </td>
</tr>
<tr>
	<td>Image
	</td>
	<td>img
	</td>
    <td>load , abort, error
    </td>
</tr>
</table>	
	
Il y a beaucoup d’autres gestionnaires d’événement non traités dans ce cours ; par exemple les événements liés au clavier : **keypress, keydown, keyup**.

### La syntaxe de MouseOver

Le code du gestionnaire d'événement `mouseover` s'ajoute aux balises de lien :

```html
<a href="" onMouseOver="action();">lien</a>
```

Ainsi, lorsque l'utilisateur passe avec sa souris sur le lien, la fonction `action()`est appelée.

L'attribut `href` est indispensable. 

Il peut contenir l'adresse d'une page Web si vous souhaitez que le lien soit actif ou simplement des guillemets si aucun lien actif n'est prévu.

Nous reviendrons ci-après sur certains désagréments du codage `href=""`.

Voici un exemple.

Par le survol du lien "message important", une fenêtre d'alerte s'ouvre.

Le code est :

```html
<body>
   <a href="#" onMouseOver="alert('Coucou');">message important</a>
</body>

Ou si vous préférez utiliser les balises <head> :
<html>
<head>
</head>
<body>
   <a href="" onMouseOver="message();">message important</a>
   <script>
   function message()
   {
      alert("Coucou");
   }
   </script>
</body>
</html>
```

### Problème! Et si on clique quand même...

Vous avez codé votre instruction mouseover avec le lien fictif
 ```html
 <a href=""... >
 ```
vous avez même prévu un petit texte, demandant gentiment à l'utilisateur de ne pas cliquer sur le lien et comme de bien entendu celui-ci clique quand même. 

Horreur, le navigateur affiche alors l'entièreté des répertoires de la machine ou du site ou affiche un message d’erreur. Ce qui est un résultat non désiré et pour le moins imprévu.

Pour éviter cela, prenez l'habitude de mettre l'adresse de la page en cours ou plus simplement le signe **#** (pour un ancrage) entre les guillemets de href.

Ainsi, si le lecteur clique quand même sur le lien, au pire, la page en cours sera simplement rechargée et sans perte de temps car elle est déjà dans le cache du navigateur. 

**<h3>Prenez donc l'habitude de mettre le code suivant</h3>**

```html
<a href="#" onMouseOver="action();">lien</a>
```

### Changement d'images		

Avec le gestionnaire d'événement **`mouseover`**, on peut prévoir qu'après le survol d'une image, une autre image apparaisse (pour autant qu'elle soit de la même taille). 

Le code est relativement simple.

```html
<img src="images/bleu_p.jpg" border="0" width="38" height="20" 
onMouseOver="this.src='images/bleu_a.jpg'"	
onMouseOut="this.src='images/bleu_p.jpg'">
```	
	
### L'image invisible

Ce changement d'image ne vous donne-t-il pas des idées ?... Petit futé !

Et oui, on peut prévoir une image invisible de la même couleur que l'arrière-plan (même transparente).

On la place avec malice sur le chemin de la souris de l'utilisateur et son survol peut déclencher, à l'insu de l'utilisateur, un feu d'artifice d'actions de votre choix. 

### Exercices

Le clic sur le bouton **Contrôler** engendre l’appel à la fenêtre d’information.

**Résultat à obtenir** :
	
![image input type text + bouton "Contrôler](images/js_15_img_1.png)

![Alert](images/js_15_img_2.png)
	

Nombre Magique (the Magic Number)

Reprenez l'exercice du nombre magique
	
![Alert](images/js_15_img_3.png)	
	
```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <title>Nombre magique</title>
  </head>
  <body>
    <div id="label1">Entrez votre proposition</div>
    <input id="textBox1" value="">
    <input type="button" id="button1" value="Verifier" onclick="verif();"> 

    <script>
	 
    </script>

  </body>
</html>
```

Votre programme doit générer un nombre aléatoire à l'aide de la fonction `Math.random`.

Ecrivez la `fonction verif()` qui doit vérifier si la saisie de l'utilisateur (dans `textBox1`) correspond au nombre magique, elle affiche des informations, **trop grand**, **trop petit** dans le `label1`.

Quand votre programme fonctionne, modifiez-le pour rendre le **javascript non intrusif**.



