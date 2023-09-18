# CodeIgniter - Gestion du panier
 
## Etape 1 : Modification de la vue liste des produits

Dans la vue "liste des produits", ajouter le code suivant pour chaque produit (nouvelle colonne sur chaque ligne de tableau HTML) :  

	<?php 
    /* Pour chaque produit, on ouvre un formulaire qui appellera 
    * la méthode 'panier/ajouterPanier' 
    * ... oh oh oh! ça sent la boucle...  
    */
    echo form_open("panier/ajouterPanier"); 
    ?>
 
    <!-- champ visible pour indiquer la quantité à commander -->
    <input type="number" class="form-control" name="pro_qte" id="pro_qte" value="1">
    <input type="hidden" name="pro_prix" id="pro_prix" value="<?= $valeur->pro_prix ?>">
    <input type="hidden" name="pro_id" id="pro_id" value="<?= $valeur->pro_id ?>">
    <input type="hidden" name="pro_libelle" id="pro_libelle_<?= ?>" value="<?= $valeur->pro_libelle ?>">
    
    <!-- Bouton 'Ajouter au panier' -->
    <div class="form-group">
        <input type="submit" value="Ajouter au panier" class="btn btn-default btn-sm">            
    </div>
    </form>

## Etape 2 : création d'un contrôleur 'Panier' 

Créer un nouvau contrôleur nommé `Panier`.

Celui-ci requiert la librairie _session_, à charger dans _config/autoload.php_. 

## Etape 3 : ajouter un produit au panier 

Voyons maintenant la méthode qui va permettre d'ajouter des produits au panier, qui se trouve bien entendu dans le contrôleur `Panier` : 

	public function ajouter() 
    {
        // On récupère les données du formulaire 
        $aData = $this->input->post();  

        // Au 1er article ajouté, création du panier car il n'existe pas
        if ($this->session->panier == null) 
        {
            // On créé un tableau pour stocker les informations du produit  
            $aPanier = array();
                      
            // On ajoute les infos du produit ($aData) au tableau du panier ($aPanier) 
            array_push($aPanier, $aData);  

            // On stocke le panier dans une variable de session nommée 'panier'            
            $this->session->set_userdata("panier", $aPanier);
            
            // 
         }
         else
         { // le panier existe (on a déjà mis au moins un article) 

             // On récupère le contenu du panier en session           
             $aPanier = $this->session->panier;

             $pro_id = $this->input->post('pro_id');

             $bSortie = FALSE;
         
             // on cherche si le produit existe déjà dans le panier
             foreach ($aPanier as $produit) 
             {
                 if ($produit['pro_id'] == $pro_id)
                 {
                      $bSortie = TRUE;
                 }
             }
             
             if ($bSortie) 
             { // si le produit est déjà dans le panier, l'utilisateur est averti
                 echo '<div class="alert alert-danger">Ce produit est déjà dans le panier.</div>';

                 // On redirige sur la liste
                 redirect("produits/liste");
             }
             else 
             { // sinon, le produit est ajouté dans le panier
                array_push($aPanier, $aData);

                // On remet le tableau des produits dans le panier  
                $this->session->panier = $aPanier;
                $this->load->view('produits/liste', $aView);

                 // On redirige sur la liste
                 redirect("produits/liste");
             }
         }
    }

Tester que vos produits ont bien été ajoutés au panier.

## Etape 3 : Affichage du panier

### La vue 

Dans dans le répertoire _views/_, créer un fichier _panier.php_ et ajouter le code suivant (partie `<body>`) : 

	<h1>Mon panier</h1>
	
    <?php 
    // Si le panier n'existe pas encore  
    if ($this->session->panier != null) 
    { 
	?>
	    <div class="row">
	    <div class="col-12"> 
	    <table>
			<thead>
	    		<tr>
	    			<th>Produit</th>
	    			<th>Prix</th>
	    			<th>Quantité</th>
					<th>Prix total</th>
					<th>&nbsp;</th>	
                </tr>	
	    	</thead>
	    	<tbody>
			<?php 
	    	$iTotal = 0;
	    	
            /* ici, écrire le code pour afficher les produits mis dans le panier...
            * ... oh oh oh! ça sent la boucle...  
            * n'oubliez pas de calculer le total,
            * ni d'ajouter de mettre un champ de type number pour augmenter/diminuer la quantité d'un produit
            */
			?>
	    	</tbody>
	    </table>
	    </div>
		<div>
	        <div>
	            <h3>Récapitulatif</h3>
	            <div>
	                <p>TOTAL : <?= str_replace('.', ',' , $iTotal); ?> &euro;</p>
					<p href="<?= site_url("panier/supprimerPanier"); ?>" >Supprimer le panier</a></p> 
					<p><a href="<?= site_url("produits/liste"); ?>">Retour liste des produits</a></p>
	            </div>
	        </div>
		</div>
	    </div>
		<?php 
	    } 
	    else 
	    { 
       
		    ?>
		    <div class="alert alert-danger">Votre panier est vide. Pour le remplir, vous pouvez consulter <a href="<?= site_url("produits/liste"); ?>">la liste des produits</a>.</div>
		    <?php 
        } 

