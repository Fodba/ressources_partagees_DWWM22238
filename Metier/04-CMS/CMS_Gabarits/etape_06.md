# Wordpress - Gabarits

## Etape 6 : Les boucles 

Jusqu'ici, nous avons créé un thème statique. Pour afficher les contenus en base, Wordpress fournit des **boucles** (ou _loops_ en anglais) : il s'agit de fonctions (écrites en PHP bien sûr) qui interrogent la base de données sans écrire la moindre requête SQL (ça paraît génial !). 

Les arguments passés aux fonctions permettent de filtrer ce que l'on veut obtenir, par exemple : 

* les articles rédigés par tel utilisateur 
* les articles publiés à une date précise 

La boucle suivante permet d'afficher la liste des articles (du plus ancien au plus récent) :

    <?php
	if ( have_posts() ) : // S'il y a des articles 
		while ( have_posts() ) : the_post() // Tant qu'il y a des articles, alors pour chaque article on affiche : 
	       ?>
		   <h2><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a></h2>	
		   <?php 			    	    
		   echo"<div>".the_excerpt()."</div>";
		   echo"<hr>";
	   endwhile;
	endif;
    ?>

* `the_permalink()` = url de la page de l'article (détail)
* `the_title()` = titre de l'article
* `the_excerpt()` = résumé de l'article (description courte) 

Il existe beaucoup d'autres [informations](https://codex.wordpress.org/Template_Tags#Post_tags) (appelées _posts tags_) affichables : métadonnées (auteur, date de publication...), catégorie, mots-clés, images/médias... 
         
<!-- * [Explications détaillées sur la boucle](http://wordpress.bbxdesign.com/la-boucle) -->
* [Documentation officielle 1](https://codex.wordpress.org/fr:La_Boucle)  
* [Documentation officielle 2](https://codex.wordpress.org/fr:La_Boucle_En_Action)
  