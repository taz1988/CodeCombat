var crissCross = require("./crissCross.js");
var util = require("util");
var fs = require("fs");

if (process.argv.length < 5) {
    console.error("Please give 2 path where I find the algorithms and a round number");
    process.exit(0);
}

var humanCallback = require(process.argv[2]);
var ogreCallback = require(process.argv[3]);

var game = crissCross(humanCallback.callback, ogreCallback.callback);
var stat = game.runAMatch(process.argv[4]);

stat.avarageHumanGold = 0;
stat.avarageOgreGold = 0;

for (var i = 0; i < stat.rounds.length; i++) {
    stat.avarageHumanGold += stat.rounds[i].humanGold;
    stat.avarageOgreGold += stat.rounds[i].ogreGold;
}

stat.avarageHumanGold /= stat.rounds.length;
stat.avarageOgreGold /= stat.rounds.length;

var date = new Date();

fs.writeFile("./result/simulation-" + date.toISOString() + ".json", util.inspect(stat, {depth: 5}), function (err) {
    if (err) throw err;
});
