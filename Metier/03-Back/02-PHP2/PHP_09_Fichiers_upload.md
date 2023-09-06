# Téléchargement de fichier en PHP

Les formulaires HTML offrent la possibilité de télécharger un fichier : par exemple une photo, la notice d'un produit, un C.V. sur un site d'emploi (donc au format Word ou PDF). 

Tout d'abord, un point sur le mot _télécharger_ qui peut désigner aussi bien les opérations suivantes :
 
* enregistrement sur un PC d'un fichier présent sur un serveur distant (site web); il s'agit de **download**. 
* envoi vers un serveur distant d'un fichier qui se trouve sur un PC : il s'agit de **l'upload**. 

**C'est ce second cas qui nous intéresse ici.** 
   
## Formulaire HTML

Pour que le téléchargement soit possible, il faut ajouter l'attribut `enctype` à la balise `<form>`. La valeur doit être `multipart/form-data` :

    <form action="post.php" method="post" enctype="multipart/form-data">

Ensuite, on a besoin d'un champ de type `file`, qui fera apparaître un bouton contenant le texte _Parcourir_ avec lequel on pourra choisir un fichier présent sur le PC : 
 
    <input type="file" name="fichier"> 

## Traitement en PHP

Dans le fichier de traitement PHP - celui assigné comme valeur à l'attribut `action` - lorsque le formulaire est soumis, on récupère les informations sur le fichier via la variable superglobale `$_FILES`, qui se comporte comme un tableau PHP. 

On écrit `$_FILES["fichier"]`, `fichier` représente la valeur de l'attribut `name` du champ de type `file`.    

**Exercice : créer un formulaire d'upload et le fichier PHP de traitement correspondant, dans le fichier PHP écrivez juste `var_dump($_FILES);`.**   

Vous devriez obtenir quelque chose du genre : 

<table>
<thead>
<tr>
<th>Entrée</th>
<th>Description</th>
<th>Exemple de valeur</th>
</tr>
</thead>
<tbody>
<tr>
<td>`$_FILES["fichier"]["name"]`</td>
<td>nom du fichier d'origine, sur votre PC</td>
<td>`string 'monfichier.jpg' (length=10)`</td>
</tr>
<tr>
<td>`$_FILES["fichier"]["type"]`</td>
<td>type MIME du fichier</td>
<td>`string 'image/jpeg' (length=10)`</td>
</tr>
<tr>
<td>`$_FILES["fichier"]["tmp_name"]`</td>
<td>nom et chemin du fichier temporaire</td>
<td>`string 'C:\wamp\tmp\phpC1CD.tmp' (length=23)`</td>
</tr>
<tr>
<td>`$_FILES["fichier"]["error"]`</td>
<td>int 0 = erreurs (s'il y en a, elles sont retournées via un tableau PHP)</td>
<td>`nom et chemin du fichier temporaire`</td>
</tr>
<tr>
<td>`$_FILES["fichier"]["size"]`</td>
<td>taille du fichier, en octets</td>
<td>int 100813</td>
</tr>
</tbody>
</table>

## Gestion des erreurs 

Si le téléchargement échoue, les erreurs sont retournées dans `$_FILES["fichier"]["error"]`, les cas d'erreur sont prédéfinis dans un tableau : voir [cette ressource](http://php.net/manual/fr/features.file-upload.errors.php). 

* S'il n'y a pas d'erreur, `$_FILES["fichier"]["error"]` retourne **un entier** valant 0,
* S'il y a des erreurs, `$_FILES["fichier"]["error"]` retourne **un tableau**. Pour afficher les erreurs, il faut donc la condition suivante pour lire les erreurs :  

	    // Si c'est un tableau et que celui-ci n'est pas vide  
	    if (is_array($_FILES["fichier"]["error"]) && !empty($_FILES["fichier"]["error"]) ) 
	    { 
	        // Boucle pour afficher les messages d'erreurs             
	    } 

Les codes d'erreur correspondent aux [éléments suivants](http://php.net/manual/fr/features.file-upload.errors.php).  

## Sécurité

Le problème principal de l'upload d'un fichier est la sécurité : c'est l'utilisateur qui envoie un fichier présent sur son PC, et comme il ne faut jamais faire confiance aux actions de l'utilisateur, il faut vérifier que le fichier reçu est bien du type attendu et ne comporte pas de code malicieux. 

Il faut ensuite s'assurer des droits sur ce fichier (écriture, lecture, exécution) et le stocker correctement sur le serveur (s'agit-il d'un fichier accessible publiquement à tous les internautes ou d'un contenu confidentiel ?). 

