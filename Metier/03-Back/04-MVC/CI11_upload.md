# Upload dans Codeigniter
 
Téléchargement d'un fichier avec CodeIgniter : photo d'un produit.

Rappel des étapes :

* Validation des saisies effectuées dans le formulaire
* Extraction de l'extension du fichier
* Enregistrement en base (ajout ou modification)
* Récupération de la clé primaire `pro_id`  
* Validation, renommage et déplacement du fichier

## Pré-requis  

* helper *form*
* librairie *form_validation*.

## La vue

* Modification de la balise d'ouverture du formulaire :  

	`<?php echo form_open_multipart(); ?>`

* Ajout d'un champ de type _file_ : 

	`<input type="file" name="fichier" id="fichier">`

## Le traitement

Le processus de traitement d'un fichier sera le suivant dans le contrôleur :

1. On vérifie la saisie des champs et qu'un fichier a été téléchargé
2. Dans la table _produits_, on doit stocker l'extension du fichier : il faut donc la récupérer    
3. On a l'extension, on peut donc enregistrer dans la table _produits_
4. Puisqu'on a enregistré, on peut donc récupérer la clé primaire (`pro_id`) de l'enregistrement
5. On a l'extension et le `pro_id`, on va donc pouvoir constituer le nom du fichier, le contrôler et le déplacer
 
## Le contrôleur

Dans le contrôleur _produits/ajout_, il faut ajouter les étapes suivantes :    
 
	public function ajout()
    {       
       // Chargement de l'assistant form       
       $this->load->helper('form');
	   
       // Chargement des librairies 'form_validation' et 'upload'
       $this->load->library('form_validation', 'upload');
            
       if ($this->input->post()) 
       { // Si le formulaire est posté            

             /*
             * Ici, mettre vos set_rules() et exécuter la validation 
             */

             // Si validation OK : 

             /* 
             * Avant d'enregistrer en base de données, il nous faut 
             * récupérer l'extension du fichier 
             */  
            
             // On extrait l'extension du nom du fichier,
             // on utilise la variable PHP superglobale $_FILES    
             if ($_FILES) 
             {
                // On extrait l'extension du nom du fichier 
                // Dans $_FILES["pro_photo"], pro_photo est la valeur donnée à l'attribut name du champ de type 'file'  
                $extension = substr(strrchr($_FILES["pro_photo"]["name"], "."), 1);
             }

             /*
             * On a l'extension du fichier donc on peut enregistrer
             * en base de données 
             */

             /*
             * Pour créer le nom du fichier : il faut récupérer la clé primaire (pro_id) : 
             * - dans le cas du formulaire d'ajout : il faut récupérer avec la méthode $this-db->InsertId();
             * - dans le cas du formulaire de modification : on récupère le pro_id passé dans un champ de type hidden     
             */
          
	         // On créé un tableau de configuration pour l'upload
		     $config['upload_path'] = './assets/photos/'; // chemin où sera stocké le fichier

             // nom du fichier final
	         $config['file_name'] = $id.'.'$extension; 

             // On indique les types autorisés (ici pour des images)
		     $config['allowed_types'] = 'gif|jpg|jpeg|png'; 
		    
	         // On charge la librairie 'upload'
		     $this->load->library('upload');
	
	         // On initialise la config 
	         $this->upload->initialize($config);
		    
	         // La méthode do_upload() effectue les validations sur l'attribut HTML 'name' ('fichier' dans notre formulaire) et si OK renomme et déplace le fichier tel que configuré
		     if ( ! $this->upload->do_upload('fichier')) 
		     {
	            // Echec,  on réaffiche le formulaire
		        $this->load->view('ajout');
		     }
		     else
		     { // Succès, on redirige sur la liste 
		         redirect('produits/liste');
		     }
     } 
     else 
     { // Formulaire non posté, on affiche la vue initiale
          $this-load->view('ajout');
     } // -- ajout() 

## Les erreurs

Dans la validation du fichier, ajouter la ligne _$errors..._ : celle-ci va capter les erreurs concernant le fichier (type non autorisé, taille trop importante, répertoire de destination inexistant...) et nous permettre éventuellement de les transférer à la vue pour les afficher :     

	if ( ! $this->upload->do_upload('fichier')) 
	{
         // Echec : on récupère les erreurs dans une variable (une chaîne)
         $sUploadErrors = $this->upload->display_errors());    
         
         // on réaffiche la vue du formulaire en passant les erreurs 
         $aView["sUploadErrors"] = $sUploadErrors;

         /* On envoie le message d'erreur dans le fichier php_error.log,
         * voir explications ci-après
         */
         error_log($sUploadErrors, 0);

        /* Pour l'utilisateur, on envoie un message flash
        * n'oubliez pas, cela nécessite la librairie 'session'
        */ 
        $this->load->library('session'); 
        $this->session->set_flashdata('sUploadError2','Le téléchargement de la photo a échoué.');

         // Réaffichage du formulaire 
         $this->load->view('ajout', $aView);
	}
	else
	{ // Succès 
	    redirect('produits/liste');
	}

Attention, la méthode `$this->upload->display_errors()` retourne une chaîne (voir la doc [ici](https://codeigniter.com/userguide3/libraries/file_uploading.html?highlight=upload%20display_errors#CI_Upload::display_errors)) qui contient des informations techniques incompréhensibles par des internautes non développeurs. Pour éviter cela on pourrait envoyer son résultat (stocké ici dans la variable `$sUploadErrors`) dans le fichier d'erreurs PHP grâce à la fonction PHP [`error_log()`](https://www.php.net/manual/fr/function.error-log.php). Le résultat sera visible dans le fichier _C:/wamp/logs/php\_error.log_.

> Par défaut, le message d'erreur est encadré par des balises `<p></p>`. Il est possible de spécifier en argument de la méthode `display_errors()` son propre jeu de balises, y compris accompagnées de CSS : par exemple pour un message d'alerte Bootstrap : `$this->upload->display_errors("<div class='alert alert-danger'>", "</div>")`.  

## Informations sur le fichier 

CodeIgniter fournit la méthode `$this->upload->data()` pour récupérer (dans un tableau PHP) les informations d'origine sur le fichier téléchargé. 

**Ces infos ne sont disponibles que lorsque `do_upload()` a été exécuté**.

    $aUploadDatas = $this->upload->data(); 

Faites un `var_dump($aUploadDatas)` pour visualiser les informations :   

	Array(
        [file_name]     => mypic.jpg
        [file_type]     => image/jpeg
        [file_path]     => /path/to/your/upload/
        [full_path]     => /path/to/your/upload/jpg.jpg
        [raw_name]      => mypic
        [orig_name]     => mypic.jpg
        [client_name]   => mypic.jpg
        [file_ext]      => .jpg
        [file_size]     => 22.2
        [is_image]      => 1
        [image_width]   => 800
        [image_height]  => 600
        [image_type]    => jpeg
        [image_size_str] => width="800" height="200"
    )

> [Documentation](https://codeigniter.com/userguide3/libraries/file_uploading.html#CI_Upload::data)
 
## Exercice 

Modifiez votre formulaire d'ajout Jarditou pour y charger une photo. 

La difficulté sera de gérer à la fois l'upload et l'enregistrement des données d'un produit en base. 

## Documentation

[File Uploading Class](https://codeigniter.com/user_guide/libraries/uploaded_files.html).

## Complément (facultatif)

[Traduction des messages d'erreurs](https://beliard.net/site/2017/10/passer-codeigniter-3-1-5-et-suivants-en-francais).

<br><br><br><br>