### Côté contrôleur

Dans le contrôleur `Panier`, ajoutons la méthode qui affichera la vue _panier.php_ : 

	public function afficherPanier()
    {
         $this->load->view('panier');
    }

Tester que le panier s'affiche bien. 

<!--
Revenons sur la vue _panier.php_ pour y inclure le code qui va nous permettre de modifier les quantités des produits

Inclure le code suivant entre les balises `tbody` :

	<?php 
    $iTotal = 0;
    
    foreach ($this->session->panier as $produit)
    { 
    ?>
    		<tr>
    		    <td><?= $produit['pro_libelle']; ?></td>
            	<td><?= str_replace('.', ',', $produit['pro_prix']); ?> &euro;</td>
            	<td>
            		<div class="panier_qte">
					<div class="panier_qte_valeur">
                    		<a href="<?= site_url('produits/qtemoins/'.$produit['pro_id']); ?>" type="button" role="button"> - </a>
							<?= $produit['pro_qte'] ?> 	
                    		<a href="<?= site_url('produits/qteplus/'.$produit['pro_id']); ?>" type="button" role="button">+</a>
                	</div>
                    </div> 
                </td>
            	<td><?= str_replace('.',',',($produit['pro_qte']*$produit['pro_prix'])); ?> &euro;</td>	
    		<td>
            	<?php 
					$iTotal += $produit['pro_qte'] * $produit['pro_prix']; ?>
					<a href="<?= site_url('panier/supprimerProduit/'.$produit['pro_id']); ?>">Suppimer</a>			
    </td>
    </tr>
    <?php
    }
    ?>	
-->

## Modifier la quantité d'un produit 

Ajoutons au contrôleur `Panier` une méthode qui va permettre de modifier (augmenter ou diminuer) la quantité d'un produit. 

	public function modifierQuantite($pro_id)
    {
        $aPanier = $this->session->panier;

        $aTemp = array(); //création d'un tableau temporaire vide

        // On parcourt le tableau produit après produit
        for ($i = 0; $i < count($aPanier); $i++) 
        {
            if ($aPanier[$i]['pro_id'] !== $pro_id)
            {
                array_push($aTemp, $aPanier[$i]);
            }
            else
            {
                $aPanier[$i]['pro_qte']++;
                array_push($aTemp, $aPanier[$i]);
            }
        }

        $aPanier = $aTemp;
        unset($aTemp);
        $this->session->set_userdata("panier", $aPanier);

        // On réaffiche le panier 
        redirect("panier/afficherPanier");
    }

<!--
Ecrivez vous-même la méthode `qtemoins()` selon le même principe.
-->

## Supprimer un produit du panier 

Ajoutons au contrôleur `Panier` la méthode `supprimerProduit()` pour retirer un produit du panier. 

	public function supprimerProduit($pro_id)
    {
        $aPanier = $this->session->panier;

        $aTemp = array(); //création d'un tableau temporaire vide
        
        for ($i=0; $i<count($tab); $i++) //on cherche dans le panier les produits à ne pas supprimer
        {
            if ($tab[$i]['pro_id'] !== $pro_id)
            {
                 array_push($aTemp, $aPanier[$i]); // ces produits sont ajoutés dans le tableau temporaire
            }
        }
        
       $aPanier = $aTemp;
       unset($aTemp);
       $this->session->panier = $aPanier; // le panier prend la valeur du tableau temporaire et ne contient donc plus le produit à supprimer
       
       // On réaffiche le panier 
       redirect("panier/afficherPanier");
    }
    
Tester que cela fonctionne.

Tester que tout fonctionne correctement en adaptant les urls.

## Un peu d'ergonomie

On pourrait améliorer l'expérience client (UX) en informant en permanence celui-ci du nombre de produits qu'il a ajouté dans son panier. 

Dans la vue "liste des produits", ajouter une icône type panier/caddie avec un compteur des produits ajoutés.

Pour vous aider :

* [FontAwesome](https://fontawesome.com) et [cette page](https://fontawesome.com/icons?d=gallery&q=cart)
* [Badges Bootstrap](https://getbootstrap.com/docs/4.4/components/badge)