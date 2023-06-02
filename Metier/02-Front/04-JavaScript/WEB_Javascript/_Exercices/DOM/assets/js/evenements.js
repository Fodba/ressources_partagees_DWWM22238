let formulaire = document.getElementById("formulaire");
formulaire.addEventListener("submit", function(e){
    e.preventDefault();
    let value = document.getElementById("nom").value;
    alert("vous avez saisi: '" + value + "'");
});

var nombreATrouver;

function verif(){
    console.log(nombreATrouver);
    if(nombreATrouver == undefined){
        nombreATrouver = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    }
    let propo = document.getElementById("textBox1").value;
    console.log(nombreATrouver);
    console.log(propo);
    let rep = document.getElementById("reponse");
    if(propo > nombreATrouver){
        rep.innerText = "Le nombre à trouver est plus petit";
    }
    else if (propo < nombreATrouver){
        rep.innerText = "Le nombre à trouver est plus grand";
    }
    else{
        rep.innerText = "Vous avez trouvé le nombre";
    }
    document.getElementById("textBox1").value  = "";
}