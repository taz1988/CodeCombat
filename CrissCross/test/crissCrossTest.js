var crissCross = require("../crissCross.js");
var assert = require("assert");
var base = require("../algorithms/startAlgorithm.js");
var doNothing = require("../algorithms/doNothing.js");
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
    describe ("checkBiding", function () {
        it("should be invalid bid, too much gold", function () {
            var game = crissCross(function () { 
                return { gold: 300, desiredTile : this.getTile(0, 0) };
            }, function () {
                return null;
             });
            game.initNewRound();
            game.actualGroupLetter = game.getTile(0, 0).tileGroupLetter;
            game.runATurn();
            assert.equal(game.humanData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.ogreData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.getTile(0, 0).owner, null, "The owner field should be null");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, true, "invalid bid should be true in human biding");
            assert.equal(game.turns[0].humanBid.invalidTile, false, "It shouldn't be invalid tile");
        });
       it("should be invalid bid, invalid tile x coordinate", function () {
            var humanTile = {
                x : -1,
                y : 0,
                owner : null,
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 9,
                y : 0,
                owner : null,
                tileGroupLetter : "A"

            };
            var game = crissCross(function () { 
                return { gold: 50, desiredTile : humanTile };
            }, function () {
                return { gold : 50, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "A";
            game.runATurn();
            assert.equal(game.humanData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.ogreData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.getTile(0, 0).owner, null, "The owner field should be null");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, true, "It should be invalid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, true, "It should be invalid tile");
        });
        it("should be invalid bid, invalid tile y coordinate", function () {
            var humanTile = {
                x :  0,
                y : -1,
                owner : null,
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 0,
                y : 9,
                owner : null,
                tileGroupLetter : "A"

            };
            var game = crissCross(function () { 
                return { gold: 50, desiredTile : humanTile };
            }, function () {
                return { gold : 50, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "A";
            game.runATurn();
            assert.equal(game.humanData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.ogreData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.getTile(0, 0).owner, null, "The owner field should be null");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, true, "It should be invalid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, true, "It should be invalid tile");
        });
        it("should be invalid bid, invalid tile not null owner", function () {
            var humanTile = {
                x : 0,
                y : 0,
                owner : "some",
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 0,
                y : 0,
                owner : "some",
                tileGroupLetter : "A"

            };
            var game = crissCross(function () { 
                return { gold: 50, desiredTile : humanTile };
            }, function () {
                return { gold : 50, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "A";
            game.runATurn();
            assert.equal(game.humanData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.ogreData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.getTile(0, 0).owner, null, "The owner field should be null");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, true, "It should be invalid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, true, "It should be invalid tile");
        });  
    });
    it("should be invalid bid, invalid tile group letter", function () {
            var humanTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "B"

            };
            var game = crissCross(function () { 
                return { gold: 50, desiredTile : humanTile };
            }, function () {
                return { gold : 50, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "C";
            game.runATurn();
            assert.equal(game.humanData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.ogreData.gold, 128, "It should be an invalid Bid");
            assert.equal(game.getTile(0, 0).owner, null, "The owner field should be null");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, true, "It should be invalid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, true, "It should be invalid tile");
        });
        it("human bid should be win", function () {
            var humanTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "A"

            };
            var game = crissCross(function () { 
                return { gold: 60, desiredTile : humanTile };
            }, function () {
                return { gold : 50, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "A";
            game.runATurn();
            assert.equal(game.humanData.gold, 68, "It should be 68");
            assert.equal(game.ogreData.gold, 128, "It should be 128");
            assert.equal(game.getTile(0, 0).owner, "humans", "The owner field should be human");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, false, "It should be valid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, false, "It should be valid tile");
        });
        it("ogre bid should be win", function () {
            var humanTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "A"
            };
            var ogreTile = {
                x : 0,
                y : 0,
                owner : null,
                tileGroupLetter : "A"

            };
            var game = crissCross(function () { 
                return { gold: 50, desiredTile : humanTile };
            }, function () {
                return { gold : 60, desiredTile : ogreTile };
             });
            game.initNewRound();
            game.actualGroupLetter = "A";
            game.runATurn();
            console.log(game.humanData);
            assert.equal(game.humanData.gold, 128, "It should be 128");
            assert.equal(game.ogreData.gold, 68, "It should be 68");
            assert.equal(game.getTile(0, 0).owner, "ogres", "The owner field should be ogre");
            assert.equal(game.turns.length, 1, "It should be 1 turn registered");
            assert.equal(game.turns[0].humanBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].humanBid.invalidTile, false, "It should be valid tile");
            assert.equal(game.turns[0].ogreBid.invalidBid, false, "the gold should be valid");
            assert.equal(game.turns[0].ogreBid.invalidTile, false, "It should be valid tile");
        });
    describe("test round running", function () {
        it("human should be win the round when ogre do nothing", function() {
            var game = crissCross(base.callback, doNothing.callback);
            game.runARound();
            assert.equal(game.humanData.wins, 1, "Human should be win");
            assert.equal(game.ogreData.wins, 0, "Ogre should be lose");
        });
       it("ogre should be win the round when human do nothing", function() {
            var game = crissCross(doNothing.callback, base.callback);
            game.runARound();
            assert.equal(game.humanData.wins, 0, "Human should be lose");
            assert.equal(game.ogreData.wins, 1, "Ogre should be win");
        });
    }); 
    describe("check simulation", function () {
        it("human should be win the match when ogre do nothing", function() {
            var game = crissCross(base.callback, doNothing.callback);
            var stat = game.runAMatch(3);
            assert.equal(game.round, 3, "It should be run 3 round");
            assert.equal(stat.humanWins, 3, "Human should be win");
            assert.equal(stat.ogreWins, 0, "Ogre should be lose");
        });
       it("ogre should be win the match when human do nothing", function() {
            var game = crissCross(doNothing.callback, base.callback);
            var stat = game.runAMatch(3);
            assert.equal(game.round, 3, "It should be run 3 round");
            assert.equal(stat.humanWins, 0, "Human should be lose");
            assert.equal(stat.ogreWins, 3, "Ogre should be win");
        });

    });
});
