var pretty_printer = function ( domain, string, time ) {
    var len = 80;
    var a = "[ " + domain + " ] ";
    var b = string;
    var c = " [ " + time + "s ]";
    var len_rem = len - a.length - c.length;

    var len_b = b.length;
    var b_new = "unknown";
    if ( b.length > len_rem ) {
        var mid = len_rem / 2;
        b_new = b.substring(0, mid-3) + "..." + b.substring(len_b - mid, len_b);
    } else {
        var len_space = len_rem - b.length;
        b_new = b + Array( len_space+1 ).join(' ');
    }
    return a+b_new+c;
};

console.log("Formatted String :=\n" + pretty_printer('YouTube', 'message', 5));
console.log("Formatted String :=\n" + pretty_printer('YouTube', 'a really long string that has no business being here and is probably a fucking URL for all I know but still must be accepted beause it has good parental connections fuck', 10));


