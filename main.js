var exec   = require('child_process').exec;
var parser = require('./parser').parser;

var tag = require('./tagger.js').tag;
var download_song = require('./youtubedl.js').download_song;

var get_url = function () {
    var url = "https://www.youtube.com/watch?v=2om182Fmtd8";
    return url;
};

var dir_target    = "X:\\Dropbox\\js\\mp3\\music";
var dir_lame      = "";
var dir           = "X:\\Dropbox\\js\\mp3";

var url = get_url();
var cmd_dl = parser( "casperjs.bat", { "crawler.js" : "" }, url, "" );
console.log("cmd_dl : " + cmd_dl);

var opt = { cwd : dir };

var eventEmitter = exec( cmd_dl, opt, function ( err, stdout, stderr ) {
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

