// REGEX
var regex1Car = new RegExp("^[a-zA-Zàâäéèêëîïôöùûüÿ\'\ \-]{1,}$");
var regexCp = new RegExp("^[0-9]{5}$");
var regexMail = new RegExp("[@]{1}$");



// FONCTIONS
function auMoinsUnCaractere(e){
    // On récupère l'élément HTML qui a déclenché l'événement ainsi que le texte tapé
    var element = e.target; 
    let valeur = element.value;
    // On récupère la balise d'affichage du message d'erreur. Ici, c'est la dernière balise du conteneur
    let p = element.parentNode.lastChild.previousSibling;
    // On affiche un message d'erreur ou non selon que le texte est conforme à la régex ou pas.
    if(!regex1Car.test(valeur)){
        p.innerText = "Vous devez entrer au moins un caractère";
    }
    else{
        p.innerText = "";
    }
}

function cinqCaractere(e){
    let element = e.target;
    let valeur = element.value;
    let p = element.parentNode.lastChild.previousSibling;
    if(!regexCp.test(valeur)){
        p.innerText = "Vous devez entrer un code postal valide (5 chiffres)";
    }
    else{
        p.innerText = "";
    }
}

function arobase(e){
    let element = e.target;
    let valeur = element.value;
    let p = element.parentNode.lastChild.previousSibling;
    if(!regexMail.test(valeur)){
        p.innerText = "Vous devez entrer une adresse mail valide";
    }
    else{
        p.innerText = "";
    }
}

function quelleOption(e){
    console.log(e);
        // On récupère le texte de l'option qui a été sélectionnée pour déterminer l'action si c'est un élément de la liste ou si c'est une entrée utilisateur.
        // Les options sont récupérés sous forme d'un HTMLcollection (ou plus simplement sous forme d'un tableau)
        let choix = e.target.selectedOptions[0].innerText;
        if (choix == "Autres"){
            let editOption = document.getElementById('editOption');
            editOption.style.display = "block";
        }
        else if(choix != "Choisissez"){
            ajoutItem(choix);
        }
}


function ajoutItem(pTexte){
    if(pTexte != ""){
        // Création d'une nouvelle option pour le select multiple
        let nouvelleOption = document.createElement('option');
        nouvelleOption.innerText = pTexte;
        nouvelleOption.setAttribute("value",pTexte);

        // Récupération du select multiple et ajout de l'option.
        let environnementSelect = document.getElementById('environnement_select');
        environnementSelect.appendChild(nouvelleOption);
    }
}

function fonctionDeVerif(e){
    e.preventDefault();
}

function reset(e){
    // Récupération et réinitialisation de tous les champs.
    let select = document.getElementById("environnement_select");
    select.innerHTML = "";
}

function saisie(e){
    let key = e.key;
    let editOption = document.getElementById('editOption');
    if(e.target == editOption){
        if(key == "Enter"){
            ajoutItem(e.target.value);

            // Réinitialisation du champs "editOption" et du select
            editOption.value = "";
            editOption.style.display = "none";
            let select = document.getElementById("select_environnement");
            let option = document.getElementById("itemChoix");
            select.value = option.value;
        }
    }
}

// Eléments du DOM 
let nom = document.getElementById("societe");
let contact = document.getElementById("contact");
let ville = document.getElementById("ville");
let cp = document.getElementById("cp");
let mail = document.getElementById("mail");
let environnement = document.getElementById("select_environnement");
let formulaire = document.getElementById("formulaire");



// Ajout des eventListener
nom.addEventListener("blur",auMoinsUnCaractere);
contact.addEventListener("blur",auMoinsUnCaractere);
ville.addEventListener("blur",auMoinsUnCaractere);
cp.addEventListener("blur",cinqCaractere);
mail.addEventListener("blur",arobase);

// environnement.addEventListener("click",quelleOption);
environnement.addEventListener("input",quelleOption);
// editOption.addEventListener("change",ajoutItem);
let editOption = document.getElementById("editOption");
editOption.addEventListener("keyup",saisie);

// console.log(formulaire);
formulaire.addEventListener("reset",reset);
formulaire.addEventListener("submit",fonctionDeVerif);




// TODO/ Ajouter des commentaires.
// TODO: retrait des items après un click pour le choix de l'environnement technique.
// TODO: fonctionDeVerif()