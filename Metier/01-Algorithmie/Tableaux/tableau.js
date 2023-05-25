// Ces 2 fonctions vont nous servir à récupérer les saisies de l'utilisateur

function saisieUtilisateur(pMessage){
    let saisie;
    saisie = prompt(pMessage);
    return saisie;
}

function saisieNumerique(pMessage){
    let saisie = saisieUtilisateur(pMessage);
    // conversion de la saisie en nombre
    saisie = parseInt(saisie);
    return saisie;
}


console.log('=============== Exercice 1 =================');
/*
Soit le tableau suivant:

var semaine = [ 'lun', 'mra', 'mer', 'jeu', 'ven', 'sam', 'ddi' ];

1. Retirer le dernière valeur du tableau jours
2. Afficher les valeurs du tableau en utilisant la méthode console.log
3. Ajouter la valeur ‘dim’ à la fin du tableau
4. Remplacer la valeur ‘mra’ par ‘mar’
5. Afficher le nombre de valeurs du tableau en utilisant la méthode document.write
6. Afficher la troisième valeur du tableau
*/

// On utilise le mot-clé `const` lorsqu'on déclare et assigne un tableau
// Cela évite que l'on puisse réassigner le tableau par la suite (semaine = ... devient impossible plus tard)
const semaine = ['lun', 'mra', 'mer', 'jeu', 'ven', 'sam', 'ddi'];

console.log('=============== 1 =================');
// La méthode pop() permet de retourner le dernier élément d'un tableau en le retirant du tableau
let elementRetire = semaine.pop();
console.log(elementRetire); // l'assignation puis le console.log() nous permettent de vérifier l'élément qui a été retiré


console.log('=============== 2 =================');
console.log(semaine); // On demande à afficher directement le tableau
// ou on boucle sur le tableau pour afficher chaque valeur individuellement.
for (let i = 0; i < semaine.length; i++){
    console.log(semaine[i]);
}

console.log('=============== 3 =================');
// La méthode push permet d'ajouter à la fin du tableau l'élément passé en paramètre
semaine.push("dim");
console.log(semaine); // simple vérification.

console.log('=============== 4 =================');
let indexDeModification = semaine.indexOf("mra"); // Récupération de l'index à partir duquel modifier le tableau
let nombreDElementASupprimer = 1;
let elementAIntegrer = "mar";
semaine.splice(indexDeModification,nombreDElementASupprimer,elementAIntegrer);
console.log(semaine); // simple vérification.


console.log('=============== 5 =================');
let nombreDeValeurDuTableau = semaine.length;
console.log("le tableau de jours compte " + nombreDeValeurDuTableau + " valeurs.");


console.log('=============== 6 =================');
let indexDuTroisiemeElement = 2; // les indices des tableaux commençant à 0, la 3ème valeur aura l'indice 2.
console.log("La troisième valeur du tableau est '" + semaine[indexDuTroisiemeElement] + "'.");





console.log('=============== Exercice 2 =================');
/* Soit le tableau suivant:

var fruits = [ 'Mangue', 'Raisin', 'Figue', 'Kiwi' ];

Écrire un programme qui:

1. Affiche la liste de fruits disponibles;
2. Demande au client quel fruit il désire acheter:
s’il est présent dans le tableau fruits: le retirer du tableau, et afficher ‘ok!’,
sinon, afficher ‘indisponible…’.
3. Affiche à nouveau la liste de fruits disponibles.
 */
const fruits = ['Mangue', 'Raisin', 'Figue', 'Kiwi'];


console.log('=============== 1 =================');
console.log("Les fruits disponibles sont : " + fruits);
// Ou alors
let texteAAfficher = "Les fruits disponibles sont : \n";
for (let i = 0; i < fruits.length; i++){
    texteAAfficher += fruits[i] + "\n";
}
console.log(texteAAfficher);


console.log('=============== 2 =================');
let fruitARetirer = saisieUtilisateur("Quel fruit désirez-vous acheter? (" + fruits + ")");
let indexARetirer = fruits.length + 1; // valeur supérieur à la taille du tableau pour qu'il n'affecte pas le tableau dans le cas ou le fruit recherché n'y figure pas.
for (let i = 0; i < fruits.length; i++) { // On parcourt le tableau des fruits
    if (fruitARetirer.toLowerCase() == fruits[i].toLowerCase()) { // On met le fruit demandé et le fruit du tableau en minuscule (ou eventuellement en majuscule) pour les comparer car JavaScript est sensible à la casse.
        indexARetirer = i; // nouvelle valeur de l'indice si le fruit est trouvé
    }
}
fruits.splice(indexARetirer,1); // On retire l'élément à l'index voulu
console.log(fruits);


