var casper_print = require('./helper').casper_print;
var obj_to_string = require('./helper').obj_to_string;
var extract_text = require('./helper').extract_text;
var hash_code = require('./helper').hash_code;
var pretty_printer = require('./pretty_printer').pretty_printer;
var target_dir = "X:\\Dropbox\\js\\mp3\\";
var get_hash_path = require('./helper').get_hash_path;
var mkdirIfNoDir = require('./helper').mkdirIfNoDir;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=2om182Fmtd8";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";
var title = "unknown_title";
var artist = "unknown_artist";
var artist_album = "unknown";

var obj = {
        "--tt"       : "unknown_title"  ,
        "--ta"       : "unknown_artist" ,
        "--tg"       : "unknown_genre"  ,
        "--tl"       : "unknown_title"  ,
        "--ty"       : "unknown_date"   ,
        "--ti"       : "unknown_img_url"         
        // "--mp3input" : ""
};

// TODO: Change for playlist
var get_casper_url = function (  ) {
    var args = casper.cli.args;
    return args[ 0 ];
};

// var url_youtube = url;
var url_youtube = get_casper_url();
casper.start(url_youtube, function() {
    pretty_printer( "YouTube", this.getTitle() );
}).viewport(1200, 1000);

casper.waitForSelector(x('//*[@id="watch-description"]'), function () {
        // var artist = "unknown_artist";
        var str = "unknown_str";
        var url_itunes = this.getElementAttribute( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li/a'), 'href' );

        // checking if YouTube has tagged the song and linked to the
        // corresponding iTunes page

        if (url_itunes.indexOf ( 'itunes' ) > -1 ) {
            this.echo( pretty_printer( "YouTube", "iTunes link found" ) );

            // The format of the text will be :
            // str = "$title" by $artist" (
            // EXAMPLE : 
            // str = "One Black Night" by Wonder Girls (
            
            casper_print(this);

            str = casper.fetchText( x('//*[@id="watch-description-extras"]/ul/li[1]/ul/li'));
            title = extract_text( str, '"', '"');
            artist = extract_text( str, '" by ', ' (');

            this.thenOpen(url_itunes, function() {
                this.echo( pretty_printer( "YouTube", url_itunes ) );
            });
        }  else {
            this.echo( pretty_printer( "YouTube", "iTunes link not found." ) );

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

            this.echo( pretty_printer( "YouTube", "Searching Google..." ) );
            this.thenOpen('http://google.fr/', function() {
                this.fill('form[action="/search"]', { q: str}, true);
                console.log("");
                this.echo( pretty_printer( "Google", "Finding " + str ) );
            });

            // TODO: Your search did not match any results
            this.waitForSelector ( 'h3.r a', function () {
                this.click('h3.r a');
                console.log("");
                this.echo( pretty_printer( "iTunes", "Loading " + this.getTitle() ) );
            }, function () {
                this.echo( pretty_printer( "Google", "search timed out" ) );
                casper.capture("images/timeout_google.png");
            });
        }
}, function () {
    this.echo("timeout_youtube.png");
    casper.capture("images/timeout_youtube.png");  
});

casper.waitForSelector ( x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'), function () {

    this.echo( pretty_printer( "iTunes",  "Loaded " + this.getTitle()  ) );
    this.capture('images/itunes.png');
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    var img_url = casper.getElementAttribute(x('//*[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    var artist = casper.fetchText( x('//*[@id="title"]/div[1]/span/a/h2'));

    obj[ "--tt" ] = title;
    obj[ "--ta" ] = artist;
    obj[ "--tg" ] = genre;
    obj[ "--tl" ] = album;
    obj[ "--ti" ] = img_url;
    var y = new Date( releaseDate ).getFullYear();
    obj[ "--ty" ] = y.toString();

    this.echo( pretty_printer( "iTunes", title +" by " + genre + " artist " + artist ) );
    this.echo( pretty_printer( "iTunes", album +" released on " + releaseDate ) );
    this.echo( pretty_printer( "iTunes", genre +" released on " + artist ) );
    // this.echo("img   : " + img_url);

    artist_album = artist + " " + album;

}, function () {
    this.echo( pretty_printer( "Google", "timeout_itunes.png" ) );
    casper_print(this);
    casper.capture("images/timeout_itunes.png");
});

// casper.thenOpen( "http://www.youtube-mp3.org/", function () {
//     console.log("");
//     this.echo( pretty_printer( "ymp3",  this.getTitle()   ) );
// });
// casper.waitForSelector( x('/#<{(|[@id="youtube-url"]'), function () {
//     this.sendKeys(x('/#<{(|[@id="youtube-url"]'), url_youtube);
// }, function () {
//     this.echo( pretty_printer( "iTunes", "timeout_ymp3.png" ) );
//     casper_print(this);
//     casper.capture("images/timeout_ymp3.png");
// });
//
// casper.then(function () {
//     this.click(x('/#<{(|[@id="submit"]'));
// });
//
// casper.waitForSelector(x('/#<{(|[@id="dl_link"]/a[3]'), function () {
//     casper.capture("images/test.png");
//     var url_mp3 = "http://www.youtube-mp3.org" + this.getElementAttribute(x('/#<{(|[@id="dl_link"]/a[3]'), 'href');
//     this.echo( pretty_printer( "ymp3", "URL=" + url_mp3 ) );
// }, function () {
//     this.echo( pretty_printer( "ymp3", "timeout_ymp3_after_click.png" ) );
//     casper_print(this);
//     this.capture('images/timeout_ymp3_after_click.png');
// });


casper.thenOpen( "http://www.covermytunes.com/" );

casper.waitForSelector( x('//*[@id="SearchForm"]/form'), function () {
    console.log("");
    this.echo( pretty_printer( "covermytunes",  this.getTitle()  ) );
    this.fill( x('//*[@id="SearchForm"]/form'), {
        'search_query' : artist_album
    }, true);
    this.echo( pretty_printer( "covermytunes",  "Searching " + artist_album  + "'" ) );
}, function () {
    this.echo("timeout_cover_my_tunes_before_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_before_submit.png');
});

casper.waitForSelector( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a'), function (  ) {
    this.echo( pretty_printer( "covermytunes",  this.getTitle()  ) );
    this.click( x('//*[@id="CategoryHeading"]/div/table/tbody/tr/td[2]/strong/a') );
}, function () {
    this.echo("timeout_cover_my_tunes_after_submit.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_after_submit.png');
});

casper.waitForSelector( x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), function (  ) {
    this.echo( pretty_printer( "covermytunes",  this.getTitle()  ) );
    var str_hash = hash_code( url_youtube ).toString();
    var img_url = casper.getElementAttribute(x('//*[@id="ProductDetails"]/div/div[3]/a[3]/img'), 'src');
    this.echo( pretty_printer( "covermytunes", "img_url : " + img_url  ) );
    var img_name = get_hash_path( target_dir, str_hash ,"jpg" );
    try {
        this.download( img_url,  img_name );
        this.echo( pretty_printer( "covermytunes", "Downloaded as " + img_name ) );
        obj[ "--ti" ] = img_name;
    } catch ( e ) {
        console.log("e : " + e);
    }
}, function () {
    this.echo("timeout_cover_my_tunes_image_load.png");
    casper_print(this);
    this.capture('images/timeout_cover_my_tunes_image_load.png');
});

casper.then( function () {
    try {
        var str_hash = hash_code( url_youtube ).toString();
        var file_name = get_hash_path( target_dir, str_hash, "json" );
        var fs = require('fs');
        var str_json = obj_to_string( obj );
        fs.write( file_name, str_json, 'w', function ( err, stdout, stderr ) {
            if ( err !== null ) {
                console.log("err : " + err);
            }
            
        });
    } catch ( e ) {
        console.log("e : " + e);
    }
} );


casper.run(function () {
    casper.exit();
});
