# Phase 2 - Les déclencheurs

## Rappel  

La base de données relationnelle _papyrus_ est constituée des relations suivantes :

* PRODUIT (CODART, LIBART, STKLE, STKPHY, QTEANN, UNIMES) 
* ENTCOM (NUMCOM, OBSCOM, DATCOM, NUMFOU) 
* LIGCOM (NUMCOM, NUMLIG, CODART, QTECDE, PRIUNI, QTELIV, DERLIV)
* FOURNIS (NUMFOU, NOMFOU, RUEFOU, POSFOU, VILFOU, CONFOU, SATISF)
* VENTE (CODART, NUMFOU, DELLIV, QTE1, PRIX1, QTE2, PRIX2, QTE3, PRIX3)

Le jeu d'essai a été constitué lors d'une séance précédente.

## Création d'un déclencheur

Créer une table `COMMANDER_ARTICLES (CODART, QTE, DATE)` 

* CODART : code de l'article (cf. table _produit_)
* DATE : date du jour (par défaut) 
* QTE : à calculer

Créer un déclencheur `after_produit_update` sur la table _produit_ : lorsque le stock physique devient inférieur au stock d'alerte, une nouvelle ligne est insérée dans la table COMMANDER_ARTICLES; 

Pour le jeu de test, on prendra le produit 'B001', on mettra stkale = 5 et stkphy = 20. 

**Pour comprendre le problème :** 

<table>
	<thead>
		<tr>
			<th>Cas</th>
			<th>Stock physique</th>
			<th>Résultat</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Cas 1</td>
			<td>On passe le stock physique à 6.</td>
			<td>Le stock physique reste supérieur au stock d'alerte, le trigger n'est pas exécuté.</td>
		</tr>
		<tr>
			<td>Cas 2</td>
			<td>On passe le stock physique à 4.</td>
			<td>Le stock physique est inférieur au stock d'alerte, nous devons recommander des produits. Le trigger va s'exécuter et insérer une ligne dans la table COMMANDER_ARTICLES avec QTE = (stock alerte - stock physique) = 1</td>
		</tr>
		<tr>
			<td>Cas 3</td>
			<td>On passe le stock physique à 3.</td>
			<td>Le stock physique est inférieur au stock d'alerte, nous devons recommander des produits. Le trigger va s'exécuter et mettre à jour dans la table COMMANDER_ARTICLES la quantité à recommander pour la ligne déjà créée pour le produit 'B001' avec une vlaeur de 2 (5 - 3).</td>
		</tr>
	</tbody>
</table>