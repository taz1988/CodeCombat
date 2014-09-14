//*** new tree building part
var groupLetters = ["A", "B", "C", "D", "E", "F", "G"];

var self = this;

function fillTileNeighbourhoods(tiles, tile) {
    if (tile.x > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y]);
    }
    if (tile.x < 6) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y]);
    }
    if (tile.y > 0) {
        tile.neighbors.push(tiles[tile.x][tile.y - 1]);
    }
    if (tile.y < 6) {
        tile.neighbors.push(tiles[tile.x][tile.y + 1]);
    }
    if (tile.x < 6 && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y - 1]);
    }
    if (tile.x < 6 && tile.y < 6) {
        tile.neighbors.push(tiles[tile.x + 1][tile.y + 1]);
    }
    if (tile.x > 0 && tile.y > 0) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y - 1]);
    }
    if (tile.x > 0 && tile.y < 6) {
        tile.neighbors.push(tiles[tile.x - 1][tile.y + 1]);
    }
}

var getTilesForTree = function () {
    var tilesForTree = [];
    for (var i = 0; i < 7; i++) {
        var row = [];
        for (var j = 0; j < 7; j++) {
            var tile = self.getTile(i, j);
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
        var tiles = self.tileGroups[groupLetters[i]];
        var group = [];
        for (var j = 0; j < tiles.length; j++) {
            if (tiles[j].owner == null) {
                group.push({
                    x : tiles[j].x,
                    y : tiles[j].y
                });
            }
        }
        tileGroupsForTree.push(group);
    }
    return tileGroupsForTree;
}

function initTree() {
    this.root = {
        x : -1,
        y : -1,
        parent : null
    }
}

function checkPath(tileProperty, owner, tile) {
    var stack = [];
    var checkedElements = [];
    var validPositions = [0, 0, 0, 0, 0, 0, 0];
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
    for (var i = 0; i < 6; i++) {
        if (validPositions[i] == 0) {
            isAPath = false;
        }
    }
    return isAPath;
}


function buildPath(actualGroupLetter) {
   var groupIndex = groupLetters.indexOf(actualGroupLetter);
   var tilesForTree = getTilesForTree();
   var tilesGroups = getTilesGroups();
   initTree();
   var stack = [root];
   var bestLeaf = null;
   while (stack.length != 0 && bestLeaf == null) {
	var nextStack = [];
        while (stack.length != 0) {
            var actual = stack.splice(0, 1);
	    for (var i = 0; i < tilesGroups[groupIndex].length; i++) {
	        var tile = tilesForTree[tilesGroups[groupIndex][i].x][tilesGroups[groupIndex][i].y];
	        if (tile.owner == null) {
                    tile.owner = "humans";
                    var newLeaf = {
                           x : tile.x,
                           y : tile.y,
                           parent : actual
                    };
		    if (checkPath("x", "humans", tile) == true) {
				console.log("bestLeaf");
				console.log(bestLeaf);
		        	bestLeaf = newLeaf;
		    }
                    nextStack.push(bestLeaf);
	        }	
	    }
        }
        stack = nextStack;
   	groupIndex++;
	if (groupIndex > 6) {
		groupIndex = 0;
	}
    }
    var path = [];
    while (bestLeaf != null && bestLeaf.x != -1 && bestLeaf.y != -1) {
        path.push([bestLeaf.x, bestLeaf.y]);
        bestLeaf = bestLeaf.parent;   
    }
    return path;
};

module.exports = {
        root : root,
        fillTileNeighbourhoods : fillTileNeighbourhoods,
        getTilesForTree : getTilesForTree,
        getTilesGroups : getTilesGroups,
        initTree : initTree,
        checkPath : checkPath,
        buildPath : buildPath
    };
