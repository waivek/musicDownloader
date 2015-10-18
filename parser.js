module.exports = {
    parser : function ( exe, obj_opt, input, output ) {
        var str_opt = optional_arguments( obj_opt );
        return cmd_gen( exe, str_opt, input, output );
    }
};
var add_quotes = require('./helper').add_quotes;

var option_to_string = function ( option, value) {
    var quote = '"';
    var space = ' ';
    var new_value = "";
    if ( value.length > 0 ) {
        new_value = add_quotes( value, quote );
    } 
    return option + space + new_value;
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
    var quote = '"';
    if ( input.length > 0 ) {
        input = add_quotes( input, quote);
    }
    if ( output.length > 0 ) {
        output = add_quotes( output, quote);
    }
    return [exe, options, input, output].join(' ');
};


// var str_opt = optional_arguments( x );
// console.log("str_cmd : \n" + str_cmd);