### Vérifier le type 

On doit tout d'abord s'assurer de points basiques :

* un fichier a-t-il bien été téléchargé ?
* le type du fichier envoyé par l'utilisateur est-il celui attendu (image, document Word, PDF...) ?  

Les fausses bonnes idées, car les informations retournées ne sont pas fiables :
* tester uniquement l'extension comme chaîne de caractère
* tester [le type MIME](https://fr.wikipedia.org/wiki/Type_de_m%C3%A9dias) retourné par le navigateur (celui dans `$_FILES["fichier"]["type"]`).

**Exemple, le mauvais**

* Copier l'un de vos fichiers CSS, renommez cette copie en changeant l'extension en 'jpg'.
* Chargez ce fichier dans votre formulaire
* Dans le fichier `post.php`, mettez le code suivant :

        // Le code suivant récupère l'extension ('jpg')
	    $extension = pathinfo($_POST["fichier"]["tmp_name"], PATHINFO_EXTENSION);  

> Regardez la documentation des fonctions `substr()` et `strrchr()` pour comprendre ce qu'elles font.

    // Tableau des extensions autorisées par le site (ici des fichiers de type image)
    $aAllowed = array("gif", "jpeg", "jpg", "png", "tiff"); 

    // Teste que l'extension du fichier téléchargé est bien autorisée
    if (in_array()) 
    {
        echo"Type de fichier autorisé.";   
    } 
    else 
    {
        echo"Type de fichier non autorisé.";   
    }

**Exemple, le bon**

PHP fournit un extension nommée *FILE_INFO* qui fait référence en termes de sécurité. Voici comment l'utiliser, pour un type :

<!-- https://www.saotn.org/validate-mime-types-with-php-fileinfo -->
 
    // On met les types autorisés dans un tableau (ici pour une image)
	$aMimeTypes = array("image/gif", "image/jpeg", "image/pjpeg", "image/png", "image/x-png", "image/tiff");
	
    // On ouvre l'extension FILE_INFO
	$finfo = finfo_open(FILEINFO_MIME_TYPE);

    // On extrait le type MIME du fichier via l'extension FILE_INFO 
	$mimetype = finfo_file($finfo, $_FILES["fichier"]["tmp_name"]);
	
    // On ferme l'utilisation de FILE_INFO 
    finfo_close($finfo);
     
	if (in_array($mimetype, $aMimeTypes))
	{
	    /* Le type est parmi ceux autorisés, donc OK, on va pouvoir 
           déplacer et renommer le fichier */          
	} 
    else 
    {
       // Le type n'est pas autorisé, donc ERREUR
             
       echo "Type de fichier non autorisé";    
	   exit;
    }    

### Déplacer et renommer le fichier

Par défaut, le fichier téléchargé est renommé avec un nom temporaire et stocké dans un répertoire nommé _tmp/_ (pour temporaire) de votre serveur (_C:/laragon/tmp_, _C:/wamp/tmp_). Il faudra alors déplacer votre fichier de _tmp/_ vers un répertoire final de votre choix (par exemple dans _images/_). 

Il est nécessaire aussi de renommer votre fichier pour que l'utilisateur ne puisse tenter d'exécuter le fichier via l'url (ainsi le nom sur le serveur sera différent de celui qu'il connaissait).  

