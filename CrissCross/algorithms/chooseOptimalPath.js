

function callback(tileGroupLetter) {

//*** new tree building part
var groupLetters = ["A", "B", "C", "D", "E", "F", "G"];
//The tree root
var root;

function fillTileNeighbourhoods(tiles, tile) {
    if (tile.x > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y]);
    }
    if (tile.x < 7) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y]);
    }
    if (tile.y > 0) {
        tile.neighbors.push(tiles[tile.x][tile.y - 1]);
    }
    if (tile.y < 7) {
        tile.neighbors.push(tiles[tile.x][tile.y + 1]);
    }
    if (tile.x < 7 && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y - 1]);
    }
    if (tile.x < 7 && tile.y < limit) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y + 1]);
    }
    if (tile.x > 0 && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y - 1]);
    }
    if (tile.x > 0 && tile.y < 7) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y + 1]);
    }
}

function getTilesForTree() {
    var tilesForTree = [];
    for (var i = 0; i < 7; i++) {
        var row = [];
        for (var j = 0; j < 7; j++) {
            var tile = this.getTile(i, j);
            row.push({
                x : tile.x,
                y : tile.y,
                owner : tile.owner,
                neighbors : []
            });
        }
        tilesForTree.push(row);
    }
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
            fillTileNeighbourhoods(tilesForTree, tilesForTree[i][j]);
        }
    }
    return tilesForTree;
}


function getTilesGroups() {
    var tileGroupsForTree = [];
    for (var i = 0; i < groupLetters.length; i++) {
        var tiles = this.tileGroups[groupLetters[i]];
        var group = [];
        for (var j = 0; j < tiles.length; j++) {
            if (tiles[j].owner == null) {
                group.push({
                    x : tiles[x].x,
                    y : tiles[j].y
                });
            }
        }
        tileGroupsForTree.push(group);
    }
    return tileGroupsForTree;
}

function initTree() {
    root = {
        x : -1,
        y : -1,
        parent : null,
        childs : []
    }
}

function checkPath(tileProperty, owner, tile) {
    var stack = [];
    var checkedElements = [];
    var validPositions = [];
    stack.push(tile);
    checkedElements.push(tile);
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


function buildTree(node, actualGroupLetter) {
    
};
//*** end tree

coordinatesToBuy = [[0,0], [1,1], [2,2], [3,3], [4,4], [5,5], [6,6]];
console.log(tileGroupLetter);
var tiles = this.tileGroups[tileGroupLetter];  // tiles available this turn
var tileIWant = null;
var tile, coordinates, i, j;

for (i = 0; i < tiles.length; i++) {
  tile = tiles[i];
  if (tile.owner) continue;  // can't buy a tile that's been bought

  for (j = 0; j < coordinatesToBuy.length; j++) {
    coordinates = coordinatesToBuy[j];
    if (coordinates[0] !== tile.x) continue;
    if (coordinates[1] !== tile.y) continue;
    
    // We have a match!
    tileIWant = tile;
    break;
  }
  if(tileIWant) break;
}


// If none of the tiles you want are available, skip this round.
if(!tileIWant) { return null; }

//////////////////////////////////////////////////////////////////////////////
// 2. Choose your bid price. You only pay and win the tile if your bid wins.

var myBid = Math.floor(10 + Math.random() * 10);

//////////////////////////////////////////////////////////////////////////////
// 3. Respond with an object with properties 'gold' and 'desiredTile'.

return {gold: myBid, desiredTile: tileIWant};


// -- FOR MORE INFO, READ THE GUIDE -- //
//         It's at the top bar.
}

module.exports = {
        callback : callback
    };
