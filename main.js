
var getUrl = function (name) {
    first = "https://www.google.co.in/search?q=";
    mid = name.replace(' ', '+');
    end = "+site%3Aitunes.apple.com";
    return first + mid + end;
};

var href2url = function (href) {
    try {
        var beg = '=';
        var end = '&';
        var begIndex = href.indexOf(beg);
        var endIndex = href.indexOf(end);
        var url = href.substring(begIndex+1, endIndex);
    } catch (e) {
        console.log("e : " + e);
    }
    return url;
};

var str = "Wonder Girls - One Black Night";
var url = getUrl(str);
var casper = require('casper').create();
// var x = require('casper').selectXPath;
var links = [];

var getLinks = function () {
    // TODO: Use querySelector
    try {
        links = document.querySelectorAll('h3.r a');
    } catch (e) {
        console.log("e : " + e);
    }
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
};

casper.start(url, function() {
    this.echo(this.getTitle());
    this.capture("img1.png");
    this.echo("Screenshot saved in start");
}).viewport(1200, 1000);

casper.then (function () {
    try {
        var url_itunes = this.evaluate(getLinks)[0];
        url_itunes = href2url(url_itunes);
        console.log("url_itunes : " + url_itunes);
        
    } catch (e) {
        console.log("Error:" + e);
    }
});

casper.run(function () {
    casper.exit();
});
