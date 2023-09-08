# Les attributs (ou propriétés)

Une classe PHP est constituée en deux types d'informations distinctes :

• les attributs,  
• les méthodes.

**Les attributs sont les données** qui différencient un objet d'un autre. Ils peuvent servir à déterminer l'aspect, l'état et d'autres qualités d'un objet appartenant à une classe. **Dans une classe les attributs sont définis par des variables.** Ces "variables" pourront prendre une valeur différente pour chaque objet et évoluer dans le temps.

## Propriétés d'instance

Nous avons indiqué qu'un animal pouvait se définir par ses caractéristiques. En P.O.O, on appelle ces caractéristiques des **propriétés** et elles sont représentées par des variables (le terme **propriété** permet de les distinguer des variables classiques qui n'appartiennent à aucune classe)

Ajoutons donc des propriétés à notre classe:

    class Animal
    {
        public $_espece;
        public $_regimeAlimentaire;
        public $_taille;
        public $_poids;
    }

La déclaration d'une propriété ressemble en tout point à la déclaration d'une variable classique. 

Notez le mot clé `public` au début de chaque déclaration. Il permet de définir la **portée** de la propriété. Dans notre cas, cela signifie que cette propriété peut être utilisée depuis l'intérieur de la classe (c'est à dire entre les acolades qui délimitent la définition de la classe) mais également depuis l'exterieur de la classe. (pour en apprendre plus, consultez la ressource sur [la portée des variables](scope.html))

Nous allons maintenant voir comment initialiser ces propriétés.

Commençons par créer un animal :

    $oChien = new Animal()

Notre objet chien nouvellement créé possède donc une propriété :

* `$_espece`
* `$_regimeAlimentaire`
* `$_taille`
* et `$_poids`

Initialisons maintenant ces propriétés :

    $chien->_espece = "Chien";
    $chien->_regimeAlimentaire = "Carnivore";
    $chien->_taille = 110;
    $chien->_poids = 16000;

Pour accéder à une propriété d'un objet, on utilise le symbole `->` (appelé **opérateur objet**) accolé au nom de l'objet et suivi du nom de la  propriété.

## Propriétés de classe

Les **propriétés de classe** sont différentes des propriétés d'instance en cela qu'elles n'existent qu'en un seul exemplaire.

Nous avions vu que chaque objet possède en quelque sorte ses propres exemplaires des attributs et des méthodes définis dans la classe, c'est-à- dire que pour chaque objet, ces propriétés auront des valeurs différentes.
Pour une propriété de classe, c'est l'inverse. Il s'agit d'une propriété dont la valeur sera partagée par tous les objets d'une même classe.

Il faut tout de même prendre en compte certaines conventions que les développeurs ont adoptées afin de clarifier le code.

<div style="margin-bottom: 45px;"></div>