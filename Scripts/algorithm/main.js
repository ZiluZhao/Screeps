const algorithmMain = require("./algorithm.main");

module.exports.loop = function () {
    var memoryEntryClass=['flags', 'rooms', 'creeps', 'spawns'];
    for (var entryName in memoryEntryClass){
        algorithmMain.iterate(entryName);
    }
}