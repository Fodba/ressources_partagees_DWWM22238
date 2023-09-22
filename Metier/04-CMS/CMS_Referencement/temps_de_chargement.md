<!-- HB, 17/11/2019 -->

<!-- 
caches, cdn, dns prefetch, critical css, pagespeed, dareboost etc

https://emploi.alsacreations.com/offre-585252-Developpeur-se-web-full-stack-experimente-e.html

-->

# Optimiser le temps de chargement des pages web

Bien distinguer le temps de chargement pour :

* mobile
* PC (Desktop) 

## Enjeux

* [Google SpeedUpdate](https://www.webrankinfo.com/dossiers/referencement-mobile/speed-update)
* [Enjeux](https://www.seo.fr/informations/vitesse)
* [Avertissement Google Chrome](https://www.futura-sciences.com/tech/actualites/internet-google-chrome-fait-guerre-sites-trop-lents-78293), [Page officielle](https://blog.chromium.org/2019/11/moving-towards-faster-web.html)
* Impacts : taux de rebond (trouver des chiffres), référencement, [Ecologie](https://www.websitecarbon.com)
* Causes : absence de cache, trop d'image, images trop lourdes, vidéos, trop de fichiers CSS et/ou JS, code CSS/JS mal placé

## Oui mais c'est quoi un site lent ?

[Eléments](https://blog-fr.orson.io/referencer-son-site-seo/site-web-lent-que-faire)

* 3 secondes +++ TODO +++

## Que faire ?

Tout d'abord, vérifier la version des logiciels serveur, des langages, des CMS et des frameworks et les mettre à jour si nécessaire et si c'est possible (on n'a pas toujours la main sur ce qui se trouve sur les erveurs).

En effet, outre de nouvelles fonctionnalités, la correction de bugs et de failles de sécurité, les mises à jour comportent aussi souvent des gains de performance.  

[https://kinsta.com/fr/blog/versions-php](https://kinsta.com/fr/blog/versions-php) 

## Outils de diagnostic

[Googe PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=fr) est un outil de diagnostic qui vous indique quels points ralentissent votre page. 

Reste à interpréter les résulats : les propositions ne sont pas simples à mettre en oeuvre, même si l'outil vous donne des débuts de solutions.  

Pour vous aider : 

* Diagnostic de vitesse de chargement : [Tuto Google Page Speed Insights](https://freres.peyronnet.eu/comment-utiliser-google-page-speed-ameliorer-vitesse-site) et [Vitesse de chargement](https://testmysite.withgoogle.com/intl/fr-fr)

**Exemples :** 

* Allez sur [Googe PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=fr) et entrez l'adresse _https://www.afpa.fr_, et là c'est le drame... 
* Allez sur [Googe PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?hl=fr) et entrez l'adresse _https://www.google.fr_, c'est un peu mieux. 

Autres outils de diagnostic : 

* [Lighthouse](https://developers.google.com/web/tools/lighthouse), 
* [Ecologie](https://www.wholegraindigital.com/blog/website-energy-efficiency) 

## Le cache

[les outils de cache pour le web](https://www.mnot.net/cache_docs/index.fr.html), 

## Optimiser les ressources

* [Minification et compression des CSS et JS](https://www.it-connect.fr/quest-ce-que-la-minification)
* Compression HTML 
* CDN
* Outils de build : [Grunt](grunt.html), Webpack, Gulp, Brunch...

## Optimiser le poids des images 

* [Comment optimiser les images pour le Web et la performance](https://kinsta.com/fr/blog/optimiser-les-images-pour-le-web)

+++ TODO : A DEVELOPPER 

Choisir le bon format.

Outils : Smush, tinyjpg

+++

## Optimiser votre code

Certaines pratiques de développement font que votre code s'exécute plus rapidement.

Les différences sont parfois infimes (de l'ordre du millième de secondes), mais au final sur des applications de plusieurs centaines de milliers de lignes de code le gain peut devenir significatif.    

## La ligne de flottaison

+++ TODO +++

## Le fichier .htaccess

+++ TODO : compression Gzip, désactivation des Etags, compression HTML +++

## Pages AMP

* Pages [Accelerated Mobile Page](https://www.webrankinfo.com/dossiers/referencement-mobile/pages-amp)
