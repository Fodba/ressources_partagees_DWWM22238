# CodeIgniter - 04 - Formulaires

> Demander une présentation à un formateur.

## L'assistant formulaires

Pour utiliser les formulaires, nous aurons besoin de charger dans les contrôleurs les assistants _form_ et _url_. Pour pouvoir enregister les données en base, il faut aussi la librairie _database_.

    public function nom_methode()
	{
         // Chargement des assistants 'form' et 'url'
         $this->load->helper('form', 'url'); 

         // Chargement de la librairie 'database'
         $this->load->database(); 

         // ...
	}

## Formulaires : les bases

Dans le contrôleur, ajouter une méthode pour afficher le formulaire d'ajout d'un produit :

	public function ajouter()
	{
        // Chargement des assistants 'form' et 'url'
        $this->load->helper('form', 'url'); 
	
        // Chargement de la vue 'ajouter.php'
		$this->load->view('ajouter');
	} // -- ajouter()

Cette méthode charge la vue `ajouter.php` :  
	
     <?php echo form_open(); ?>

     <div class="form-group">
        <label for="pro_libelle">Libellé</label>
		<input type="text" name="pro_libelle" id="pro_libelle" class="form-control">
	 </div>	

     <div class="form-group">
        <label for="pro_ref">Référence</label>
        <input type="text" name="pro_ref" id="pro_ref" class="form-control">
     </div>	

     <button type="submit" class="btn btn-dark">Ajouter</button> 	
	 </form>

Remarquez la ligne 1 : celle-ci génère le code suivant :

	<form action="http://localhost/ci/index.php/produits/ajouter" method="post"> 

La valeur de l'attribut `action` a été renseignée automatiquement et renvoie le formulaire vers le même contrôleur/méthode qui a affiché la vue; **ce qui signifie que la même méthode sera utilisée pour afficher et traiter le formulaire**.
 
> Il est très important d'utiliser la fonction `form_open()` car elle applique aussi des mécanismes de sécurité contre les failles XSS et CSRF (si ces mécanismes sont activés).

## Traitement du formulaire d'ajout

        public function ajouter()
	    {
            // Chargement des assistants 'form' et 'url'
           $this->load->helper('form', 'url'); 

           // Chargement de la librairie 'database'
           $this->load->database(); 

		   if ($this->input->post()) 
           { // 2ème appel de la page: traitement du formulaire
               
		    	$data = $this->input->post();

		    	$this->db->insert('produits', $data);

		    	redirect("produits/liste");
		   } 
		   else 
           { // 1er appel de la page: affichage du formulaire
			   $this->load->view('ajouter');
		   }
	    } // -- ajouter()

* `$data = $this->input->post();` permet de récupérer en une seule fois toutes les données envoyées par le formulaire. Equivaut au tableau `$_POST` en PHP natif. 
* `$this->load->database();` permet de se connecter à la base de données.
* `$this->db->insert('produits', $data);` génère et exécute une requête SQL d'insertion. Le tableau `$data` contient toutes les valeurs issues du formulaires.
	* Le premier argument est le nom de la table dans laquelle les données doivent être insérées. 
	* Le second argument est le tableau contenant les données issues du formulaire (POST). 
* `$this->load->helper('url');` charge le module permettant d'utiliser la fonction `redirect`
* Enfin, `redirect("produits/liste");` redirige le navigateur vers la méthode `liste` du contrôleur `produits`. La méthode `redirect()` est disponible via le helper _url_.

## Problèmes avec l'envoi direct en base

Le problème qui se pose avec l'utilisation de `$this->db->insert('produits', $data);` c'est que les noms des colonnes de la table ciblée doivent être strictement identiques aux attibuts `name` des champs input, ce qui n'est pas toujours le cas.  

En outre, on peut ne pas avoir besoin d'envoyer en base certains champs d'un formulaire. 

Il faut garder en mémoire qu'on manipule un tableau, il est donc possible d'appliquer les fonctions natives adéquates. 

Supprimer un champ inutile avec la fonction PHP `unset()` avant l'insertion : 

	unset($data["champPasEnBase"]);

A l'inverse, il est parfois nécessaire d'envoyer dans une table des informations qui ne viennent pas du formulaire,  ou encore d'avoir à transformer des valeurs issues du formulaire. Pour cela, on peut donc y ajouter les données manquantes/à transformer.

**Exemples** 

    // Ajout d'une date d'ajout que le formulaire ne contient pas
	$data["pro_d_ajout"] = date("Y-m-d h:i:s");

    // Transformation d'une information venant du formalaire
    // par exemple forcer la référence d'un produit en majuscules
    $pro_ref = $this->input->post("pro_ref");
    $data["pro_ref"] = strtoupper($pro_ref);

    // Insertion en base
    $this->db->insert('produits', $data);

    // Redirection sur la page de liste des produits
   	redirect("produits/liste");

