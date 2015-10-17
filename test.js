var parser = require('./parser').parser;

var x = {
    tt  : "One Black Night"    ,
    ta  : "Wonder Girls"   ,
    tg  : "KPop"    ,
    tl  : "REBOOT"    ,
    ty  : "2015"     ,
    ti  : "img.jpg" 
};

console.log( parser( "lame.exe", x, "song.mp3", "new_song.mp3" ) );
