# Wordpress - Gabarits

## Etape 10 : Construire et afficher un menu

### Construire le menu dans l'administration

* Dans le fichier `functions.php`, activer la prise en charge des menus pour votre thème :

        add_theme_support('menus');		

* Dans l'administration, vous devez désormais voir un lien _Menus_ sous _Apparence_ : cliquer dessus. Vous arrivez sur la gestion des menus. Créer un menu nommé _principal_ (par exemple) selon [cette procédure](https://wpmarmite.com/menu-wordpress). Mettez-y les articles ou pages souhaités.
* Dans le fichier `functions.php`, ajouter la prise en charge des zones de menus en ajoutant :

        register_nav_menu("principal", "Menu principal");

* 1<sup>er</sup> argument : nom "technique" du menu (sans accents ni espaces, tel que stocké en BDD)
* 2<sup>ème</sup> argument : nom "affichable" du menu (peut contenir des espaces et des accents ou des caractères spéciaux) 
 
> [Aide](http://arts-numeriques.codedrops.net/Plus-Ajouter-la-fonction-de-menu)

<!--  
*  Rendez-vous ensuite dans l'onglet ???  
-->

### Affichage du menu dans le thème

Il faut maintenant afficher notre menu dans le thème grâce à la fonction [`wp_nav_menu()`](https://developer.wordpress.org/reference/functions/wp_nav_menu).

Cependant l'utilisation de Bootstrap nécessite une classe PHP additionnelle de type [walker](https://wabeo.fr/construire-walker-wordpress) que vous pouvez [télécharger ici](ressources/class-wp-bootstrap-navwalker_2.zip).

> [Source Github](https://github.com/wp-bootstrap/wp-bootstrap-navwalker).  

Extrayez le fichier _class-wp-bootstrap-navwalker_ et déplacez-le **à la racine du répertoire de votre thème**.

Un walker permet de réécrire la sortie HTML des fonctions natives de Wordpress.  
 
Dans votre `functions.php`, ajouter la prise en charge de ce walker :
	
	function register_navwalker() 
    {
        // On charge la classe
        // la fonction get_template_directory() récupère le chemin vers le thème actif, 
		require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';
	}

	add_action('after_setup_theme', 'register_navwalker');

Puis, dans les templates, mettre le code suivant, basé donc sur une barre de navigation Bootstrap : 

	<nav id="navbar" class="navbar navbar-expand-sm bg-dark navbar-dark my-3">
	     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
			<span class="navbar-toggler-icon"></span>
		</button>
				
		<div class="collapse navbar-collapse" id="collapsibleNavbar">
		    <?php  
	        wp_nav_menu(array(
	            'theme_location'    => 'principal',
	            'depth'             => 5,
	            'menu_class'        => 'nav navbar-nav',
				'fallback_cb'       => 'wp_bootstrap_navwalker::fallback',
	            'walker'            => new wp_bootstrap_navwalker()
				)
	        ); 
			?>					
		</div> 
	</nav>

## Ressources

* [Ressource 1](https://napitwptech.com/tutorial/wordpress-development/integrate-bootstrap-navbar-4-wordpress-theme)
* [Ressource 2](https://www.isitwp.com/create-responsive-wordpress-menu-using-bootstrap-nav-walker)

<br><br><<br><br>