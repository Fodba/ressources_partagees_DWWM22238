# Bonnes pratiques générales de sécurité 

> Demander à un formateur la présentation de ce cours en salle.

## La sécurité côté front-end 

### Valider les données entrantes 

* Types : ai-je bien une chaîne, un entier, une date, une adresse mail... ? 
* Valeurs attendues : par exemple si l'utilisateur doit entrer une note de 1 à 5, on ne doit donc pas accepter 6 !  
* Taille attendue : par exemple un numéro de sécurité sociale = 15 chiffres (clé incluse), on doit donc contrôler que l'utilisateur n'ait pas saisi plus de caractères (qui pourrait contenir du code malicieux)     
* Usage de procédures stockées/déclencheurs
* S'assurer que les informations transmises concernent bien l'utilisateur
* Si les paramètres concernent des clés primaires de BDD, vérifier leur existence en base. 
* Ne pas oublier que le code HTML et Javascript peut être affiché et modifié et désactivé dans le navigateur; même minifié il existe des services permettant de le rendre lisible.
* Comme le Javascript peut-être désactivé, toujours valider dans un langage côté serveur. Le Javascript permet de faciliter l'utilisabilité, mais ne participe pas à la sécurité.  

## Données sensibles 

* Avant toute chose, ne pas afficher ni passer en paramètres dans l'url des informations définies comme sensibles : mot de passe, nom du compte administrateur, messages d'erreurs (logs techniques) etc. L'affichage des logs techniques se désactivent en environnement de production (en PHP par exemple) 
* Les paramètres passés dans l'url doivent être sécurisés : testés (valeur, type...), éventuellement cryptés.

## La sécurité côté back-end 

### Bases de données

* Injections SQL
* Droits et rôles utilisateurs
* Valider les données entrantes (types, valeurs attendues, usage de procédures stockées/déclencheurs)
* Préfixer les noms de bases et de tables (dans les CMS, à l'installation, changer les préfixes par défaut)
* Eviter si possible que l'administrateur corresponde à la valeur de clé primaire 1 d'une table utilisateur (dans Worpdress, un plugin permet de changer cet id)      

### Code 

* Utiliser les mécanismes de visibilité de la programmation orientée objet
* Utiliser les recommandations et mécanismes de sécurité des solutions utilisées : frameworks, CMS (natif et plugins de sécurité...).
* Mise à jour de vos applicatifs : système d'exploitation/serveurs, frameworks, CMS, langages...)
* E-commerce : sécuriser les solutions de paiement et les données relatives aux achats
* Mettre en place un certificat SSL (nécessaire également pour le référencement)
* Intégrer la sécurité dans les plans de tests
* Mener des revues de code axée aussi sur la sécurité

### Gestion des accès 

* Comptes administrateurs au niveau serveur (hébergement) et au niveau applicatif 
* Mots de passe (vu avec les sessions PHP), process de récupération, changement des mots de passe par défaut, changement régulier, double authentification...

### Sauvegardes

* Sauvegardes régulières et vérifiées
* Sécuriser les sauvegardes (droits d'accès, stockage en lieu sûr, protection contre le vol et le feu, cryptage)

### Fichiers et répertoires

* Sécuriser les téléchargements de fichiers (vu en PHP)
* Sécuriser le stockage des fichiers : les fichiers non publics doivent être stockés en dehors de l'arborescence web pour ne pas pouvoir être appelés via une url.
* Contrôler les types MIME, les tailles et nombre de fichiers téléchargés/créés 
* Protection des accès répertoires et fichiers (permissions d'exécution/écriture/lecture, fichier _.htaccess_)

### Mise en production

* Créer un environnement configuré de façon spécifique pour la production 
* Enlevez des informations utiles aux hackers : numéros de version, désactiver le débogage (XDebug pour PHP par exemple)
* Connexion au serveur et transfert de fichiers avec des protocoles sécurisés (WinSCP, HTTPS, SSH...)
* Protection du serveur, modules de sécurité des logiciels serveur (relève de l'administration réseau)
* Monitoring (logiciels dédiés, analyse des logs)

## Le fichier .htaccess

Le fichier _.htaccess_ est un fichier de configuration spécifique à Apache (attention, ne fonctionne donc pas pour les autres serveurs HTTP : Nginx et IIS) qui offre de nombreuses possibilités liées à la sécurité :

* Empêcher le listage des répertoires dans lesquels il manquerait un fichier _index_  
* Spécifier des accès par adresse IP ou bloquer des URLs, IP ou encore robots malveillants.
* Authentification par login/mot de passe
* Gestion des accès aux répertoires et fichiers, des types MIME.
  
Hormis la sécurité, le fichier _.htaccess_ permet de gérer d'autres points : 

* référencement (réécriture d'url, accès des robots de moteurs de recherche) 
* vitesse de chargement des pages (gestion des caches, compression)
* redirections (par exemple rediriger vers une page personnalisée en cas d'erreur HTTP 404)

Vous pouvez placer plusieurs fichiers _.htaccess_ dans votre site (par exemple un à la racine, puis un second spécifique à la partie administration). 

> Le fichier _.htaccess_ doit être lui-même protégé (droits 644).

**Tutoriels _.htaccess_**

* [http://pub.phyks.me/sdz/sdz/le-htaccess-et-ses-fonctionnalites.html](http://pub.phyks.me/sdz/sdz/le-htaccess-et-ses-fonctionnalites.html)
* [https://www.mauricelargeron.com/parametrer-les-acces-a-son-serveur](https://www.mauricelargeron.com/parametrer-les-acces-a-son-serveur)

## Bonnes pratiques générales

* Etablir un plan sécurité et de reprise d'activité. 
* Recenser les données et fichiers sensibles et leurs accès.  
* Recenser les utilisateurs et leurs droits.
* [Tenir une veille](https://www.dsfc.net/infrastructure/securite/veille-securite-informatique) : bulletin CERT-FR, éditeurs, newsletters, forums/blogs etc. 
* Sécuriser le matériel (cryptage, désactivation à distance en cas de vol) et les locaux de l'entreprise. 

## Ressources

### Référentiels, normes, organismes

* [ANSSI](https://www.ssi.gouv.fr) propose de nombreux guides, notamment pour [le web](https://www.ssi.gouv.fr/entreprise/bonnes-pratiques/applications-web)
* [OWASP](https://blog.clever-age.com/fr/2012/05/10/la-securite-au-travers-de-l-owasp)
* [Norme ISO 27001](https://fr.wikipedia.org/wiki/ISO/CEI_27001)   

### Autres liens

* Sécuriser un CMS, par exemple [Wordpress](https://wpchannel.com/wordpress/tutoriels-wordpress/14-astuces-securiser-site-wordpress) ou [Prestashop](https://www.prestashop.com/fr/blog/renforcez-securite-boutique-prestashop-tres-facilement)
* Le [MOOC sécurité numérique](https://secnumacademie.gouv.fr) de l'ANSSI

<br><br><br><br>




