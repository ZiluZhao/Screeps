const speciesDropMiner = require("./species.dropMiner");
const speciesHauler = require("./species.hauler");
const speciesStoreMiner = require("./species.storeMiner");
const speciesWorker = require("./species.worker");

var actionSpecies={
    worker : speciesWorker,
    dropMiner : speciesDropMiner,
    storeMiner : speciesStoreMiner,
    hauler : speciesHauler,
    
};

module.exports=actionSpecies;