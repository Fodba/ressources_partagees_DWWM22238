# Wordpress - Gabarits

## Etape 11 : Découper le thème en blocs 

La navigation étant un élément présent sur toutes les pages d'un site, il faut stocker son code dans un fichier séparé que l'on va inclure dans tous les templates :

* Créer un fichier nommé _part_nav.php_ (par exemple) à la racine du thème
* Dans ce nouveau fichier, copier les lignes de code qui concernent la barre de navigation 
* Dans les autres templates, remplacer le code de barre de navigation par :
	     
        <?php get_template_part('part_nav'); ?

La fonction `get_template_part()` permet donc d'afficher des parties communes aux différents templates en passant en argument le nom du fichier PHP sans l'extension. 

> On peut renouveler cette opération pour différents blocs, à l'exception du header et footer qui bénéficient de fonctions d'appel dédiées (`get_header` et `get_footer`).  

<br><br><br><br>