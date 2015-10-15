module.exports = {
    pretty_printer : function ( domain, message, time ) {
        var len = 80;
        var a = "[ " + domain + " ] ";
        var b = message;
        if ( time === undefined ) {
            c = "";
        } else {
            var c = " [ " + time + "s ]";
        }
        var len_rem = len - a.length - c.length;

        var len_b = b.length;
        var b_new = "unknown";
        if ( b.length > len_rem ) {
            var mid = len_rem / 2;
            b_new = b.substring(0, mid-3) + "..." + b.substring(len_b - mid, len_b);
        } else {
            var len_space = len_rem - b.length;
            // makes len_space spaces
            b_new = b + Array( len_space+1 ).join(' ');
        }
        var res = a+b_new+c;
        return res.trim();
    }


};
