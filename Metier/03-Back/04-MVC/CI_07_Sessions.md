<!-- HB, MAJ 24/02/2020 -->

# CodeIgniter - 08 - Les sessions

Sous CodeIgniter les sessions fonctionnent de la même manière qu'en PHP brut, seule la syntaxe diffère.

> [Documentation](https://codeigniter.com/userguide3/libraries/sessions.html)

## Intégration  

Pour utiliser les sessions avec CodeIgniter, il faut charger la librairie _session_ :

* soit dans une méthode de contrôleur, au cas par cas. 
* soit dans le fichier _config/autoload.php_, pour rendre la librairie disponible dans tout le projet.

## Mise en session

Pour mettre une variable en session, utiliser la méthode `set_userdata()` : 
 
	$this->session->set_userdata('mail', "dave.loper@afpa.fr");
    
    // ou encore :
    $this->session->set_userdata('role', "administrateur");

Ces lignes équivalent à celles-ci en PHP natif :

    $_SESSION["mail"] = "dave.loper@afpa.fr"; 
    $_SESSION["role"] = "administrateur"; 

## Utilisation d'une variable de session

Pour utiliser une variable de session, dans un contrôleur ou une vue : 

	$this->session->nom_de_la_variable;

**Exemple 1**

	echo $this->session->mail; // affiche : dave.loper@afpa.fr

Cette ligne équivaut à celle-ci en PHP natif :

    echo $_SESSION["mail"]; 

**Exemple 2 : tester une variable de session :**

Pour utiliser les variables de session, par exemple dans une méthode de contôleur. Imaginons que des actions doivent être réalisées lorsqu'on a un rôle administrateur :  
    
	if ($this->session->role == "administrateur") 
    {
		// ici, faire ce qui est autorisé lorsqu'on est administrateur ET loggué
    } 
    else 
    { // Pas connecté et/ou pas le rôle 'administrateur'
 
        // On affiche un message d'erreur...
		echo"Vous n'êtes pas autorisé à accéder à cette page.";		
        
        // ... ou bien on redirige vers le contrôleur/méthode du formulaire de connexion       redirect("user/connexion");
    }
 
## Détruire la session 

Détruire une session se fait normalement avec la fonction `sess_destroy()` :  

    $this->session->sess_destroy();
 
> Mais celle-ci fonctionne mal, il faut donc mieux utiliser la fonction native PHP `session_destroy();`.  

## A retenir

Même si CodeIgniter propose sa propre syntaxe pour gérer les sessions, il reste possible d'utiliser la syntaxe native PHP (`$_SESSION` et fonctions associées). 



