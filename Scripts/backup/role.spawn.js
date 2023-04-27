const workerType = {
    parts : [WORK, CARRY, MOVE],
    cost : BODYPART_COST[WORK] + BODYPART_COST[CARRY] + BODYPART_COST[MOVE],
};

var roleSpawn= {

    // input 
    //      structureSpawn, energyBudget(<capacity), roleType
    // output
    //      an array containing body parts
    design : function(spawn, budget, role) {
        if ( budget > spawn.room.energyCapacityAvailable) {
            budget = spawn.room.energyCapacityAvailable;
        }
        var multi = Math.floor(budget/role.cost);

        var i=0;
        var partArray=[];
        while (i <= multi-1) {
            partArray=partArray.concat(role.parts);
            i=i+1;
        }
        return partArray;
    },

    spawnWorker : function(spawn){
        var workers = _.filter(spawn.room.find(FIND_MY_CREEPS), (creep) => creep.memory.bodyType == 'worker');
        var requiredWorkers=spawn.room.memory.requiredWorkers;
        if(workers.length<requiredWorkers) {
            var newName = 'Worker' + Game.time;
            var partArray=this.design(spawn, spawn.room.energyCapacityAvailable, workerType);
            spawn.spawnCreep(partArray, newName, {memory : {bodyType: 'worker', role: 'harvester', currentJob: 0, home : spawn.room.name}})
        }

    },
};

module.exports = roleSpawn;