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

exo1();
exo2();
exo3();


