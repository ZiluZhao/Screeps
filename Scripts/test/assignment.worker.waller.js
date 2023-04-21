var assignmentWorkerWaller = {
    run: function(creep) {

        if(creep.memory.walling && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.walling = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.walling && creep.store.getFreeCapacity() == 0) {
            creep.memory.walling = true;
            creep.say('🚧 wall');
        }

        if(creep.memory.walling) {
            //var targets = creep.room.find(FIND_MY_CONSTRUCTION_SITES);
            var structures = creep.room.find(FIND_STRUCTURES);
            var damagedWalls = _.filter(structures, (structure) => (structure.hits<structure.hitsMax && structure.structureType==STRUCTURE_WALL));


            if (damagedWalls.length) {
                var repairTarget=creep.pos.findClosestByRange(damagedWalls);
                if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTarget);
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

module.exports=assignmentWorkerWaller;