// TODO: Search img_url by Image
var getUrl = function (name) {
    first = "https://www.google.co.in/search?q=";
    mid = name.replace(' ', '+');
    end = "+site%3Aitunes.apple.com";
    return first + mid + end;
};

var extract_text = require('./helper').extract_text;
// var extract_text = function ( str, beg, end ) {
//     var begIndex = str.indexOf(beg);
//     var endIndex = str.indexOf(end, begIndex+1);
//     var res = str.substring(begIndex+1, endIndex);
//     return res;
// };

// var extract_text = function ( str, beg, end ) {
//     var begIndex = str.indexOf(beg);
//     var endIndex = str.indexOf(end);
//     var res = str.substring(begIndex+1, endIndex);
//     return res;
// };

var href2url = function (href) {
    var url = extract_text(href, '=', '&');
    return url;
};

var str = "Wonder Girls - One Black Night";
var url;
var casper = require('casper').create();
var x = require('casper').selectXPath;

var getLinks = function () {
    // TODO: Use querySelector
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function (e) {
        return e.getAttribute('href');
    });
};

// url = getUrl(str);
// casper.then (function () {
//     var url_list = this.evaluate(getLinks);
//     var url_itunes = url_list[0];
//     url_itunes = href2url(url_itunes);
//     this.echo("Opening iTunes...");
//     this.thenOpen(url_itunes);
// });

url = "file:///X:/Dropbox/js/mp3/wonder_girls.html";
casper.start(url, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);

casper.then (function () {
    casper.capture("itunes.png");
});

casper.then (function () {
    // var textGenre = casper.fetchText(x('/#<{(|[@id="left-stack"]/div[1]/ul/li[2]/a[1]/span'));
    var genre = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[2]'));
    var releaseDate = casper.fetchText(x('//*[@id="left-stack"]/div[1]/ul/li[3]/span[2]'));
    var album = casper.fetchText(x('//*[@id="title"]/div[1]/h1'));
    var img_url = casper.getElementAttribute(x('//*[@id="left-stack"]/div[1]/a[1]/div/img'), 'src');
    console.log("Genre : " + genre);
    console.log("Date  : " + releaseDate);
    console.log("Album : " + album);
    console.log("img   : " + img_url);
});

casper.run(function () {
    casper.exit();
});
