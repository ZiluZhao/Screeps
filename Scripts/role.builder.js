var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var structures = creep.room.find(FIND_MY_STRUCTURES);
            var damagedStructures = _.filter(structures, (structure) => (structure.hits<structure.hitsMax && structure.structureType!=STRUCTURE_WALL));


            if (damagedStructures.length) {
                var repairTarget=creep.pos.findClosestByRange(damagedStructures);
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if(targets.length) {
                var constructTarget=creep.pos.findClosestByRange(targets);
                if(creep.build(constructTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructTarget, {visualizePathStyle: {stroke: '#ffffff'}});
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
    }
};

module.exports = roleBuilder;