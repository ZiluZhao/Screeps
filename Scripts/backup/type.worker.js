const roleHarvester = require('./role.harvester');
const roleUpgrader = require('./role.upgrader');
const roleBuilder = require('./role.builder');

var typeWorker = {
    changeJob : function(creep) {
        var harvesters = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builder');

        if(creep.memory.role == 'harvester') {
            if (harvesters.length>creep.room.memory.requiredHarvesters) {
                creep.memory.role = 'unemployed';
            }
        }
        else if(creep.memory.role == 'upgrader') {
            if (upgraders.length>creep.room.memory.requiredUpgraders) {
                creep.memory.role = 'unemployed';
            }
        }
        else if(creep.memory.role == 'builder') {
            if (builders.length>creep.room.memory.requiredBuilders) {
                creep.memory.role = 'unemployed';
            }
        }

        //No Unemployment
        if(creep.memory.role=='unemployed') {
            if(harvesters.length < creep.room.memory.requiredHarvesters) {
                creep.memory.role = 'harvester';
            }
            else if(upgraders.length<1) {
                creep.memory.role = 'upgrader';
            }
            else if(builders.length < creep.room.memory.requiredBuilders) {
                creep.memory.role = 'builder';
            }
            else {
                creep.memory.role = 'upgrader';
            }
        }



    },
    assign : function(creep) {

        this.changeJob(creep);



        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    },

};
module.exports = typeWorker;