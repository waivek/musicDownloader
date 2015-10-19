var exec = require('child_process').exec;
var parser = require('./parser').parser;
var get_song_name = require('./helper').get_song_name;
var hash_code = require('./helper').hash_code;
var fs = require('fs');


var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var url_youtube = bad_url;

// var o= {
//     "--tt"  : "One Black Night" ,
//     "--ta"  : "Wonder Girls"    ,
//     "--tg"  : "KPop"            ,
//     "--tl"  : "REBOOT"          ,
//     "--ty"  : "2015"            ,
//     "--ti"  : "img.jpg",
//     "--mp3input" : ""
// };

var d_song = 'X:\\Dropbox\\js\\mp3\\music';
var d_lame = "X:\\Dropbox\\js\\mp3\\";

var get_output_song_name = function ( obj ) {
    return obj["--ta"] + " - " + obj[ "--tt" ] + ".mp3";
};

var tag = function ( url, dir_song, dir_lame ) {

    var hash = hash_code ( url ).toString();
    var file_name = "X:\\Dropbox\\js\\mp3\\json\\" + hash + ".json";
    var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
    obj[ "--ti" ] = "X:\\Dropbox\\js\\mp3\\covers\\" + hash + ".jpg";

    // var input = get_song_name( obj ) + ".tmp";
    var input = "X:\\Dropbox\\js\\mp3\\music\\" + hash + ".mp3";
    var output = get_song_name( obj ) + ".mp3";

    var exe = dir_lame + "lame.exe ";

    var cmd_tag = parser( exe, obj, input, output );
    var cmd_del = parser("del", {}, input, "");
    console.log("cmd_del : " + cmd_del);

    var opt = { cwd : dir_song };

    exec( cmd_tag, opt, function () {
        exec( cmd_del, opt );
    });
    console.log("cmd_tag : " + cmd_tag);
};

// tag("song.mp3", o, d_song, d_lame );
tag(url_youtube, d_song, d_lame );
