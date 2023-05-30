// 1.
function exo1(){
    const nombres = demanderNombre(5);

    let indexOfMax = indexMax(nombres);
    let nombreMinimum = minimum(nombres);
    let MoyenneDesNombres = moyenne(nombres);
    console.log(`Le nombre le plus grand est à la position ${indexOfMax}`);
    console.log(`Le nombre le plus petit est ${nombreMinimum}`);
    console.log(`La moyenne des nombres entrés est de ${MoyenneDesNombres}`);
}

// 2.
function exo2(){
    const nombres = demanderNombre(5);
    const nombresTrier = trier(nombres);
    console.log(nombres);
    console.log(nombresTrier);
}

// 3.
function exo3(){
    const mots = saisieMots(5);
    let nombreVoyelles = compterVoyelles(mots);
    console.log(nombreVoyelles);
    let lesMotsSansVoyelles = motsSansVoyelles(mots);
    console.log(lesMotsSansVoyelles);
}

// 4.
function exo4(){
    // Saisie utilisateur
    let nom = saisieUtilisateur("Entrez votre nom:");
    let prenom = saisieUtilisateur("Entrez votre prénom:");
    let age = saisieNumerique("Entrez votre age:");
    let ddn = saisieUtilisateur("Entrez votre date de naissance (jj/mm/aaaa):");
    let mail = saisieUtilisateur("Entrez votre mail:");

    // Vérification des saisies
    let nomOk = verifNom(nom);
    let prenomOk = verifNom(prenom);
    let ddnOk = verifDDN(ddn);
    let mailOk = verifMail(mail);
    let ageOk = (age > 18 && age < 50) ? true : false; // expression de condition ternaire
    // équivaut à :
    /*
    let ageOK;
    if (age > 18 && age < 50) {
        ageOk = true;
    }
    else {
        ageOk = false;
    }
    */
    
    // Traitement des erreurs
    const errors = [];
    if(nomOk && prenomOk && ageOk && mailOk && ddnOk) { // Affichage de tutes les données
        alert(`Vous êtes ${nom} ${prenom}. Vous êtes né(e) le ${ddn} et vous avez ${age} ans.\nVotre adresse mail est ${mail}`);
    }
    else if (age < 18 && age > 50){
        alert("Vous n'entrez pas dans les critères d'évaluation");
    }
    else{
        alert("Votre saisie comporte des erreurs.\nMerci de les corriger");
        let message;

        // ! Il n'y a que des if et pas de else if car toutes les données doivent être vérifiées.
        if(!nomOk){
            message = "Veuillez entrer un nom valide";
            errors.push(message);
            do{
                alert(message);
                nom = saisieUtilisateur("Entrez votre nom:");
                nomOk = verifNom(nom);
            }while(!nomOk);
            console.log(nom);
        }

        if(!prenomOk){
            message = "Veuillez entrer un prénom valide";
            errors.push(message);
            do{
                alert(message);
                prenom = saisieUtilisateur("Entrez votre prénom:");
                prenomOk = verifNom(prenom);
            }while(!prenomOk);
            console.log(prenom);
        }

        if(!ageOk){
            message = "Veuillez entrer un age valide";
            errors.push(message);
            do{
                alert(message);
                age = saisieUtilisateur("Entrez votre age:");
                ageOk = verifNom(age);
            }while(!ageOk);
            console.log(age);
        }

        if(!ddnOk){
            message = "Veuillez entrer une date de naissance valide";
            errors.push(message);
            do{
                alert(message);
                ddn = saisieUtilisateur("Entrez votre date de naissance:");
                ddnOk = verifNom(ddn);
            }while(!ddnOk);
            console.log(ddn);
        }

        if(!mailOk){
            message = "Veuillez entrer une adresse mail valide";
            errors.push(message);
            do{
                alert(message);
                mail = saisieUtilisateur("Entrez votre adresse mail:");
                mailOk = verifNom(mail);
            }while(!mailOk);
            console.log(mail);
        }

        // Affichage de toutes les erreurs
        for (var i = 0; i < errors.length; i++) {
            console.log(errors[i]);
        }
    }
}

// exo1();
// exo2();
// exo3();
// exo4();


