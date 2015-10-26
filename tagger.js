module.exports = {
    tag : function ( url ) {

        var str_hash = hash_code ( url ).toString();
        var file_name = get_hash_path( target_dir, str_hash, "json" );
        var obj_song = JSON.parse(fs.readFileSync(file_name, 'utf8'));

        var input = get_hash_path( target_dir, str_hash, "mp3" );
        var output = get_song_name( obj_song ) + ".mp3";

        var dir_lame = target_dir;
        var exe = dir_lame + "lame.exe ";

        var cmd_tag = parser( exe, obj_song, input, output );
        var cmd_del = parser("rmdir", { "/q" : "", "/s" : ""}, target_dir + str_hash + "", "");

        mkdirIfNoDir( target_dir + "tagged_songs" );
        var eventEmitter = exec( cmd_tag, { cwd : target_dir + "\\tagged_songs" }, function ( err, stdout, stderr ) {
            if ( err !== null ) { console.log("err : " + err); }
            exec( cmd_del, { cwd : target_dir } );
        });
        console.log("cmd_del : " + cmd_del);
        console.log("cmd_tag : " + cmd_tag);
        // eventEmitter.stdout.on( 'data', function ( data ) {
        //     // process.stdout.write( data );
        // });
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
