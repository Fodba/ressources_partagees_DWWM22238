# Injection SQL

## Problème

L'injection SQL est un type d'attaque qui consiste à tenter l'exécution de requêtes SQL non souhaitées :

* soit par saisie dans un champ de formulaire, 
* soit par ajout de paramètres dans une url 

Il s'agit d'une faille de sécurité spécifique au SQL, on la retrouve donc aussi bien dans MySql, SQL Server etc. et quel que soit le langage côté serveur utilisé (PHP, Java, .Net...).   

Les risques sont : 

* Accès non souhaité à des données ou à des pages en théorie protégées par session 
* Exécution d'actions non voulues sur la base (modification/suppression d'enregistrements, de tables...). 
* Usurpation d'utilisateurs, élévation de privilèges. 
 
## Exemples

### Exemple 1 : attaque d'un formulaire de connexion

L'attaque consiste à tenter de modifier la requête SQL qui sera construite par la concaténation des variables récupérant les données provenant d'un formulaire (POST) ou d'une URL (GET). 

Ces modifications peuvent être (il y en existe d'autres) :

* Ajout d'une seconde requête à celle normalement exécutée
* Utilisation de `--` pour mettre en commentaire une partie de la requête
* Ecriture de formules d'égalité qui aboutiissent à "toujours vrai" donc la requête sort des résultats qui ne sont pas ceux espérés.  

Cela peut permettre de dévoiler en outre d'autres informations (voir tous les logins, et éventuellement les niveaux d'habilitation/rôles).   

Code HTML du formulaire :

    <form action="post.php" method="post">                                           
        <label for="login">Login</label> 
         <input type="text" name="login" value="' or '1=1">
        
        <label for="password">Mot de passe</label> 
        <input type="text" name="password" value="' or '1=1">                                  
        
        <input type="submit" value="Connexion">
    </form>          

Code du fichier PHP de traitement :

	$sql = "SELECT * FROM users WHERE login='".$_POST["login"]."' AND password='".$_POST["password"]."'";
	
	$result = $oDb->query($postee);
	
La requête qui devrait **normalement** être exécutée est la suivante (les valeurs _Pierre_ et _azerty1_ sont dans la table _users_) : 

	SELECT * FROM users WHERE login='Pierre' AND password='azerty1'  
	
La requête **réellement** exécutée :

	SELECT * FROM users WHERE login='' or '1=1' AND password='' or '1=1'

**Explications**

* Pour le champ _login_, le guillemet simple issu de la saisie vient fermer le `WHERE login='`  
* Ensuite ` OR '1=1'` pose un _OU_ , comme il n'y a pas de login avec une valeur vide dans la base c'est la 2<sup>ème</sup> condition du `OR` qui s'applique et comme _1=1_ est toujours vrai, c'est ce résultat qui est considéré comme bon.
* Pour le mot de passe, on a le même mécanisme (puisqu'il a a été saisi la même chose). 	

Dans ce formulaire de connexion, la suite du code est bien sûr d'ouvrir une session considérant que le login/mot de passe est bon : 

	$result = $oDb->query($postee);
    $user = $result->fetch(PDO::FETCH_OBJ);
   
    var_dump($user);

      if ($user) 
      {
         $_SESSION["connected"] = TRUE;
         ?>
               <div class="col-12  alert alert-success" role="alert">     
                  Connecté. <a href="moncompte.php" title="Accèdez à votre compte">Mon compte</a>   
                  </div>
               <?php
      } else {
         ?>
                  <div class="col-12 alert alert-danger" role="alert">     
                  Echec de la connection.
                  </div>
               <?php
      }
      ?>
       
Comme notre requête non sécurisée retourne bien un résultat, on se retrouve bien avec une session ouverte malgré qu'aucun login/mot de passe correct n'ait été saisi (donc accès à de pages/données auxquelles on ne devrait pas) !

Retenez bien que cet exemple va fonctionner selon l'écriture des guillemets simples et doubles; mais les hackers vont eux essayer toutes les combinaisons. 

Syntaxes implémentant l'injection SQL :

    $postee = "SELECT * FROM users WHERE login='$login' AND password='$password'";
    $postee = "SELECT * FROM users WHERE login='".$login."' AND password='".$password."'"; 
    $postee = "SELECT * FROM users WHERE login='".$_POST["login"]."' AND password='".$_POST["password"]."'"; 
    $postee = "SELECT * FROM users WHERE login='{$_POST["login"]}' AND password='{$_POST["password"]}'";    

Syntaxe n'implémentant pas l'injection SQL :

	$postee = "SELECT * FROM users WHERE login=\"".$_POST["login"]."\" AND password=\"".$_POST["password"]."\"";

### Exemple 2 : exécution d'une requête de suppression

L'injection SQL permet en théorie d'exécuter tout type de requête.

On pourrait par exemple saisir ceci dans un champ de formulaire : 

	Pierre'; DELETE FROM users 

Ce qui donnerait comme requête :

	SELECT * FROM users WHERE login='Pierre'; DELETE FROM users;  

Cependant, en PHP, les fonctions d'exécution de requêtes - `mysqli_query` ou, avec PDO, `->query` et `->exec()` bloquent désormais les requêtes multiples. Attention, ceci n'est peut-être pas le cas pour d'autres langages. 

## Parades

* En priorité, utiliser le connecteur PDO et, surtout, **les requêtes préparées**.
* L'échappement des caractères à risques avec les fonctions PHP [`htmlspecialchars()`](http://php.net/manual/fr/function.htmlspecialchars.php) ou [`htmlentities()`](http://php.net/manual/fr/function.htmlentities.php), qui transforme les caractères spéciaux en entités HTML (cf. la faille XSS).
* Bien filtrer les données saisies dans un formulaire ou transmises par les urls : **ne jamais faire confiance à l'utilisateur**.
* Spécifier des droits et des rôles utilisateur sur les bases de données. 

## Framework et CMS

Les frameworks et CMS proposent des mécanismes de requêtes préparées. Consulter la documentation officielle pour savoir si les protections sont activées par défaut ou s'il faut les activer explicitement.  

## Exercices 

1. Reproduisez [les exemples](php_injection_mysql.zip).
2. Dans votre projet _CodeIgniter/Jarditou_, assurez-vous de bien utiliser **partout** des requêtes préparées.

## Ressources complémentaires

* <a href="https://www.owasp.org/index.php/4.8.5_Test_d%27Injection_SQL_(OTG-INPVAL-005)" title="Injections SQL">Injections SQL</a> 
* [requêtes préparées avec PDO](http://php.net/manual/fr/pdo.prepared-statements.php).
* [requêtes préparées avec CodeIgniter](https://www.codeigniter.com/userguide3/database/queries.html#query-bindings).

* Autres exemples d'injection SQL en PHP :
 
    * [Exemple 1](http://php.net/manual/fr/security.database.sql-injection.php)
    * [Exemple 2](https://www.phpsecure.info/v2/article/InjSql.php)

<br><br><br><br>