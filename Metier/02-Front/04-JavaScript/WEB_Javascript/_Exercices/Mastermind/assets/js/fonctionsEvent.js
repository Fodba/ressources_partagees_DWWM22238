function dragPion(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function dragOverPion(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
}

function dropPion(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    let classe = "propoItem " + data;
    e.target.setAttribute("class", classe);
}

function verifCombi(e) {
    let ligne = e.target.parentNode;
    let propoElement = ligne.querySelectorAll(".propoItem");
    let resultItem = ligne.querySelectorAll(".resultItem");
    let propoCombi = [];
    propoElement.forEach(function (proposition) {
        let classes = proposition.getAttribute("class");
        classes = classes.split(" ");
        propoCombi.push(classes[1].replace("pion", ""));
    });
    if (propoCombi.includes("Vierge")) {
        alert("Vous devez compléter votre proposition");
    } else {
        setEssai(--nombreEssai);
        let resultat = verification(combinaisonDeJeu, propoCombi);
        for (let i = 0; i < resultat[0]; i++) {
            let resultElement = document.getElementById("result" + i);
            let classe = "resultItem pionRouge";
            resultElement.setAttribute("class", classe);
        }

        for (let i = 0; i < resultat[1]; i++) {
            let resultElement = document.getElementById("result" + (i + resultat[0]));
            let classe = "resultItem pionBlanc";
            resultElement.setAttribute("class", classe);
        }

        for (let i = 0; i < resultItem.length; i++) {
            resultItem[i].removeAttribute("id");
        }
        document.getElementById("boutonVerification").innerText = "Verifié";
        document.getElementById("boutonVerification").setAttribute("disabled", true);
        document.getElementById("boutonVerification").removeAttribute("id");

        if (resultat[0] == 4) {
            alert("Félicitations!!!\nVous avez trouvé la combinaison");
            revelerCombinaison(combinaisonDeJeu);
        } else if (nombreEssai == 0) {
            alert("La partie est terminée!!!\n Vous n'avez pas su trouver la combinaison");
            revelerCombinaison(combinaisonDeJeu);
        }
        else{
            let nouvelleLigne = document.createElement("section");
            nouvelleLigne.innerHTML = ligne.innerHTML;
            nouvelleLigne.setAttribute("class", "line");
            ligne.after(nouvelleLigne)
            initLigneActive();
        }
    }
}