# Wordpress - Gabarits

## Etape 9 : afficher le logo du site

1. Dans le répertoire _Youpi_, créez un fichier obligatoirement nommé `functions.php` et collez-y le code suivant : 

		function youpi_custom_logo_setup() 
        {
           $aParams = array(
	          'height'      => 100,
	          'width'       => 400,
	          'flex-height' => true,
	          'flex-width'  => true,
	          'header-text' => array( 'site-title', 'site-description' ),
	       );
   
           // Ajout du support 
	       add_theme_support('custom-logo', $aParams );
        }

        add_action( 'after_setup_theme', 'youpi_custom_logo_setup' );

Cette fonction permet d'activer la prise en charge d'un logo personnalisé (_custom logo_) dans un thème. La fonction `youpi_custom_logo_setup()` prend des paramètres de formatage du logo (taille, textes des balises `alt` et `title` de l'image...)
 
2. Dans l'administration de Wordpress, rendez-vous dans _Apparence > Personnaliser > Identité du site. Téléchargez [ce logo](images/youpi_logo.png), ne pas oublier de cliquer sur les boutons _Sélectionner_ et _Publier_ pour valider. Notez que le logo est ajouté à la bibliothèque de médias, il sera donc disponible pour être utilisé ailleurs. 

3. Dans vos templates, pour afficher le logo : 

	    <?php		
	    $custom_logo_id = get_theme_mod('custom_logo');
			
		$aLogo = wp_get_attachment_image_src($custom_logo_id , 'medium');
				
		if (has_custom_logo()) 
		{ // Si un logo a été défini
			echo '<img src="'.esc_url($aLogo[0]).'" alt="'.get_bloginfo('name').'" class="class-fluid">';
		} 
		else 
		{   // Sinon on affiche le nom du site
			echo '<h1>'.get_bloginfo('name').'</h1>';
		}
		?>

On pourrait rendre le logo cliquable vers la page d'accueil. Remplacer la ligne qui contient la balise `<img>`par celle-ci :

	echo'<a href="'.get_bloginfo('url').'" title="'.get_bloginfo('name').'"><img src="'.esc_url($aLogo[0]).'" alt="'.get_bloginfo('name').'" title="'.get_bloginfo('name').'" class="img-fluid"></a>';
	
> [Documentation](https://developer.wordpress.org/themes/functionality/custom-logo) 

