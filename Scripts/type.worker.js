var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var typeWorker = {
    changeJob : function(creep) {
        var harvesters = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builders');

        if(creep.memory.role == 'harvester') {
            if (harvesters>creep.room.memory.requiredHarvesters) {
                creep.memory.role = 'unemployed';
            }
        }
        else if(creep.memory.role == 'upgrader') {
            if (upgraders>creep.room.memory.requiredUpgraders) {
                creep.memory.role = 'unemployed';
            }
        }
        else if(creep.memory.role == 'harvester') {
            if (builders>creep.room.memory.requiredBuilders) {
                creep.memory.role = 'unemployed';
            }
        }

        //No Unemployment
        if(creep.memory.role=='unemployed') {
            if(harvesters < creep.room.memory.requiredHarvesters) {
                creep.memory.role = 'harvester';
            }
            else if(upgraders<1) {
                creep.memory.role = 'upgrader';
            }
            else if(builders < creep.room.memory.requiredBuilders) {
                creep.memory.role = 'builder';
            }
            else {
                creep.memory.role = 'upgrader';
            }
        }



    },
    run : function(creep) {

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