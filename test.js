var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var casper = require('casper').create();
var x = require('casper').selectXPath;

var url = "https://www.youtube.com/watch?v=gj0Xl_dEhcs&index=1&list=PLabEsp9mKEJJmv-h3iBx7ZWe4_MAYDtoY";
casper.start(url, function() {
    this.echo("\nOpened " + this.getTitle());
}).viewport(1200, 1000);

var x_path = x( '//*[@id="watch-description-extras"]/ul/li[1]/ul/li' );

var get_href_list = function (a) {
    var e = document.createElement( "li" );
    e.innerHTML = a;
    var arr_links = e.querySelectorAll( 'a' );
    return Array.prototype.map.call( arr_links, function( anchor ) {
        return anchor.getAttribute( 'href' );
    } );
};

casper.waitForSelector( x_path,  function () {
    var html = casper.getHTML( x_path );
    var links = this.evaluate( get_href_list, html );

    links = links.filter( function(url) {
        return url.indexOf( "itunes" ) > -1;
    } );
    var link = links[ 0 ];

}, function () {
    this.echo("timeout_test_1.png");
    casper_print(this);
    this.capture('images/timeout_test_1.png');
});




casper.run(function () {
    casper.exit();
});
