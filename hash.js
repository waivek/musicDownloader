var hashCode = function( str ) {
	var hash = 0;
	if (str.length === 0) return hash;
	for (i = 0; i < str.length; i++) {
		c = str.charCodeAt(i);
		hash = ( ( hash<<5 )- hash )+c;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};

var urls = [
    "https://www.youtube.com/watch?v=U5K9AlmWM8s",
    "https://www.youtube.com/watch?v=I2REZSj4XnE"
];

urls.forEach( function ( url ) {
    console.log( url + " : " + hashCode( url ) );
} );
