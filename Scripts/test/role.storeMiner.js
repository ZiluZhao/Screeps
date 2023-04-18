
//memory.workSpotPosition (type: RoomPosition)
//memory.mineObjectId (type: ID , energySource)
//memory.storageId (type: ID, storage/link)

var actionsWorker=require('actions.worker');

var roleStoreMiner = {
    moveToWorkSpot : function(creep) {
        actionsWorker.moveToWorkSpot(creep);
    },


    store : function(creep) {
        actionsWorker.storeEnergy(creep);
    },

    mine : function(creep) {
        actionsWorker.mine(creep);
    },

    //already at postion
    mineAndStore : function(creep) {
        if (creep.store.getFreeCapacity()==0 || creep.ticksToLive==1) {
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