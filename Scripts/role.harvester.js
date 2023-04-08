var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {
        var CURRENT_JOB_HARVEST=1;
        var CURRENT_JOB_DEPOSIT=0;
        //set current job
        if(creep.memory.currentJob==CURRENT_JOB_HARVEST && creep.store.getFreeCapacity() == 0){
            creep.memory.currentJob=CURRENT_JOB_DEPOSIT;
        }
        //maybe change later
        else if(creep.memory.currentJob==CURRENT_JOB_DEPOSIT && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.currentJob=CURRENT_JOB_HARVEST;
        }



        if(creep.memory.currentJob==CURRENT_JOB_DEPOSIT) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)  &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }

};

module.exports = roleHarvester;