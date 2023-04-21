const assignmentWorkerBuilder = require("./assignment.worker.builder");
const assignmentWorkerHarvester = require("./assignment.worker.harvester");
const assignmentWorkerUpgrader = require("./assignment.worker.upgrader");
const assignmentWorkerWaller = require("./assignment.worker.waller");

var roleWorker = {
    changeJob : function(creep) {
        var harvesters = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'harvester');
        var upgraders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'upgrader');
        var builders = _.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'builder');
        var wallers=_.filter(creep.room.find(FIND_MY_CREEPS), (creep) => creep.memory.assignment == 'waller');

        if(creep.memory.assignment == 'harvester') {
            if (harvesters.length>creep.room.memory.requiredHarvesters) {
                creep.memory.assignment = 'unemployed';
            }
        }
        else if(creep.memory.assignment == 'upgrader') {
            if (upgraders.length>creep.room.memory.requiredUpgraders) {
                creep.memory.assignment = 'unemployed';
            }
        }
        else if(creep.memory.assignment == 'builder') {
            if (builders.length>creep.room.memory.requiredBuilders) {
                creep.memory.assignment = 'unemployed';
            }
        }
        else if(creep.memory.assignment == 'waller') {
            if (builders.length>creep.room.memory.requiredWallers) {
                creep.memory.assignment = 'unemployed';
            }
        }

        //No Unemployment
        if(creep.memory.assignment=='unemployed') {
            if(harvesters.length < creep.room.memory.requiredHarvesters) {
                creep.memory.assignment = 'harvester';
            }
            else if(upgraders.length<1) {
                creep.memory.assignment = 'upgrader';
            }
            else if(wallers.length < creep.room.memory.requiredWallers) {
                creep.memory.assignment = 'waller';
            }
            else if(builders.length < creep.room.memory.requiredBuilders) {
                creep.memory.assignment = 'builder';
            }
            else {
                creep.memory.assignment = 'upgrader';
            }
        }
    },


    assign : function(creep) {

        this.changeJob(creep);



        if(creep.memory.assignment == 'harvester') {
            assignmentWorkerHarvester.run(creep);
        }
        if(creep.memory.assignment == 'upgrader') {
           assignmentWorkerUpgrader.run(creep);
        }
        if(creep.memory.assignment == 'builder') {
            assignmentWorkerBuilder.run(creep);
        }
        if(creep.memory.assignment == 'waller') {
            assignmentWorkerWaller.run(creep);
        }
    },

};

module.exports=roleWorker;