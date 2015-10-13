var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";

casper.start(bad_url, function() {
// casper.start(url, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);

casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        var artist = "unknown_artist";
        var title = "unknown_title";
        var str = "unknown_str";
        var x_path_itunes = x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a');
        var url_itunes = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );

        // checking if YouTube has tagged the song and linked to the
        // corresponding iTunes page

        if (url_itunes.indexOf ( 'itunes' ) > -1 ) {
            console.log("iTunes link exists");

            // The format of the text will be :
            // str = "$title" by $artist" (
            // EXAMPLE : 
            // str = "One Black Night" by Wonder Girls (

            str = casper.fetchText(x_path_itunes);
            title = extract_text( str, '"', '"');
            artist = extract_text( str, '" by ', ' (');

            this.thenOpen(url_itunes, function() {
                console.log("Now opening url_itunes = " + url_itunes);
            });
        }  else {
            console.log("iTunes link not found.");

            // this means that YouTube has NOT tagged the song
            // we need to manually search for the iTunes link

            url_itunes = "unknown_url";
            str = casper.fetchText(x('//*[@id="eow-title"]'));

            var getUrl = function (name) {
                name = name.trim();
                first = "https://www.google.co.in/search?q=";
                mid = name.replace(/ /g, '+');
                end = "+site%3Aitunes.apple.com";
                return first + mid + end;
            };

            this.thenOpen(getUrl( str ), function () {
                console.log("Now opening " + getUrl( str ));
            });
            // TODO: Your search did not match any results
            this.waitForSelector ( 'h3.r a', function () {
                this.click('h3.r a');
            });
        }
});

casper.waitForSelector ( x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'), function () {

    console.log("Loaded iTunes page");
    this.capture('itunes.png');
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    var img_url = casper.getElementAttribute(x('//*[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    console.log("Results of iTunes :- ");
    try {
        console.log("Genre : " + genre);
        console.log("Date  : " + releaseDate);
        console.log("Album : " + album);
        console.log("img   : " + img_url);
    } catch (e) {
        console.log("e : " + e);
    }
}, function () {
    console.log("iTunes timed out after 10 seconds");
    casper_print(this);
    casper.capture("timeout_itunes.png");
}, 10000);

casper.run(function () {
    casper.exit();
});
