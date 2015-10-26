var exec   = require('child_process').exec;
var parser = require('./parser').parser;

var tag = require('./tagger.js').tag;
var download_song = require('./youtubedl.js').download_song;

var get_url = function () {

    // [0] = exe [1] = file
    var url = process.argv[ 2 ];
    return url;
};

var target_dir = "X:\\Dropbox\\js\\mp3\\";
var dir_lame      = "";
var dir           = "X:\\Dropbox\\js\\mp3";

var url = get_url();
var fs = require( 'fs' );
var hash_code = require('./helper').hash_code;
var mkdirIfNoDir = require('./helper').mkdirIfNoDir;
mkdirIfNoDir( target_dir + hash_code( url ).toString() );
var cmd_csp = parser( "casperjs.bat", { "crawler.js" : "" }, url, "" );

var opt = { cwd : dir };
var t = function () {
    return tag( url );
};

var eventEmitter = exec( cmd_csp, opt, function ( err, stdout, stderr ) {
    if ( err !== null ) { console.log("err : " + err); }
    download_song( url, t );
} );

eventEmitter.stdout.on( 'data', function ( data ) {
    process.stdout.write( data );
});

