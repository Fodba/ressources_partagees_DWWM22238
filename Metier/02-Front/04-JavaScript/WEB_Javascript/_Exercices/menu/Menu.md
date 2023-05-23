1. 
* Demander 5 nombres 
* Afficher l'index du maximum
* Donner le minimum ainsi que la moyenne des valeurs
* Fonctions:
    * saisieUtilisateur(pMessage): retour string
    * saisieNumerique(pMessage): retour number
    * moyenne(pTableau): retour number
    * minimum(pTableau): retour number
    * positionMax(pTableau): retour number
    * exercice1(): retour null/tableau/objet/string


2.
* Demander 5 nombres à l'utilisateur
* Trier ces 5 nombres du plus etit au plus grand
* Fonctions:
    * saisieUtilisateur(pMessage): retour string
    * saisieNumerique(pMessage): retour number
    * tri(pTableau): retour tableau // ! Passage de tableau en paramètre.
    * exercice2(): retour null/tableau/objet/string

3.
* Ecrire une fonction qui demande 5 mots à l'utilisateur et les retourne sous forme de tableau.
* A partir du retour de cette fonction, donner le nombre total de voyelles des 5 mots.
* Afficher la liste des mots ne contenants aucune voyelles (indiquer le cas où il n'y en a aucun)
* Ecrire une fonction similaire à la première mais qui n'accepte aucun mots sans voyelles.
* Fonctions:
    * saisieUtilisateur(pMessage): retour string
    * saisieMots(pNombreMots): retour tableau
    * compterVoyelles(pTableau): retour number
    * motsSansVoyelles(pTableau): retour tableau (contenant les mots sans voyelles) / null
    * saisieMotsVoyelles(pNombreMots): retour tableau
    * ou bien saisieMots(pNombreMots,pAvecVoyelles): retour tableau

4.
* Demander à l'utilisateur son nom, prénom, age, date de naissance (au format jj/mm/aaaa) et adresse mail
* Verifier les saisies grace aux expressions régulières
* Afficher les données entrées si et seulement si toutes les données sont correctes et que l'utilisateur a entre 18 et 50 ans.
* Sinon: 
    * Si une ou plusieurs données n'est/ne sont pas correcte(s), indiquer à l'utilisateur de les modifier.
    * Si l'utilisateur a moins de 18 ou plus de 50 ans, lui indiquer qu'il n'entre pas dans les critères d'évaluation.
* Fonctions:
    * saisieUtilisateur(pMessage): retour string
    * saisieNumerique(pMessage): retour number
    * verifNom(pNom): retour booleen // regex
    * verifMail(pAdresse): retout booleen // regex
    * verifDDN(pDdn): retour booleen // regex
    * verifAge(pAge): retour booleen 

5.
* Ecrire un programme qui propose les 4 programmes précédents sous la forme d'un menu de sélection.
