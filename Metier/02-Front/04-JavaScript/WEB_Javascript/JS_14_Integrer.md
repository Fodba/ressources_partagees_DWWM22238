# JS 14 : Intégrer du Javascript dans une page web

Il existe plusieurs méthodes pour intégrer du JavaScript à une page web. 

> Notez que ces méthodes sont proches de celles vues pour les feuilles de styles CSS.

## Intégration directe dans une balise HTML 

L'exécution de code Javascript peut se faire directement dans une balise HTML via une instruction nommée _événement_ : `onClick`, `onMouseOver` etc. (nous reviendrons de façon détaillée sur les évènements). 

Cette méthode est désormais **non recommandée**.

Exemple :
	
	<html>
	<head>
	   <title>Titre du fichier</title>
	</head>
	<body>
	   <a href="page.html" title="Voir la page" onclick="alert("Lien cliqué !");"></a>
	</body>
	</html>
	
## Intégration via une balise `<script>` 
	
L'intégration de code Javascript peut également être placé n'importe où dans la page web via une balise `<script>` :

	<html>
	<head>
	  <title>Titre du fichier</title>
	</head>
	<body>
	   <a href="page.html" title="Voir la page"></a>
	   <script>alert("Hello l’AFPA !");"</script>
	</body>
	</html>

Cette méthode est elle aussi **non recommandée**.

## Intégration via un fichier externe

On peut définir les scripts dans un fichier séparé portant l'extension `.js` qu'il faudra appeler dans les fichiers HTML souhaités. Toute mise à jour du fichier `.js` ira se répercuter sur toutes les pages HTML utilisant ce script. 

**Il s'agit de la bonne pratique recommandée aujourd'hui [sur le web](https://fr.wikipedia.org/wiki/Javascript_discret).**

> En outre, cette métode permet d'avoir des scripts communs à toutes les pages (au lieu de répéter un même code sur chaque page).   

Les appels se font en fin de page, avant la fermeture de la balise `</body>`. 

L'appel du fichier `.js` s'effectue à l’aide de la balise `<script>` et de l'attribut `src` :  
	
    ````
	<!DOCTYPE html>
    <html>
	<head>
	   <title>Titre du fichier</title>
	</head>
	<body>
	   <a href="page.html" title="Voir la page"></a>
	   <script src="monscript.js"></script>
	</body>
	</html>

L'attribut `src` doit contenir le chemin complet vers le fichier (exemple : `assets/js/monscript.js`) ou une URL (`https://code.jquery.com/jquery-3.3.1.js`). 

## Exercices

Le but est d'externaliser le code JavaScript dans un fichier `.js` puis de tester l'intégration de code HTML dans les fonctions Javascript.

1.	Copier le code suivant dans votre éditeur de texte préféré.
		 
        ````
        <!DOCTYPE html>
		<html>
		<head>
		   <title>Mon 1er script</title>
		   <script>
		   alert("Coucou !");
		   console.log("Ah que Coucou !");
		   document.write("Coucou beuh !");
		   </script> 
		</head>
		<body>
		   <!-- Ajouter le code Javascript ici pour le titre -->   
		   <p>Rien à ajouter</p>  
		</body>
		</html>
        ````

Enregistrer le fichier puis l'ouvrir avec votre navigateur. Observez ce qu'il se passe, y compris dans la console.  

2.	Créer un fichier JavaScript nommé _exercice1.js_.
3.	Déplacer le code JavaScript du fichier HTML dans le fichier externe JavaScript et importer ce fichier dans le fichier HTML.
4.	Répéter le titre de la page dans `<body>` avec l'instruction `document.write()`. Consultez la documentation sur le site [W3Schools](https://www.w3schools.com/jsref/met_doc_write.asp). Ajouter du code HTML dans la chaîne de caractères passée en paramètre.
5.	Modifier la fonction `alert()` pour y passer en paramètre également du code HTML. Que remarquez-vous ?