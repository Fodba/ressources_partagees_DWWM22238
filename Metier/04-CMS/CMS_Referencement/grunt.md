# GRUNT

Grunt est un `task runner`, un outil d'automatisation pour exécuter des tâches répétitives en rapport avec la publication de votre site Web. Il existe des outils similaires : Gulp ou encore Webpack sont les plus connus.

Il permet notamment de :

* minimifier (compressez) vos fichiers CSS et Javascript
* assembler plusieurs fichiers en un seul
* compiler des fichiers `.less` ou `.sass` en `.css`
* transférez des fichiers en `ftp` ou `sftp` chez vote hébergeur.

## Installation et configuration du projet

Grunt est outil conçu avec Node.js. Vous devez d'abord installer Node en vous rendant sur [le site de téléchargement](https://nodejs.org/en).

Nous allons tout d'abord créer le fichier `package.json`, nécessaire au fonctionnement des applications développées avec Node.js.

La commande ci-dessous permet de créer ce fichier.

```
npm init
```

Ensuite nous installons l'application Grunt :

	npm install -g grunt-cli

	npm install grunt --save-dev


## Le fichier de configuration `Gruntfile.js`

Ensuite, vous devez créer un fichier `Gruntfile.js` qui contient la description des différentes tâches.

	module.exports = function(grunt) {
  		// Configuration de Grunt
  		grunt.initConfig({
      // La configuration des différents plugins se place ici !
  	});

	  // Définition des tâches Grunt
	  grunt.registerTask("default", "");
};

## Exemple de cas pratique

L'application Web est structurée de la façon suivante :

```
┬─css/
│ ├─style1.css
│ └─style2.css
├─js/
│ ├─fichier1.css
│ └─fichier2.css
├─index.html
├─style.min.css
└─script.min.js
```

Votre code CSS se trouve dans le répertoire `css`.

Votre code Javascript se trouve dans le répertoire `js`.

Les fichiers _style.min.css_ et _script.min.js_ seront générés automatiquement à partir de vos fichiers.

Avec Grunt nous allons:

* concaténer les fichiers
* compresser les fichiers `css`
* compresser les fichiers `js`
* transférer le résultat sur le site distant

## Première tâche : concaténation de fichiers 

Installation du plugin de concaténation.

```
npm install grunt-contrib-concat --save-dev
```

Puis nous modifions notre fichier `Gruntfile.js` :

```javascript
module.exports = function(grunt) {
    // Configuration de Grunt
    grunt.initConfig({
        concat: {   
            tache1: {
                src: [ 'js/*.js' ],
                dest: 'tmp/production.js',
                nonull: true
            },
            tache2: {
                src: [ 'css/*.css' ],
                dest: 'tmp/style.css',
                nonull: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    // Définition des tâches Grunt
    grunt.registerTask("default", "concat");
};
```

Dans la configuration du plugin, nous déclarons deux tâches :

```
   tache1: {
      src: [ 'js/*.js' ],
             dest: 'tmp/production.js',
             nonull: true
        },
   tache2: {
      src: [ 'css/*.css' ],
      dest: 'tmp/style.css',
              nonull: true
      }
```

Ce premier exemple permet de spécifier les fichiers à concaténer `'js/*.js'` et le fichier de destination `tmp/production.js`.

L'exemple complet permet de concaténer les fichiers `css` dans le fichier `style.css` et les fichiers `js` dans `production.js`.

Tester le premier exemple en tapant la commande ci-dessous

```
grunt
```

Vérifiez le résutat.

## Deuxième tâche : Compresser / Minimifier JS

Pour compresser les fichiers `Javascript`, nous allons utiliser le plugin `Uglify`

Nous devons d'abord installer le plugin _uglify_ :

```
npm install grunt-contrib-uglify --save-dev
```

Puis, nous modifions le `Gruntfile.js`

```javascript
module.exports = function(grunt) {
    // Configuration de Grunt
    grunt.initConfig({
        concat: {   
            tache1: {
                src: [ 'js/*.js' ],
                dest: 'tmp/production.js',
                nonull: true
            },
            tache2: {
                src: [ 'css/*.css' ],
                dest: 'tmp/style.css',
                nonull: true
            }
        },
        uglify: {
	        build: {
    	        src: 'tmp/production.js',
    	        dest: 'script.min.js'
	        }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Définition des tâches Grunt

    grunt.registerTask("default", ["concat", "uglify"]);
};
```

