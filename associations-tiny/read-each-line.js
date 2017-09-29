/**
 * Read file line by line, synchronously.
 * 
 * Example:
 *
 * var readEachLine = require('read-each-line')
 * 
 * readEachLine('test.txt', 'utf8', function(line) {
 *   console.log(line)
 * })
 *
 * Encoding can optionally be omitted, in which case it will default to utf8:
 *
 * readEachLine('test.txt', function(line) {
 *   console.log(line)
 * })
 *
 * Github: https://github.com/gkovacs/read-each-line-sync
 * Author: Geza Kovacs http://www.gkovacs.com/
 * Based on readLineSync https://gist.github.com/Basemm/9700229
 * License: MIT
 */


var fs = require('fs'),
    os = require('os');


var EOL = os.EOL;

/**
 * Get a line from buffer & return it + remaining buffer
 *
 * @param {Buffer} buffer
 */
function getLine(buffer) {
    var i, line, newBuffer, end;
    
    for(i = 0; i < buffer.length; i++) {
        //detect end of line '\n'
        if ( buffer[i] === 0x0a) {

            end = i;
            
            if ( EOL.length > 1 ) {
                //account for windows '\r\n'    
                end = i - 1;
            }

            return {
                line: buffer.slice(0, end).toString(),
                newBuffer: buffer.slice(i + 1)
            }
        }
    }
    
    return null;
}

/**
 * Read file line by line synchronous
 * 
 * @param {String} path
 * @param {String} encoding - "optional" encoding in same format as nodejs Buffer
 */
module.exports = function readEachLine(path, encoding, processline) {

    if (typeof(encoding) == 'function') { // default to utf8 if encoding not specified
        processline = encoding;
        encoding = 'utf8';
    }

    var fsize,
        fd,
        chunkSize = 64 * 1024, //64KB
        bufferSize = chunkSize,
        remainder,
        curBuffer = new Buffer(0, encoding),
        readBuffer,
        numOfLoops;
        
    if ( !fs.existsSync( path ) ) {
        throw new Error("no such file or directory '" + path + "'");
    }

    fsize = fs.statSync(path).size;
    
    if ( fsize < chunkSize ) {
        bufferSize = fsize;
    }
    
    numOfLoops = Math.floor( fsize / bufferSize );
    remainder = fsize % bufferSize;
    
    fd = fs.openSync(path, 'r');
    
    for (var i = 0; i < numOfLoops; i++) {
        readBuffer = new Buffer(bufferSize, encoding);
        
        fs.readSync(fd, readBuffer, 0, bufferSize, bufferSize * i);
        
        curBuffer = Buffer.concat( [curBuffer, readBuffer], curBuffer.length + readBuffer.length );
        var lineObj;
        while( lineObj = getLine( curBuffer ) ) {
            curBuffer = lineObj.newBuffer;
            processline(lineObj.line);
        }
    }
    
    if ( remainder > 0 ) {
        readBuffer = new Buffer(remainder, encoding);
        
        fs.readSync(fd, readBuffer, 0, remainder, bufferSize * i);
        
        curBuffer = Buffer.concat( [curBuffer, readBuffer], curBuffer.length + readBuffer.length );
        var lineObj;
        while( lineObj = getLine( curBuffer ) ) {
            curBuffer = lineObj.newBuffer;
            processline(lineObj.line);
        }
    }
    
    //return last remainings in the buffer in case
    //it didn't have any more lines
    if ( curBuffer.length ) {
        processline(curBuffer.toString());
    }

    fs.closeSync(fd);
}