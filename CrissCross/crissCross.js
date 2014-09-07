var util = require("util");
var inspectOptions = {
    color : true,
    depth : 2
}
function createTileObject(x, y) {
    return {
        x : x,
        y : y,
        neighbors : [],
        owner : null,
        tileGroupLetter : null
    }
}


function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function fillTileNeighbourhoods(tiles, tile, n) {
    var limit = n - 1;
    if (tile.x > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y]);
    }
    if (tile.x < limit) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y]);
    }
    if (tile.y > 0) {
        tile.neighbors.push(tiles[tile.x][tile.y - 1]);
    }
    if (tile.y < limit) {
        tile.neighbors.push(tiles[tile.x][tile.y + 1]);
    }
    if (tile.x < limit && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y - 1]);
    }
    if (tile.x < limit && tile.y < limit) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y + 1]);
    }
    if (tile.x > 0 && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y - 1]);
    }
    if (tile.x > 0 && tile.y < limit) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y + 1]);
    }
}

function initTiles(n) {
    var tiles = [];
    for(i = 0; i < n; i++) {
        var row = [];
        for(j = 0; j < n; j++) {
            row.push(createTileObject(i, j));
        }
        tiles.push(row);
    }
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            fillTileNeighbourhoods(tiles, tiles[i][j], n);
        }
    } 
    return tiles;
}

function createRandomTileGroups(tiles, n) {
    var validLetterNumbers = ["A"];
    for (var i = 0; i < (n - 1); i++) {
        validLetterNumbers.push(nextChar(validLetterNumbers[validLetterNumbers.length - 1]));
    }
    var validPositions = [];
    for (var i = 0; i < n; i++) {
       for (var j = 0; j < n; j++) {
            validPositions.push({
                x : i,
                y : j
            });
        }
    }
    for (var i = 0; i < (n*n); i++) {
        if (i % n == 0 && i != 0) {
            validLetterNumbers.splice(0, 1);
        }
        var index = Math.floor(Math.random() * (validPositions.length - 1));
        var pos = validPositions.splice(index, 1)[0];
        tiles[pos.x][pos.y].tileGroupLetter = validLetterNumbers[0];
        }
}

function initTileGroups(tiles, n) {
    var tileGroups = {
        A : []
    }
    var index = "A";
    for ( var i = 0; i < (n - 1); i++) {
        index = nextChar(index);
        tileGroups[index] = [];
    }
    createRandomTileGroups(tiles, n);
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            tileGroups[tiles[i][j].tileGroupLetter].push(tiles[i][j]);
        }
    }
    return tileGroups;
}

function getTile(x, y) {
    return this.tileGrid[x][y];
}

function checkPath(tileProperty, owner, tiles) {
    var stack = [];
    var checkedElements = [];
    var validPositions = [];
    stack.push(tiles[0]);
    checkedElements.push(tiles[0]);
    while (stack.length > 0) {
        var tile = stack.splice(0, 1)[0];
        checkedElements.push(tile);
        for (var i = 0; i < tile.neighbors.length; i++) {
            if (tile.neighbors[i].owner == owner && checkedElements.indexOf(tile.neighbors[i]) == 1) {
                stack.push(tile.neighbors[i]);
            }
        }
        validPositions[tile[tileProperty]] = (validPositions[tile[tileProperty]] || 0) + 1;
    }
    var isAPath = true;
    for (var i = 0; i < this.size; i++) {
        if (validPositons[i] == 0) {
            isAPath = false;
        }
    }
    return isAPath;
}

function getWinner() {
    var winner = null;
    if (this.humanData.tiles.length >= 7) {
        if (checkPath("x", this.humanData.team, this.humanData.tiles)) {
            winner = this.humanData.team;
        }
    }
    if (this.ogreData.tiles.length >= 7) {
        if (checkPath("y", this.ogreData.team, this.ogreData.tiles)) {
            winner = this.ogreData.team;
        }
    }
    return winner;
}

function initHumanCallback() {
    this.myTiles = this.humanData.tiles;
    this.ownedTiles = this.myTiles;
    this.opponentTiles = this.ogreData.tiles;
    this.gold = this.humanData.gold;
    this.team = this.humanData.team;
}

function initOgreCallback() {
    this.myTiles = this.ogreData.tiles;
    this.ownedTiles = this.myTiles;
    this.opponentTiles = this.humanData.tiles;
    this.gold = this.ogreData.gold;
    this.team = this.ogreData.team;
}

function validateBidTile(bid) {
    var invalidTile = false;
    var desiredTile = bid.desiredTile || null;
    if (desiredTile == null || desiredTile.owner != null || desiredTile.tileGroupLetter != this.actualGroupLetter || desiredTile.x < 0 || desiredTile.x > this.size || desiredTile.y < 0 || desiredTile.y > this.size) {
       invalidTile = true;
       console.log("Invalid bid, the tile is not valid! %s" + util.inspect(bid)); 
    }
    bid.invalidTile = invalidTile;
}

function validateBidPrice(bid, availableGold) {
    var invalidPrice = false;
    if (bid.bid == null || bid.bid > availableGold) {
        invalidPrice = true;
        console.log("Invalid bid, not enough money! %s", util.inspect(bid));
    }
    bid.invalidBid = invalidPrice;
}

