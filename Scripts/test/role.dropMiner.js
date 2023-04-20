const actionsWorker=require('./actions.worker');

var roleDropMiner= {
    moveToWorkSpot : function(creep) {
        actionsWorker.moveToWorkSpot(creep);
    },

    mine : function(creep) {
        actionsWorker.mine(creep);
    },

    run : function(creep) {
        if(creep.pos==workSpotPosition) {
            this.mine(creep);
        }
        else {
            this.moveToWorkSpot(creep);
        }

    },
    
};

module.exports=roleDropMiner;
