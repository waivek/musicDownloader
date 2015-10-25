var casper = require("casper").create();


var args = casper.cli.args;
console.log("args[0] : " + args[0]);

casper.exit();
