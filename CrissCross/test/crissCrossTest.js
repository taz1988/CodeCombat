var crissCross = require("../crissCross.js");
var assert = require("assert");

describe("crissCross", function() {
   describe("checkInitialization", function() {
        it("should be copy callbacks correctly", function() {
            var game = crissCross(1, 2);
            assert.equal(game.humanCallback, 1, "It should be the input humanCallback Value");
            assert.equal(game.ogreCallback, 2, "It should be the input ogreCallback value");
                    });
        it("should be init tilesGrid correctly", function() {
            var game = crissCross(1, 2);
            assert.equal(game.tileGrid.length, 7, "The table size should be 7x7!");
            for (var i = 0; i < 7; i++) {
                assert.equal(game.tileGrid[i].length, 7, "The table size should be 7x7!");
            }
            for (var i = 0; i < 7; i++) {
                for (var j = 0; j < 7; j++) {
                    assert.equal(game.tileGrid[i][j].x, i, "The tile should be contain the proper x coordinate");
                    assert.equal(game.tileGrid[i][j].y, j, "The tile should be contain the proper y coordinate");
                    assert.equal(game.tileGrid[i][j].owner, null, "The tile owner should be null");
                }
            }
            assert.equal(game.tileGrid[0][0].neighbors.length, 3, "Should be 3 neighnors");
            assert.equal(game.tileGrid[2][0].neighbors.length, 5, "Should be 3 neighnors");
            assert.equal(game.tileGrid[2][2].neighbors.length, 8, "Should be 3 neighnors");
       });
       it("should be set tiles to groups", function() {
           var game = crissCross(1, 2);
           var count = {
                "A" : 0,
                "B" : 0,
                "C" : 0,
                "D" : 0,
                "E" : 0,
                "F" : 0,
                "G" : 0
            }
           for (var i = 0; i < 7; i++) {
               for (var j = 0; j < 7; j++) {
                    count[game.tileGrid[i][j].tileGroupLetter] = count[game.tileGrid[i][j].tileGroupLetter] + 1
                }
           }
           assert.equal(count.A, 7, "It should be 7 tile in a group");
           assert.equal(count.B, 7, "It should be 7 tile in a group");
           assert.equal(count.C, 7, "It should be 7 tile in a group");
           assert.equal(count.D, 7, "It should be 7 tile in a group");
           assert.equal(count.E, 7, "It should be 7 tile in a group");
           assert.equal(count.F, 7, "It should be 7 tile in a group");
           assert.equal(count.G, 7, "It should be 7 tile in a group");
        });
    });
    describe("getTile", function() {
        it("should be return the proper tile", function(){
            var game = crissCross(1, 2);
            var tile = game.getTile(0,0);
            assert.equal(tile.x, 0, "The tile x coordinate should be 0");
            assert.equal(tile.y, 0, "The tile y coordinate should be 0");
            tile = game.getTile(2,3);
            assert.equal(tile.x, 2, "The tile x coordinate should be 2");
            assert.equal(tile.y, 3, "The tile y coordinate should be 3");
        });
    }); 
});
