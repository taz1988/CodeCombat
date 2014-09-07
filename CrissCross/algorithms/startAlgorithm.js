function callback(tileGroupLetter) {

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
