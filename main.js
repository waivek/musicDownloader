var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;

var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "https://www.youtube.com/watch?v=U5K9AlmWM8s";
var bad_url = "https://www.youtube.com/watch?v=I2REZSj4XnE";

casper.start(bad_url, function() {
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
        }  else {
            console.log("iTunes link not found.");

            // this means that YouTube has NOT tagged the song
            // we need to manually search for the iTunes link
            url_itunes = "unknown_url";
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

            // TODO: Search img_url by Image
            var getUrl = function (name) {
                name = name.trim();
                first = "https://www.google.co.in/search?q=";
                mid = name.replace(/ /g, '+');
                end = "+site%3Aitunes.apple.com";
                return first + mid + end;
            };
            console.log("Searching Google... for " + getUrl( str ));
            this.thenOpen(getUrl( str ));
            // this.wait(5000, function () {
            //     console.log("Finished waiting 5 seconds");
            // });

            var href2url = function (href) {
                var url = extract_text(href, '=', '&');
                return url;
            };

            var getLinks = function () {
                // TODO: Use querySelector
                var links = document.querySelectorAll('h3.r a');
                return Array.prototype.map.call(links, function (e) {
                    return e.getAttribute('href');
                });
            };

            // to be run after google-search
            // TODO: Your search did not match any results
            this.then (function () {
                console.log("Completed google search");
                this.capture('google.png');
                var url_list = this.evaluate(getLinks);
                url_itunes = href2url(url_list[0]);
            });
            console.log("Obtained iTunes link");

        }

        console.log("url_itunes : " + url_itunes);
        console.log("Opening iTunes link");
        // console.log("title : " + title);
        // console.log("artist : " + artist );
        // console.log("url_itunes : " + url_itunes);

        this.thenOpen(url_itunes);
        console.log("Opened iTunes link");
});

// run after iTunes
casper.then (function () {
    // var textGenre = casper.fetchText(x('/#<{(|[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    this.capture('main.png');
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    var img_url = casper.getElementAttribute(x('//*[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    console.log("Results of iTunes :- ");
    console.log("Genre : " + genre);
    console.log("Date  : " + releaseDate);
    console.log("Album : " + album);
    console.log("img   : " + img_url);
});

casper.run(function () {
    casper.exit();
});
