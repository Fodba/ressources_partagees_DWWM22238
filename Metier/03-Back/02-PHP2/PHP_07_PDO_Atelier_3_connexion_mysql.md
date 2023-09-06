# PHP - 07 - PDO - Atelier 3 : Afficher un enregistrement depuis une base MySQL

Maintenant que vous avez appris les bases de PHP et rempli votre base de données, il est temps d'accéder à votre base et d'en afficher le contenu. 

Nous allons donc interroger la table `produits` de base de données _Jarditou_ et afficher le détail d'une ligne dans une page web.

## Connexion à la base de données

Les fonctions d'accès aux bases de données en PHP sont très simples d'utilisation et permettent d'effectuer toutes les opérations nécessaires à la mise à jour de la base. 

Depuis sa version 5, PHP fournit par défaut un composant d'abstraction de bases de données, c'est-à-dire de connexion et de requêtage, nommé _PHP Data Objects_, en abrégé : PDO. 

## Qu'est-ce que PDO ?

[PDO](http://php.net/manual/fr/book.pdo.php) fournit une interface d'abstraction à l'accès aux données, ce qui signifie que vous utilisez les mêmes fonctions pour exécuter des requêtes ou récupérer les données quelque soit la base de données utilisée (MySQL, Oracle etc.). 

PDO est une classe qui va nous permettre d'instancier un objet représentant la connexion à la base.

### Connexion à un serveur MySql

Les connexions sont établies en créant des instances de la classe de base de PDO. Peu importe quel driver vous voulez utiliser; vous utilisez toujours le nom de la classe PDO. Le constructeur accepte des paramètres pour spécifier le nom/l'adresse du serveur de bases de données (_Data Source Name_, en abrégé : DSN), le nom d'utilisateur et le mot de passe (s'il y en a un).

**Exemple**

    <?php
    $db = new PDO('mysql:host=localhost;dbname=jarditou;charset=utf8', 'root', '');

Les paramètres requis sont les suivants : 

* `host` : adresse du serveur hébergeant la base de données (localhost ou votre serveur web) 
* `dbname` : nom de la base de données
* `charset` : jeu de caractères utilisé
* `root` : nom de l'utilisateur de la base de données, par exemple `root` 
* `''` : le dernier argument précise le mot de passe; dans phpMyAdmin celui-ci n'est pas défini par défaut donc on met une chaîne vide. 

L'appel au mot-clé `new` retourne un objet de la classe PDO que l'on stocke dans une variable (`$db` par exemple).
 
### Gestion des erreurs de connexion

S'il y a des erreurs de connexion, un objet `PDOException` est lancé. Vous pouvez attraper cette exception si vous voulez gérer cette erreur (ou la laisser au gestionnaire global d'exception) :

    <?php
    $base = 'jarditou';
    $utilisateur = 'root';
    $motdepasse = '';

	try 
	{
	   $db = new PDO('mysql:host='.$host.';charset=utf8;dbname='.$base, $utilisateur, $motdepasse);

       // Ajout d'une option PDO pour gérer les exceptions
       $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} 
	catch (Exception $e) 
	{
	    echo 'Erreur : ' . $e->getMessage() . '<br />';
	    echo 'N° : ' . $e->getCode();
	    die('Fin du script');
    }

* Ligne 9 : la fonction `die()` permet de mettre fin au script en affichant un message d'erreur (argument optionnel).
 
### Exercice 1 : connexion à la base de données

Une première étape s'impose : la connexion à la base de données.
Pour cela, nous allons écrire un fichier PHP : `TestDb.php`.

	<html>
	<head>
	   <meta charset="UTF-8">
	   <title>testDb.php</title>
	   <?php
	   try 
       {        
	 	   $db = new PDO('mysql:host=localhost;charset=utf8;dbname=jarditou', 'root', '');
           $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	   } catch (Exception $e) {
	      echo "Erreur : " . $e->getMessage() . "<br>";
	      echo "N° : " . $e->getCode();
		  die("Fin du script");
	}       
	?>
	</head>
    <body>
    <p>Ma page</p>   
    </body>
    </html> 

* Ligne 7 : une ligne suffit pour opérer la connexion au serveur MySql et se positionner sur la base voulue. Après cette connexion, la variable `$db` référence un objet connexion. Il va nous permettre d'utiliser toutes les méthodes décrites dans la classe PDO (`query()`, `prepare()`, `execute()`, etc.).

Les informations retournées (voir plus loin) dans le navigateur seront le contenu des champs de la table MySQL concernée.
 
## Construction d'une requête SQL
Une fois connectés à la base, nous allons en extraire l'article que nous voulons afficher. 

On utilise pour cela une requête en langage SQL (nous allons voir juste après les explications où placer ce bloc de code dans la page web) :
   
    $requete = "SELECT * FROM produits WHERE pro_id = 7";
    $result = $db->query($requete);
    $produit = $result->fetch(PDO::FETCH_OBJ);
    $result->closeCursor();   

* Ligne 1 : on a écrit une requête SQL dans une chaîne PHP. 
* Ligne 2 : `$db` est l'objet retourné par l'appel à PDO, `query()` est une méthode de cet objet (c'est-à-dire, au sens programmation, une fonction de l'objet). La flèche `->` permet d'accéder (appeler) une méthode ou une propriété (attribut) de l'objet.  
* Ligne 3 : `$db->query($requete)` revient à appeler la fonction `query()` de l'objet `$db` en lui passant la requête SQL en argument. Le résultat `$db->query()` est stocké dans un objet `$result`.
* Ligne 4 : pour lire le contenu de ce résultat (qui pourrait contenir plusieurs lignes), PHP propose la méthode `fetch()` (= ramener). Ici, la méthode `fetch(PDO::FETCH_OBJ)` renvoie l'enregistrement sous la forme d'un objet (dont les propriétés contiennent les différents champs), ou `FALSE` s'il n'y a plus de lignes. Indirectement, cela signifie que vous ne pouvez accéder aux données que par leur nom de colonne et non par leur numéro.

> [Plusieurs options](https://www.cloudconnected.fr/2007/10/10/les-fetch-modes-de-pdo) de `PDOStatement::fetch` sont disponibles pour formater le type de retour : tableau associatif, objet, etc. 
 
**Attention**
Libérez la mémoire pour éviter l'encombrement mémoire et la confusion entre les variables, la variable `$result` est vidée de la mémoire à la ligne 12.

* Ligne 5 : la méthode `closeCursor()` sert à finir proprement une série de `fetch()`. En théorie, quand on exécute une requête (via `query()` ou `execute()`), puis qu'on récupère les données trouvées dans la base avec une série de `fetch()`, il convient de faire un `closeCursor()` avant de faire une autre exécution de requête (via `query()` ou `execute()`). En pratique, si on utilise MySql, ça ne sert à rien car MySql sait faire une nouvelle exécution de requête sans qu'il ait eu de `closeCursor()` après la précédente exécution. Si on utilise autre chose que MySql, ou si on envisage de migrer vers autre chose que MySql un jour ou l'autre, ou si on tient à faire un code le plus portable possible, alors `closeCursor()` peut être utilisé, mais après chaque série de `fetch()`.

Voyons où placer le bloc de code :  

     <?php
     /* Afin de ne pas trop mélanger le code PHP avec le HTML et améliorer la lisibilité, 
     * on peut mettre la connexion PDO en haut de la page 
	 */ 
     try 
       {        
	 	   $db = new PDO('mysql:host=localhost;charset=utf8;dbname=jarditou', 'root', '');
           $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	   } catch (Exception $e) {
	      echo "Erreur : " . $e->getMessage() . "<br>";
	      echo "N° : " . $e->getCode();
		  die("Fin du script");
	}    

    /* Ajoutons ici notre bloc d'exécution de la requête,
    * Ainsi, elle est englobée dans le reste du code PHP
    */
    $requete = "SELECT * FROM produits WHERE pro_id = 7";
    $result = $db->query($requete);
    $produit = $result->fetch(PDO::FETCH_OBJ);
    $result->closeCursor();   
	?>
    <html>
	<head>
	   <meta charset="UTF-8">
	   <title>testDb.php</title>	  
	</head>
    <body>
    <p>Ma page</p>   
    </body>
    </html>

**Affichage du résultat**

Les données du produit sont en notre possession, il ne reste plus qu'à les afficher dans la partie `<body>` de notre page :  

Cet affichage se déroule bien entendu dans le corps de notre page, sous la forme de trois commandes PHP :

	<body> 
     <?php echo $produit->pro_id; ?>
     <br>
     <?php echo $produit->pro_cat_id; ?>
     <br>
     <?php echo $produit->pro_ref; ?>
     <br>
     <?php echo $produit->pro_libelle; ?>
     <br>
     <?php echo $produit->pro_description; ?>
     <br>
     <?php echo $produit->pro_prix; ?>
     <br> 
     <?php echo $produit->pro_stock; ?>
     <br>
     <?php echo $produit->pro_couleur; ?>
     <br>
     <?php echo $produit->pro_photo; ?>
     <br> 
     <?php echo $produit->pro_d_ajout; ?>
     <br> 
     <?php echo $produit->pro_d_modif; ?>
     <br> 
     <?php echo $produit->pro_bloque; ?>
   	 </body>
 	 </html>

Nous l'avons dit plus haut, la variable `$produit` contient l'ensemble des informations d'un produit. 

Pour isoler chacun de ces champs, il faut utiliser la construction _objet->nomdelacolonne_.
 
De cette façon, on affiche les différentes informations du produit, chacune des informations correspond à une colonne de la table.

Remarque : Il faut respecter la casse des noms de champs de la table !

**Attention**

Plusieurs résultats

Le résultat d'une fonction `query()` est un jeu d'enregistrements. Dans l'exemple précédent, le critère sur la clé primaire `pro_id` permet d'être sûr que ce jeu sera constitué d'un seul enregistrement. 

Mais dans le cas où plusieurs enregistrements sont remontés (par exemple avec une requête sans clause de restriction `WHERE`), la fonction de parcours des résultats (`fetch`) devra être incluse dans une boucle.

    <body> 
    <?php
	while ($produit = $result->fetch(PDO::FETCH_OBJ)) 
	{
	   echo $produit->pro_id." – ".$produit->pro_libelle. "<br>";
	}
    ?>
   	</body>
 	</html>

Cette boucle affiche :

 7 - Aramis<br>
 8 – Athos<br>
 11 – Clatronic<br>
 ...
 
## Exercice 2 - Paramétrage de la page

Jusqu'à présent, nous avons vu comment envoyer une requête pour remonter un enregistrement dont l'identifiant était codé en dur dans le programme. 

Nous allons maintenant rendre notre page paramétrable pour afficher n'importe quel article de la table.

Il suffit pour cela de modifier la ligne de constitution de la requête : 

    $requete = "SELECT * FROM produits WHERE pro_id=".$_GET["pro_id"];

Nous demandons maintenant à MySQL de renvoyer le produit dont l'identifiant correspond au contenu d'une variable `$_GET["pro_id"]`.
 
D'où vient cette variable `$pro_id` ? Pour le moment, de l'URL, envoyée par le navigateur. 

L'appel de notre script par le navigateur devra donc avoir la forme `http://monserveur/monsite/testDb.php?pro_id=1`

Une fois notre page d'affichage de liens un peu plus esthétique, nous pouvons très bien envisager un sommaire contenant différents liens vers notre script PHP pour des valeurs de `pro_id` différentes.

    <!DOCTYPE html>
	<html lang="fr">
    <head>
    <meta charset="UTF-8">
	<title>testDb.php</title>
	<?php
	// Pour récupérer la variable passée dans l'URL, il faut utiliser le tableau associatif $_GET.
	$pro_id = $_GET["pro_id"];
	
	try 
	{
	    $db = new PDO('mysql:host=localhost;charset=utf8;dbname=jarditou', 'root', '');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} 
	catch (Exception $e) 
	{
	    echo 'Erreur : ' . $e->getMessage() . '<br />';
	    echo 'N° : ' . $e->getCode();
	    die('Fin du script');
	} 
	   
	$requete = "SELECT * FROM produits WHERE pro_id=".$pro_id;
	$result = $db->query($requete); 
	$produit = $result->fetch(PDO::FETCH_OBJ);
	$result->closeCursor();
	?>
	</head>
	<body> 
		<div> <?php echo $produit->pro_id; ?> </div>
		<div> <?php echo $produit->pro_cat_id; ?> </div>
		<div> <?php echo $produit->pro_ref; ?> </div>
		<div> <?php echo $produit->pro_libelle; ?> </div>
		<div> <?php echo $produit->pro_description; ?> </div>
		<div> <?php echo $produit->pro_prix; ?> </div>
		<div> <?php echo $produit->pro_stock; ?> </div>
		<div> <?php echo $produit->pro_couleur; ?> </div>
		<div> <?php echo $produit->pro_photo; ?> </div>
		<div> <?php echo $produit->pro_d_ajout; ?> </div>
		<div> <?php echo $produit->pro_d_modif; ?> </div>
		<div> <?php echo $produit->pro_d_bloque; ?> </div>
	</body>
	</html>