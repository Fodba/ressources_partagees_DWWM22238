/**
 * Version commentée et documentée.
 *
 * J'ai réalisé le masterMind en orienté objet à l'intention de Mr Fadika Mauro.
 *
 * La classe MasterMind encapsule les différentes Méthodes du jeu Mastermind.
 * Elle permet de jouer une partie complète du jeu, comprenant plusieurs manches.
 * On utilise à l'intérieur constructor() afin d'initialiser les différents attributs de la classe (nbreCoups & nbreManches)
 *
 */

/**
 * @class Mastermind
 * @classdesc Représente le jeu Mastermind.
 * @author ALLARD Jordan
 */

class Mastermind {
  constructor() {
    /**
     * @member {number} nbreCoups - Nombre de tentatives autorisées par manche.
     **/
    this.nbreCoups = 0;
    /**
     * @member {number} nbreManches - Nombre de manches à jouer.
     */
    this.nbreManches = 0;
  }

  /**
   * @param {string} pMessage - Le message à afficher à l'utilisateur.
   * @returns {string} Le texte saisi par l'utilisateur.
   */
  saisirTexte(pMessage) {
    return prompt(pMessage);
  }

  /**
   * @param {string} pMessage - Le message à afficher à l'utilisateur.
   * @returns {number} La valeur numérique saisie par l'utilisateur.
   */
  saisirValeurNumerique(pMessage) {
    let saisie = this.saisirTexte(pMessage);
    return parseInt(saisie);
  }

  /**
   * @returns {boolean} Un booléen indiquant si l'utilisateur souhaite continuer la partie ou non.
   */
  continuerPartie() {
    let choixUtilisateur = this.saisirTexte(
      "Voulez-vous refaire une partie ? O/N"
    );
    return choixUtilisateur.toLowerCase() === "o";
  }

  /**
   * @param {number} min - La valeur minimale des chiffres aléatoires (incluse).
   * @param {number} max - La valeur maximale des chiffres aléatoires (incluse).
   * @param {number} length - La longueur de la combinaison.
   * @returns {number[]} Un tableau contenant la combinaison générée aléatoirement.
   */
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

  /**
   * @returns {number[]} Un tableau contenant la combinaison saisie par l'utilisateur.
   */
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

  /**
   * Vérifie le nombre de chiffres bien placés dans une proposition.
   * @param {number[]} combinaisons - La combinaison correcte de chiffres.
   * @param {number[]} propositions - La combinaison de chiffres proposée par l'utilisateur.
   * @returns {number} Le nombre de chiffres bien placés dans la proposition.
   */
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

  /**
   * Vérifie le nombre de chiffres mal placés dans une proposition.
   * @param {number[]} combinaisons - La combinaison correcte de chiffres.
   * @param {number[]} propositions - La combinaison de chiffres proposée par l'utilisateur.
   * @returns {number} Le nombre de chiffres mal placés dans la proposition.
   */
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

  /**
   * Joue une manche du jeu.
   * @param {number[]} combinaison - La combinaison correcte de chiffres.
   * @returns {number} Le nombre de tentatives effectuées dans la manche.
   */
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

  //Joue une partie complète du jeu.

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

  // Méthode principale pour lancer le jeu.

  jouer() {
    do {
      this.jouerPartie();
    } while (this.continuerPartie());
  }
}

// Début du jeu
const mastermind = new Mastermind();
mastermind.jouer();

/**
 * Compréhension de la documentation à l'aide de JSDocs. 
 * En passant sa souris sur les différentes méthodes/classes on obtient ainsi une description détaillées.
 *
 *@class - Définie la classe.
 *@classdesc - Décrit la classe.
 *@param - Décrit les différents paramètres de la fonction/Méthode.
 *@member - Décrit les membres (attributs) d'une classe.
 *@returns - Ce que la fonction/Méthode retourne.
 *@author /Définis un auteur de la classe/méthode/fonction.
 *
 */
