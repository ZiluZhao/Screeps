

//creep.memory.distibuting, boolean
const actionsWorker=require('./actions.worker');

var assignmentHaulerEnergyDistributor={
    run : function(creep) {
        if(creep.memory.distributing && creep.store[RESOURCE_ENERGY]==0) {
            creep.memory.distributing=false;
        }
        
        if(!creep.memory.distributing && creep.store.getFreeCapacity() == 0) {
            creep.memory.distributing=true;
        }

        if(creep.memory.distributing) {
            actionsWorker.collectEnergyFromStorage(creep);
        }
        else {
            actionsWorker.distributeEnergy(creep);
        }
    },
};

module.exports=assignmentHaulerEnergyDistributor;