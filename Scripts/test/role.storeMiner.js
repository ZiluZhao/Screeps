
//memory.workSpotPosition (type: RoomPosition)
//memory.mineObjectId (type: ID , energySource)
//memory.storageId (type: ID, storage/link)

const actionsWorker=require('./actions.worker');
const myConstants=require('./myConstants');

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
        var workSpotPosition=new RoomPosition(creep.memory.workSpotPosition.x, creep.memory.workSpotPosition.y, creep.memory.workSpotPosition.roomName);
        if(workSpotPosition.isEqualTo(creep.pos)) {
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