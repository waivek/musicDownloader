var list_song = [ 
        { artist: "artist1", title : "title1", url : 'file:///X:/Dropbox/js', album : "album", genre : "genre", date : "date" },
        { artist: "artist2", title : "title2", url : 'file:///X:/Dropbox/c', album : "album", genre : "genre", date : "date" },
        { artist: "artist3", title : "title3", url : 'file:///X:/Dropbox/spanish', album : "album", genre : "genre", date : "date" },
        { artist: "artist4", title : "title4", url : 'file:///X:/Dropbox/Music', album : "album", genre : "genre", date : "date" },
        { artist: "artist5", title : "title5", url : 'file:///X:/Dropbox/haskell', album : "album", genre : "genre", date : "date" },
        { artist: "artist6", title : "title6", url : 'file:///X:/Dropbox/Music/Singles/Nico Vega -  Beast.mp3', album : "album", genre : "genre", date : "date" }
];

var link_to_anchor = function (song) {
    // '<a href="$link">$flattext</a></br>
    return '<a href="' + song.url + '">' +
            song.artist + " - " + song.title + '</a></br>';
};

var append_file = function ( fname, str ) {
    var fs = require('fs');
    fs.appendFile(fname, str, function (err) {
        if (err) {
            throw err;
        }
    });
};

var html_generator = function (list) {
    var name = "mp3html.html";
    var fs = require('fs');
    fs.writeFile(name, '', function () {} );
    
    append_file(name, "<html>\n");
    list.map( function (song) {
        var html_snippet = "\t" + link_to_anchor(song) + "\n";
        append_file(name, html_snippet);
    });
    append_file(name, "</html>\n");
};

html_generator(list_song);
