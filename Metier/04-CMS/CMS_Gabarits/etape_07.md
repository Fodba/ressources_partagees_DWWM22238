# Wordpress - Gabarits
  
## Etape 7 : afficher le détail d'un contenu

Nous avons affiché une liste d'articles et lorsqu'on clique sur un titre la page correspondante (détail de l'article) s'affiche. 

Créez un fichier _single.php_ (template d'un article) et copiez-y le code suivant (remarquez que le principe est à peu près le même que celui de la page de liste) :

    <div class="col-8">
	<?php
	if ( have_posts() ) : the_post(); ?>
	   <h1><?php the_title(); ?></h1>
	   <hr>
	   Publié le <strong><?php the_date(); ?></strong> par <strong><?php the_author(); ?></strong>
	   <hr>		 
	   <div><?php the_content(); ?></div>			 
	   <?php
	   endif;
       ?>        