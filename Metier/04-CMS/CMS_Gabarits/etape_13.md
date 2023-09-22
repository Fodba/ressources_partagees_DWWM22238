# Wordpress - Gabarits

## Etape 13 : Les boucles dans le détail

Les boucles avec l'objet *WP_Query*

Nous avons abordé la boucle de base avec `while (have_posts() )`. Wordpress peut aller plus loin avec un objet nommé *WP_Query* qui permet d'appliquer des critères pour obtenir exactement ce que l'on souhaite afficher. Par exemple remonter les articles de tel auteur, les articles qui ont telle étiquette etc.

## Exemple d'utilisation : afficher la miniature d'un article 

Dans une boucle listant plusieurs articles ou pages, la fonction `the_post_thumbnail()` n'est pas disponible. Il faut passer par l'instanciation d'un objet `WP_Query()`.

> **Pré-requis** : Les articles doivent posséder une image de mise en avant (à définir dans la colonne de droite d'un article dans l'admin)

Dans le template _front-page.php_, mettre le code suivant pour afficher la liste des articles avec leur miniature respective :  

    <?php 	
    // Tableau des arguments à passer à la requête
    // Attention : WP_Query ne fonctionne pas si ce tableau est vide
	$args = array(
	   'posts_per_page' => 5 // Nombre d'articles à afficher 
	);
		 
	// Custom query
	$query = new WP_Query($args);
		 
	// Check that we have query results.
	if ( $query->have_posts() ) :
 
	    // Start looping over the query results.
	    while ( $query->have_posts() ) : $query->the_post();
            echo"<div class='row'>\n"; 
			echo"<div class='col-12'><h2><a href='".get_the_permalink()."' title='".get_the_title()."'>".get_the_title()."</a></h2></div>\n"; 		  	
            echo"</div>\n";
		   echo"<div class='row border-bottom pb-3 mb-3'>\n"; 
		   echo"<div class='col-2'>";
			
		   if (has_post_thumbnail()) 
		   { // Vérifie qu'il existe une image mise en avant pour l'article
               the_post_thumbnail('thumbnail');
           }
			
		   echo"</div>\n";
			
		   echo"<div class='col-10'>".get_the_excerpt()."</div>\n";						
		   echo"</div>\n";	              
        endwhile;
    endif;
 
    // Restaure la boucle originale
    wp_reset_postdata();			
    ?>

## Ressources

* [Maîtriser WP_Query() 1](https://code.tutsplus.com/fr/tutorials/mastering-wp_query-an-introduction--cms-23023)
* [Maîtriser WP_Query() 2](https://code.tutsplus.com/fr/tutorials/mastering-wp_query-using-the-loop--cms-23031)
* [Tutoriel complet](https://code.tutsplus.com/series/mastering-wp_query--cms-818)
* [Codex](https://developer.wordpress.org/reference/classes/wp_query)