La configuration `Uglify` permet de spécifier la source `tmp/production.js` et la destination `script.min.js`.

```
uglify: {
    build: {
        src: 'tmp/production.js',
        dest: 'script.min.js'
    }
}
```

Relancez `grunt` pour vérifier le résultat.

```
grunt
```

## Troisème tâche : Compresser / Minifier CSS

Installation du plugin :

```
npm install grunt-contrib-cssmin --save-dev
```

Modification du fichier `Gruntfile.js`

```javascript
module.exports = function(grunt) {
    // Configuration de Grunt
    grunt.initConfig({
        concat: {   
            tache1: {
                src: [ 'js/*.js' ],
                dest: 'tmp/production.js',
                nonull: true
            },
            tache2: {
                src: [ 'css/*.css' ],
                dest: 'tmp/style.css',
                nonull: true
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'tmp',
                    src: ['*.css', '!*.min.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
	        build: {
    	        src: 'tmp/production.js',
    	        dest: 'script.min.js'
	        }
        }

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Définition des tâches Grunt

    grunt.registerTask("default", ["concat", 'cssmin', "uglify"]);
};
```

Testez le résultat de la commande `grunt`.

Vous devriez avoir deux fichiers `script.min.js` et `style.min.css`.

Essayez de modifiez le contenu de vos fichiers sources, puis relancez `grunt` pour vérifier que votre `workflow` fonctionne correctement.

## Pour finir, déploiement de votre site

Nous allons utilisez le plugin `sftp-deploy`

```bash
npm install grunt-sftp-deploy --save-dev
```

```javascript
module.exports = function(grunt) {
    // Configuration de Grunt
    grunt.initConfig({
        concat: {   
            tache1: {
                src: [ 'js/*.js' ],
                dest: 'tmp/production.js',
                nonull: true
            },
            tache2: {
                src: [ 'css/*.css' ],
                dest: 'tmp/style.css',
                nonull: true
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'tmp',
                    src: ['*.css', '!*.min.css'],
                    dest: '',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
	        build: {
    	        src: 'tmp/production.js',
    	        dest: 'script.min.js'
	        }
        },
        'sftp-deploy': {
            build: {
              auth: {
                host: 'dev.amorce.org',
                port: 22,
                authKey: 'config_ssh_1'
              },
              src: './',
              dest: './web/test',
              exclusions: ['css', 'js', 'tmp', 'node_modules', '.ftppass', 'package*.json', 'Gruntfile.js'],
              serverSep: '/',
              localSep: '\\',
              concurrency: 4,
              progress: true
            }
          }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    // Définition des tâches Grunt
    grunt.registerTask('deploy', ['concat', 'cssmin', 'uglify', 'sftp-deploy']);
    grunt.registerTask("default", ["concat", 'cssmin', "uglify"]);
};
```

La configuration de `sftp-deploy` permet de spécifier les informations nécésaires au déploiement.

```
'sftp-deploy': {
    build: {
        auth: {
            host: 'dev.amorce.org',
            port: 22,
            authKey: 'config_ssh_1'
        },
        src: './',
        dest: './web/test',
        exclusions: ['css', 'js', 'tmp', 'node_modules', '.ftppass', 'package*.json',Gruntfile.js'],
        serverSep: '/',
        localSep: '\\',
        concurrency: 4,
        progress: true
    }
}
```
Vos identifiant et mot de pasee ssh sont à noter dans un fichier `.ftppass`

```
{
  "config_ssh_1": {
    "username": "votre_identifiant",
    "password": "votre_mot_de_passe"
  }
}
```

Dans le fichier de configuration, nous avons enregistrer une tâche supplémentaire.

```javascript
// Définition des tâches Grunt
grunt.registerTask('deploy', ['concat', 'cssmin', 'uglify', 'sftp-deploy']);
grunt.registerTask("default", ["concat", 'cssmin', "uglify"]);
```

Si vous tapez simplement `grunt` dans le terminal, Grunt va déclencher les tâches suivantes:  `concat`, `cssmin`, `uglify`

Si vous tapez `grunt deploy` dans le terminal, Grunt va déclencher les tâches : `concat`, `cssmin`, `uglify`, `sftp-deploy`

Adaptez les paramètres de l'exemple pour vérifier que le déploiement fonctionne correctement.

# Mise en application

Adaptez cet exemple pour l'utiliser dans le cadre de votre projet Fil Rouge.