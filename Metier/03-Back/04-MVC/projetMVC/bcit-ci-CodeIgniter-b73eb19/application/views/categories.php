<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Listes des catégories</h1>
    <?php 
    foreach ($categories as $categorie) {
    ?>
    <div id="cat1" class="cat1">
        <a href=<?php echo site_url("/produits/listeProduits/".$categorie->cat_id) ?>>
            <h3><?php echo $categorie->cat_name; ?></h3>
        </a>
    </div>
    <?php 
    }
    ?>
</body>
</html>