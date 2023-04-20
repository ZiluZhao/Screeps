const species={
    dropMiner : {
        basicParts : [WORK, WORK, MOVE],
        basicCost : 250,
        maxSegments : 4,
        perfectParts : [WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE],
        perfectCost : 650,
    },

    storeMiner : {
        basicParts : [WORK, WORK, MOVE],
        carryParts : [CARRY, CARRY],
        basicCost : 250,
        carryCost : 100,
        perfectParts : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
        perfectCost : 900,
    },

    transferer : {
        basicParts : [CARRY],
        basicCost : 50,
        moveParts : [MOVE],
        moveCost : 50,
        perfectParts : [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE],
        perfectCost : 850,
    },

    worker: {
        basicParts : [WORK, CARRY, MOVE],
        basicCost : 200,
        maxSegments : 8,
        perfectCost : 1000,
    },

    hauler : {
        basicParts : [CARRY, CARRY, MOVE],
        basicCost : 150,
        maxSegments : 8,
        perfectCost : 600,
    },

};

module.exports = species;