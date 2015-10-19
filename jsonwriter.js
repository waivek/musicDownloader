var casper_print = require('./helper').casper_print;
var extract_text = require('./helper').extract_text;
var casper = require('casper').create();
var x = require('casper').selectXPath;

var obj_to_string = require('./helper').obj_to_string;

var url = "file:///X:/Dropbox/js/mp3/local_sites/wonder_girls.html";
casper.start(url, function() {
    this.echo("\nOpened " + this.getTitle());
}).viewport(1200, 1000);

var obj =  [
    { 
        "artist"  : "Wonder Girls"    ,
        "title"   : "One Black Night" ,
        "album"   : "REBOOT"          ,
        "genre"   : "KPop"            ,
        "date"    : "2015"            ,
        "img_url" : "X:\\Dropbox\\js\\mp3\\music\\img.jpg"
    }
];

casper.then( function () {
    try {
        var fs = require('fs');
        var str_json = obj_to_string( obj );
        fs.write( "json/metadata.json", str_json, 'w' );
    } catch ( e ) {
        console.log("e : " + e);
    }
} );


casper.run(function () {
    casper.exit();
});
