# PHP : Les mails

Envoyer un mail est chose courante dans une application web.  
 
Notez bien que cela fonctionne dans les 2 sens :

* l'internaute prend contact avec le propriétaire d'un site à partir d'un formulaire de contact (ou d'inscription)
* le propriétaire d'un site envoie des mails aux internautes :  
 
	* confirmation d'inscription 
	* confirmation de commande d'un achat en ligne
	* newsletter  
	* rappel d'identifiant, réinitialisation d'un mot de passe
	* pièce jointe : facture, documentation... 

Un mail est structuré en 2 parties : 

* Une partie entête (= _headers_) indiquant des données techniques. Comme pour une page HTML, cette partie n'est pas affichée au lecteur du mail mais reste visible dans le code source. 
* Une partie corps (= _body_) qui comprend le message et représente donc la partie visible affichée par les logiciels de messagerie.

> **Important :** l'envoi d'un mail ne relève pas que du langage informatique utilisé. Plusieurs normes informatiques (RFC 2822, RFC 2047...), logiciels serveurs et protocoles de communication (SMTP, IMAP etc.) entrent en jeu, ainsi que la configuration des serveurs d'envoi et de réception, des hébergeurs ou encore des fournisseurs de messagerie (Gmail, Yahoo, Orange, Free…), des logiciels de lecture clients (Outlook, Thunderbird...) et filtres antispam. Autant de points qui rendent compliqué de s'assurer de la bonne réception d'un courriel par un destinataire.  

## Pré-requis : configuration d'un serveur mail 

Par défaut, Wamp ne permet pas l'envoi de mail. 

Il est nécessaire d'installer un émulateur pour remplacer les serveurs de mails (_sendmail_, _postfix_) que l'on trouve sur les hébergements Linux. 

### Installation d'un serveur mail 

