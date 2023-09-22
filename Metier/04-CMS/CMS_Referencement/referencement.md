# Référencement

## Qu'est-ce que le référencement 

Le référencement est l'action de référencer, c'est-à-dire mentionner quelque chose ou y faire référence. Sur Internet, le travail de référencement consiste à améliorer le positionnement et la visibilité de sites dans des pages de résultats de moteurs de recherche ou d'annuaires.

Le référencement est le fait d'inscrire un site sur un moteur de recherche (tel que Google) ou un annuaire. 

Le référencement internet ne se limite pas aux pages web : tous les contenus peuvent être référencés : 

* les images (sur Google Images) 
* les fichiers audio ou vidéo (Youtube)
* les documents (Word, PDF, Excel, archives zip/rar...) 

Le référencement naturel consiste à travailler les éléments internes (appelés _on page_) et externes des sites (appelés _off page_) pour permettre de donner plus facilement les informations à la fois aux internautes mais
également aux moteurs de recherche.

> Le terme **SEO**, de l'anglais _Search Engine Optimisation_ (Optimisation pour les moteurs de recherche) est souvent utilisé 

### Moteurs de recherche et annuaires

Dans un annuaire, chaque entreprise/webmaster inscrit manuellement son site et les informations le décrivant (catégorie etc.). Les annuaires les plus connus étaient Yahoo! (désormais un moteur de recherche) ou DMOZ (disparu).  

Le modèle annuaire tend à disparaître au profit des moteurs de recherche. Un moteur de recherche est un ensemble d'algorithmes (donc des programmes informatiques) nommés robots (ou bots) qui parcourent les liens présents dans les pages web pour en indexer le contenu selon un système d'archivage par mots-clés. 

Petit à petit, Google a imposé les règles de référencement actuelles via le déploiement d'algorithmes (Panda, Penguin, SpeedUpdate) et les développeurs se trouvent obligés de s'y conformer pour que les sites internet puissent être trouvés par les internautes.

### Quelques statistiques pour comprendre les enjeux 

