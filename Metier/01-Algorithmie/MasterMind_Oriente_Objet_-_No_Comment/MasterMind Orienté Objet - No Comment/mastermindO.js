class Mastermind {
  constructor() {
    this.nbreCoups = 0;
    this.nbreManches = 0;
  }

  saisirTexte(pMessage) {
    return prompt(pMessage);
  }

  saisirValeurNumerique(pMessage) {
    let saisie = this.saisirTexte(pMessage);
    return parseInt(saisie);
  }

  continuerPartie() {
    let choixUtilisateur = this.saisirTexte(
      "Voulez-vous refaire une partie ? O/N"
    );
    return choixUtilisateur.toLowerCase() === "o";
  }

  genererCombinaisonAleatoire(min, max, length) {
    const combinaison = [];
    while (combinaison.length < length) {
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!combinaison.includes(randomNumber)) {
        combinaison.push(randomNumber);
      }
    }
    return combinaison;
  }

  saisirCombinaison() {
    let propositions = [];
    for (let i = 0; i < 4; i++) {
      let nombre;
      do {
        nombre = this.saisirValeurNumerique(
          `Entrez le nombre ${
            i + 1
          } de votre proposition (compris entre 1 et 4)`
        );
      } while (nombre < 1 || nombre > 4 || isNaN(nombre));
      propositions.push(nombre);
    }
    return propositions;
  }

  verifierBienPlaces(combinaisons, propositions) {
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

  verifierMalPlaces(combinaisons, propositions) {
    let malPlaces = 0;
    let positions = [];
    propositions.forEach((proposition, index) => {
      if (
        proposition >= 1 &&
        proposition <= 4 &&
        combinaisons.includes(proposition)
      ) {
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

  jouerManche(combinaison) {
    let tentatives = 0;
    let bienPlaces = 0;
    let partieGagnee = false;

    do {
      let combinaisonCopie = combinaison.slice();
      let propositions = this.saisirCombinaison();
      tentatives++;
      let propositionsCopie = propositions.slice();

      bienPlaces = this.verifierBienPlaces(combinaisonCopie, propositionsCopie);
      this.verifierMalPlaces(combinaisonCopie, propositionsCopie);

      console.log(`Il vous reste ${this.nbreCoups - tentatives} tentatives`);

      if (bienPlaces === combinaison.length) {
        partieGagnee = true;
      }
    } while (tentatives < this.nbreCoups && !partieGagnee);

    if (partieGagnee) {
      console.log(`Vous avez gagné en ${tentatives} tentatives.`);
    } else {
      console.log(
        `Vous n'avez pas trouvé la combinaison qui était : ${combinaison}`
      );
    }

    return tentatives;
  }

  jouerPartie() {
    this.nbreCoups = this.saisirValeurNumerique(
      "Combien de tentatives sont autorisées pour chaque manche?"
    );
    this.nbreManches = this.saisirValeurNumerique(
      "Combien de manches voulez-vous jouer?"
    );

    while (this.nbreManches > 0) {
      console.log("Nouvelle manche");
      let combinaison = this.genererCombinaisonAleatoire(1, 4, 4);
      console.log(combinaison);

      this.jouerManche(combinaison);

      this.nbreManches--;
    }
  }

  jouer() {
    do {
      this.jouerPartie();
    } while (this.continuerPartie());
  }
}

const mastermind = new Mastermind();
mastermind.jouer();
