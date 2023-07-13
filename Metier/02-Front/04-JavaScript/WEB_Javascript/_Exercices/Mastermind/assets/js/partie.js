// alert("test du jeu mastermind");

var combinaisonDeJeu = [];
var nombreEssai = 0;
var longueurCombinaison = 4;
var partieEnCours = false;
initPartie(false);
setEssai(nombreEssai);

function demarrerPartie(){
    if(!partieEnCours){
        partieEnCours = true;
        initPartie();
        nombreEssai = 10;
        setEssai(nombreEssai);
        combinaisonDeJeu = genererCombinaison(longueurCombinaison);
        initLigneActive(); 

        // revelerCombinaison(combinaisonDeJeu);

        let ligneActive = document.getElementById("ligneActive");
        let propoItems = ligneActive.querySelectorAll(".propoItem");
        propoItems.forEach(function(pion){
            pion.addEventListener("dragover",dragOverPion);
            pion.addEventListener("drop",dropPion);
        });
    }
    else{
        alert("Vous devez terminer ou annuler cette partie pour pouvoir en démarrer une nouvelle!");
    }
}

function annulerPartie(){
    let reponse = confirm("Voulez-vous vraiment arréter la partie?");
    console.log(reponse);
    if (reponse == true){
        partieEnCours = false;
        nombreEssai = 0;
        setEssai(nombreEssai);
        initPartie(false);
    }
}

document.addEventListener('click',verifTarget);


// demarrerPartie();

let boutonDemarrer = document.getElementById("demarrer");
boutonDemarrer.addEventListener("click", demarrerPartie);

let boutonAnnuler = document.getElementById("annuler");
boutonAnnuler.addEventListener("click", annulerPartie);


let pionItems = document.querySelectorAll(".pionItem");
pionItems.forEach(function(pion){
    pion.addEventListener("dragstart",dragPion);
});


// TODO: Remplacer le drag'n'drop pour la version mobile
// TODO: Ajouter des commentaires