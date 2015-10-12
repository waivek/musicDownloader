// id3 -a "Wonder Girls" -t "One Black night" -g <genre number>
// id3 -f "%a-%t" song.mp3

var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var extract_artist_and_title = function ( str ) {
};
// var extract_text = function ( str, beg, end ) {
//     var begIndex = str.indexOf(beg);
//     var endIndex = str.indexOf(end, begIndex+1);
//     var res = str.substring(begIndex+1, endIndex);
//     return res;
// };

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=i0_thpTpNaw";

casper.start(bad_url, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);


var contains = function (  ) {
    // enter code here
};
casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        var artist = "unknown_artist";
        var title = "unknown_title";
        var str = "unknown_str";
        var x_path_itunes = x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a');
        url = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );
        if (url.indexOf ( 'itunes' ) > -1 ) {
            console.log("Area Exists!");
            // str = "One Black Night" by Wonder Girls (
            str = casper.fetchText(x_path_itunes);
            console.log("str : " + str);
            title = extract_text( str, '"', '"');
            artist = extract_text( str, '" by ', ' (');
            casper_print(this);
        }  else {
            str = casper.fetchText(x('//*[@id="eow-title"]'));
            var index_dash = str.lastIndexOf('-');
            artist = str.substring(0, index_dash);
            title = str.substring(index_dash+1).trim();
        }
        console.log("title : " + title);
        console.log("artist : " + artist);
        console.log("url : " + url);
});

casper.run(function () {
    casper.exit();
});

