<?php
/* --------------------------------------------------------
*  index.php 
*  -------------------------------------------------------- */

// require("classes/vehicules.class.php");
require("classes/voiture.class.php");
require("classes/moto.class.php");

$maVoiture = new Voiture();

$prixHt = 100000;

$prixTtc = $maVoiture->acheter($prixHt);

echo'La voiture coûte '.$prixTtc.' euros TTC, va falloir bosser dur !'; 

// Chaînage 




// Debug
// $maVoiture->debug();