
//memory.workSpotPosition (type: RoomPosition)
//memory.mineObjectId (type: ID , energySource)
//memory.storageId (type: ID, storage/link)


var roleStoreMiner = {
    moveToWorkSpot : function(creep) {
        var workSpotPosition=creep.memory.workSpotPosition;
        if(creep.ticksToLive==1) {
            if(creep.pos!=workSpotPosition) {
                console.log("cannot reach work spot");
            }
        }
        creep.moveTo(workSpotPosition);
    },


    store : function(creep) {
        var storage=Game.getObjectById(creep.memory.storageId);
        var actionReturn=creep.transfer(storage, RESOURCE_ENERGY);
        if(actionReturn==ERR_FULL) {
            console.log('storage full');
        }
        else if(actionReturn!=OK) {
            console.log("store action error");
        }
    },

    mine : function(creep) {
        var source=Game.getObjectById(creep.memory.mineObjectId);
        var actionReturn=creep.harvest(source);
        if(actionReturn!=0 && actionReturn!=ERR_NOT_ENOUGH_RESOURCES) {
            console.log('mining error');
        }
    },

    //already at postion
    mineAndStore : function(creep) {
        if (creep.store.getFreeCapacity()==0) {
            this.store(creep);
        }
        else {
            this.mine(creep);
        }

    },

    run : function(creep) {
        if(creep.pos==workSpotPosition) {
            this.mineAndStore(creep);
        }
        else {
            this.moveToWorkSpot(creep);
        }

    },

};

module.exports=roleStoreMiner;