module.exports = {
    download_song : function ( url ) {
        var flg_dl = get_youtubedl_options_object( url );
        var input  = url;
        var exe    = "youtube-dl";

        var fs = require( 'fs' );
        var str_hash = hash_code( url ).toString();
        var file_name = get_hash_path( target_dir, str_hash, "json" );
        var obj_song = JSON.parse(fs.readFileSync(file_name, 'utf8'));

        var cmd_dl = parser( exe, flg_dl, input, "" );
        var dir_song = target_dir + str_hash;
        console.log("dir_song : " + dir_song);
        console.log("cmd_dl : " + cmd_dl);
        var opt = { cwd : dir_song };

        var song_name = get_song_name( obj_song );

        var cmd_ren = parser( "ren", {}, song_name+".mp3", song_name+".tmp" );
        console.log("cmd_ren : " + cmd_ren);

        exec( cmd_dl, opt, function ( err, stdout, stderr ) {

            console.log("stderr : " + stderr);
            if ( err !== null ) {
                console.log("err : " + err);
            }

            // exec( cmd_ren, opt );
        } );
    }
};
var add_quotes    = require('./helper').add_quotes;
var obj_to_string = require('./helper').obj_to_string;
var get_song_name = require('./helper').get_song_name;
var parser        = require('./parser').parser;
var hash_code     = require('./helper').hash_code;
var get_hash_path = require('./helper').get_hash_path;
var exec          = require('child_process').exec;
var target_dir    = "X:\\Dropbox\\js\\mp3\\";

var url         = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url     = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var url_youtube = bad_url;

var o_song= {
    "--tt"       : "One Black Night" ,
    "--ta"       : "Wonder Girls"    ,
    "--tg"       : "KPop"            ,
    "--tl"       : "REBOOT"          ,
    "--ty"       : "2015"            ,
    "--ti"       : "img.jpg"         ,
    "--mp3input" : ""
};

var get_youtubedl_options_object = function ( url_to_hash ) {
    // var name = obj_song[ "--ta" ] + " - " + obj_song[ "--tt" ] + ".%(ext)s";
    
    // var name = get_song_name( obj_song ) + ".%(ext)s";
    var hash = hash_code ( url_to_hash ) + ".%(ext)s";
    console.log("url_to_hash : " + url_to_hash);
    console.log("hash : " + hash);
    return {
        "-x"             : "",
        "--audio-format" : "mp3",
        "-o"             : hash,
        "--audio-quality": "320k"
    };
};