* En France, Google truste 93 % de part de marché des moteurs de recherche : donc on est sur Google sinon rien (toutefois il ne faut pas se passer des autres moteurs tels que Bing)
* [Taux de clic sur la 1ère page de Google](https://palevesque.com/ctr-resultat-de-recherche)
* Seulement 7% des internautes consultent plus de 3 pages de résultats.
* Les visites issues des moteurs de recherche représentent en moyenne 40 % de la fréquentation.
* Parmi les visites issues des moteurs 75% proviennent du référencement naturel.
* En 2020, plus de la moitié des recherches seront vocales (Google Home, Amazon Echo, Apple Siri, Androïd...)

> Si Google est leader dans la plupart des pays, dont la France, il ne l'est pas partout : _Baidu_ en Chine ou _Yandex_ en Russie dominent le moteur américain. 

**Ressources**

* [Infographie : Les 30 chiffres clés du SEO en 2019](https://www.abondance.com/20191220-41598-infographie-les-30-chiffres-cles-du-seo-en-2019.html)
* [Chiffres clés 2020 du référencement naturel et du SEO](https://www.natural-net.fr/blog-agence-web/2020/09/10/chiffres-cles-2020-du-referencement-naturel-et-du-seo.html)

## Les SERPs 

[https://www.webrankinfo.com/dossiers/google-search/serp](https://www.webrankinfo.com/dossiers/google-search/serp)

## Optimiser les pages web pour le référencement 

### Le référencement naturel (référencement `on page`) 

**Critères prioritaires :**

* Site responsive 
* Balise `title`
* Avoir un site avec un certificat SSL (url en `https://`), aujourd'hui les hébergeurs les proposent gratuitement et vous indiquent comment les mettre en place. 

* Code HTML conforme W3C : 
 
	* balises bien fermées
	* respect de la sémantique : utiliser le [validateur W3C](https://validator.w3.org)
	* Titrage (balises `<h1>`, `<h2>` etc.). Les balises `<h1>` doivent être unique sur l'ensemble du site
	  
* [Choix du nom de domaine](https://www.webrankinfo.com/dossiers/debutants/choix-nom-de-domaine#conseil-10)
* Balises meta `description` (`keyword` est devenue inutile) 
* _Content is king_ : contenu unique, pertinent et à jour, implique de la rédaction de contenus. Bannir les fautes d'orthographe et de grammaire !  
* [Fil d'ariane](http://ergonomie-web.studiovitamine.com/fil-d-ariane,354,fr.html) (= chemin de fer) sur chaque page 
* Plans de site : page [plan du site](https://www.afpa.fr/plan-de-site), fichier [sitemap XML](https://www.webrankinfo.com/dossiers/sitemaps/tutoriel-fichier-sitemap)   
* Eviter les redirections, et surtout les pages non trouvées (erreur [HTTP 404](https://www.google.com/search?q=page+404&client=firefox-b-d&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiAmbLnudXsAhWdDmMBHVCABygQ_AUoAXoECBgQAw&biw=1180&bih=909)) ou encore les pages [en construction](https://www.google.com/search?q=page+en+travaux&tbm=isch&ved=2ahUKEwiEuarpudXsAhVR8IUKHYM4BuoQ2-cCegQIABAA&oq=page+en+travaux&gs_lcp=CgNpbWcQAzICCAA6BAgAEEM6BQgAELEDOgQIABAYUIm_BVji6gVg5-0FaAJwAHgDgAFriAGTC5IBBDE4LjKYAQCgAQGqAQtnd3Mtd2l6LWltZ7ABAMABAQ&sclient=img&ei=hW2YX8TiH9HglwSD8ZjQDg&bih=909&biw=1180&client=firefox-b-d)
  
### Les balises de référencement 

Le HTML fournit des balises `<meta>` spécifiques au référencement :

* `description` : permet de décrire le site en une phrase de référence 
* `robots` : définit via des options comment les robots de moteurs de recherche vont parcourir et indexer ou non la page web  
* `keywords` : une liste de mots-clés correspondant au mieux à votre site :

Aux débuts du web, l'une des principales utilisations des balises `<meta>` était l'indexation des sites web par les moteurs de recherche, à l'aide des attributs `keywords` et `description`. Mais beaucoup de webmasters renseignaient ces balises avec des mots-clés sans aucune pertinence par rapport au contenu réel de la page mais qui attiraient énormément de trafic. Désormais, l'hégémonie de Google (90% des recherches web en France) a imposé que seules les balises `<title>` (cf. ci-après) et `<meta description>` restaient utiles pour le référencement et toute tentative d'abus est sanctionnée par un bannissement des résultats de recherche (blacklistage).
 
> Rappel : les balises `<meta>` doivent être placées entre les balises `<head>` et `</head>`.

**Exemple** 

    <meta name="description" content="Jarditou propose des articles de jardinage en ligne"> 
    <meta name="keywords" content="jardinage, outils, plantes, jardin, semis, brouettes"> 
    <meta name="robots" content="index, follow">

Pour la balise `robots`, le robot indexe la page (instruction `index`) et suit (instruction `follow`) tous les liens de la page (il va aller consulter les pages indiquées par ces liens). [la balise `robot` en détail](https://www.webrankinfo.com/dossiers/conseils/balise-meta-robots).

## La balise `<title>`

Outre les 3 balises précédentes, la balise **essentielle** pour le référencement est `<title>` : c'est l'un des premiers points que Google prend en compte.

Elle doit être rédigée avec soin en tenant compte de [certaines règles](https://www.eskimoz.fr/balise-title-meta-description) très précises. 

<div class="alert alert-danger">Chaque title doit être rédigé de façon unique.</div> 

## Stratégie de mots-clés et de liens  

Optimiser ses pages en internes (code HTML) n'est pas suffisant. Il faut également [une stratégie SEO]() : 

* [choix des mots-clés](), [outils de recherche de mots-clés](https://www.redacteur.com/blog/6-outils-trouver-des-mots-cles) 
* [le rubriquage](https://www.lafabriquedunet.fr/conseils/conception-site-web/arborescence-site-web) 
* stratégie de liens (liens entrants et sortants).     

### URL propres

Pour un bon référencement, le nom de vos pages doit comporter des mots-clés pertinents par rapport à leur contenu et être lisible facilement. On appelle cela les urls propres, obtenues par la réécriture des url (= url rewriting). Les urls sont alors simplifiées. 

**Exemple**

L'url `https://www.jarditou.com/produit.php?categorie=1&id=7` pourrait être réécrite de la façon suivante : `http://www.jarditou.com/barbecues-gaz/aramis-7.html`, c'est beaucoup plus mieux ! 

**Liens :** 

* [Urls propres](), 
* [URLs canoniques](https://www.webrankinfo.com/dossiers/techniques/url-canonique) 
* Réécriture d'URL (URL rewriting) :
	* [Webrankinfo](https://www.webrankinfo.com/dossiers/techniques/tutoriel-url-rewriting)
	* [Craym.eu](https://craym.eu/tutoriels/referencement/url_rewriting.html)

## Temps de chargement 

[temps de chargement](temps_de_chargement.html)

## Les limites du référencement

* Un "jeu sans fin"
* Concurrence  
* Coûts (compétences techniques, campagnes d'achats de mots-clés, suivi)  
* Web marketing, réseaux sociaux, vidéos sur Youtube, buzz...
* Obtenir des liens : pas si simple
* [Authorithy, Page Rank, Trust rank](https://www.neocamino.com/seo-referencement-naturel-debutants/faire-le-suivi-de-referencement-de-son-referencement-naturel) : difficle à obtenir
* [Duplicate content](https://www.webrankinfo.com/dossiers/debutants/erreurs-duplicate-content)
* Refonte d'un site : garder le référencement déjà acquis
* Sites multilingues
* [Déréférencement](https://www.cnil.fr/fr/le-dereferencement-dun-contenu-dans-un-moteur-de-recherche), [droit à l'oubli](https://www.cnil.fr/fr/le-droit-leffacement-supprimer-vos-donnees-en-ligne)

## Outils 

Il existe de nombreux outils d'audit et de suivi du référencement. Citons les gratuits et les plus utilisés :   

* Audit de site : [Google Search Console](https://search.google.com/search-console/about?hl=fr&utm_source=wmx&utm_medium=wmx-welcome) 
* Diagnostic de vitesse de chargement : [Google Page Speed Insights](https://freres.peyronnet.eu/comment-utiliser-google-page-speed-ameliorer-vitesse-site) et [Vitesse de chargement](https://testmysite.withgoogle.com/intl/fr-fr)
* Statistiques : [Google Analytics](https://analytics.google.com/analytics/web/#/report-home/a51355933w83552148p86552654) 

## Les tendances

Le référencement est en évolution perpétuelle, voici les dernières tendances : 

* [Tendances 2020](https://blog.planethoster.com/seo-comment-referencer-son-site-web-en-2020) 
* [Optimiser pour la recherche vocale](https://blog.planethoster.com/comment-optimiser-mon-site-pour-la-recherche-vocale)

## Ressources

* [Page de résultats Google](images/page_de_resultats_google.png)
* [Balise méta dans Google](images/balise-title-description.png)
* [Fil d'ariane](images/fil-dariane.jpg)
* [Chiffres clés Google](https://www.webrankinfo.com/dossiers/google/chiffres-cles)
* Sites sur le référencement :  
	* [Webrankinfo](https://www.webrankinfo.com) 
	* [Abondance](https://www.abondance.com)

## Conclusion 

Le référencement est primordial pour la visibilité d'un site, mais ne suffit désormais plus sans marketing. C'est un sujet en évolution permanente, complexe et qui nécessite des compétences multiples : développeurs, administrateurs de serveurs, référenceurs, rédacteurs web, services marketing etc.   

Le référencement doit être pensé en amont de tout projet, c'est-à-dire dès la phase de conception (optimisation du rubriquage, plan etc.). 

## Mise en pratique

Téléchargez [cette archive](mise_en_pratique/mep_referencement.zip) et, seul ou en groupe, recherchez les points à améliorer pour obtenir un référencement optimisé. Il ne s'agit pas de corriger mais juste d'identifier.  

Pour vous aider : il y a précisément 28 erreurs et c'est truffé de pièges !


<!--
> Demander un corrigé collectif en salle à un formateur.
-->

[Corrigé](mise_en_pratique/corriges/mep_referencement_corrige.html)

Il conviendra ensuite d'appliquer, dans la mesure du possible, les techniques de référencement dans les projets abordés en formation : 

**CodeIgniter (Jarditou, Fil Rouge)**

* Balises `<title>` et méta _description_ uniques sur chaque page.  
* Balises de titrage (`<h1>` etc.) correctement utilisées.
* Attributs `alt` et `title` des images correctement renseignées.
* Présence d'une page _404_.
* +++ TODO : minification/compression des CSS et JS +++
* +++ TODO : Duplicate content +++

**Wordpress**

Installez et configurez (recherchez des tutos sur Internet) les extensions suivantes : 

* Pour les balises `<title>` et méta _description_ [All in One SEO Pack](https://fr.wordpress.org/plugins/all-in-one-seo-pack) 
* Urls propres : réglages des permaliens.
* Page plan du site : [WP Sitemap Page](https://fr.wordpress.org/plugins/wp-sitemap-page) + créer une page _Plan du site_ dans lequel vous mettre le shortcode `[wp_sitemap_page]`. 
* Fichier sitemap.xml : [Google XML Site Maps](https://fr.wordpress.org/plugins/google-sitemap-generator).
* Fil d'ariane : [Breadcrumb NavXT](https://fr.wordpress.org/plugins/breadcrumb-navxt).
* Pour le cache : [W3 Total Cache](https://fr.wordpress.org/plugins/w3-total-cache). 
* Balises de titrage (`<h1>` etc.) correctement utilisées.
* Attributs `alt` et `title` des images correctement renseignées via la bibliothèque de médias.
* Compression des images : [Compress JPEG & PNG images](https://fr.wordpress.org/plugins/tiny-compress-images).  
* +++ TODO : minification/compression des CSS et JS +++
* +++ TODO : Duplicate content +++
* Présence d'une pag
* e _404_.