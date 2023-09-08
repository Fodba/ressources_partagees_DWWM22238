# Visibilité 

La visibilité d'une propriété, d'une méthode ou (à partir de PHP 7.1.0) une constante peut être définie en préfixant sa déclaration avec un mot - clé: public, protected, ou private.Les éléments déclarés comme publics sont accessibles partout.

L'accès aux éléments protégés est limité à la classe elle-même, ainsi qu'aux classes qui en héritent et parente. L'accès aux éléments privés est uniquement réservé à la classe qui les a définis.

## Visibilité des propriétés

Les propriétés des classes doivent être définies comme publiques, protégées ou privées.

Si une propriété est déclarée en utilisant var, elle sera alors définie comme publique.

* `public`: ce mot-clé placé avant la déclaration d'une propriété ou d'une méthode, signifie que cette propriété (ou cette méthode) sera visible et utilisable partout.
* `protected`: ce mot-clé signifie que la propriété ne sera visible que depuis la classe qui la défini ou depuis l'une de ses classes filles (les classes qui héritent d'elle).
* `private`: ce mot-clé signifie que cette propriété ne sera visible et utilisable que depuis la classe elle-même.



        /**
        * Définition de MyClass
        */
        
        class MyClass
        {
           public $public = 'Public';
           protected $protected = 'Protected';
           private $private = 'Private';

           function printHello()
           {
               echo $this->public;
               echo $this->protected;
               echo $this->private;
           }

         } // -- fin de la classe MyClass

         $obj = new MyClass();
    
         echo $obj->public; // Fonctionne
         echo $obj->protected; // Erreur fatale
         echo $obj->private; // Erreur fatale
         
         $obj->printHello(); // Affiche Public, Protected et Private

         /**
         * Définition de MyClass2
         */
    
         class MyClass2 extends MyClass
         {
             // On peut redéclarer les propriétés publics ou protégés, mais pas ceux privés
             public $public = 'Public2';
             protected $protected = 'Protected2';

             function printHello()
             {
                echo $this->public;
                echo $this->protected;
                echo $this->private;
             }
         } // -- fin de la classe MyClass2()

         $obj2 = new MyClass2();
         echo $obj2->public; // Fonctionne
         echo $obj2->protected; // Erreur fatale
         echo $obj2->private; // Indéfini
         
         $obj2->printHello(); // Affiche Public2, Protected2 et Undefined (Indéfini)

<br><br><br><br>