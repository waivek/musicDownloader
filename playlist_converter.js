var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var casper = require('casper').create();
var x = require('casper').selectXPath;
var target_dir = "X:\\Dropbox\\js\\mp3\\";

var url = casper.cli.args;
url = url.toString();
if ( url.indexOf( "list" ) === -1 ) {
    console.log( "playlist_converter : Not a valid YouTube url" );
    throw new Error();
} else {
    console.log( "Correct Url. Parsing playlist..." );
}
casper.start(url, function() {
    this.echo("\nOpened " + this.getTitle());
}).viewport(1200, 1000);

var get_links = function (  ) {
    var table = document.getElementById( 'pl-load-more-destination' );
    var array_links = table.querySelectorAll( 'a' );
    return Array.prototype.map.call(array_links, function ( anchor ) {
        return anchor.getAttribute( 'href' );
    });

};


casper.waitForSelector( x( '//*[@id="pl-load-more-destination"]/tr[1]/td[4]/a' ), function () {
    try {
        var links = this.evaluate( get_links );
        links = links.filter( function( link ) { 
            return link.indexOf( "list" ) > -1;
        } );
        var links_without_duplicates = [];
        for ( var i = 0; i < links.length; i = i+1 ) {
            if ( i%2 === 0 ) {
                links_without_duplicates.push( links[ i ] );
            }
        }
        var links_final = links_without_duplicates.map( function ( link ) {
            var extract_text = require('./helper').extract_text;
            return "https://www.youtube.com/" + extract_text( link, "/", "&" );
        });
        var obj_links = { links : links_final };
        var obj_to_string = require('./helper').obj_to_string;
        var str_json = obj_to_string( obj_links );
        var fs = require( 'fs' );
        fs.write( target_dir + "links.json", str_json, function ( err, stdout, stderr ) {
            if ( err !== null ) {
                console.log("err : " + err);
            }
        });
        // console.log( " Finished Writing links.json with the following links:" );
        // console.log( str_json );

        // var str = links_final.join( "\n" );
        // console.log("str : \n" + str);
        // var view_text = this.fetchText( x( '/#<{(|[@id="pl-header"]/div[2]/ul/li[2]' ) );
        // var size = parseInt( x );
        
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
