# Gérer les transactions en MySql

## Présentation

Dans cette séance, vous apprendrez les différentes instructions qui servent le concept de transaction et comprendrez l'intérêt de les mettre en œuvre.

Une transaction est un ensemble cohérent de modifications faites sur les données. 

Une transaction est soit entièrement annulée (`ROLLBACK`), soit entièrement validée (instruction `COMMIT`).

Les transactions permettent de garantir l'intégrité de la base de données.

Toutes les modifications de données dans MySQL sont effectuées dans le cadre de transactions. 

Par défaut, MySQL démarre une transaction pour chaque instruction individuelle et la valide automatiquement si l’exécution de l'instruction se termine normalement. 

Une transaction est caractérisée par les critères A.C.I.D. :

* Atomique : si une des instructions échoue, toute la transaction échoue 
* Cohérente, car la base de données est dans un état cohérent avant et après la transaction, c'est-à-dire respectant les règles de structuration énoncées.
* Isolée : Les données sont verrouillées : il n’est pas possible depuis une autre transaction de visualiser les données en cours de modification dans une transaction.
* Durable : les modifications apportées à la base de données par une transaction sont validées.

Par exemple, une transaction bancaire peut créditer un compte et en débiter un autre, ces actions devant être validées ensemble.

## Cheminement

### Phase 1 - Découverte des transactions

**Exemple 1**

Reprenons l'exemple des comptes bancaires où les deux opérations débit et crédit doivent être effectuées simultanément :

	START TRANSACTION; 
    UPDATE comptes SET debit = debit-100 WHERE compte_id = 1;
    UPDATE comptes SET credit = credit+100 WHERE compte_id = 2;

* Ligne 1 : `START TRANSACTION` instruction qui lance la transcaction.
* Ligne 2 : une première requête met à jour le compte du débiteur (numéro de compte 1) de moins 100 euros  
* Ligne 3 : une seconde requête met à jour le compte du créditeur (numéro de compte 2) de plus 100 euros  

Ensuite, il existe 2 possibilités : 

* Cas 1 : toutes les requêtes présentes dans la transaction sont exécutées sans erreurs : il faut alors valider les modifications pour les rendre effectives dans la base de données; on utilise pour cela l'instruction `COMMIT`.

* Cas 2 : une des requêtes présentes dans la transaction a produit un erreur : il faut donc annuler les modifications des autres requêtes, qui elles ont fonctionné de açon correcte. Il faut alors utiliser l'instruction `ROLLBACK` qui va remttre les valeurs des données telles qu'elles étaient avant l'exécution de la transaction.
Il faut alors utiliser l'instruction `ROLLBACK` est donc le contraire de `COMMIT`.

**Exemple 2**

Une transaction peut faire appel à une procédure stockée. Supposons qu'ont ait écrit des procédures stockées _debit(montant, compte_id)_ et _credit(montant, compte_id)_ pour les requêtes de l'exemple 1, notre transaction deviendrait alors :  

	START TRANSACTION;
    CALL debit(100, 1);
    CALL credit(100, 2);

## Phase 2 - Mise en œuvre

## Verrous

## Niveau d'isolement

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

Indique à MySQL de ne pas placer de verrous partagés : une transaction peut lire
des données modifiées non encore validées par une autre transaction.
Des lectures incorrectes peuvent se produire.

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED -- (Option par défaut)

Indique à MySQL d'utiliser des verrous partagés pendant la lecture : une transaction ne peut pas lire les données modifiées mais non validées d’une autre transaction.

La lecture incorrecte ne peut pas se produire.

### Phase 2 - Mise en situation

#### Exercice 1

Sous PhpMyAdmin, après avoir sélectionné votre base _Papyrus_, codez le script suivant et exécutez-le : 

    START TRANSACTION;
    SELECT nomfou FROM fournis WHERE numfou = 120;    
    UPDATE fournis SET nomfou = 'GROSBRIGAND' WHERE numfou = 120;
    SELECT nomfou FROM fournis WHERE numfou = 120; 

> Executez ces instructions ligne par ligne !

L'instruction `START TRANSACTION` est suivie d'une instruction `UPDATE`, mais aucune instruction `COMMIT` ou `ROLLBACK` correspondante n'est présente. 

* Que concluez-vous ? 
* Les données sont-elles modifiables par d'autres utilisateurs (ouvrez une nouvelle fenêtre de requête pour interroger le fournisseur 120 par une instruction `SELECT`) ? 
* La transaction est-elle terminée ? 
* Comment rendre la modification permanente ? 
* Comment annuler la transaction ? 

Codez les instructions nécessaires dans chaque cas pour vérifier vos réponses. 

> Assistez à la présentation du formateur pour faire une synthèse du fonctionnement des transactions.