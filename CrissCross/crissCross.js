
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

function checkPath(tileProperty, owner) {
    var stack = [];
    var checkedElements = [];
    var validPositions = [];
    stack.push(this.humanData.tiles[0]);
    checkedElements.push(this.humanData.tiles[0]);
    while (stack.length > 0) {
        var tile = stack.splice(0, 1)[0];
        for (var i = 0; i < tile.neighbors.length; i++) {
            if (tile.neighbors[i].owner == owner) {
                stack.push(tile.neighbors[i]);
            }
        }
        validPositions[tile[tileProperty]] = (validPositions[tile[tileProperty]] || 0) + 1;
    }
    var isAPath = true;
    for (var i = 0; i < tileGrid.length; i++) {
        if (validPositons[i] == 0) {
            isAPath = false;
        }
    }
    return isAPath;
}

function getWinner() {
    var winner = null;
    if (this.humanData.tiles.length >= 7) {
        if (checkPath(x, this.humanData.team)) {
            winner = this.humanData.team;
        }
    }
    if (this.ogreData.tiles.length >= 7) {
        if (checkPath(y, this.ogreData.team)) {
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

function runATurn() {
    
}

function initNewRound() {
    this.humanData.tiles = [];
    this.humanData.gold = 128;
    this.ogreData.tiles = [];
    this.ogreData.gold = 128;
    this.turns = [];
    this.round = (this.round || 0) + 1;
}

function runARound() {
    this.initNewRound();
    var winner = null;
    while (winner == null) {
        this.runATurn();
        winner = this.getWinner();
    }
}

module.exports = function(humanCallback, ogreCallback) {
    var tiles = initTiles(7);
    return {
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
        tileGroups : initTileGroups(tiles, 7),
        getTile : getTile 
    };
};


