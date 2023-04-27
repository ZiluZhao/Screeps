const algorithmMain = require("./algorithm.main");

module.exports.loop = function () {
    var memoryEntryClass=['flags', 'rooms', 'creeps', 'spawns'];
    for (var i=0; i<=memoryEntryClass-1; i++){
        algorithmMain.iterate(memoryEntryClass[i]);
    }
}