console.log('=============== 3 =================');
console.log("Les fruits disponibles sont : " + fruits);
// Ou alors
texteAAfficher = "Les fruits disponibles sont : \n";
for (let i = 0; i < fruits.length; i++){
    texteAAfficher += fruits[i] + "\n";
}
console.log(texteAAfficher);



console.log('=============== Exercice 3 =================');
/* 1. Ecrire un programme qui demande à l’utilisateur de saisir 7 nombres entiers comprises entre 9 et 99, puis une fois la saisie terminée, les affiche.
2. Le programme doit redemander la saisie en cas d’erreur sans compter cet étape
3. Le programme permet à l’utilisateur de voir le numéro du nombre à saisir de la manière suivante:
4. Le programme affiche les nombres des entiers pairs , le nombre des entiers impairs saisis et le nombre des itérations fausses
5. Le programme affiche le tableau des nombres pairs et le tableau des nombres impairs saisis
 */
console.log('=============== 1 =================');
console.log('=============== 2 =================');
console.log('=============== 3 =================');
const tNombres = [];
let faussesIterations = 0;
for (let i = 0; i < 7; i++) {
    let valeur;
    let bIterationOk = false;
    do{
        valeur = saisieNumerique("Veuillez entrer le nombre n° " + (i + 1) + " (entre 9 et 99)");
        if(valeur < 9 || valeur > 99 || isNaN(valeur)){
            faussesIterations++; 
        }
        else{
            bIterationOk = true;
            tNombres.push(valeur);
        }
    } while(!bIterationOk); // Controle des saisies
}
console.log(tNombres);
console.log('=============== 4 =================');
let nombreDePairs = 0;
let nombreDImpairs = 0;
for (let i = 0; i < tNombres.length; i++) {
    if (tNombres[i] %2 == 0) {
        nombreDePairs++;
    }
    else{
        nombreDImpairs++;
    }
}
console.log("Le nombre d'entiers pairs saisis est de " + nombreDePairs + ".");
console.log("Le nombre d'entiers impairs saisis est de " + nombreDImpairs + ".");
console.log("Le nombre de fausses itérations est de " + faussesIterations + ".");
console.log('=============== 5 =================');
const tPairs = [];
const tImpairs = [];
for (let i = 0; i < tNombres.length; i++) {
    if (tNombres[i] %2 == 0) {
        tPairs.push(tNombres[i]);
    }
    else{
        tImpairs.push(tNombres[i]);
    }
}
console.log("Le tableau des entiers pairs saisis " + tPairs + ".");
console.log("Le tableau des entiers impairs saisis " + tImpairs + ".");


// Exercice 4

/* Écrire un script en javascript pour réaliser un petit jeu “Deviner un nombre”.
Le principe de ce jeu est le suivant :
> l’ordinateur choisit un nombre aléatoire entre 10 et 100.
Le but est de deviner ce nombre, qui sera saisit dans une zone de texte.
À chaque fois qu’on propose un nombre, on indique si le nombre à deviner est plus petit ou plus grand que celui-ci.
Le nombre d’essai autorisé est de 10, l’utilisateur est averti pour chaque essai concernant le nombre d’essai restant
Quand l’utilisateur gagne, on affiche le nombre de coups qu’il lui a fallu
 */
console.log('=============== Exercice 4 =================');

let nombreADeviner = 0;
let nombreDeChances = 10;
let mini = 10;
let maxi = 100;
let saisie;
let aGagne = false;
let rejouer, continuer;

do{
    continuer = false;

    nombreADeviner = Math.floor(Math.random() * (maxi - mini + 1) + mini);
    console.log(nombreADeviner);

    for (let i = nombreDeChances; i > 0; i--) {
        if(i == 1){
            alert("Attention, C'est votre dernière tentative");
        }
        else{
            alert(`Il vous reste ${i} tentatives`);
        }

        let estCorrect;
        do{
            estCorrect = true;
            saisie = saisieNumerique("Devinez le nombre mystère:");
            if(isNaN(saisie)){
                alert("Veuillez entrer un nombre");
                estCorrect = false;
            }
            else if(saisie < 10 || saisie > 100){
                alert("Veuillez entrer un nombre entre 10 et 100");
                estCorrect = false;
            }
        }while(!estCorrect);

        if(saisie < nombreADeviner) { 
            alert("Le nombre à deviner est plus grand");
        }
        else if(saisie > nombreADeviner){
            alert("Le nombre à deviner est plus petit");
        }
        else{
            alert("Bravo, vous avez trouvé le nombre: ", nombreADeviner);
            aGagne = true;
            break;
        }
    }

    if (!aGagne){
        rejouer = saisieUtilisateur("Vous n'avez pas gagné cette fois-ci.\nVoulez-vous rejouer? (O/N)")
    }
    else{
        rejouer = saisieUtilisateur("Voulez-vous rejouer? (O/N)")
    }
    
    if(rejouer.toLowerCase() == "o"){
        continuer = true;
    }
} while(continuer);
