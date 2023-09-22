# Wordpress - Gabarits

## Etape 5 : création d'un fichier `footer.php`       

1. Créez un fichier nommé _footer.php_, copiez-y la fin du code du fichier _index.php, à partir de la balise `<footer>`. 
* Supprimez ce bloc de code du fichier _index.php_ et remplacez le par `<?php get_footer(); ?>`
* Editez le fichier _footer.php_ et ajoutez la fonction Wordpress suivante juste avant la balise `</body>` qui va charger les fichiers JS ajoutés par les différents plugins :
 
         <?php wp_footer(); ?>