function chooseWinnerBid(validBids) {
    var choosedBid = null;
    if (validBids.length > 0) {
       var maxBid = validBids[0];
       for (var i = 1; i < validBids.length; i++) {
           if (maxBid.bid < validBids[i].bid) {
                maxBid = validBids[i];
           }
       }
       //TODO this part of the simulator not good, didn't handle equal bid situations
       choosedBid = maxBid;
    }
    return choosedBid;
}

function runATurn() {
    this.initHumanCallback();
    var humanBid = this.humanCallback(this.actualGroupLetter);
    if (humanBid == null) {
        humanBid = {};
    } else {
        humanBid.bid = humanBid.gold;
    }
    humanBid.team = this.humanData.team;
    this.validateBidTile(humanBid);
    validateBidPrice(humanBid, this.humanData.gold);
    this.initOgreCallback();
    var ogreBid = this.ogreCallback(this.actualGroupLetter);
    if (ogreBid == null) {
        ogreBid = {};
    } else {
        ogreBid.bid = ogreBid.gold;
    }
    ogreBid.team = this.ogreData.team;
    this.validateBidTile(ogreBid);
    validateBidPrice(ogreBid, this.ogreData.gold);
    var validBids = [];
    if (!humanBid.invalidBid && !humanBid.invalidTile) {
        validBids.push(humanBid);
    }
    if (!ogreBid.invalidBid && !ogreBid.invalidTile) {
        validBids.push(ogreBid);
    }
    var choosedBid = this.chooseWinnerBid(validBids);
    if (choosedBid != null) {
        if (choosedBid.team == this.ogreData.team) {
            this.getTile(choosedBid.desiredTile.x, choosedBid.desiredTile.y).owner = this.ogreData.team;
            this.ogreData.tiles.push(this.getTile(choosedBid.desiredTile.x, choosedBid.desiredTile.y));
            this.ogreData.gold -= choosedBid.bid;   
        } else {
            this.getTile(choosedBid.desiredTile.x, choosedBid.desiredTile.y).owner = this.humanData.team;
            this.humanData.gold -= choosedBid.bid;  
            this.humanData.tiles.push(this.getTile(choosedBid.desiredTile.x, choosedBid.desiredTile.y)); 
        }
    }
    this.turns.push({
        number : this.turns.length,
        tileGroup : this.actualGroupLetter,
        humanGold : this.humanData.gold,
        ogreGold : this.ogreData.gold,
        humanBid : humanBid,
        ogreBid : ogreBid
    });
}

function initNewRound() {
    this.humanData.tiles = [];
    this.humanData.gold = 128;
    this.ogreData.tiles = [];
    this.ogreData.gold  = 128;
    this.turns = [];
    this.actualGroupLetter = "A";
    this.round = (this.round || 0) + 1;
    for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
            this.tileGrid[i][j].owner = null;
        }
    }
}

function runARound() {
    console.log("Start a new round...");
    this.initNewRound();
    var winner = null;
    while (winner == null && this.turns.length < 250) {
        this.runATurn();
        //TODO don't static the last character (I am lazy bastard)
        if (this.actualGroupLetter === "G") {
            this.actualGroupLetter = "A";
        } else {
            this.actualGroupLetter = nextChar(this.actualGroupLetter);
        }
        winner = this.getWinner();
    }
    if (winner == null) {
        console.log("Nobody wins! ");
    } else if (winner == this.humanData.team) {
        this.humanData.wins++;
        console.log("Humans wins!");
    } else {
        this.ogreData.wins++;
        console.log("Ogre wins");
    }
    this.roundStat.humanWins = this.humanData.wins;
    this.roundStat.ogreWins = this.ogreData.wins;
    console.log("Finished round. Human data: %s,\n Ogre data: %s,\n Turns: %s", util.inspect(this.humanData, inspectOptions), util.inspect(this.ogreData, inspectOptions), util.inspect(this.turns, inspectOptions));
    this.roundStat.rounds.push({
        humanGold : this.humanData.gold,
        ogreGold : this.ogreData.gold,
        turns : this.turns
    });
}

function runAMatch(roundNumber) {
    this.roundStat = { rounds : []};
    for (var i = 0; i < roundNumber; i++) {
        this.runARound();
    }
    console.log("End of the Match. Human won rounds: " + this.humanData.wins  + ", Ogre won rounds: " + this.ogreData.wins);
    return this.roundStat;
}


module.exports = function(humanCallback, ogreCallback) {
    var size = 7;
    var tiles = initTiles(size);
    console.log(humanCallback);
    return {
        roundStat : {
            rounds : []
        },
        humanData : {
            tiles : [],
            gold : 128,
            team : "humans",
            wins : 0
        },
        humanCallback: humanCallback,
        ogreData : {
            tiles : [],
            gold : 128,
            team : "ogres",
            wins : 0
        },
        ogreCallback: ogreCallback,
        tileGrid : tiles,
        tileGroups : initTileGroups(tiles, size),
        getTile : getTile,
        size : size,
        runARound : runARound,
        initNewRound : initNewRound,
        runAMatch : runAMatch,
        runATurn : runATurn,
        getWinner : getWinner,
        checkPath : checkPath,
        initHumanCallback : initHumanCallback,
        initOgreCallback : initOgreCallback,
        chooseWinnerBid : chooseWinnerBid,
        validateBidTile : validateBidTile
    };
};


