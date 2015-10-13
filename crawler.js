var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var title = "unknown_title";
var artist = "unknown_artist";
var artist_album = "unknown";

var string_cleaner = function ( str ) {
    var limit = 70;
    if ( str.length > limit ) {
        return str.substring(0, limit) + "...";
    }
    return str;
};

// var url_youtube = url;
var url_youtube = bad_url;
casper.start(url_youtube, function() {
    this.echo("[ YouTube ] " + this.getTitle());
}).viewport(1200, 1000);

casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        // var artist = "unknown_artist";
        var str = "unknown_str";
        var url_itunes = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );

        // checking if YouTube has tagged the song and linked to the
        // corresponding iTunes page

        if (url_itunes.indexOf ( 'itunes' ) > -1 ) {
            console.log("[ YouTube ] iTunes link found");

            // The format of the text will be :
            // str = "$title" by $artist" (
            // EXAMPLE : 
            // str = "One Black Night" by Wonder Girls (
            
            casper_print(this);

            str = casper.fetchText( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li'));
            title = extract_text( str, '"', '"');
            artist = extract_text( str, '" by ', ' (');

            this.thenOpen(url_itunes, function() {
                console.log("[ YouTube ]" + string_cleaner(url_itunes));
            });
        }  else {
            console.log("[ YouTube ] iTunes link not found.");

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

            console.log("[ YouTube ] Searching Google...");
            this.thenOpen('http://google.fr/', function() {
                this.fill('form[action="/search"]', { q: str}, true);
                console.log("");
                console.log('[ Google ] Finding "' + string_cleaner(str));
            });

            // TODO: Your search did not match any results
            this.waitForSelector ( 'h3.r a', function () {
                this.click('h3.r a');
                console.log("");
                console.log("[ iTunes ] Loading " + string_cleaner(this.getTitle()));
            }, function () {
                console.log("[ Google ] search timed out");
                casper.capture("images/timeout_google.png");
            });
        }
}, function () {
    console.log("youtube timed out");
    casper.capture("images/timeout_youtube.png");  
});

casper.waitForSelector ( x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'), function () {

    this.echo("[ iTunes ] Loaded " + string_cleaner( this.getTitle() ));
    this.capture('images/itunes.png');
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    // var img_url = casper.getElementAttribute(x('/#<{(|[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    var artist = casper.fetchText( x('//*[@id="title"]/div[1]/span/a/h2'));

    console.log("[ iTunes ] " + title +" by " + genre + " artist " + artist);
    console.log("[ iTunes ] " + album +" released on " + releaseDate);
    console.log("[ iTunes ] " + genre +" released on " + artist);
    // console.log("img   : " + img_url);

    artist_album = artist + " " + album;

}, function () {
    console.log("[ Google ] timeout_itunes.png");
    casper_print(this);
    casper.capture("images/timeout_itunes.png");
});

casper.thenOpen( "http://www.youtube-mp3.org/", function () {
    this.echo("");
    this.echo("[ ymp3 ] " + string_cleaner( this.getTitle() ) );
});
casper.waitForSelector( x('//*[@id="youtube-url"]'), function () {
    this.sendKeys(x('//*[@id="youtube-url"]'), url_youtube);
}, function () {
    console.log("[ iTunes ] timeout_ymp3.png");
    casper_print(this);
    casper.capture("images/timeout_ymp3.png");
});

casper.then(function () {
    this.click(x('//*[@id="submit"]'));
});

casper.waitForSelector(x('//*[@id="dl_link"]/a[3]'), function () {
    casper.capture("images/test.png");
    var url_mp3 = "http://www.youtube-mp3.org" + this.getElementAttribute(x('//*[@id="dl_link"]/a[3]'), 'href');
    console.log("[ ymp3 ] URL=" + url_mp3);
}, function () {
    this.echo("[ ymp3 ] timeout_ymp3_after_click.png");
    casper_print(this);
    this.capture('images/timeout_ymp3_after_click.png');
});


casper.thenOpen( "http://www.covermytunes.com/" );

casper.waitForSelector( x('//*[@id="SearchForm"]/form'), function () {
    this.echo("");
    this.echo("[ covermytunes ] " + string_cleaner( this.getTitle() ));
    this.fill( x('//*[@id="SearchForm"]/form'), {
        'search_query' : artist_album
    }, true);
    this.echo("[ covermytunes ] Searching '" + string_cleaner( artist_album ) + "'");
}, function () {
    this.echo("timeout_cover_my_tunes_before_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_before_submit.png');
});

casper.waitForSelector( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a'), function (  ) {
    this.echo("[ covermytunes ] Search complete - " + string_cleaner( this.getTitle() ));
    this.click( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a') );
}, function () {
    this.echo("timeout_cover_my_tunes_after_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_after_submit.png');
});

casper.waitForSelector( x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), function (  ) {
    this.echo("[ covermytunes ] Loaded album cover art" + string_cleaner( this.getTitle() ));
    var img_url = casper.getElementAttribute(x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), 'src');
    console.log("[ covermytunes ] img_url : " + string_cleaner( img_url ));
}, function () {
    this.echo("timeout_cover_my_tunes_image_load.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_image_load.png');
});

casper.run(function () {
    casper.exit();
});
