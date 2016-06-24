# Word associations dictionary
The most comprehensive dictionary of word associations today, combining data from:
 * [Edinburgh Associative Thesaurus (EAT)](http://www.eat.rl.ac.uk/)
 * [University of South Florida Free Association Norms (USF-FAN)](http://w3.usf.edu/FreeAssociation/)
 * [wordassociation.org](http://www.wordassociation.org/about/)
 * [taboogame.net](http://taboogame.net) and [playtaboo.com](http://www.playtaboo.com)

###data format
- takes in original ```xml``` files 
- and outputs ```tabfile``` for use in ```stardict-editor``` (included in repository, windows binary)

###quick start
A precompiled version of the Word associations dictionary is available from the ```output``` folder in the repository

### usage
```node create.js <number of associations>```

creates a file named ```result``` with specified number of associations per word

### suggested workflow
```node create.js 10```

```stardict-editor.exe``` (unzip from ```tools\stardict editor.zip```) -- load ```result``` with the gui

```dictzip <result>.dz```

```dictzip <result>.idx```

### example usage
Below are some projects that make use of the word associations dictionary:
- [Exploring word associations](http://monolithpl.github.io/word.associations/)
- [Create Taboo cards for ESL conversation classes. Learn through word associations](http://monolithpl.github.io/taboo-cards/)

MIT License

Copyright 2016 Wiktor Jakubczyc
