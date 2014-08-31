
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


module.exports = function(humanCallback, ogreCallback) {
    var tiles = initTiles(7);
    return {
        humanCallback: humanCallback,
        ogreCallback: ogreCallback,
        tileGrid : tiles,
        tileGroups : initTileGroups(tiles, 7) 
    };
};


