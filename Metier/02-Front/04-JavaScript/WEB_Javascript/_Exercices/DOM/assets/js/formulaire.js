// REGEX
var regex1Car = new RegExp("^[a-zA-Zàâäéèêëîïôöùûüÿ\'\ \-]{1,}$");
var regexCp = new RegExp("^[0-9]{5}$");
var regexMail = new RegExp("[@]{1}$");



// FONCTIONS
function auMoinsUnCaractere(e){
    // console.log(e);
    var element = e.target;
    // console.log(element);
    let valeur = element.value;
    let p = element.parentNode.lastChild.previousSibling;
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

function addEnvironnement(e){
    let choix = e.target.selectedOptions[0].innerText;
    e.target
    if (choix == "Autres"){
        let editOption = document.getElementById('editOption');
        editOption.style.display = "block";
    }
    else if(choix != "Choisissez"){
        let option = document.createElement("option");
        option.setAttribute("value",choix);
        option.innerText = choix;
        let select = document.getElementById("environnement_select");
        select.appendChild(option);
    }
}

function ajoutItem(e){
    var editText = editOption.value;
    if(editText != ""){
        let environnementSelect = document.getElementById('environnement_select');
        let optionAutre = document.getElementById('optionAutre');
        let nouvelleOption = document.createElement('option');
        nouvelleOption.innerText = editText;
        environnementSelect.appendChild(nouvelleOption);
        e.target.value = "";
        e.target.style.display = "none";
    }
}

function fonctionDeVerif(e){
    e.preventDefrault();
}

function reset(e){
    e.preventDefault();
    let champs = document.getElementsByClassName("inputChamps");
    let select = document.getElementById("environnement_select");
    for(elt of champs){
        let champsType = elt.getAttribute("type");
        let error = elt.parentNode.lastChild.previousSibling;
        elt.value = "";
        error.innerHTML = "";
    };
    select.innerHTML = "";
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

environnement.addEventListener("input",addEnvironnement);
editOption.addEventListener("blur",ajoutItem);

// console.log(formulaire);
formulaire.addEventListener("reset",reset);
formulaire.addEventListener("submit",fonctionDeVerif);




// TODO/ Ajouter des commentaires.
// TODO: retrait des items après un click pour le choix de l'environnement technique.
// TODO: fonctionDeVerif()