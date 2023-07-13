/*
Prefixe à utiliser pour le nommage des variables en fonction de leur type
b pour une variable booléenne
s pour une variable string
i pour une variable int (entier)
f pour une variable float (nombre décimal)
a pour une variable array (tableau)
*/

// Controler la saisie de l'utilisateur
// !!! Attention! Lorsque l'on passe un tableau en paramètre à une fonction, ce n'est pas une copie de ce que contient le tableau qui est envoyé à la fonction mais bien le tableau lui même (contrairement aux variables). Toute modification apportée au tableau DANS la fonction sera répércuté sur le tableau EN DEHORS de la fonction. 

/*
1- L'ordinateur créé une combinaison de 4 chiffres.
2- Afficher le nombre d'essais autorisés pour trouver la combinaison
3- Demander à l'utilisateur de rentrer une combinaison (en précisant le nombre d'essais restants)
4- Vérifie la saisie:
    4.1- Si la saisie est incorrecte, redemander de rentre une combinaison sans le comptabiliser comme une tentative
    4.2- Sinon poursuivre
5- Afficher le nombre d'essais restants pour trouver la combinaison
6- On vérifie les éléments de la proposition qui sont bien placés (valeurs hors-limite)
7- On vérifie les éléments de la proposition qui sont mal placés
8- Afficher au joueur le resultat
9- Retirer un essai
10- On vérifie le résultat:
    10.1- Si le nombre d'essais autorisés à été atteint, la partie est perdue. On affiche la combinaison qu'il fallait trouver.
    10.2- Si le nombre d'éléments bien placés est égale à la longueur de la combianison, la partie est gagnée. On affiche la combinaison qu'il fallait trouver.
    10.3- Sinon, dans tous les autres cas, on revient à l'étape 3
*/


// Permet de récupérer la saisie de l'utilisateur
function saisirTexte(pMessage){
    let sSaisie;
    sSaisie = prompt(pMessage);
    return sSaisie;
}

// Permet de récupérer la saisie de l'utilisateur converti en nombre. 
function SaisirValeurNumerique(pMessage){
    let sSaisie = saisirTexte(pMessage);
    // conversion de la saisie en nombre
    sSaisie = parseInt(sSaisie);
    return sSaisie;
}

// Permet de demander à l'utilisateur s'il veut refaire une partie.
function continuerPartie(){
    let sChoixUtilisateur = saisirTexte("Voules-vous refaire une partie? O/N");
    if (sChoixUtilisateur.toLowerCase() == "o"){
        return true;
    }
    else {
        return false;
    }
}

// Renvoie un tableau de 4 nombres aléatoires compris entre min et max
function genererCombinaisonAleatoire(pMin, pMax) {
    const tab = [];
    for (let i = 0; i < 4; i++) {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * (pMax - pMin + 1) + pMin);
        } while (tab.includes(randomNumber));
        tab[i] = randomNumber;
        console.log(tab[i]);
    }
    return tab;
}

function saisirCombinaison(){
    let tPropositions = [];
    for (let i = 0; i < 4; i++) {
        let eNombre;
        do{
            eNombre = SaisirValeurNumerique("Entrez le nombre " + (i + 1) + " de votre proposition (compris entre 1 et 4)");
        } while (eNombre < 1 || eNombre > 4 || isNaN(eNombre));
        tPropositions.push(eNombre);
    }
    return tPropositions;
}

