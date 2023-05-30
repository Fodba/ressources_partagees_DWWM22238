// Accès aux élements de la page.
const sections = document.getElementsByTagName("section");
console.log(sections);
let image = document.getElementById("logo");
console.log(image);
const mesClasses = document.getElementsByClassName("titre");
console.log(mesClasses);
const inputPseudo = document.getElementsByName("pseudo");
console.log(inputPseudo);


// Manipulation
mesClasses[0].style.backgroundColor = "green";
mesClasses[0].innerText = "Salut le monde";
mesClasses[0].setAttribute("class","maClasse");

inputPseudo.forEach(function(pseudo){
    pseudo.setAttribute("placeholder", "Entre votre pseudo");
});

let monFormulaire = document.getElementById("formulaire1");
monFormulaire.innerHTML = "<h2>Mon formulaire</h2>";
function placeHolderInput(e){
    let p = e.target;
    p.setAttribute("placeholder","entrez une valeur");
}

// Gestion des événements
inputPseudo.forEach(function(pseudo){
    pseudo.addEventListener("focus", placeHolderInput);

    pseudo.addEventListener("blur", function(e){
        let p = e.target;
        p.setAttribute("placeholder","entrez votre pseudo");
    });
    pseudo.addEventListener("change", function(e){
        let p = e.target;
        let nomRegex = new RegExp("^[a-zA-Zàâäéèêëîïôöùûüÿ\'\ \-]+$");
        if(!nomRegex.test(p.value)){
            alert("Veuillez entrer des caractères autorisés");
        }
    });
});

// Vérification du formulaire
let formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("test");
    let pseudo = document.getElementById("pseudo2");
    let password = document.getElementById("password2");
    let pseudoOk = false;
    let passwordOk = false;
    
    let nomRegex = new RegExp("^[a-zA-Zàâäéèêëîïôöùûüÿ\'\ \-]+$");
    if(nomRegex.test(pseudo.value)){
        pseudoOk = true;
    }
    else{
        console.log("le pseudo n'est pas correct");
    }
    if(nomRegex.test(password.value)){
        passwordOk = true;
    }
    else{
        console.log("le mot de passe n'est pas correct");
    }

    if(pseudoOk && passwordOk){
        e.target.submit();
    }
    else{
        console.log(pseudoOk);
        console.log(passwordOk);
    }
});
