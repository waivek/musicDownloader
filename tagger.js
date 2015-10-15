// lame music/song.mp3 --tt "One Black Night" --ta "Wonder Girls" --tg "KPop"
// --tl "REBOOT" --ty "2015" --ti "music/img.jpg" music/new_song.mp3 
// lame music/song.mp3 --tt "One Black Night" --ta "Wonder Girls" --tg "KPop" --tl "REBOOT" --ty "2015" --ti "music/img.jpg" music/new_song.mp3 

var add_quotes = function ( input ) {
    return '"' + input + '"';
};
var execSync = require('child_process').execSync;
var tag = function ( input_path, input_file_name, title, album, artist, genre, date, img_path) {
    var input = input_path + input_file_name;
    var cmd_tag = 
        "lame "  + add_quotes( input    ) + 
        " --tt " + add_quotes( title    ) +
        " --ta " + add_quotes( artist   ) +
        " --tg " + add_quotes( genre    ) +
        " --tl " + add_quotes( album    ) +
        " --ta " + add_quotes( artist   ) +
        " --ty " + add_quotes( date     ) +
        " --ti " + add_quotes( img_path ) +
        " new_song.mp3";
    var cmd_del = "del " + input;
    var cmd_cd = "cd " + input_path;
    var cmd_ren = "ren new_song.mp3 " + '"' + artist + " - " + title + ".mp3" + '"';

    // console.log("cmd_tag : " + cmd_tag);
    // console.log("cmd_del : " + cmd_del);
    // console.log("cmd_ren : " + cmd_ren);
    execSync( cmd_tag );
    // console.log("cmd_cd : " + cmd_cd);
    // execSync( cmd_del );
    // execSync( cmd_ren );

    // enter code here
};

tag("music/", "song.mp3", "One Black Night", "REBOOT", "Wonder Girls",
        "KPop", "2015", "music/img.jpg");
