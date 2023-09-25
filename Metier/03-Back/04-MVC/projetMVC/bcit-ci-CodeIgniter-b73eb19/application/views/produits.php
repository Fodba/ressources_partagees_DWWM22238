
    <h1>Listes des produits de la catégorie "<?= $categorie->cat_name ?>".</h1>
    <?php 
    foreach ($produits as $produit) {
    ?>
    <div id="pro<?= $produit->pro_id ?>" class="pro_card">
        <a href=<?php echo site_url("/produits/article/".$produit->pro_id)  /* équivaut à site_url()."/produits/article/".$produit->pro_id */ ?>>
            <h3><?= $produit->pro_name; ?></h3>
        </a>
        <p><?= $produit->pro_desc ?></p>
        <p><?= $produit->pro_price ?></p>
    </div>
    <?php 
    }

    // ! Attention! La méthode "article" n'existe pas dans le controlleur produit. Le lien n'est donc pas fonctionnel
    ?>
    