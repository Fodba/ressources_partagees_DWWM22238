
**Exercice d'application n°1**

Soit le modèle relationnel suivant relatif à une base de données sur des représentations musicales :

	REPRESENTATION (id, titre, lieu) 

Questions :
1 - Donner la liste des titres des représentations.
2 - Donner la liste des titres des représentations ayant lieu à l'opéra Bastille.


**Exercice d'application n°2** 

Soit le modèle relationnel suivant relatif à la gestion des notes annuelles d'une promotion d'étudiants :

	ETUDIANT (id, Nom, Prenom) 
	MATIERE (id, Libellé, Coeff) 
	EVALUER (id_Etudiant, id_Matiere, Date, Note)

- Quel est le nombre total d'étudiants ?
- Quelles sont, parmi l'ensemble des notes, la note la plus haute et la note la plus basse ?
- Quelles sont les moyennes de chaque étudiant dans chacune des matières ?
- Quelles sont les moyennes par matière ?
- Quelle est la moyenne générale de chaque étudiant ?
- Quelle est la moyenne générale de la promotion ?
- Quels sont les étudiants qui ont une moyenne générale supérieure ou égale à la moyenne générale de la promotion ?


**Exercice d'application n°3**

Soit le modèle relationnel suivant relatif à la gestion simplifiée des étapes du Tour de France, dont une des étapes de type "contre la montre individuel" se déroula à Saint-Etienne :

	EQUIPE (id , NomEquipe, DirecteurSportif) 
	COUREUR (id , NomCoureur, id_Equipe, id_Pays) 
	PAYS (id , NomPays) 
	TYPE_ETAPE (id , LibelléType) 
	ETAPE (id, DateEtape, VilleDép, VilleArr, NbKm, id_Type_Etape) 
	PARTICIPER (id_Coureur, id_Etape, TempsRéalisé) 
	ATTRIBUER_BONIFICATION (id_Etape, km, Rang, NbSecondes, id_Coureur)


- Quelle est la composition de l'équipe Festina (Numéro, nom et pays des coureurs) ?
- Quel est le nombre de kilomètres total du Tour de France 97 ?
- Quel est le nombre de kilomètres total des étapes de type "Haute Montagne" ?
- Quel est le classement général des coureurs (nom, code équipe, code pays et temps des coureurs)?
