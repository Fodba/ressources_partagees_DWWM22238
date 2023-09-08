## Portée des variables


Il existe en PHP trois portées possibles et donc trois types de variables :

* les variables **locales**
* les variables **globales**
* les variables **statiques**

### Variable globales et variables locales

En PHP, une variable déclarée en dehors d'une fonction est une variable **globale**

    <?php
    $x = 5;

    function testPortee() {
        // Utiliser $x dans la fonction génère une erreur
        echo "<p>La variable x à l'interieur de ma fonction vaut: ".$x."</p>";
    }

    testPortee();
    
    echo "<p>La variable x en dehors de ma fonction vaut: ".$x."</p>";
    
    ?>

Une variable déclarée dans une fonction a une portée locale et n'est accessible qu'à l'interieur de cette fonction.

    <?php
    function testPortee() {
        $x = 5; // portée locale de la variable
        echo "<p>La variable x à l'interieur de ma fonction vaut: ".$x."</p>";
    }

    testPortee();
    //  Utiliser $x en dehors de la fonction génère une erreur.
    echo "<p>La variable x en dehors de ma fonction vaut: ".$x."</p>";    
    ?>

### Le mot-clé global

Le mot-clé `global` est utilisé pour accéder à une variable globale depuis l'interieur d'une fonction. Pour ce faire, faites précéder la variable du mot clé `global` lors du premier appel au sein de la fonction.

    <?php
    $x = 5;
    $y = 10;

    function testPortee() {
        global $x, $y;
        $y = $x + $y;
    }

    myTest();
    echo $y; 
    ?> 

Sachez également que PHP stocke toutes les variables globales dans un tableau associatifs appelé `$GLOBALS`. Il s'uitlise comme suit: `$GLOBALS[index]` où index correspond au nom de la variable.

Ce tableau est également accessible depuis l'interieur des fonctions et peut être utilisé pour mettre à jour les variables globales directement. Ainsi, l'exemple précédent peut être réécrit comme suit:

    <?php
    $x = 5;
    $y = 10;

    function myTest() {
        $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
    }

    myTest();
    echo $y; 
    ?> 

### Le mot-clé `static`

En principe, lorsqu'une fonction a fini de s'executer, toutes ses variables sont détruites. Cependant, il peut arriver que nous voulions conserver la valeur d'une variable locale d'une execution de la fonction à l'autre et donc ne pas la détruire.

Pour ce faire, utilisez le mot-clé `static` :

    <?php
    function myTest() {
        static $x = 0;
        echo $x;
        $x++;
    }

    myTest();
    myTest();
    myTest();
    ?> 

A chaque appel de la fonction, la variable `$x` va s'incrémenter d'un et donc garder sa valeur pour la fois suivante. Malgré tout, la variable reste locale à la fonction (c'est-à-dire que l'utiliser en dehors de la fonction génèrera une erreur).

<div style="margin-bottom: 45px;"></div>