> Notez que `$this->input->post("nom_du_champ")` permet de récupérer la valeur d'un seul champ en lui spécifiant en argument la valeur de l'attribut `name`.  

## Validation de formulaire

Pour le moment, nous avons inséré des données en base sans aucun contrôle, pas bien ! 

CodeIgniter propose une librairie de [validation de formulaire](https://codeigniter.com/userguide3/libraries/form_validation.html?highlight=forms). Commençons par charger celle-ci dans notre contrôleur, elle se nomme *form_validation* :

        public function ajouter()
	    {
           // Chargement des assistants 'form' et 'url'
           $this->load->helper('form', 'url'); 

           // Chargement de la librairie 'database'
           $this->load->database(); 

           // Chargement de la librairie form_validation
           $this->load->library('form_validation'); 

		   if ($this->input->post()) 
           { // 2ème appel de la page: traitement du formulaire
               
		    	$data = $this->input->post();

		    	$this->db->insert('produits', $data);

		    	redirect("produits/liste");
		   } 
		   else 
           { // 1er appel de la page: affichage du formulaire
			   $this->load->view('ajouter');
		   }
	    } // -- ajouter()

Cette librairie fonctionne comme suit : la méthode `set_rules()` cible un champ et y applique un ou plusieurs filtres de validation. 

**Exemple**

	$this->form_validation->set_rules("pro_ref", "Référence", "required");

* 1<sup>er</sup> argument : indique le champ de formulaire à contrôler, indiquer l'attribut _name_ du &lt;input&gt; (et non pas l'attribut _id_). 
* 2<sup>ème</sup> argument : précise un nom/libellé désignant le champ ciblé, mieux compréhensible par l'humain que l'attribut _name_ (nom trop "technique"). Ce libellé apparaîtra dans le message d'erreur associé au champ.
* 3<sup>ème</sup> argument : le filtre de contrôle à appliquer. Ici, le filtre `required` indique que le champ est obligatoire (doit être renseigné). Ce filtre remplace la condition qui serait `if (empty($_POST["pro_ref"]) { ...`    

L'étape suivante est l'exécution de ce filtre, grâce à la méthode `run()`, qui va appliquer le filtre et retourner `TRUE` si la valeur est correcte, ou `FALSE` dans le cas contraire.   

Reprenons le contrôleur, ajoutons les méthodes `set_rules()` et `run()`, voir les commentaires dans le code : 

    public function ajouter()
    {
       // Chargement des assistants 'form' et 'url'
       $this->load->helper('form', 'url'); 

       // Chargement de la librairie 'database'
       $this->load->database(); 

       // Chargement de la librairie form_validation
       $this->load->library('form_validation'); 

       if ($this->input->post()) 
       { // 2ème appel de la page: traitement du formulaire
           
	    	$data = $this->input->post();

            // Définition des filtres, ici une valeur doit avoir été saisie pour le champ 'pro_ref'
            $this->form_validation->set_rules("pro_ref", "Référence", "required"));

            if ($this->form_validation->run() == FALSE)
            { // Echec de la validation, on réaffiche la vue formulaire 

                  $this->load->view('ajouter');
            }
            else
            { // La validation a réussi, nos valeurs sont bonnes, on peut insérer en base
                 
                $this->db->insert('produits', $data);

		    	redirect("produits/liste");
            }	    
		} 
		else 
        { // 1er appel de la page: affichage du formulaire
			   $this->load->view('ajouter');
		}
	} // -- ajouter() 

Testez votre formulaire en omettant de saisir le champ _Référérence_.

Pour l'instant, le message d'erreur affiché dans la vue est en anglais. Pour le traduire, il faut indiquer un message personnalisé en 4<sup>ème</sup> argument de `set_rules()`. Il s'agit d'un tableau associant le nom du filtre à son message : 

	$this->form_validation->set_rules("pro_ref", "Référence", "required", array("required" => "Le %s doit être obligatoire.") );

Dans le message, la mention `%s` est un marqueur (joker) qui sera remplacé par la valeur du second argument, en l'occurrence ici par _Référence_.

Ceci n'est valable que lorsqu'il n'y a qu'un filtre.

### Les filtres en détail

Il est possible d'appliquer plusieurs filtres sur un même champ. 

