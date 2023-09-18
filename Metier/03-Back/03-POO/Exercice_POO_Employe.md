# Exercices Programmation Orientée Objet en PHP

La société Jarditou, d'envergure nationale, souhaite se doter d'un <abbr title="Système d'information de gestion des ressources humaines">S.I.R.H.</abbr> pour gérer ses employés dans les différents agences à travers la France.

## Exercice 1 

Ecrire une classe _Employe_ avec les informations (propriétés) suivantes :

* Nom
* Prénom
* Date d'embauche dans l'entreprise
* Fonction (Poste) dans l'entreprise
* Salaire en K euros brut annuel
* Service dans lequel se situe l'employé (Comptabilité, Commercial...)

## Exercice 2 

Dans la classe _Employe_, écrire une méthode permettant de savoir depuis combien d'années l'employé est dans l'entreprise.

## Exercice 3

Chaque année, l'employé reçoit une prime calculée sur le salaire annuel (5% du brut) et sur l'ancienneté (2% du brut pour chaque année d'ancienneté). Cette prime est versée au 30/11 de chaque année. Dans la classe _Employe_, écrire le(s) méthode(s) permettant de déduire le montant de cette prime et de donner l'ordre de transfert à la banque le jour du versement. 

L'ordre de transfert à la banque sera juste un message écrit spécifiant que l'ordre de transfert a été envoyé à la banque avec mention du montant. 

Afin de tester les éléments ci-dessus, créer au minimum 5 objets _Employe_ avec des informations sensiblement différentes. Ecrire dans le programme principal l'affichage du montant des primes de chaque employé.

La date du versement de la prime doit également être vérifiée. Pour tester, fixer cette date à la date du jour, faire les conditions nécessaires dans le code et tester en changeant de date afin de voir si le message voulu s'affiche.

## Exercice 4 

Afin de créer un reporting d'informations sur les employés de l'entreprise, établir une liste d'employés en y ajoutant les 5 objets que vous venez de créer. Ensuite, utiliser les méthodes prévues dans les listes pour :

* Afficher le nombre d'employés de l'entreprise,
* Afficher toutes les informations des employés par ordre alphabétique sur le nom et le prénom,
* Afficher toutes les informations des employés par ordre alphabétique de service, nom et prénom
* Afficher le montant total du coût que représentent tous les salariés (masse salariale) déduit du salaire et des primes.

## Exercice 5 

L'entreprise est constituée d'agences implantés sur tout le territoire français.

Un employé fait partie d'un (et un seul) agence. Un agence dispose d'un nom, d'une adresse, d'un code postal, d'une ville. Ecrire une nouvelle classe _Agence_ qui contient tous ces éléments et modifier la classe _Employe_ afin que celui-ci soit rattaché à un agence. 

## Exercice 6 

En ce qui concerne les repas, les agences ne disposent pas toutes d'un restaurant d'entreprise. Les employés se trouvant dans les agences qui n'ont pas de restaurant d'entreprise bénéficient en contrepartie de tickets restaurants. Chaque agence dispose donc de son propre mode de restauration.

Modifier la classe _Agence_ pour gérer ce mode de restauration. 

Afficher chaque mode de restauration de chaque employé selon le agence dans lequel il est affecté.

## Exercice 7 

L'entreprise souhaite intégrer dans ce système informatique les activités du comité d'entreprise. Des chèques-vacances sont distribués aux employés à condition que ceux-ci aient une ancienneté d'au moins un an. 

Modifier la classe _Employe_ afin de savoir si celui-ci peut disposer de chèques-vacances ou non.


## Exercice 9
Un directeur est un employé comme un autre qui bénéficie d’un statut particulier. Chaque année, le
directeur reçoit une prime calculée sur le salaire annuel (7% du brut) et sur l’ancienneté (3% du brut
pour chaque année d’ancienneté). Cette prime est versée au 30/11 de chaque année. Créer la classe
Directeur et gérer le calcul de la prime et le versement pour celui-ci.
<br><br><br><br>