# De l'Algo au Javascript

## Déclaration et utilisation de variables
```bash
# Algo
Variable a en Entier
a ← 12
```

```javascript
// Javascript
var a ;
a = 12 ;
```

```bash
# Algo
Variable nom en Caractères
nom ← "Toto"
```

```javascript
// Javascript
var nom;
nom = "Toto";
```

## Convertir une chaine en valeur numérique
```javascript
// Javascript
var a = "12"; 
var c = 12;
var b = parseInt(a);
```

## Problème avec la concaténation ou l'addition
```javascript
// Javascript
var a = "123";
var b = "45";
var c = a+b; // c contient "12345"
```

```javascript
// Javascript
var a = 123;
var b = 45;
var c = a+b; // c contient 168
```

```javascript
// Javascript
var a = "123";
var b = "45";
var c = parseInt(a)+parseInt(b); // c contient 168
```
 
## Lire et Ecrire

```bash
# Algo
Variable nom en Caratère
Ecrire "Entrez votre nom"
Lire nom
```

```javascript
// Javascript
var nom;
nom = prompt("Entrez votre nom");
```

```bash
# Algo
Variable a en Entier
Ecrire "Entrez un nombre"
Lire a
```

```javascript
// Javascript
var a;
a = parseInt(prompt("Entrez un nombre"));
```

```bash
# Algo
Variable message en Caractère
message ← "Bonjour toi"
Ecrire message
```

```javascript
// Javascript
var message = "Bonjour toi";
alert(message);
```
 
## Conditions
```bash
# Algo
Si a>12 Alors
	Ecrire "C'est beaucoup"
Sinon
	Ecrire "C'est peu"
```

```javascript
// Javascript
if (a>12) {
	alert("C'est beaucoup");
} 
else {
    alert("C'est peu");
}
```

```bash
# Algo
Si a>12 Alors
	Ecrire "C'est beaucoup"
SinonSi a<0
	Ecrire "C'est très peu"
Sinon
	Ecrire "C'est moyen"
```

```javascript
// Javascript
if (a>12) {
	alert("C'est beaucoup");
} 
else if (a<0) {
    alert("C'est très peu");
}
else {
    alert("C'est moyen");
}
```

> ATTENTION: pour comparer si deux valeurs sont égales, vous devez utiliser `==`

Exemple 

```javascript
// Javascript
var a;

a = 12; // Affectation

if (a==7) { // Comparaison
	alert("Bien essayé !");
}
else {
	alert("Dommage !");
}
```

## Exécuter le code 
* Pour Firefox : cliquer sur les touches `MAJ` + `F4` pour lancer l'ardoise Javascript. Saisir votre code javascript puis touches `CTRL` + `R` pour l'exécuter.
* Pour Chrome, installer l'extension [ScratchJS](https://chrome.google.com/webstore/detail/scratch-js/alploljligeomonipppgaahpkenfnfkn). Cliquer sur `F12`,  puis sur l'onglet `ScratchJS` du panneau qui s'ouvre (panneau appelé outils développeurs/console). Saisir votre code javascript puis cliquer sur le bouton `Run` (ou touches `Ctrl` + `Entrée`).


<!-- 
## Structure d'une page de test

Fichier exemple1.html
```html
<script>
	alert("Bonjour à toi");
</script>
```
-->

