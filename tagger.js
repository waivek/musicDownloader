module.exports = {
    tag : function ( url ) {

        var str_hash = hash_code ( url ).toString();
        var file_name = get_hash_path( target_dir, str_hash, "json" );
        var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));

        // TODO: Continue refactoring from HERE
        var input = get_hash_path( target_dir, str_hash, "mp3" );
        var output = get_song_name( obj ) + ".mp3";

        var dir_lame = target_dir;
        var exe = dir_lame + "lame.exe ";

        var cmd_tag = parser( exe, obj, input, output );
        var cmd_del = parser("del", {}, input, "");
        console.log("cmd_del : " + cmd_del);

        var dir_song = target_dir;
        console.log("dir_song : " + dir_song);
        var opt = { cwd : dir_song };

        exec( cmd_tag, opt, function () {
            // exec( cmd_del, opt );
        });
        console.log("cmd_tag : " + cmd_tag);
    }

};
var exec = require('child_process').exec;
var parser = require('./parser').parser;
var get_song_name = require('./helper').get_song_name;
var hash_code = require('./helper').hash_code;
var fs = require('fs');
var target_dir = "X:\\Dropbox\\js\\mp3\\";
var get_hash_path = require('./helper').get_hash_path;

var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var url_youtube = bad_url;

var d_song = 'X:\\Dropbox\\js\\mp3\\music';
var d_lame = "X:\\Dropbox\\js\\mp3\\";

var get_output_song_name = function ( obj ) {
    return obj["--ta"] + " - " + obj[ "--tt" ] + ".mp3";
};

// var tag = function ( url ) {
//
//     var str_hash = hash_code ( url ).toString();
//     var file_name = get_hash_path( target_dir, str_hash, "json" );
//     var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
//
//     // TODO: Continue refactoring from HERE
//     var input = get_hash_path( target_dir, str_hash, "mp3" );
//     var output = get_song_name( obj ) + ".mp3";
//
//     var dir_lame = target_dir;
//     var exe = dir_lame + "lame.exe ";
//
//     var cmd_tag = parser( exe, obj, input, output );
//     var cmd_del = parser("del", {}, input, "");
//     console.log("cmd_del : " + cmd_del);
//
//     var dir_song = target_dir;
//     console.log("dir_song : " + dir_song);
//     var opt = { cwd : dir_song };
//
//     exec( cmd_tag, opt, function () {
//         // exec( cmd_del, opt );
//     });
//     console.log("cmd_tag : " + cmd_tag);
// };

// tag(url_youtube);
