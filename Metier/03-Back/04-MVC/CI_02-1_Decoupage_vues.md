# CodeIgniter - 02-1 - Découpage des vues

<div class="alert alert-info">Les exemples de ce cours peuvent contenir des bugs, à vous de les corriger !</div>

Pour améliorer vos vues, il est bien sûr possible de les découper en blocs réutilisables comme fait en PHP natif avec la focntion `include()`, par exemple avoir les parties header et footer dans des fichiers séparés pour qu'ils soient communs à l'ensemble de vos pages.

Dans le répertoire _views/_, créez les fichiers _header.php_ puis _footer.php_ et y copiez-y le code des parties concernées. Supprimez ces parties de code de votre vue principale (par exemple de _liste.php_).

Dans les méthodes de contrôleurs, par exemple la méthode `liste()` du contrôleur `Produits`, ajoutez le chargement de vos 2 nouvelles vues _header.php_ et _footer.php_ à l'aide de `$this->load->view()` :

**Exemple 1**

	public function liste() {
        
        // CODE EXISTANT : requêtes, tableau à passer aux vues        

        // Appel des différents morceaux de vues
        $this->load->view('header');
        $this->load->view('liste', $aView);
        $this->load->view('footer");
    }   

<div class="alert alert-danger">Attention, les vues doivent être chargées dans l'ordre de leur affichage (ici header > liste > footer).</div>

**Exemple 2**

Le problème avec l'exemple 1, c'est que l'on transmet un tableau de variables que pour la vue _liste_, or on pourrait avoir à transmettre des variables aux autres vues, par exemple à _header_. La solution est simple, il suffit de passer un tableau différent à chaque vue, chacun des tableaux ne contenant que les variables dont une vue a besoin :

> Comme d'habitude, on nomme les variables de façon pertinente : `$aViewHeader`, `$aViewListe` par exemple.

    public function liste() {
        
        // CODE EXISTANT : requêtes etc.        

        /* Un premier tableau à passer au morceau de vue 'header',
        * celui-ci contient une valeur pour la balise <title> de la page
        */ 
        $aViewHeader = ["title" => "Liste des produits"];
        
        /* Un second tableau à passer au morceau de vue 'liste'
        * celui-ci contient la liste des produits (résultats de requête SQL) 
        */
        $aViewListe = ["aProduits" => $aProduits]; 
 
        // Appel des différents morceaux de vues
        $this->load->view('header', $aViewFooter);
        $this->load->view('liste', $aViewListe);

        /* On pourrait très bien avoir des variables à passer au morceau de vue 'footer', 
        * mais, juste pour vous embêter, ce n'est pas le cas dans cet exemple ! 
        */
        $this->load->view('footer');
    }   

<br><br><br><br>  


       

