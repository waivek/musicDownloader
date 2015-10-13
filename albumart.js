var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var casper = require('casper').create();
var x = require('casper').selectXPath;
var artist_album = "Wonder Girls Reboot";

casper.start( "http://www.covermytunes.com/", function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);

casper.waitForSelector( x('//*[@id="SearchForm"]/form'), function () {
    this.echo("\nOpened covermytunes.com" + this.getTitle());
    this.fill( x('//*[@id="SearchForm"]/form'), {
        'search_query' : artist_album
    }, true);
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
