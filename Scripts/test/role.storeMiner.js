
//memory.workSpotPosition (type: RoomPosition)
//memory.mineObjectId (type: ID , energySource)
//memory.storageId (type: ID, storage/link)

var actionsWorker=require('./actions.worker');
var myConstants=require('myConstants');

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

    //already at position
    mineAndStore : function(creep) {
        if (creep.store.getFreeCapacity()==0 || creep.ticksToLive==1) {
            this.store(creep);
        }
        else {
            this.mine(creep);
        }

    },

    run : function(creep) {
        if(creep.pos==creep.memory.workSpotPosition) {
            this.mineAndStore(creep);
        }
        else {
            this.moveToWorkSpot(creep);
        }

        if(creep.ticksToLive<=myConstants.ticksToLiveThreshold) {
            actionsWorker.clearResevedPositionStoreMiner(creep.memory);
        }
    },

};

module.exports=roleStoreMiner;