> [Liste des filtres](https://codeigniter.com/userguide3/libraries/form_validation.html?highlight=forms#rule-reference) 
 
Pour se faire, il faut séparer les filtres en 3<sup>ème</sup> argument par le caractère `|` :  

	$this->form_validation->set_rules('pro_ref', 'Référence', 'required|min_length[6]', array("required" => "Le %s doit être obligatoire.", "min_length" => "Le %s doit avoir longueur minimum de 6 caractères."));

On ajouté ici le filtre `min_length[6]` qui requiert une valeur d'au moins 6 caractères.  

En 4<sup>ème</sup> argument, un message est associé à chaque filtre. 

Si un filtre venait à manquer, on peut tenter de passer par les expressions régulières via le filtre `regex_match[\\regex\]` ou _regex_ correspond au motif à tester :

**Exemple** 

Exemple de filtre pour valider une date au format dd/mm/yyyy : 

	$this->form_validation->set_rules('date', 'Date', 'required|regex_match[\^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$\]', array("required" => "La %s est requise", "regex_match" => "Le format de la %s" n'est pas valide");

## Affichage des erreurs

### Affichage global

Dans la vue, avant (par exemple) l'ouverture de votre formulaire, vous pouvez afficher toutes les erreurs en une seule fois via la fonction :

	 <?php echo validation_errors(); ?>
    
     <?php echo form_open(); ?>

### Affichage à proximité du champ concerné

Pour améliorer l'ergonomie, il est recommandé d'afficher le message d'erreur près du champ concerné, par exemple en dessous, avec la fonction `form_error();` qui prend en argument le nom du champ (attribut `name` de l'input) :

    <div class="form-group">
       <label for="pro_libelle">Libellé</label>
	   <input type="text" name="pro_libelle" id="pro_libelle" class="form-control">
       <?php echo form_error('pro_libelle'); ?>
	</div>	
  
### Personnaliser le style des messages d'erreurs

Le style des messages d'erreur peut être personnalisé. 

Dans le contrôleur, nous allons utiliser, par exemple, le style des alertes de Bootstrap :

	$this->form_validation->set_error_delimiters('<div class="alert alert-danger">', '</div>');  

* 1<sup>er</sup> argument de la méthode `set_error_delimiters()` : balise HTML d'ouverture du message d'erreur.
* 2<sup>ème</sup> argument : balise HTML de fermeture.

## Réaffichage des valeurs 

Il manque un dernier petit détail : en cas d'erreur le formulaire est réaffiché sans les valeurs saisies par l'utilisateur. 

Pour réafficher les valeurs, on va mettre dans l'attribut `value` de chaque champ la fonction `set_value()`, qui prend en argument l'attribut `name` :

    <div class="form-group">
       <label for="pro_libelle">Libellé</label>
	   <input type="text" name="pro_libelle" id="pro_libelle" class="form-control" value="<?php echo set_value('pro_libelle'); ?>">
       <?php echo form_error('pro_libelle'); ?>
	</div>	

> [Documentation](https://codeigniter.com/userguide3/libraries/form_validation.html?highlight=forms#re-populating-the-form) 

## Formulaire de modification

Dans le contrôleur, ajouter une méthode pour le formulaire de modification. Celle-ci sera déclenchée en utilisant l'url suivante :

    http://localhost/ci/index.php/produits/modifier/7

Le paramètre _7_ signifie que l'on souhaite modifier le produit 7. Ce paramètre se trouve transmis en argument de la méthode `modifier()` via la variable `$id` (par exemple) :  

	public function modifier($id)
	{
        // Chargement des assistants 'form' et 'url'
        $this->load->helper('form', 'url'); 

        // Chargement de la librairie 'database'
        $this->load->database();  

        // Chargement de la librairie form_validation
        $this->load->library('form_validation'); 
       	
        // ...

        $this->load->view('modifier', $aView);

	} // -- modifier()

Comme en PHP normal, la méthode `modifier()` va devoir : 

* aller chercher les valeurs déjà en base de l'enregistrement souhaité pour pouvoir les afficher dans le formulaire
* puis lorsqu'on poste le formulaire : 
* 
	* filtrer les données reçues   
    * exécuter une requête SQL de type UPDATE pour enregistrer les modifications en base 
    
Construisons donc notre méthode. On peut reprendre partiellement la cinématique de la méthode `ajouter()` :

	public function modifier($id)
	{
        // Chargement des assistants 'form' et 'url'
        $this->load->helper('form', 'url'); 

        // Chargement de la librairie 'database'
        $this->load->database();  

        // Chargement de la librairie form_validation
        $this->load->library('form_validation'); 
       
        // Requête de sélection de l'enregistrement souhaité, ici le produit 7 
        $produit = $this->db->query("SELECT * FROM produits WHERE id= ?", $id);
		$aView["produit"] = $produit->row(); // première ligne du résultat
		
        if ($this->input->post()) 
        { // 2ème appel de la page: traitement du formulaire
               
		   $data = $this->input->post();
           
           // Définition des filtres, ici une valeur doit avoir été saisie pour le champ 'pro_ref'
           $this->form_validation->set_rules('pro_ref', 'Référence', 'required');

           if ($this->form_validation->run() == FALSE)
           { // Echec de la validation, on réaffiche la vue formulaire 
               $this->load->view('modifier', $aView);
           }
           else
           { // La validation a réussi, nos valeurs sont bonnes, on peut modifier en base  
              
              /* Utilisation de la méthode where() toujours 
              * avant select(), insert() ou update()
              * dans cette configuration sur plusieurs lignes 
              */  
              $this->db->where('pro_id', $id);
              $this->db->update('produits', $data);
              

              redirect("produits/liste");
          }
		} 
		else 
        { // 1er appel de la page: affichage du formulaire			   
           $this->load->view('modifier', $aView);
		}
	} // -- modifier()

A l'affichage du formulaire :
	
	      <?php echo form_open(); ?>
	
	      <input type="hidden" name="id" value="<?php echo $produit->pro_id; ?>"> 
	
	      <div class="form-group">
	         <label for="pro_libelle">Libellé</label>
		  	 <input type="text" name="pro_libelle" id="pro_libelle" class="form-control" value="<?php echo $produit->pro_libelle; ?>">
		  </div>	
	
	      <div class="form-group">
	         <label for="pro_ref">Référence</label>
	         <input type="text" name="pro_ref" id="pro_ref" class="form-control" value="<?php echo $produit->pro_ref; ?>">
	      </div>	
	
	      <button type="submit" class="btn btn-dark">Modifier</button> 	
		 </form>	

La première fois que le formulaire est affiché, les champs seront pré-remplis avec les valeurs en base. Cependant, lorsque le formulaire sera posté, en cas d'échec de la validation il faut réafficher aussi les valeurs modifiées par l'utilisateur, qui ne correspondent plus à celles en base. La méthode `set_value()` nous le permet en recevant deux arguments :

	set_value('pro_libelle', $produit->pro_libelle);

* 1<sup>er</sup> argument : valeur postée, s'il y en une (si le formulaire a été posté). Indiquer la valeur de l'attribut `name` de l'input concerné.  
* 2<sup>ème</sup> argument : valeur affichée quand le formulaire n'a jamais été posté, il s'agira donc de la valeur enregistrée en base.

Ce qui donne, dans l'attribut `value` d'un champ : 

    <input type="text" name="pro_libelle" id="pro_libelle" class="form-control" value="<?php echo set_value('pro_libelle', $produit->pro_libelle); ?>">         

## Formulaire de suppression

Continuer l'exercice pour ajouter la suppression (avec, bien sûr, une confirmation du choix de l'utilisateur).

## Auto-chargement des assistants et des librairies

Plutôt que de charger tous les assistants et librairies nécessaires dans chaque méthode, il est possible des les pré-charger automatiquement pour tout le projet. C'est pratique pour des assistants et librairies essentiels tels que _url_, _database_, _form_, *form_validation*. 

* Ouvrir le fichier `config/autoload.php`.
* Rechercher la ligne `$autoload['libraries']` et remplacer par :

        $autoload['libraries'] = array('database', 'form_validation');

* Rechercher la ligne `$autoload['helpers']` et remplacer par :

        $autoload['helpers'] = array('form', 'url');

Vous pouvez désormais supprimer tous les `$this->load->helper` et `$this->load->library` des méthodes de vos contrôleurs. Ca fait vite quelques lignes de moins ! 

## Exercices

* Réalisez l'intégralité du formulaire d'ajout d'un produit Jarditou. Ne faites pas l'upload de l'image pour le moment.
* Réalisez l'intégralité du formulaire de modification d'un produit Jarditou. Ne faites pas l'upload de l'image pour le moment.

## Téléchargement de fichiers

[Upload](CI11_upload.html).

## Aller plus loin avec les formulaires (facultatif)

Le [helper _form_](https://codeigniter.com/userguide3/helpers/form_helper.html?highlight=forms) propose de nombreuses fonctions pour : 

* générer les balises HTML des différents types de champs : [exemples](https://openclassrooms.com/fr/courses/82136-codeigniter-le-framework-au-service-des-zeros/2470109-les-formulaires#/id/r-2469934) et [documentation](https://codeigniter.com/userguide3/helpers/form_helper.html#form_input). 
* en ce qui concerne la validation, il est possible de créer [des configurations réutilisables](https://codeigniter.com/userguide3/libraries/form_validation.html?highlight=form_validation#saving-sets-of-validation-rules-to-a-config-file).

<br><br><br><br>