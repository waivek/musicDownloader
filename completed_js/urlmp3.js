var casper = require('casper').create();
var x = require('casper').selectXPath;
var url = "http://www.youtube-mp3.org/";
var url_video = "https://www.youtube.com/watch?v=U5K9AlmWM8s";

casper.start(url, function() {
    this.echo(this.getTitle());
}).viewport(1200, 1000);

casper.then(function () {
    this.sendKeys(x('//*[@id="youtube-url"]'), url_video);
});

casper.then(function () {
    this.click(x('//*[@id="submit"]'));
});

casper.waitForSelector(x('//*[@id="dl_link"]/a[3]'), function () {
    casper.capture("test.png");
    var url_mp3 = "http://www.youtube-mp3.org" + this.getElementAttribute(x('//*[@id="dl_link"]/a[3]'), 'href');
    console.log("url_mp3 : " + url_mp3);
});

casper.run(function () {
    casper.exit();
});

