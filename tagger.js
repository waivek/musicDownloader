// lame music/song.mp3 --tt "One Black Night" --ta "Wonder Girls" --tg "KPop"
// --tl "REBOOT" --ty "2015" --ti "music/img.jpg" music/new_song.mp3 
// lame music/song.mp3 --tt "One Black Night" --ta "Wonder Girls" --tg "KPop" --tl "REBOOT" --ty "2015" --ti "music/img.jpg" music/new_song.mp3 

var add_quotes = function ( input ) {
    return '"' + input + '"';
};
var execSync = require('child_process').execSync;
var tag = function ( input_path, input_file_name, title, album, artist, genre, date, img_path) {
    var dir_song = 'X:\\Dropbox\\js\\mp3\\music';
    var input = input_file_name;
    // var input = input_path + input_file_name;
    var output = artist + " - " + title + ".mp3";
    var dir_lame = "X:\\Dropbox\\js\\mp3\\";
    var cmd_lame = dir_lame + "lame.exe ";

    var cmd_tag =  
        cmd_lame + add_quotes( input    ) + 
        " --tt " + add_quotes( title    ) +
        " --ta " + add_quotes( artist   ) +
        " --tg " + add_quotes( genre    ) +
        " --tl " + add_quotes( album    ) +
        " --ta " + add_quotes( artist   ) +
        " --ty " + add_quotes( date     ) +
        " --ti " + add_quotes( img_path ) +
        " "      + add_quotes( output   );

    var cmd_del = "del " + input_file_name;


    execSync( cmd_tag, { cwd : dir_song } );
    execSync( cmd_del, { cwd : dir_song } );
};

tag("music/", "song.mp3", "One Black Night", "REBOOT", "Wonder Girls",
        "KPop", "2015", "img.jpg");
