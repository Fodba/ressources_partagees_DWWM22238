var regex1Car = new RegExp("^[a-zA-Zàâäéèêëîïôöùûüÿ\'\ \-]{1,}$");
var regexCp = new RegExp("^[0-9]{5}$");
var regexMail = new RegExp("[@]{1}$");

function auMoinsUnCaractere(e){
    console.log(e);
    var element = e.target;
    console.log(element);
    let valeur = element.value;
    if(!regex1Car.test(valeur)){
        let p = element.parentNode.lastChild.previousSibling;
        p.innerText = "Vous devez entrer au moins un caractère";
    }
}

function cinqCaractere(e){
    let element = e.target;
    let valeur = element.value;
    if(!regexCp.test(valeur)){
        let p = element.parentNode.lastChild.previousSibling;
        p.innerText = "Vous devez entrer un code postal valide (5 chiffres)";
    }
}

function arobase(e){
    let element = e.target;
    let valeur = element.value;
    if(!regexMail.test(valeur)){
        let p = element.parentNode.lastChild.previousSibling;
        p.innerText = "Vous devez entrer une adresse mail valide";
    }
}


let nom = document.getElementById("societe");
let contact = document.getElementById("contact");
let ville = document.getElementById("ville");
let cp = document.getElementById("cp");
let mail = document.getElementById("mail");

nom.addEventListener("blur",auMoinsUnCaractere);
contact.addEventListener("blur",auMoinsUnCaractere);
ville.addEventListener("blur",auMoinsUnCaractere);
cp.addEventListener("blur",cinqCaractere);
mail.addEventListener("blur",arobase);



let formulaire = document.getElementById("formulaire");
console.log(formulaire);
// formulaire.addEventListener("submit",fonctionDeVerif);