Pour cela, PHP propose une fonction "2 en 1" : [`move_uploaded_file()`](http://php.net/manual/fr/function.move-uploaded-file.php). 

**Exemple** 

Déplacer et renommer un fichier de `tmp/` vers un répertoire nommé `images/` :
   
    move_uploaded_file($_FILES["fichier"]["tmp_name"], "images/photo.jpg");      

> La logique veut que les contrôles de sécurité ait été réalisés avant le déplacement. 

Dans votre projet, vous devez bien sûr remplacer _photo.jpg_ par le nom de fichier souhaité, c'est-à-dire le pro_id et l'extension du fichier téléchargé. Le code suivant vous permettra d'obtenir l'extension :
	
    $extension = pathinfo($_POST["fichier"]["tmp_name"], PATHINFO_EXTENSION);   

ou, alternative :

     $extension = substr(strrchr($_FILES["fichier"]["name"], "."), 1);

## Pour aller plus loin

### Limite de poids des fichiers

Le chargement des fichiers sur un serveur, et en particulier la taille des fichiers uploadés, est soumis à plusieurs limitations au niveau de la configuration dudit serveur. 

Ces paramètres limitatifs sont modifiables dans le fichier de configuration de PHP, _php.ini_ (situé dans _C:/laragon/bin/php/php-X.X.X-Win32-VC15-x64_ ou _C:/wamp/bin/apache/apache2.X.XX.bin/_).

Les paramètres pris en compte pour maîtriser l'upload des fichiers sont les suivants :

* `upload_max_filesize` : fixe la taille maximale d'un fichier à charger, exprimée en octets.
* `post_max_size` : fixe le poids maximum des données envoyées  par le formulaire (donc des fichiers chargés par formulaire sur le serveur). La valeur de `post_max_size` doit logiquement être  supérieure à la valeur de `upload_max_filesize`.

Vérifiez aussi la valeur du paramètre `memory_limit` qui fixe la mémoire maximum qu'un script peut allouer à une requête. La valeur de `memory_limit` doit être supérieure ou égale à la valeur de `post_max_size`.

Pour connaître leur valeur, utilisez la fonction [`ini_get()`](https://www.php.net/manual/fr/function.ini-get.php) :

    echo ini_get("upload_max_filesize");

Pour la modifier, on peut utiliser la fonction [`ini_set()`](https://www.php.net/manual/fr/function.ini-set.php), à placer en haut de votre formulaire : 

    ini_set("upload_max_filesize", 104857600); 

#### Limiter la taille du fichier à uploader au niveau du formulaire HTML

Il est possible de limiter, côté client, la taille des fichiers uploadés, **tout en gardant à l'esprit que la taille max fixée côté client ne peut pas être supérieure à celle fixée par le serveur**. 

Pour fixer une taille limite dans le formulaire, il faut ajouter un champ caché **avant le champ de type `file`**: 

    <input type="hidden" name="MAX_FILE_SIZE" value="104857600"> 

* la valeur de l'attribut `name` doit être `MAX_FILE_SIZE`
* l'attribut `value` indique une valeur pour le poids maxi du fichier téléchargé. L'unité est l'octet. Ici, 104857600 octets correspond à 100 mégaoctets (il existe sur le net des convertisseurs). 

> Comme tout code côté client, la valeur de `MAX_FILE_SIZE` peut être facilement modifiée dans la console navigateur. 

<!-- Source (20/11/2019) : 
http://memo-web.fr/categorie-divers-242.php
-->

### Spécifier des droits sur le fichier

Sur les systèmes d'exploitation (Windows, Linux...), les fichiers possèdent des droits (ou permissions) de lecture, d'exécution et d'écriture accordés aux utilisateurs. Il s'agit d'un système un peu complexe mais qui participe grandement à la sécurité.

Lire ces ressources :

* [Ressource 1](https://codex.wordpress.org/fr:Modifier_les_Permissions_sur_les_Fichiers)
* [Ressource 2](http://php.net/manual/fr/function.chmod.php)

## La fonction glisser-déposer en HTML 5  

HTML 5 propose une fonctionnalité de _glisser-déposer_ (_Drag & Drop_) pour les fichiers. Il s'agit d'une [API](https://fr.wikipedia.org/wiki/Interface_de_programmation) en Javascript.
[Exemple de mise en oeuvre](https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/1922434-le-drag-drop).   

## Ressources 

* [php.net](http://php.net/manual/fr/features.file-upload.post-method.php)

## Exercice 

Dans le projet _Jarditou_, mettre en oeuvre le téléchargement de fichier dans le formulaire d'ajout pour pouvoir charger la photo d'un produit. 

**Consignes :** 

* Respectez la charte de nommage "pro_id.extension" (exemple : _1.jpg_).
* Ne pas mettre en oeuvre les notions de droits sur les fichiers. 
* Ne pas mettre en oeuvre le Drag & Drop.    