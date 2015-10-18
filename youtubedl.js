var add_quotes = require('./helper').add_quotes;
var obj_to_string = require('./helper').obj_to_string;
var parser = require('./parser').parser;
var exec = require('child_process').exec;
var get_song_name = require('./helper').get_song_name;

var o_song= {
    "--tt"       : "One Black Night" ,
    "--ta"       : "Wonder Girls"    ,
    "--tg"       : "KPop"            ,
    "--tl"       : "REBOOT"          ,
    "--ty"       : "2015"            ,
    "--ti"       : "img.jpg"         ,
    "--mp3input" : ""
};

var get_youtubedl_options_object = function ( obj_song ) {
    // var name = obj_song[ "--ta" ] + " - " + obj_song[ "--tt" ] + ".%(ext)s";
    var name = get_song_name( obj_song ) + ".%(ext)s";
    return {
        "-x"             : "",
        "--audio-format" : "mp3",
        "-o"             : name
    };
};

var download_song = function ( obj_song, dir_youtubedl, dir_ffmpeg, dir_song, url) {
    var o_exe  = get_youtubedl_options_object( obj_song );
    var input  = url;
    var exe    = "youtube-dl";

    var cmd_dl = parser( exe, o_exe, input, "" );
    console.log("cmd_dl : " + cmd_dl);
    var opt = { cwd : dir_song };

    var song_name = get_song_name( obj_song );

    var cmd_ren = parser( "ren", {}, song_name+".mp3", song_name+".tmp" );
    console.log("cmd_ren : " + cmd_ren);

    exec( cmd_dl, opt, function () {
        exec( cmd_ren, opt );
    } );
};

download_song( o_song, "", "", "X:\\Dropbox\\js\\mp3\\music", "https://www.youtube.com/watch?v=U5K9AlmWM8s" );
