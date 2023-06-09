const pions = ["Rouge","Vert","Bleu","Jaune","Orange","Violet","Noir","Blanc"];

function initPartie(message = true){
    let jeu = document.getElementById("jeu");
    jeu.innerHTML = "";
    // Création de la zone combinaison à trouver
    let combinaison = document.createElement("section");
    combinaison.setAttribute("id", "combinaison");
    const combiItems = [];
    for (let i = 0; i < longueurCombinaison; i++){
        let combiItem = document.createElement("div");
        combiItem.setAttribute("id","pion" + i);
        combiItem.setAttribute("class","combiItem pionCombi");
        combinaison.appendChild(combiItem);
    }
    jeu.appendChild(combinaison);

    // Création de la première ligne
    let ligne = document.createElement("section");
    ligne.setAttribute("id", "ligneActive");
    ligne.setAttribute("class", "line");

    let plateau = document.createElement("section");
    plateau.setAttribute("class", "plateau");
    for (let i = 0; i < longueurCombinaison; i++){
        let propoItem = document.createElement("div");
        if(message)
            propoItem.setAttribute("class","propoItem pionVierge");
        else
            propoItem.setAttribute("class","propoItem pionHorsPartie");
        plateau.appendChild(propoItem);
    }
    ligne.appendChild(plateau);

    let result = document.createElement("section");
    result.setAttribute("class", "result");
    for (let i = 0; i < longueurCombinaison; i++){
        let propoItem = document.createElement("div");
        propoItem.setAttribute("class","resultItem");
        propoItem.setAttribute("id","result" + i);
        result.appendChild(propoItem);
    }
    ligne.appendChild(result);


    let boutonVerif = document.createElement("button");
    boutonVerif.setAttribute("class", "verification");
    boutonVerif.setAttribute("id", "boutonVerification");
    boutonVerif.setAttribute("disabled", "true");
    boutonVerif.innerText = "Vérifier";

    ligne.appendChild(boutonVerif);

    jeu.appendChild(ligne);

    if(message){
        alert("Bienvenu au jeu du Mastermind\nVous avez 10 tentatives pour trouver la bonne combinaison!");
        boutonVerif.addEventListener("click",verifCombi);
        boutonVerif.removeAttribute("disabled");
    }
}

function setEssai(pValue){
    let essai = document.getElementById("essais");
    essai.innerText = pValue;
}

function genererCombinaison(pTailleCombinaison = 4){
    let combinaison = [];
    for (let i = 0; i < pTailleCombinaison; i++){
        combinaison.push(pions[Math.floor(Math.random()*pions.length)]);
    }
    return combinaison;
}

function revelerCombinaison(pCombinaison){
    for(let i = 0; i < pCombinaison.length; i++) {
        let id = "pion" + i;
        let pion = document.getElementById(id);
        let classe = "propoItem pion" + pCombinaison[i];;
        pion.setAttribute("class", classe);
    }
}


function verifierBienPlaces(pCombinaisons,pPropositions) { 
    let eBienPlaces = 0;
    console.log(pCombinaisons);
    console.log(pPropositions);
    for (var i = 0; i < pPropositions.length; i++) {
        if (pPropositions[i] == pCombinaisons[i]){
            eBienPlaces++;
            pCombinaisons[i] = "OK";
            pPropositions[i] = "OK";
        }
    }
    console.log(pCombinaisons);
    console.log(pPropositions);
    return eBienPlaces;
}

function verifierMalPlaces(pCombinaisons,pPropositions) {
    let eMalPlaces = 0;
    console.log(pCombinaisons);
    console.log(pPropositions);
    for (var i = 0; i < pPropositions.length; i++) {
        if(pPropositions[i] != "OK")
            if (pCombinaisons.indexOf(pPropositions[i]) != -1){
                eMalPlaces++;
                let eIndex = pCombinaisons.indexOf(pPropositions[i]);
                pCombinaisons[eIndex] = "MalPlaces";
                pPropositions[i] = "MalPlaces";
            }
    }
    console.log(pCombinaisons);
    console.log(pPropositions);
    return eMalPlaces;
}

function verification(pCombinaison,pProposition){
    let comb = pCombinaison.slice();
    let prop = pProposition.slice();
    let eBienPlaces = verifierBienPlaces(comb,prop);
    let eMalPlaces = verifierMalPlaces(comb,prop);
    console.log(eBienPlaces);
    console.log(eMalPlaces);
    return [eBienPlaces,eMalPlaces];
}

function initLigneActive(){
    let ligneActive = document.getElementById("ligneActive");
    let propoItems = ligneActive.querySelectorAll(".propoItem");
    let resultItem = ligneActive.querySelectorAll(".resultItem");
    let bouton = ligneActive.querySelector(".verification");
    let counter = 0;
    propoItems.forEach(function(propoItem){
        propoItem.setAttribute("class","propoItem pionVierge");
    });
    resultItem.forEach(function(resultItem){
        resultItem.setAttribute("class","resultItem");
        resultItem.setAttribute("id","result" + counter);
        counter++;
    });
    console.log(bouton);
    bouton.setAttribute("id","boutonVerification");
    bouton.removeAttribute("disabled");
}