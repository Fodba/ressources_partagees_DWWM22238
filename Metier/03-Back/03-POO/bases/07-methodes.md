# Les méthodes

Les méthodes d'instance en PHP fonctionnent de la même manière que les fonctions que vous avez déjà déclarées. La seule différence est qu'une méthode appartient forcément à une classe. L'appel à la méthode est donc différent de l'appel classique à une fonction.


Après les déclarations d'attributs et de constantes, on trouve des fonctions, qui, dans une classe, sont appelées **méthodes**. Celles-ci ont un comportement similaire aux fonctions standard (traitement d'opération, réception d'arguments et retour de variables).     

**Exemple**

    <?php
    class Voiture
    {
        public $_marque;
        public $_puissanceFiscale;
        public $_vitesseMax;
        protected $_vitesseCourante;

        public function demarrer()
        {
            echo "je démarre.<br>";
        }

        public function avancer(int $nbKm)
        {
            echo "la voiture avance de ".$nbKm." kilomètres.<br>";
        }
    } // -- fin de la classe Voiture

    // Il nous faut d'abord instancier un objet de la classe
    $oVoiture = new Voiture();

    // Ensuite seulement on peut appeler les méthodes en passant par l'objet nouvellement créé.
    $oVoiture->demarrer();
    $oVoiture->avancer(50);

Comme on peut le voir, l'appel à un attribut de la classe au sein d'une méthode n'a pas besoin de recevoir l'attribut en argument.   

> Comme pour les attributs, les méthodes ont une visibilité qui ont les mêmes valeurs `public`, `private` et `protected` et le même fonctionnement que pour les attributs. En général, les méthodes sont publiques sinon elles ne pourraient pas être appellées par le reste de l'application, mais certains cas peuvent nécessiter une visibilité privée ou protégée.     

<br><br><br><br>