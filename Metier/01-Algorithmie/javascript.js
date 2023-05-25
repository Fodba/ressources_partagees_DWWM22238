// variables
let maVariable = 0; // Déclaration ET assignation
const MACONSTANTE = "toto";


// Conditions
if (maVariable > 0 || MACONSTANTE == "toto"){
    console.log("Variable positive");
}
else if(maVariable == 0){
    console.log("Variable vaut 0");
}
else {
    console.log("Variable négative");
}

let age = 14;
switch(age){
    case 18:
        console.log("Vous avez 18 ans");
        break;
    case 14:
    case 15:
    case 16:
    case 17:
        console.log("Vous êtes mineur");
        break;
    default:
        console.log("Votre age n'est pas géré par la condition");
        break;
}

// Boucles
maVariable = 18;
while (maVariable < 18){ // La condition n'et pas vérifiée. On n'entre pas dans la boucle.
    console.log(maVariable);
    maVariable++;
}
console.log("**********************************")
maVariable = 18;
do {
    console.log(maVariable);
    maVariable++;
    maVariable = parseInt(maVariable);
} while(isNaN(maVariable)); // la condition est évaluée seulement après un tour de boucle. Donc que la condition soit vérifiée ou non, on aura au moins un tour.
console.log("**********************************")
for(let i = 10; i > 0; i--){
    console.log("Boucle for tour n°" + i);
}

// FONCTIONS
function maFonction(){
}

function maFonction2(parametre1,parametre2){
    console.log("paramètre 1: " + parametre1);
    console.log("paramètre 2: " + parametre2);
}
let variable1PourLesFonctions = true;
let jePrendsUneDeuxiemeVariablePourExpliquerLesFonctions = "Ceci est le 2e paramètre passé à la fonction";
maFonction2(variable1PourLesFonctions,jePrendsUneDeuxiemeVariablePourExpliquerLesFonctions);

function maFonction3(){
    return [1,2,3,4];
}

function prompt(messageAAfficher){
    let saisie;
    return saisie;
}
let variable = prompt("Entrez un nombre");
let message = "Entrez un mot";
variable = prompt(message);
