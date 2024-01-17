# La faille Cross-Site Request Forgery (CSRF)

En français : requête de falsification inter-sites.

## Problème

Les urls, y compris les valeurs de l'attribut `action` dans les formulaires, sont facilement copiables. Un hacker qui connaît une url sensible (par exemple donnant accès à un formulaire de changement de mot passe ou une interface d'administration) peut alors tenter de la faire exécuter à un utilisateur qui possède les niveaux d'habilitations requis. 

## Exemple

[Exemple](https://www.leblogduhacker.fr/faille-csrf-explications-contre-mesures)

## Parade

Il faut s'assurer qu'un utilisateur transmettant des données d'une page à une autre est autorisé à le faire, c'est-à-dire vérifier que c'est la même personne qui a initié l'action en cours.  

La technique est la suivante :

* génération d'un jeton de sécurité unique (_token_ en anglais) horodaté (on pourra ainsi interdire des actions exécutées trop tardivement). 
* ce jeton sera transmis par url ou formulaire **ET** stocké en session (côté serveur donc). 
* dans la page de destination, il faut tester que les valeurs transmises sont les mêmes que celles en session.

Par exemple, dans une page affichant un formulaire :

    // Génération d'un jeton de sécurité unique
    $hash = bin2hex(openssl_random_pseudo_bytes(6, $variable_fantome));

    // Affichage pour voir à quoi ça ressemble,
    // ne pas mettre dans vos scripts
    echo $hash."<br>"; // 7c9611c86ba4 (par exemple)
    echo strlen($hash)."<br>"; // 12 caractères

    $_SESSION["form"]["token"] = $hash;
   
    // Heure de la génération
    $_SESSION["form"]["token_time"] = time();

Pour un formulaire, ajout d'un champ caché contenant la valeur du jeton : 

	<input type="hidden" name="token" value="7c9611c86ba4" />

Pour une url, on transmet par une variable en paramètre, par exemple : 

	<a href="password_change.php?id=123&token=7c9611c86ba4">Changer de mot de passe</a>

Sur la page qui traite la demande :

	if (isset($_SESSION["form"]["token"]) && isset($_SESSION["form"]["token_time"])) 
    {    
        // Si le jeton de la session correspond à celui du formulaire
        if ($_SESSION["form"]["token"] == $_POST["token"]) 
        {
            $timestamp_max = time()-600; // Timestamp d'il y a 10 minutes (10 minutes * 60 secondes)
                   
            if ($_SESSION["form"]["token_time"] >= $timestamp_max) 
            { // délai NON expiré : OK 
             
             /** Vérification du temps mini d'une seconde 
             * (permet de bloquer des robots qui postent plusieurs tentatives par seconde) 
             * */
             $timestamp_min = time()-1; // on enlève une seconde 
            
             $iDelta = $timestamp_min - $_SESSION["form"]["token_time"];

             if ($iDelta<=1) 
             {
               // Message d'erreur
             }             
          } 
          else 
          { // délai expiré
             // Message d'erreur
          }          
       } 
       else 
       {
            // Message d'erreur
       }
    }
    else 
    { // Rien en session
         // Message d'erreur
    }

> Sur des actions sensibles (changement de mot de passe, paiement en ligne...), une protection supplémentaire est recommandée : renseigner le mot de passe actuel ou saisir l'ancien, demander une question secrète ou un code supplémentaire (envoyé par mail ou par SMS par exemple), on appelle ce principe la double authentification. 
 
## Framework et CMS

Les frameworks et CMS implémentent des mécanismes anti-CSRF. Le réflexe à avoir est de consulter la documentation technique d'une solution pour savoir quelle parade est proposée et comment la mettre en place. 

## Exercice

* Testez l'exemple présenté dans le paragraphe _parade_.
* Implémentez la sécurité [anti-CSRF dans CodeIgniter](https://www.codeigniter.com/userguide3/libraries/security.html#cross-site-request-forgery-csrf) (projet Jarditou).


## Ressources

* CSRF : [CERT-FR](https://www.cert.ssi.gouv.fr/information/CERTA-2008-INF-003) 

	