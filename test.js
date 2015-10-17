var obj_to_string = function ( obj ) {
    return JSON.stringify(obj, null, 4);
};

var option_to_string = function ( option, value ) {
    var quote = '"';
    var space = ' ';
    return "--" + option + space + quote + value + quote;
};

var optional_arguments = function ( obj ) {
    var key;
    var res = [];
    for ( key in obj ) {
        var str = option_to_string( key, obj[ key ] );
        res.push( str );
    }
    return res.join(' ');
};

var cmd_gen = function ( exe, options, input, output ) {
    return [exe, options, input, output].join(' ');
};

var x = {
    tt  : "One Black Night"    ,
    ta  : "Wonder Girls"   ,
    tg  : "KPop"    ,
    tl  : "REBOOT"    ,
    ty  : "2015"     ,
    ti  : "img.jpg" 
};

// console.log("optional_arguments( x ).join('\n') : \n" + optional_arguments( x ).join('\n'));
var str_opt = optional_arguments( x );
var str_cmd = cmd_gen( "lame.exe", str_opt, "song.mp3", "new_song.mp3" );
console.log("str_cmd : \n" + str_cmd);
