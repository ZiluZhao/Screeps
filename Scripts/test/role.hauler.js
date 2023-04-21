const assignmentHaulerEnergyCollector = require("./assignment.hauler.energyCollector");
const assignmentHaulerEnergyDistributor = require("./assignment.hauler.energyDistributor");



var roleHauler ={
    changeJob : function(creep) {
        var energyCollector = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'energyCollector');
        var energyDistributor = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'energyDistributor');
        
        if(creep.memory.assignment == 'energyCollector') {
            var carriedResources=_.filter(Object.keys(creep.store), (resource)=>creep.store[resource]>0);
            if (energyCollector.length>creep.room.memory.requiredAssignedEnergyCollectors) {
                if(carriedResources.length==0){
                    creep.memory.assignment = 'unemployed';
                }
            }
        }
        else if(creep.memory.assignment == 'energyDistributor') {
            if (energyDistributor.length>creep.room.memory.requiredAssignedEnergyDistributors) {
                creep.memory.assignment = 'unemployed';
            }
        }


        //No Unemployment
        if(creep.memory.assignment=='unemployed') {
            if(energyDistributor.length<1) {
                creep.memory.assignment = 'energyDistributor';
            }
            else if(energyCollector.length < creep.room.memory.requiredAssignedEnergyCollectors) {
                creep.memory.assignment = 'energyCollector';
            }
            else {
                creep.memory.assignment = 'energyDistributor';
            }
        }
    },

    assign : function(creep) {

        this.changeJob(creep);



        if(creep.memory.assignment == 'energyCollector') {
            assignmentHaulerEnergyCollector.collectEnergy(creep);
        }
        if(creep.memory.assignment == 'energyDistributor') {
            assignmentHaulerEnergyDistributor.run(creep);
        }
    },

};

module.exports=roleHauler;