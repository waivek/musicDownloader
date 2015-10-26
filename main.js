var exec   = require('child_process').exec;
var parser = require('./parser').parser;

var tag = require('./tagger.js').tag;
var download_song = require('./youtubedl.js').download_song;

var get_url = function () {

    // [0] = exe [1] = file
    var url = process.argv[ 2 ];
    return url;
};

var dir_target    = "X:\\Dropbox\\js\\mp3\\music";
var dir_lame      = "";
var dir           = "X:\\Dropbox\\js\\mp3";

var url = get_url();
var cmd_csp = parser( "casperjs.bat", { "crawler.js" : "" }, url, "" );
console.log("cmd_csp : " + cmd_csp);

var opt = { cwd : dir };

var eventEmitter = exec( cmd_csp, opt, function ( err, stdout, stderr ) {
    if ( err !== null ) {
        console.log("err : " + err);
    }
    console.log("\n===Downloading Song===");
    download_song( url );
    console.log("\n===Tagging Song===");
    tag( url );
} );

eventEmitter.stdout.on( 'data', function ( data ) {
    process.stdout.write( data );
});


