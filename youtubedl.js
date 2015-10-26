module.exports = {
    download_song : function ( url ) {
        var flg_dl = get_youtubedl_options_object( url );
        var str_hash = hash_code( url ).toString();
        var cmd_dl = parser( "youtube-dl", flg_dl, url, "" );
        var dir_song = target_dir + str_hash;
        var opt = { cwd : dir_song };

        console.log("cmd_dl : " + cmd_dl);

        mkdirIfNoDir( dir_song );

        var eventEmitter = exec( cmd_dl, opt, function ( err, stdout, stderr ) {
            console.log("stderr : " + stderr);
            if ( err !== null ) {
                console.log("err : " + err);
            }
        });
        eventEmitter.stdout.on( 'data', function ( data ) {
            process.stdout.write( data );
        });

    }
};
var add_quotes    = require('./helper').add_quotes;
var obj_to_string = require('./helper').obj_to_string;
var parser        = require('./parser').parser;
var hash_code     = require('./helper').hash_code;
var get_hash_path = require('./helper').get_hash_path;
var exec          = require('child_process').exec;
var target_dir    = "X:\\Dropbox\\js\\mp3\\";
var fs            = require( 'fs' );

var get_youtubedl_options_object = function ( url ) {
    var hash = hash_code ( url ) + ".%(ext)s";
    return {
        "-x"             : "",
        "--audio-format" : "mp3",
        "-o"             : hash,
        "--audio-quality": "320k"
    };
};

var mkdirIfNoDir = function ( dir_song ) {
    // http://stackoverflow.com/questions/21194934/node-how-to-create-a-directory-if-doesnt-exist/21196961#21196961
    // TODO: This is supposedly bad practice but it works.
    if ( !fs.existsSync( dir_song ) ) {
        fs.mkdirSync( dir_song );
    }
};
