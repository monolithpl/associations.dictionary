# Word associations dictionary
The most comprehensive dictionary of word associations available today, combining data from:
 * [Edinburgh Associative Thesaurus (EAT)](http://www.eat.rl.ac.uk/)
 * [University of South Florida Free Association Norms (USF-FAN)](http://w3.usf.edu/FreeAssociation/)
 * [wordassociation.org](http://www.wordassociation.org/about/)
 * Taboo games online:
   * [taboogame.net](http://taboogame.net)
   * [playtaboo.com](http://www.playtaboo.com)

## data format
There are two versions of the word associations dictionary in the repository:
* **associations-full** : the complete list of associations (in CSV, [DICT](https://en.wikipedia.org/wiki/DICT) and SQL formats)
* **associations-tiny** : limited to 11 associations per keyword (in CSV and [DICT](https://en.wikipedia.org/wiki/DICT) formats)
 
## make your own
If you don't want to use the precompiled version of the word associations dictionary, you can create your own using the Node ```create.js``` scripts, which
* takes source ```xml``` data files from the ```sourcedata``` folder
* and outputs a ```tabfile``` for use in ```stardict-editor``` (included in repository, windows binary)

### usage
```node create.js <number of associations>``` creates a file named ```result``` with specified number of associations per word

### suggested workflow
1. ```node create.js 10```
1. ```stardict-editor.exe``` (unzip from ```tools\stardict editor.zip```) -- load ```result``` with the gui
1. ```dictzip <result>.dict```
1. ```dictzip <result>.idx```

## example usage / demos
Below are some projects that make use of the word associations dictionary:
- [Exploring word associations](https://github.com/monolithpl/word.associations)
- [Create Taboo cards for ESL conversation classes. Learn through word associations](https://github.com/monolithpl/taboo-cards)
[![Exploring word associations](http://monolithpl.github.io/word.associations/word-associations.png)](https://github.com/monolithpl/word.associations)
[![Create Taboo cards](http://monolithpl.github.io/taboo-cards/taboo.png)](https://github.com/monolithpl/taboo-cards)

MIT License

Copyright 2016-7 Wiktor Jakubczyc
