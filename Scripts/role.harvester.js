var roleHarvester = {
    /** @param {Creep} creep **/
    run: function(creep) {

        //set current job
        if(creep.memory.depositing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.depositing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.depositing && creep.store.getFreeCapacity() == 0) {
            creep.memory.depositing = true;
            creep.say('⚡ deposit');
        }


        if(creep.memory.depositing) {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER)  &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                var tar=creep.pos.findClosestByRange(targets);
                if(creep.transfer(tar, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tar, {visualizePathStyle: {stroke: '#ffffff'}});
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