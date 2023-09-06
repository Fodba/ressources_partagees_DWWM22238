# PHP - 07 - PDO - Atelier 3 : Bien débuter

## Se connecter

	try {
	    $db = new PDO('mysql:host=localhost;dbname=hotel', 'root', '');
	    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
	    print "Erreur !: " . $e->getMessage() . "<br>";
	    die();
	}

## Exécuter une requête - Lecture

	$requete = $db->prepare("SELECT * FROM station WHERE sta_altitude>:altitude");
	$requete->bindValue(":altitude", $altitude);
	$requete->execute();
	
	while ($ligne = $requete->fetch()) 
    {
		echo $ligne["sta_nom"];
	}

> Notez que la requête SQL est ici préparée pour pallier aux problèmes d'injection SQL.

## Exécuter une requête - Lecture

Ceci constitue une meilleure solution que le paragraphe précédent : l'utilisation de la méthode `fetchAll` affecte  l'ensemble des résultats de la requête directement dans un tableau PHP (nommé ici `$tableau`) :

	$requete = $db->prepare("SELECT * FROM station WHERE sta_altitude>:altitude");
	$requete->bindValue(":altitude", $altitude);
	$requete->execute();
	
	$tableau = $requete->fetchAll());

## Exécuter une requête - Action

	$requete = $db->prepare("INSERT INTO station (sta_nom, sta_altitude) VALUES (:nom, :altitude)");
	$requete->bindValue(":altitude", $altitude);
	$requete->execute();