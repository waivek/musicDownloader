var execSync   = require('child_process').execSync;
var hash_code = require('./helper').hash_code;
var fs = require( 'fs' );
var parser = require('./parser').parser;
var mkdirIfNoDir = require('./helper').mkdirIfNoDir;

var tag = require('./tagger.js').tag;
var download_song = require('./youtubedl.js').download_song;

var parse_arguments = function () {
    
    // [0] = exe [1] = file
    var url = process.argv[ 2 ];

    if ( url === undefined ) {
        throw new Error("Please Enter a YouTube URL" );
    }
    else if ( url.indexOf( "list" ) > -1 ) {
        return playlist_to_array( url );
    } else if ( url.indexOf( "watch" ) > -1 ) {
        return [ url ];
    } else {
        console.log( "Invalid Arguments" );
        console.log( "Please Enter YouTube url containing 'watch' or 'list'" );
        throw new Error();
    }

};

var playlist_to_array = function ( url_playlist ) {
    var obj_list = {
        "playlist_converter.js" : ""
    };
    var array_links = [];
    var cmd_list = parser( "casperjs.bat", obj_list, url_playlist, "" );
    execSync( cmd_list, { cwd: target_dir, stdio : [ 0, 1, 2 ] } );

    var fs = require( 'fs' );
    var obj_links = JSON.parse(fs.readFileSync("links.json", 'utf8'));
    if ( obj_links.hasOwnProperty( "links" ) ) {
        array_links = obj_links[ "links" ];
    } else {
        console.log( "No property called links. Exiting" );
        throw new Error();
    }
    return array_links;
};

var target_dir = "X:\\Dropbox\\js\\mp3\\";
var dir_lame      = "";

var main = function ( url ) {
    mkdirIfNoDir( target_dir + hash_code( url ).toString() );
    var cmd_csp = parser( "casperjs.bat", { "crawler.js" : "" }, url, "" );

    var opt = { 
        cwd   : target_dir,
        stdio : [ 0, 1, 2 ]
    };
    var t = function () {
        return tag( url );
    };

    // var eventEmitter = execSync( cmd_csp, opt, function ( err, stdout, stderr ) {
    execSync( cmd_csp, opt );
    download_song( url );
    tag( url );

    // eventEmitter.stdout.on( 'data', function ( data ) {
    //     process.stdout.write( data );
    // });

};



var args = parse_arguments();
// console.log("args : " + args);

args.map( main );
