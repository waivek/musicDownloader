module.exports = {
    tag : function ( url ) {

        var str_hash = hash_code ( url ).toString();
        var file_name = get_hash_path( target_dir, str_hash, "json" );
        var obj = JSON.parse(fs.readFileSync(file_name, 'utf8'));
        var obj_song = JSON.parse(fs.readFileSync(file_name, 'utf8'));

        var song_name = get_song_name( obj_song );
        var opt_ren = { cwd : target_dir + str_hash };
        var cmd_ren = parser( "ren", {}, str_hash+".mp3", song_name+".mp3" );

        var input = get_hash_path( target_dir, str_hash, "mp3" );
        var output = get_song_name( obj ) + ".mp3";

        var dir_lame = target_dir;
        var exe = dir_lame + "lame.exe ";

        var cmd_tag = parser( exe, obj, input, output );
        // TODO: Continue from here.
        var cmd_del = parser("rmdir", { "/q" : "", "/s" : ""}, input, "");
        console.log("cmd_del : " + cmd_del);

        var dir_song = target_dir;
        console.log("dir_song : " + dir_song);
        var opt = { cwd : dir_song };

        mkdirIfNoDir( "tagged_songs" );
        exec( cmd_tag, { cwd : "tagged_songs" }, function () {
            exec( cmd_del, opt_ren );
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
var mkdirIfNoDir = require('./helper').mkdirIfNoDir;
