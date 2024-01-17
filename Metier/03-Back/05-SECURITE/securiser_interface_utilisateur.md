# Sécuriser l'interface utilisateur 

## Valider les données entrantes 

* Types : ai-je bien une chaîne, un entier, une date, une adresse mail... ? 
* Valeurs attendues : par exemple l'utilisateur doit entrer une note de 1 à 5, on ne doit donc pas accepter 6 !  
* Taille attendue : par exemple un numéro de sécurité sociale = 15 chiffres (clé incluse), on doit donc contrôler que l'utilisateur n'ait pas saisi 2000 caractères (qui pourrait contenir du code malicieux)     
* Usage de procédures stockées/déclencheurs
* S'assurer que les informations transmises concernent bien l'utilisateur
* Si les paramètres concernent des clés primaires de BDD, vérifier leur existence en base. 
* Toujours valider dans un langage côté serveur (le javascript peut être lu et aussi désactivé dans le navigateur)  
* Ne pas oublier que le Javascript et le HTML ne me    

## Données sensibles 

* Avant toute chose, ne pas afficher ni passer en paramètres dans l'url des informations définies comme sensibles : mot de passe, nom du compte administrateur, messages d'erreurs (logs techniques) etc.  
* Les paramètres passés dans l'url (méthode GET) doivent être sécurisés : testés (valeur, type...), éventuellement les crypter  

## Les failles de sécurité majeures

### L'injection SQL

[Injection SQL](injection_sql.html).

### Cross-site scripting (XSS)

[La faille XSS](xss.html)

### Cross-Site Request Forgery (CSRF)

[La faille CRSF](csrf.html)

## CMS et frameworks 

Les CMS et les frameworks embarquent des mécanismes ou fonctions de parades aux attaques XSS et CSRF ainsi que pour certains des fonctions de cryptage.  

## Mettre en place un certificat SSL 

> Rappel : un certificat SSL est nécessaire également pour [le référencement](https://www.anthedesign.fr/referencement/ssl-et-seo-duo-gagnant-referencement).

Un certificat SSL (Secure Sockets Layer) permet de chiffrer, c'est-à-dire crypter, les flux de données échangés entre un serveur et un votre navigateur. Ainsi, si un hacker intercepte le signal entre les 2, il verra un contenu totalement illisible au lieu de données en clair.  

Les certificats SSL ont une durée d'expiration et un coût élevé, mais récemment des [certificats gratuits](https://letsencrypt.org) sont apparus et aujourd'hui la plupart des hébergeurs les propose (procédure d'installation à voir avec l'hébergeur).  

> Il existe [différents types](https://www.globalsign.fr/fr/centre-information-ssl/types-certificats-ssl) de certificats SSL pour répondre à des besoins précis. 
> 
## Mise en pratique 

Dans la mesure du possible, implémenter les points de sécurité dans vos projets Code Igniter Jarditou/Fil Rouge :

* [Renommer les répertoires sensibles](https://www.codeigniter.com/userguide3/installation/index.html)
* [Principes de sécurité](https://www.codeigniter.com/userguide3/general/security.html)
* [La librairie Security](https://www.codeigniter.com/user_guide/libraries/security.html)

<br><br><br><br>