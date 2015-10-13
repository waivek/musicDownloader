// var list_song = [ 
//         { artist: "artist1", title : "title1", url : 'file:///X:/Dropbox/js', album : "album", genre : "genre", date : "date" },
//         { artist: "artist2", title : "title2", url : 'file:///X:/Dropbox/c', album : "album", genre : "genre", date : "date" },
//         { artist: "artist3", title : "title3", url : 'file:///X:/Dropbox/spanish', album : "album", genre : "genre", date : "date" },
//         { artist: "artist4", title : "title4", url : 'file:///X:/Dropbox/Music', album : "album", genre : "genre", date : "date" },
//         { artist: "artist5", title : "title5", url : 'file:///X:/Dropbox/haskell', album : "album", genre : "genre", date : "date" },
//         { artist: "artist6", title : "title6", url : 'file:///X:/Dropbox/Music/Singles/Nico Vega -  Beast.mp3', album : "album", genre : "genre", date : "date" }
// ];
var list_song = [];

var fs = require('fs');
var x = fs.readFileSync( 'links.txt', 'utf8').
            trim().
            split("\n").
            map(function (item) {
                return item.trim();
            });

console.log("x : " + x);