[Mailhog](https://github.com/mailhog/MailHog) permet d'intercepter les mails envoyés dans un environnement local sous Windows, tel que Wamp.   

**Procédure d'installation :**

* [Téléchargez ici](https://github.com/mailhog/MailHog/releases) le fichier _MailHog\_windows\_amd64.exe_ et déplacez-le dans _C:/wamp/mailhog/_ (répertoire _mailhog_ à créer).
* Renommez le fichier _mailhog.exe_.

### Configuration de Wamp

* Ouvrez le fichier _php.ini_ (fichier de configuration de PHP) : clic gauche sur l'icône Wamp > _PHP_ > _php.ini_.
* Recherchez la section _[mail function]_ 
* Renseignez les valeurs suivantes :

	* `SMTP = 127.0.0.1`
    * `smtp_port = 1025`
    * `sendmail_path = "C:/wamp/mailhog/mailhog.exe sendmail"`
    * `mail.log = "c:/wamp/logs/mails.log"`

* Redémarrez Wamp. 

> Pour activer une variable dans _php.ini_, il faut éventuellement la décommenter en supprimant le `;` en début de ligne.

### Lancement de mailhog

* Exécutez **en tant qu'administrateur** le fichier _C:/wamp/mailhog/mailhog.exe_
* Ouvrez l'adresse [http://localhost:8025](http://localhost:8025) dans votre navigateur

> Attention : Mailhog n'est qu'un émulateur qui ne fait qu'intercepter et afficher les mails sur le SMTP local, il ne les envoient pas réellement. C'est un outil de mise au point des mails en phase de développement et non pas un serveur de mails complet comme _sendmail_.

## la fonction `mail()`

Pour expédier un mail, PHP fournit la fonction [`mail()`](https://www.php.net/manual/fr/function.mail.php) :    

	mail(destinataire, objet, message, entêtes, paramètres)

Cette fonction retourne un booléen : `TRUE` si exécutée correctement, `FALSE` si échec.

Les arguments de la fonction sont, dans l'ordre : 

<table>
	<thead>
		<tr>
			<th>Paramètre</th>
			<th>Description</th>
		</tr>
	<thead>
	<tbody>
        <tr>
			<td>Destinataire</td>
			<td>l'adresse mail de la personne à laquelle on veut envoyer le mail.</td>	
		</tr>
        <tr>
			<td>Objet</td>
			<td>le sujet du mail, tel qu'il apparaîtra dans les clients de messagerie.</td>			
		</tr>
        <tr>
			<td>Message</td>
			<td>le contenu principal du mail, tel qu'il apparaîtra dans les clients de messagerie.</td>			
		</tr>
       	<tr>
			<td>From</td>
			<td>Expéditeur du mail.</td>			
		</tr>
        <tr>
			<td>Entêtes (= headers)</td>
			<td>des informations techniques facultatives. .</td>			            
		</tr>
		<tr>
			<td>Paramètres additionnels</td>
			<td>d'autres informations techniques facultatives.</td>			            
		</tr>       
	</tbody>
</table>

**Exemple** :  

	<?php
	mail("dave.loper@afpa.com", "Confirmation d'inscription", "Bienvenue sur Jarditou ! Tu peux y acheter des tomates cerises pour l'apéro et une brouette pour les transporter. Sors vite ton American Express !", array("From" => "contact@jarditou.com", "Reply-To" => "commercial@jarditou.com", "X-Mailer" => "PHP/".phpversion() );

> Pour éviter le spam, la plupart des hébergeurs ne permettent pas l'utilisation de cette fonction. Ils la désactivent ou en limitent l'usage (quota de nombre de mails sur une période donnée). Certains proposent une alternative : arguments limités, surcharge par d'autres fonctions... Il faut en tenir compte dans les critères de choix d'un hébergeur.

## Les paramètres de la fonction `mail()`

### Le(s) destinataire(s) 

Le destinataire peut être écrit sous différentes formes, mais le formatage de cette chaîne doit être conforme à la  norme RFC 2822. 

Formes les plus courantes : 

* `dave.loper@afpa.fr`
* `Dave Loper <dave.loper@afpa.fr>`

Il est possible d'indiquer plusieurs destinataires (attention, les filtres antispam n'aiment pas ça), dans ce cas les noms doivent être séparés par une virgule :   

	<?php
	$destinataire = "Dave Loper <dave.loper@afpa.fr>, jessica.pikatchien@laposte.net, alain.terieur@gmail.com";

### L'objet (sujet)

L'objet est le sujet du mail. Il doit lui aussi répondre à la norme RFC 2822 et respecter [des bonnes pratiques de rédaction](https://fr.sendinblue.com/blog/optimiser-objet-campagne-email), sous peine d'être classé comme spam; par conséquent cela relève plus du marketing.  

L'objet ne doit pas être [trop long](https://fr.sendinblue.com/blog/optimiser-objet-campagne-email), sous peine d'être tronqué à la lecture.

### Le corps

Le corps est la partie qui comprend le contenu du mail, c'est-à-dire la partie à afficher.   

Celui-ci peut-être au format texte ou HTML; il est possible de proposer pour un même mail une configuration prenant en compte ces 2 alternatives. 

### Les entêtes

Les entêtes - _headers_ - sont des informations techniques additionnelles, telles que : 

* le format (texte ou HTML), 
* l'encodage (UTF-8 en général)
* les destinataires en copie
* les pièces jointes

Ces informations sont facultatives mais dans la réalité certaines sont exigées par les services de messageries (Gmail, Outlook, Yahoo!...) sinon le mail est considéré comme spam. 

Les entêtes ne sont pas visibles lorsque vous visualisez un mail : il faut afficher le code source du mail (dans les logiciles de messagerie) pour les voir. 

Les entêtes peuvent être indiquées :

* avec une concaténation de chaînes, ce qui nécessite d'ajouter des caractères de retour chariot (`\n`, `\r` ou `\n\r`) pour séparer chaque entête (cf. exemple 1)
* soit, depuis la version 7.2.0 de PHP, sous forme de tableau PHP (cf. exemple 2). **Cette deuxième forme est désormais recommandée**, pour des raisons de lisibilité et de sécurité. 

> Avec la concaténation, une faille de sécurité majeure appelée [injection d'entêtes](https://www.phpsecure.info/v2/article/MailHeadersInject.php) était possible; celle-ci a été corrigée depuis les versions 5.4.42 et 5.5.27 de PHP.    

**Exemple 1 : déclaration d'entêtes par une chaîne concaténée**

> Cette syntaxe n'est plus recommandée depuis la version 7.2.0 de PHP.  

	$sHeaders  = 'MIME-Version: 1.0' . '\r\n';
    $sHeaders .= 'Content-Type: text/html; charset=utf-8' . '\r\n;
    $sHeaders .= 'From: Dave Loper <dave.loper@afpa.fr>' . '\r\n';
    $sHeaders .= 'Reply-to: Service commercial <commerciaux@jarditou.com>' . '\r\n';
    $sHeaders .= 'X-Mailer: PHP/' . phpversion(). '\r\n';
    
**Exemple 2 : déclaration d'entêtes par un tableau PHP**

> Cette syntaxe est **recommandée** depuis la version 7.2.0 de PHP.

	 $aHeaders = array('MIME-Version' => '1.0',
                       'Content-Type' => 'text/html; charset=utf-8',
                       'From' => 'Dave Loper <dave.loper@afpa.fr>',
                       'Reply-To' => 'Service commercial <commerciaux@jarditou.com>',
                       'X-Mailer' => 'PHP/' . phpversion()
                       );

Liste des entêtes courantes :

> Respecter la casse des noms d'entête.

<table>
	<thead>
		<tr>
			<th>Valeur</th>
			<th>Description</th>
		</tr>
	<thead>
	<tbody>
        <tr>
			<td>BCC</td>
			<td><i>Blind Carbon Copy</i>, ou copie carbone cachée : adresses mail des personnes recevant une copie du message; ces adresses sont masquéees par le destinataire. Attention, les logiciels antispam n'aiment pas.</td>	
		</tr>
        <tr>
			<td>CC</td>
			<td><i>Carbon Copy</i>, ou copie carbone : adresses mail des personnes recevant une copie du message; ces adresses sont visibles par le destinataire. Attention, les logiciels antispam n'aiment pas.</td>			
		</tr>
        <tr>
			<td>Content-Type</td>
			<td>Type de contenu du mail, c'est-à-dire le format.</td>			
		</tr>
       	<tr>
			<td>From</td>
			<td>Expéditeur du mail.</td>			
		</tr>
        <tr>
			<td>MIME-Version</td>
			<td>Version du type MIME, toujours la valeur <i>1.0</i>.</td>			            
		</tr>
		<tr>
			<td>Reply-To</td>
			<td>Adresse mail de réponse au mail. Si non indiquée, cette adresse sera celle de l'expéditeur spécifiée dans <i>From</i>.</td>			            
		</tr>  
        <tr>
			<td>X-Mailer</td>
			<td>Indique le logiciel, service ou langage (par exmple la version de PHP) utilisé pour envoyer le mail.</td>
		</tr>  
	</tbody>
</table>

## Format texte et format HTML

Un mail peut être envoyé soit au format texte, soit au format HTML, ou les 2 en même temps.

### Le format texte

Au format,  texte (_plain text_ en anglais), le mail sera affiché à la lecture en texte brut sans aucune mise en forme (couleurs, polices...), un peu comme dans le bloc-note donc.

Il s'agit du format par défaut, il est donc inutile de le préciser dans les entêtes, c'est donc que vous avez vu au paragraphe _la fonction `mail()`_. 

Le format texte permet de s'assurer que le mail pourra être lu par tous les dispositifs d'affichage et tous les logiciels. Ceci est de moins en moins vrai car la plupart des clients de messagerie modernes sont capables d'interpréter le format HTML.  
   
**Exemple**

	$aHeaders[] = "Content-Type: text/plain; charset=utf-8";

### Le format HTML

Dans le format HTML, un mail est affiché à l'internaute comme une véritable page web avec une structure en HTML, une mise en forme via CSS, ajout de liens, d'images etc., on peut même y adjoindre des interactions Javascript.  

Pour indiquer le format HTML, il faut ajouter les 2 entêtes suivantes :

	$aHeaders[] = 'MIME-Version: 1.0';
    $aHeaders[] = 'Content-Type: text/html; charset=utf-8';

Le message sera lui codé en HTML. 

**Exemple (avec Bootstrap)**  

	$message = "<!DOCTYPE html>
	<html lang='fr'>
	<head>
	<meta charset='utf-8'>
	<title>Mon premier mail HTML</title>   
	<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'>
	<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>
	<style>
	html 
	{
	   font-size: 100%;
	}
	
	body 
	{
	    font-size: 1rem; /* Si html fixé à 100%, 1rem = 16px = taille par défaut de police de Firefox ou Chrome */
	}
	</style>  
	</head>
	<body>
	<div class='container'>
	    <div class='row'>
		    <div class='col-12'>
	          <h1>Mon premier mail HTML</h1>
	      </div>    
		</div> 	 
		<div class='row'>
		    <div class='col-12'>
	          Ouah c'est trop génial ! On peut même mettre une image.
	      </div>    
		</div> 	 
		<div class='row'>
		    <div class='col-12'>
	          <img src='jarditou_logo.jpg' title='Logo' alt='Logo' class='img-fluid'>
	 	    </div>    
		</div> 	 
	</div> 
	<script src='https://code.jquery.com/jquery-3.3.1.slim.min.js' integrity='sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo' crossorigin='anonymous'></script>
	<script src='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js' integrity='sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM' crossorigin='anonymous'></script>
	</body>
	</html>";

Bien évidemment, on peut mettre dans le code de la page des variables PHP : données postées d'un formulaire (de contact par exemple) ou extraites d'une base de données. 

### Formats combinés 

Il est recommandé en termes de bonnes pratiques de proposer un mail dans [les 2 formats](https://www.arobase.org/newsletters/mime-multipart-alternative.htm). 

Dans ce cas, le code source du mail est alors scindé en 2 parties distinctes séparées par une "frontière" (_boundary_ en anglais). On retrouve cette technique dans les mails avec pièce jointe.  

## Mail avec pièce jointe

Pour envoyer un mail en pièce jointe, il est nécessaire de distinguer la partie de code concernant le texte du mail et ses entêtes de celle concernant la pièce jointe elle-même. On utilise pour cela une délimitation, nommée _boundary_ en anglais : [exemple](https://medium.com/sroze/php-envoyer-des-mails-en-html-et-avec-des-pi%C3%A8ces-jointes-854a21ea27e).

## Librairies, frameworks, CMS et services d'emailing

Pour faciliter le codage des mails, des librairies externes telles que [SwiftMailer](https://swiftmailer.symfony.com) (écosystème Symfony) ou encore [PHPMailer](https://github.com/PHPMailer/PHPMailer) ont vu le jour. 

Les frameworks et les CMS possèdent eux des outils natifs ou des plugins, par exemple la librairie [Email](https://www.codeigniter.com/user_guide/libraries/email.html) dans CodeIgniter.

Enfin, il existe aussi des services d'envoi de mails en masse (campagne emailing, newsletters) en ligne tels que Mailchimp ou Sarbacane, en partie payants et qui assurent une délivrabilité optimale des campagnes d'emailing avec un suivi statistique (taux d'ouverture, de désincription etc.). 

## Bonnes pratiques

L'envoi de mails doit implémenter certaines bonnes pratiques, sous peine de vous retrouver blacklisté (adresse mail ou nom de domaine) comme spammeur :   

* balisage HTML correct
* définition de l'encodage (UTF-8) 
* HTML responsive pour qu'il puisse être lisible aussi bien sur PC que sur smartphones ou tablettes 
* Présence obligatoire d'un lien de désinscription de l'utilisateur
* Lien de redirection du mail vers une page web permettant l'affichage correct du mail (dans le cas où le client de messagerie ne le permet pas) 

> Votre serveur (adresse IP) pourrait être blacklisté comme spammeur pour longtemps (il existe des bases de données sur lesquelles se fondent les logiciels antispam). Vous pouvez cependant vous retrouver avec un mail classé en spam suite à une mauvaise configuration du serveur ou un contenu mal interprété. 

## Ressources 

* [arobase.org](https://www.arobase.org/bases)

<br><br><br><br>