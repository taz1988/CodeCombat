var assert = require("assert");
var chooseOptimalPath = require("../algorithms/chooseOptimalPath.js");

describe("crissCross", function() {
    describe("initTree()", function() {
        it("should be init root", function() {
            chooseOptimalPath.initTree();
            assert.deepEqual(chooseOptimalPath.root, { x : -1, y : -1, parent : null});
        });
    });
});
