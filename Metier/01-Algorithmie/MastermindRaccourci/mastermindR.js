// Permet de récupérer la saisie de l'utilisateur
function saisirTexte(pMessage) {
  return prompt(pMessage);
}

// Permet de récupérer la saisie de l'utilisateur convertie en nombre.
function saisirValeurNumerique(pMessage) {
  let saisie = saisirTexte(pMessage);
  return parseInt(saisie);
}

// Permet de demander à l'utilisateur s'il veut refaire une partie.
function continuerPartie() {
  let choixUtilisateur = saisirTexte("Voulez-vous refaire une partie? O/N");
  return choixUtilisateur.toLowerCase() === "o";
}

// Permets de générer une combinaison comprise entre "min" - "max", de taille "length".
function genererCombinaisonAleatoire(min, max, length) {
  const combinaison = [];
  while (combinaison.length < length) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!combinaison.includes(randomNumber)) {
      combinaison.push(randomNumber);
    }
  }
  return combinaison;
}

// Permets à l'utilisateur de saisir une combinaison de chiffres.
function saisirCombinaison() {
  let propositions = [];
  for (let i = 0; i < 4; i++) {
    let nombre;
    do {
      nombre = saisirValeurNumerique(
        `Entrez le nombre ${i + 1} de votre proposition (compris entre 1 et 4)`
      );
    } while (nombre < 1 || nombre > 4 || isNaN(nombre));
    propositions.push(nombre);
  }
  return propositions;
}

// Vérifie le nombre de chiffres bien placés dans une proposition par rapport à une combinaison donnée.
function verifierBienPlaces(combinaisons, propositions) {
  let bienPlaces = 0;
  let positions = [];
  propositions.forEach((proposition, index) => {
    if (proposition === combinaisons[index]) {
      bienPlaces++;
      positions.push({ chiffre: proposition, position: index + 1 });
      combinaisons[index] = 5;
      propositions[index] = 5;
    }
  });
  console.log(`Nombre de chiffres bien placés : ${bienPlaces}`);
  positions.forEach((item) => {
    console.log(`Chiffre ${item.chiffre} à la position ${item.position}`);
  });
  return bienPlaces;
}

// Vérifie le nombre de chiffres mal placés dans une proposition par rapport à une combinaison donnée.
function verifierMalPlaces(combinaisons, propositions) {
  let malPlaces = 0;
  let positions = [];
  propositions.forEach((proposition, index) => {
    if (proposition >= 1 && proposition <= 4 && combinaisons.includes(proposition)) {
      malPlaces++;
      let combinaisonIndex = combinaisons.indexOf(proposition);
      positions.push({ chiffre: proposition, position: index + 1 });
      combinaisons[combinaisonIndex] = 0;
      propositions[index] = 0;
    }
  });
  console.log(`Nombre de chiffres mal placés : ${malPlaces}`);
  positions.forEach((item) => {
    console.log(`Chiffre ${item.chiffre}`);
  });
  return malPlaces;
}

// Fonction principale pour jouer une manche du jeu.
function jouerManche(combinaison, nbreCoups) {
  let tentatives = 0;
  let bienPlaces = 0;
  let partieGagnee = false;

  do {
    let combinaisonCopie = combinaison.slice();
    let propositions = saisirCombinaison();
    tentatives++;
    let propositionsCopie = propositions.slice();

    bienPlaces = verifierBienPlaces(combinaisonCopie, propositionsCopie);
    verifierMalPlaces(combinaisonCopie, propositionsCopie);

    console.log(`Il vous reste ${nbreCoups - tentatives} tentatives`);

    if (bienPlaces === combinaison.length) {
      partieGagnee = true;
    }
  } while (tentatives < nbreCoups && !partieGagnee);

  if (partieGagnee) {
    console.log(`Vous avez gagné en ${tentatives} tentatives.`);
  } else {
    console.log(`Vous n'avez pas trouvé la combinaison qui était : ${combinaison}`);
  }

  return tentatives;
}

// Fonction principale pour jouer une partie complète du jeu.
function jouerPartie() {
  let nbreCoups = saisirValeurNumerique("Combien de tentatives sont autorisées pour chaque manche?");
  let nbreManches = saisirValeurNumerique("Combien de manches voulez-vous jouer?");

  while (nbreManches > 0) {
    console.log("Nouvelle manche");
    let combinaison = genererCombinaisonAleatoire(1, 4, 4);
    console.log(combinaison);

    jouerManche(combinaison, nbreCoups);

    nbreManches--;
  }
}

// Début du jeu
do {
  jouerPartie();
} while (continuerPartie());