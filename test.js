var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var casper = require('casper').create();
var x = require('casper').selectXPath;

var url = "https://www.youtube.com/playlist?list=PLabEsp9mKEJJmv-h3iBx7ZWe4_MAYDtoY";
casper.start(url, function() {
    this.echo("\nOpened " + this.getTitle());
}).viewport(1200, 1000);

var get_href = function ( anchor ) {
    return anchor.getAttribute( 'href' );
};
casper.waitForSelector( x( '//*[@id="pl-load-more-destination"]/tr[1]/td[4]/a' ), function () {
    try {
        // var view_text = this.fetchText( x( '/#<{(|[@id="pl-header"]/div[2]/ul/li[2]' ) );
        // var size = parseInt( x );
        var table = document.querySelector( '#pl-load-more-destination' );
        var obj_to_string = require('./helper').obj_to_string;
        console.log("obj_to_string( table ) : " + obj_to_string( table ));
        this.capture('images/pic.png');
        var array_links = table.querySelectorAll( 'a' );
        var x = array_links.map( get_href );
        console.log("x : " + x);
    } catch ( e ) {
        console.log("e : " + e);
    }
    
}, function () {
    this.echo("timeout_playlist_to_url.png");
    casper_print(this);
    this.capture('images/timeout_playlist_to_url.png');
});

casper.run(function () {
    casper.exit();
});
