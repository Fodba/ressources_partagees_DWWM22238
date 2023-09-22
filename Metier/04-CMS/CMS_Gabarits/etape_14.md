# Wordpress - Gabarits

## Etape 14 : Aller plus loin dans les thèmes

## Référencement (SEO)

Pour commencer, nous devons nous assurer d'afficher un titre unique pour chacune des pages.

Editer le template _header.php_ et remplacer la ligne `<title><?php echo get_bloginfo('title');?></title> ` par le code suivant qui affiche un titre en focntion du contenu affiché (article, page, accyueil, catégorie...)

+++ TODO : A VERIFIER +++

	<title>
	<?php if ( is_404() ) : ?>
	    <?php _e('Not Found'); ?>
	<?php elseif ( is_home() || is_front_page() ) : ?>
	   <?php bloginfo('description'); ?>
	<?php elseif ( is_category() ) : ?>
	    <?php single_cat_title(); ?>
	<?php else : ?>
	    <?php wp_title(); ?>
	<?php endif; ?>
	</title>

* [Optimisations pour le SEO](https://www.redacteur.com/blog/wordpress-optimisation-seo-simple)
* [Comparatifs des plugins SEO](https://fr.oncrawl.com/referencement/5-plugins-seo-gratuits-a-utiliser-pour-wordpress)
* [Ensemble de tutoriels](https://wpformation.com/wordpress/referencement)

> Vous trouverez bien d'autres ressources sur le web. 

## Widgets

+++ TODO +++

## Créer un formulaire de contact

* [Tutoriel sur le plugin Contact Form 7](https://wpmarmite.com/contact-form-7)

## Désactiver les commentaires 

Sur un site vitrine d'entreprise, vous n'avez sans doute pas besoin des commentaires prévus à l'origine pour les blogs. Il est possible de [les désactiver](https://astuceswp.fr/tutos/823/desactiver-commentaires-wordpress).

## Créer des types de contenus personnalisés 

Wordpress possède par défaut 3 types de contenus : article, page et média. C'est plutôt limité.

Imaginons par exemple le site d'une agence immobilière qui veut pouvoir saisir les annonces des biens qu'elle vend : il faudrait un formulaire avec les champs type de bien, prix, ville... cela ne correspond pas à ce que propose Wordpress pour la saisie d'un article.

Il existe un mécanisme de création de type de contenu personnalisé, appelé _Custom Post Type_ : il s'agit de créer un formulaire avec des champs spécifiques au contenu que l'on a besoin de saisir. 

* [Ressource 1](https://wp-headless.fr/creer-un-custom-post-type-wordpress-sans-plugin)
* [Ressource 2](https://capitainewp.io/formations/wordpress-creer-blocs-gutenberg/gutenberg-custom-post-type)  
* [Générateur de code](https://generatewp.com/post-type) 

> A côté des _Custom Post Type_ disponibles en natif, il existe aussi de nombreuses extensions.