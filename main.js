var exec   = require('child_process').exec;
var hash_code = require('./helper').hash_code;
var fs = require( 'fs' );
var parser = require('./parser').parser;
var mkdirIfNoDir = require('./helper').mkdirIfNoDir;

var tag = require('./tagger.js').tag;
var download_song = require('./youtubedl.js').download_song;

var playlist_to_array = function ( url_playlist ) {
    return [ "https://www.youtube.com/watch?v=_KMyql7K98o",
             "https://www.youtube.com/watch?v=tL_TFXbSnLY" ];
};

var get_url_array = function () {
    return playlist_to_array( "whatever" );

    // [0] = exe [1] = file
    var url = process.argv[ 2 ];
    return [ url ];
};

var target_dir = "X:\\Dropbox\\js\\mp3\\";
var dir_lame      = "";

var main = function ( url ) {
    mkdirIfNoDir( target_dir + hash_code( url ).toString() );
    var cmd_csp = parser( "casperjs.bat", { "crawler.js" : "" }, url, "" );

    var opt = { cwd : target_dir };
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

};

var array_url = get_url_array();
array_url.map( main );