function verifierBienPlaces(pCombinaisons,pPropositions) { // !!! Attention! Lorsque l'on passe un tableau en paramètre à une fonction, ce n'est pas une copie de ce que contient le tableau qui est envoyé à la fonction mais bien le tableau lui même (contrairement aux variables). Toute modification apportée au tableau DANS la fonction sera répércuté sur le tableau EN DEHORS de la fonction.
    let eBienPlaces = 0;
    // On parcourt chaque case des propositions
    for (let i = 0; i < pPropositions.length; i++) {
        // Si le chiffre de la proposition est le même que celui de la combinaison
        if (pPropositions[i] == pCombinaisons[i]){
            eBienPlaces++;
            // Assignation d'une valeur hors-limite pour le chiffre trouvé en bonne position.
            pCombinaisons[i] = 5;
            pPropositions[i] = 5;
        }
    }
    return eBienPlaces;
}
function verifierMalPlaces(pCombinaisons,pPropositions) {
    let eMalPlaces = 0;
    // On parcourt le tableau des propositions
    for (let i = 0; i < pPropositions.length; i++) {
        // On s'assure que la case actuelle ne contient pas une valeur hors-limite
        if(pPropositions[i] >= 1 && pPropositions[i] <= 4)
            // on vérifie si le chiffre de la case actuelle est présent dans le tableau des combinaisons
            if (pCombinaisons.indexOf(pPropositions[i]) != -1){
                eMalPlaces++;
                // Récupération de l'index du chiffre dans la tableau des combinaisons pour...
                let eIndex = pCombinaisons.indexOf(pPropositions[i]);
                // Assignation d'une valeur hors-limite pour le chiffre trouvé en mauvaise position.
                pCombinaisons[eIndex] = 0;
                pPropositions[i] = 0;
            }
    }
    return eMalPlaces;
}

// Gestion d'une manche (une proposition jusqu'à la découverte de la combinaison ou l'atteinte du nombre de coups autorisés)
function jouerManche(pCombinaison, pNbreCoups) {
    let eTentatives = 0;
    let eBienPlaces = 0;
    let eMalPlaces = 0;
    let partieGagnee = false; // Nouvelle variable pour indiquer si la partie est gagnée

    // Boucle répétant chaque tentative de deviner la combinaison
    do {
        // Copie du tableau de combinaison pour faire les vérifications
        let tCombinaison = pCombinaison.slice();
        let tPropositions = saisirCombinaison();
        eTentatives++;
        let tPropositions2 = [];
        // copie de la proposition pour les mêmes raisons
        tPropositions2 = tPropositions.slice();

        // Vérification des nombres bien placés (en passant les copies de nos tableaux)
        eBienPlaces = verifierBienPlaces(tCombinaison, tPropositions2);

        // Vérification des nombres corrects mais mal placés (en passant les copies de nos tableaux modifiés par la vérification des chiffres bien placés)
        eMalPlaces = verifierMalPlaces(tCombinaison, tPropositions2);

        console.log("Nombre de chiffres bien placés: " + eBienPlaces);
        console.log("Nombre de chiffres mal placés: " + eMalPlaces);
        console.log("Il vous reste " + (pNbreCoups - eTentatives) + " tentatives");

        if (eBienPlaces === tCombinaison.length) {
            partieGagnee = true; // Indiquer que la partie est gagnée
        }
    } while (eTentatives < pNbreCoups && !(partieGagnee)); // Condition pour continuer la boucle

    if (partieGagnee) {
        console.log("Vous avez gagné en " + eTentatives + " tentatives.");
    } else {
        console.log("Vous n'avez pas trouvé la combinaison qui était : " + pCombinaison);
    }

    return eTentatives;
}

// Boucle principale du programme.
do {
    let eNbreCoups = SaisirValeurNumerique("Combien de tentatives sont autorisées pour chaque manche?");
    let eNbreManche = SaisirValeurNumerique("Combien de manches voulez-vous jouer?");

    // Boucle de gestion des manches.
    do {
        console.log("Nouvelle manche");
        // Réinitialisation de la combinaison à chaque début de manche
        // tCombinaison = [4,2,1,3];
        let tCombinaison = genererCombinaisonAleatoire(1, 4);
        console.log(tCombinaison);

        // Jeu
        jouerManche(tCombinaison, eNbreCoups);

        eNbreManche--;
    } while (eNbreManche > 0);

    bContinuer = continuerPartie();
} while (bContinuer);
