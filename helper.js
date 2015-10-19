module.exports = {
    extract_text: function ( str, beg, end ) {
        var begIndex = str.indexOf(beg) + beg.length;
        var endIndex = str.indexOf(end, begIndex);
        var res = str.substring(begIndex, endIndex);
        return res;
    },
    sample: function () { 
        return '"One Black Night" by Wonder Girls (';
    },
    casper_print: function (casper) {
        var html = casper.getHTML();
        var fs = require('fs');
        fs.write('casper_site.html', html, 'w');
        casper.capture("images/casper_print_test.png");
    },
    obj_to_string : function ( obj ) {
        return JSON.stringify(obj, null, 4);
    },
    add_quotes : function ( str, q ) {
        return q + str + q;
    },
    get_song_name : function ( obj ) {
        return obj[ "--ta" ] + " - " + obj[ "--tt" ];
    },
    hash_code : function ( str ) {
        var hash = 0;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            c = str.charCodeAt(i);
            hash = ( ( hash<<5 )- hash )+c;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    },
    // dir should end with \\
    get_hash_path : function ( dir, hash, ext ) {
        return dir + hash + "\\" + hash + "." + ext;
    }

};
