var roleRepairer = {
    run: function(creep) {
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.repairing) {
            var structures = creep.room.find(FIND_MY_STRUCTURES);
            var damagedStructures = _.filter(structures, (structure) => structure.hits<structure.hitsMax);
            var damagedStructures = _.filter(damagedStructures, (structure) => structure.structureType!=STRUCTURE_WALL);
            if(damagedStructures.length) {
                var target=creep.pos.findClosestByRange(damagedStructures);
                if(creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = _.filter(creep.room.find(FIND_SOURCES), (source)=>source.energy>0);
            targetSource = creep.pos.findClosestByRange(sources);
            if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    },
};

module.exports = roleRepairer;