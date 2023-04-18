var roleHauler = {
    //take from (storage) to (spawn, *)
    distribute: function(creep) {

    },

    //collect form * to (storage)
    //pick up,
    //container,
    //link (in room.memory.storageLinkPosition)
    collect: function(creep) {
        var room=creep.room;
        var droppedResources=room.find(FIND_DROPPED_RESOURCES);
        var structures=room.find(FIND_STRUCTURES);
        var containers=_.filter(structures, (structure)=>structure.structureType==STRUCTURE_CONTAINER);
        var linkArray=_.filter(room.lookForAt(LOOK_STRUCTURES, room.memory.storageLinkPosition), (structure)=>structureType==STRUCTURE_LINK);

        if(creep.memory.storing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.storing = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.storing && creep.store.getFreeCapacity() == 0) {
            creep.memory.storing = true;
            creep.say('⚡ storing');
        }
        if(droppedResources.length>0) {
            var target=creep.pos.findClosestByRange(droppedResources);
            
        }


    },



    run: function(creep) {

    },
};

module.exports = roleHauler;