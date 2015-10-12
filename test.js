var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=i0_thpTpNaw";

casper.start(bad_url, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);


casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        var artist = "unknown_artist";
        var title = "unknown_title";
        var str = "unknown_str";
        var x_path_itunes = x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a');
        url = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );

        // checking if YouTube has tagged the song and linked to the
        // corresponding iTunes page
        if (url.indexOf ( 'itunes' ) > -1 ) {
            // The format of the text will be :
            // str = "$title" by $artist" (
            // EXAMPLE : 
            // str = "One Black Night" by Wonder Girls (
            str = casper.fetchText(x_path_itunes);
            title = extract_text( str, '"', '"');
            artist = extract_text( str, '" by ', ' (');
        }  else {

            // this means that YouTube has NOT tagged the song
            // we need to manually search for the iTunes link
            url = "unknown_url";
            str = casper.fetchText(x('//*[@id="eow-title"]'));

            // This block tries to extract $artist and $title from the title of
            // the YouTube video. It is VERY unreliable. It would be safer to
            // later add an option asking the user whether the $title and the
            // $artist are correct or not, before initiating a search for the
            // URL. If the title is of the for a-b-c-d then $artist = a-b-c and
            // $title = $d
            // var index_dash = str.lastIndexOf('-');
            // artist = str.substring(0, index_dash).trim();
            // title = str.substring(index_dash+1).trim();

            
        }
        console.log("title : " + title);
        console.log("artist : " + artist );
        console.log("url : " + url);
});

casper.run(function () {
    casper.exit();
});

