var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var typeWorker = {
    run : function(creep) {
        var harvesters = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'harvester');
        var upgraders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'upgrader');
        var builders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role == 'builders');

        if (harvesters.length<creep.room.memory.requiredHarvesters) {
            creep.memory.role = 'harvester';
        }
        else if (upgrader.length<creep.room.memory.requiredUpgraders) {
            creep.memory.role = 'upgrader';
        }
        else if (builder.length<creep.room.memory.requiredbuilders) {
            creep.memory.role = 'builder';
        }

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