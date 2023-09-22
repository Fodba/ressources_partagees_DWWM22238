# Wordpress - Gabarits

## Etape 4 : création d'un fichier `header.php`    

1. Créez un fichier nommé _header.php_ et copiez-y le début du code de _index.php_ jusqu'à `</head>`. 
2. Supprimez ce bloc de code du fichier _index.php_ et remplacez le par `<?php get_header(); ?>`
3. Editez le fichier _header.php_ et remplacez les lignes suivantes par ce qui est indiqué : 

| Ligne               | A remplacez par      | 
|---------------------|----------------------|
| `<html lang="fr">`  | `<html <?php language_attributes(); ?>>` | 
| `<meta charset="utf-8">` | `<meta charset="<?php bloginfo('charset'); ?>">` |
| `<title>...` |  `<title><?php echo get_bloginfo('title');?></title>` |
| `<meta name="description"...` | `<meta name="description" content="<?php echo get_bloginfo('description');?>">` |

Puis ajoutez cette fonction Worpdress juste avant la balise `</head>` qui va charger les fichiers CSS ajoutés par les différents plugins.  :
 
	<?php wp_head(); ?>

<!-- Documentation (http://wordpress.bbxdesign.com/les-includes). -->

> [Documentation](https://www.seomix.fr/get-template-part-include-functions) 