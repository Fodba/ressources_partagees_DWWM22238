function saisieUtilisateur(message){
    let saisie = prompt(message);
    return saisie;
}

function saisieNumerique(message){
    let saisie = saisieUtilisateur(message);
    saisie = parseInt(saisie);
    return saisie;
}

function demanderNombre(quantiteADemander){
    const tableauDeNombre = [];
    let saisie;
    for (var i = 0; i < quantiteADemander; i++) {
        do{
            saisie = saisieNumerique("Veuillez entrez un nombre");
            console.log(saisie);
            if(isNaN(saisie)){
                prompt("Votre saisie n'est pas un nombre");
            }
            else{
                tableauDeNombre.push(saisie);
                console.log("La valeur saisie est un nombre");
            }
        } while(isNaN(saisie));
    }
    return tableauDeNombre;
}

function indexMax(pTableau){
    let max = 0;
    let index = 0;
    for (let i = 0; i < pTableau.length; i++) {
        if (pTableau[i] > max) 
        {
            max = pTableau[i];
            index = i;
        }
    }
    return index;
}

function minimum(pTableau){
    let min = 10000000000;
    for (let i = 0; i < pTableau.length; i++) {
        if (pTableau[i] < min) 
        {
            min = pTableau[i];
        }
    }
    return min;
}

function moyenne(pTableau){
    let resultat = 0;
    for (let i = 0; i < pTableau.length; i++) {
        resultat += pTableau[i];
    }
    resultat /= pTableau.length;
    return resultat;
}




function trier(pTableau){
    let temp;
    const tableau = pTableau.slice(0);
    for(var i = 0; i < tableau.length; i++) {
        for(var j = 0;  j < tableau.length; j++){
            if(tableau[j] > tableau[i]){
                temp = tableau[i];
                tableau[i] = tableau[j];
                tableau[j] = temp;
            }
        }
    }
    return tableau;
}


function saisieMots(pNombreDeMots){
    const tableauDeMots = [];
    let saisie;
    for (var i = 0; i < pNombreDeMots; i++) {
        do{
            saisie = saisieUtilisateur("Veuillez entrez un mot");
            console.log(saisie);
            if(!isNaN(saisie)){
                prompt("Votre saisie n'est pas un mot");
            }
            else{
                tableauDeMots.push(saisie);
            }
        } while(!isNaN(saisie));
    }
    return tableauDeMots;
}
function saisieMotsVoyelles(pNombreDeMots){
    const tableauDeMots = [];
    let saisie;
    for (var i = 0; i < pNombreDeMots; i++) {
        do{
            saisie = saisieUtilisateur("Veuillez entrez un mot");
            console.log(saisie);
            if(!isNaN(saisie)){
                alert("Votre saisie n'est pas un mot");
            }
            else if(compterVoyelles(saisie) == 0){
                alert("Votre saisie doit contenir au moins une voyelle");
            }
            else{
                tableauDeMots.push(saisie);
            }
        } while(!isNaN(saisie));
    }
    return tableauDeMots;
}

function compterVoyelles(pTableauDeMots){
    const voyelles = ["a","e","i","o","u","y","ä","à","é","è","â","ê","û","î"]; //liste des voyelles incomplète.
    let compteur = 0;
    for(var i = 0; i < pTableauDeMots.length; i++) {
        for(var j = 0; j < pTableauDeMots[i].length; j++) {
            if(voyelles.indexOf(pTableauDeMots[i][j]) != -1){
                compteur++;
            }
        }
    }
    return compteur;
}

function motsSansVoyelles(pTableau){
    const voyelles = ["a","e","i","o","u","y","ä","à","é","è","â","ê","û","î"]; //liste des voyelles incomplète.
    let compteur;
    const tabDeMots = [];
    for(var i = 0; i < pTableau.length; i++) {
        compteur = 0;
        for(var j = 0; j < pTableau[i].length; j++) {
            if(voyelles.indexOf(pTableau[i][j]) != -1){
                compteur++;
            }
        }
        if(compteur == 0){
            tabDeMots.push(pTableau[i]);
        }
    }
    return tabDeMots;
}