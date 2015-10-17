module.exports = {
    parser : function ( exe, obj_opt, input, output ) {
        var str_opt = optional_arguments( obj_opt );
        return cmd_gen( exe, str_opt, input, output );
    }
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

// var x = {
//     tt  : "One Black Night"    ,
//     ta  : "Wonder Girls"   ,
//     tg  : "KPop"    ,
//     tl  : "REBOOT"    ,
//     ty  : "2015"     ,
//     ti  : "img.jpg" 
// };

// var str_opt = optional_arguments( x );
// console.log("str_cmd : \n" + str_cmd);
