var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var title = "unknown_title";
var artist = "unknown_artist";
var artist_album = "unknown";

var url_youtube = url;
// var url_youtube = bad_url;
casper.start(url_youtube, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);

casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        // var artist = "unknown_artist";
        var str = "unknown_str";
        var url_itunes = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );

        // checking if YouTube has tagged the song and linked to the
        // corresponding iTunes page

        if (url_itunes.indexOf ( 'itunes' ) > -1 ) {
            console.log("iTunes link exists");

            // The format of the text will be :
            // str = "$title" by $artist" (
            // EXAMPLE : 
            // str = "One Black Night" by Wonder Girls (
            
            casper_print(this);

            str = casper.fetchText( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li'));
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
            str = this.fetchText(x('//*[@id="eow-title"]')).trim();
            // This block tries to extract $artist and $title from the title of
            // the YouTube video. It is VERY unreliable. It would be safer to
            // later add an option asking the user whether the $title and the
            // $artist are correct or not, before initiating a search for the
            // URL. If the title is of the for a-b-c-d then $artist = a-b-c and
            // $title = $d
            var index_dash = str.lastIndexOf('-');
            artist = str.substring(0, index_dash);
            title = str.substring(index_dash+1);

            var str_clean = function ( str ) {
                str = str + ' site:itunes.apple.com';
                str = str.replace ( /lyric(s)?/ig, '' );
                return str;
            };
            str = str_clean ( str );

            this.thenOpen('http://google.fr/', function() {
                this.fill('form[action="/search"]', { q: str}, true);
                console.log('Googling "' + str + '"');
            });

            // TODO: Your search did not match any results
            this.waitForSelector ( 'h3.r a', function () {
                this.click('h3.r a');
                console.log("Loading iTunes page");
            }, function () {
                console.log("Google search timed out");
                casper.capture("images/timeout_google.png");
            });
        }
}, function () {
    console.log("youtube timed out");
    casper.capture("images/timeout_youtube.png");  
});

casper.waitForSelector ( x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'), function () {

    this.echo("Loaded iTunes page" + this.getTitle());
    this.capture('images/itunes.png');
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    var img_url = casper.getElementAttribute(x('//*[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    var artist = casper.fetchText( x('//*[@id="title"]/div[1]/span/a/h2'));

    console.log("Results of iTunes :- ");
    console.log("Artist: " + artist);
    console.log("Title : " + title);
    console.log("Genre : " + genre);
    console.log("Date  : " + releaseDate);
    console.log("Album : " + album);
    console.log("img   : " + img_url);

    artist_album = artist + " " + album;

}, function () {
    console.log("iTunes timed out");
    casper_print(this);
    casper.capture("images/timeout_itunes.png");
});

casper.thenOpen( "http://www.youtube-mp3.org/", function () {
    this.echo("Opened the site = " + this.getTitle() );
});

casper.waitForSelector( x('//*[@id="youtube-url"]'), function () {
    this.sendKeys(x('//*[@id="youtube-url"]'), url_youtube);
}, function () {
    console.log("youtube-mp3 time out");
    casper_print(this);
    casper.capture("images/timeout_ymp3.png");
});

casper.then(function () {
    this.click(x('//*[@id="submit"]'));
});

casper.waitForSelector(x('//*[@id="dl_link"]/a[3]'), function () {
    casper.capture("images/test.png");
    var url_mp3 = "http://www.youtube-mp3.org" + this.getElementAttribute(x('//*[@id="dl_link"]/a[3]'), 'href');
    console.log("url_mp3 : " + url_mp3);
}, function () {
    this.echo("ymp3_after_click timed out");
    casper_print(this);
    this.capture('images/timeout_ymp3_after_click.png');
});


casper.thenOpen( "http://www.covermytunes.com/" );

casper.waitForSelector( x('//*[@id="SearchForm"]/form'), function () {
    this.echo("\nOpened covermytunes.com" + this.getTitle());
    this.fill( x('//*[@id="SearchForm"]/form'), {
        'search_query' : artist_album
    }, true);
    this.echo("Sent search query '" + artist_album + "'");
}, function () {
    this.echo("timeout_cover_my_tunes_before_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_before_submit.png');
});

casper.waitForSelector( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a'), function (  ) {
    this.echo("\nSent search query - " + this.getTitle());
    this.click( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a') );
}, function () {
    this.echo("timeout_cover_my_tunes_after_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_after_submit.png');
});

casper.waitForSelector( x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), function (  ) {
    this.echo("\nLoaded album cover art" + this.getTitle());
    var img_url = casper.getElementAttribute(x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), 'src');
    console.log("img_url : " + img_url);
}, function () {
    this.echo("timeout_cover_my_tunes_image_load.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_image_load.png');
});



casper.run(function () {
    casper.exit();
});
