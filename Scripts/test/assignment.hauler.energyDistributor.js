

//creep.memory.distibuting, boolean
const actionsWorker=require('./actions.worker');

var assignmentHaulerEnergyDistributor={
    run : function(creep) {
        if(!creep.memory.taking && creep.store[RESOURCE_ENERGY]==0) {
            creep.memory.taking=true;
        }
        
        if(creep.memory.taking && creep.store.getFreeCapacity() == 0) {
            creep.memory.taking=false;
        }

        if(creep.memory.taking) {
            actionsWorker.collectEnergyFromStorage(creep);
        }
        else {
            actionsWorker.distributeEnergy(creep);
        }
    },
};

module.exports=assignmentHaulerEnergyDistributor;