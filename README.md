# Word associations dictionary
The most comprehensive dictionary of word associations available today, combining data from:
 * [Edinburgh Associative Thesaurus (EAT)](http://www.eat.rl.ac.uk/)
 * [University of South Florida Free Association Norms (USF-FAN)](http://w3.usf.edu/FreeAssociation/)
 * [wordassociation.org](http://www.wordassociation.org/about/)
 * Taboo games online:
   * [taboogame.net](http://taboogame.net)
   * [playtaboo.com](http://www.playtaboo.com)

## data format
* version 2 : 
* version 1 : limited to 11 associations per keyword
  * takes in original ```xml``` files 
  * and outputs ```tabfile``` for use in ```stardict-editor``` (included in repository, windows binary)

## quick start
A precompiled version of the Word associations dictionary is available from the ```output``` folder in the repository

## usage
```node create.js <number of associations>```

creates a file named ```result``` with specified number of associations per word

## suggested workflow
```node create.js 10```

```stardict-editor.exe``` (unzip from ```tools\stardict editor.zip```) -- load ```result``` with the gui

```dictzip <result>.dict```

```dictzip <result>.idx```

## example usage / demos
Below are some projects that make use of the word associations dictionary:
- [Exploring word associations](https://github.com/monolithpl/word.associations)
- [Create Taboo cards for ESL conversation classes. Learn through word associations](https://github.com/monolithpl/taboo-cards)
![screenshot](http://monolithpl.github.io/word.associations/word-associations.png "screenshot")
![screenshot](http://monolithpl.github.io/taboo-cards/taboo.png "screenshot")

MIT License

Copyright 2016-7 Wiktor Jakubczyc
