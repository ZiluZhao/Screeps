var assignmentWorkerBuilder = {
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
            var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            var structures = creep.room.find(FIND_STRUCTURES);
            var damagedStructures = _.filter(structures, (structure) => (structure.hits<structure.hitsMax && structure.structureType!=STRUCTURE_WALL));


            if (damagedStructures.length) {
                var repairTarget=creep.pos.findClosestByRange(damagedStructures);
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget);
                }
            }
            else if(targets.length) {
                var constructTarget=creep.pos.findClosestByRange(targets);
                if(creep.build(constructTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructTarget);
                }
            }
            
        }
        else {
            var storage = creep.room.storage;
            if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
        }
    }
};

module.exports=assignmentWorkerBuilder;