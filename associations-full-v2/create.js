var readEachLine = require('./read-each-line')
var fs = require('fs')
var words = []
var headWord = ''

function getMatches(string, regex) {
	var matches = []
	var match
	while (match = regex.exec(string))
	{
		matches.push(match[1])
	}
	return matches
}


readEachLine('../data/eat-stimulus-response.xml', function(line) {
	if (line.indexOf('<stimulus word=') > -1) {
		headWord = line.match(/<stimulus word="(.+?)"/)[1]
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		words[headWord] = []
	}
	
	if (line.indexOf('<response word=') > -1){
		var association = line.match(/<response word="(.+?)"/)[1]
		try {
			if (association !== headWord) words[headWord].push(association)
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})

readEachLine('../data/eat-response-stimulus.xml', function(line) {
	if (line.indexOf('<response word=') > -1) {
		headWord = line.match(/<response word="(.+?)"/)[1]
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		if (!words[headWord]) words[headWord] = []
	}
	
	if (line.indexOf('<stimulus word=') > -1){
		var association = line.match(/<stimulus word="(.+?)"/)[1]
		try {
			if (association !== headWord) words[headWord].push(association)
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})

readEachLine('../data/florida-cue-target.xml', function(line) {
	if (line.indexOf('<cue word=') > -1) {
		headWord = line.match(/<cue word="(.+?)"/)[1]
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		if (!words[headWord]) words[headWord] = []
	}
	
	if (line.indexOf('<target word=') > -1){
		var association = line.match(/<target word="(.+?)"/)[1]
		try {
			if (association !== headWord) words[headWord].push(association)
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})

readEachLine('../data/florida-target-cue.xml', function(line) {
	if (line.indexOf('<target word=') > -1) {
		headWord = line.match(/<target word="(.+?)"/)[1]
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		if (!words[headWord]) words[headWord] = []
	}
	
	if (line.indexOf('<cue word=') > -1){
		var association = line.match(/<cue word="(.+?)"/)[1]
		try {
			if (association !== headWord) words[headWord].push(association)
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})


readEachLine('../data/wordassociation.org.xml', function(line) {
	if (line.indexOf('\t') == -1) {
		headWord = line
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		if (headWord == 'splice') headWord = 'splice_'
		if (headWord == 'entries') headWord = 'entries_'
		if (headWord == 'constructor') headWord = 'constructor_'
		if (!words[headWord]) words[headWord] = []
	}
	else {
		try {
			words[headWord].push(line.substr(1))
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})

readEachLine('../data/taboo.net.xml', function(line) {
	if (line.indexOf('\t') == -1) {
		headWord = line
		if (headWord == 'length') headWord = 'length_'
		if (headWord == 'shift') headWord = 'shift_'
		if (headWord == 'reduce') headWord = 'reduce_'
		if (headWord == 'splice') headWord = 'splice_'
		if (headWord == 'entries') headWord = 'entries_'
		if (headWord == 'constructor') headWord = 'constructor_'
		if (!words[headWord]) words[headWord] = []
	}
	else {
		try {
			words[headWord].push(line.substr(1))
		}
		catch(err) {
			console.log('error at headword:' + headWord + ', association:' + association)
		}
	}
})

for (mainWord in words) {

	var counts = words[mainWord].reduce(function ( stats, word ) {
		if ( stats.hasOwnProperty( word ) ) {stats[ word ] = stats[ word ] + 1}
		else {stats[word] = 1}
		return stats
	}, {})

	keysSorted = Object.keys(counts).sort(function(a,b){return counts[b]-counts[a]})
	var filtered = []
	for (var i = 0; i < keysSorted.length; i++)	{
		filtered.push(keysSorted[i])
	}

	fs.appendFileSync('result', mainWord + '\t' + filtered.join(',') + '\n')
}