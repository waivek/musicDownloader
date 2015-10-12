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
        casper.capture("casper_print_test.png");
    }

};
