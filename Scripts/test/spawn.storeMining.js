var species=require('species');
const { hauler } = require('./species');


var spawnStoreMining ={
    isMaxEnergyAchievable :function(spawn) {
        var creeps=spawn.room.find(FIND_MY_CREEPS);
        var storeMiners=_.filter(creeps, (creep)=>creep.memory.role='storeMiner');
        var haulers=_.filter(creeps, (creep)=>creep.memory.role='hauler');
        if(haulers.length<=0) {
            return false;
        }
        else if(spawn.room.storage.store[RESOURCE_ENERGY]>3000){
            return true;
        }
        else if(storeMiners.length>0) {
            return true;
        }
        else {
            return false;
        }
    },

    getAvailableEnergy : function(spawn, speciesRole) {
        if(this.isMaxEnergyAchievable(spawn)) {
            if (spawn.room.energyCapacityAvailable>speciesRole.perfectCost) {
                return speciesRole.perfectCost;
            }
            else {
                var energyAvailable=spawn.room.energyCapacityAvailable;
            }
        }
        else {
            var energyAvailable=spawn.room.energyAvailable;
        }
        return energyAvailable;
    },

    designBasicParts : function (budget, speciesRole) {
        var multi=Math.floor(budget/speciesRole.basicCost);
        var partArray=[];
        for (var i=0; i<=multi-1; i++) {
            partArray=partArray.concat(speciesRole.basicParts);
        }
        return partArray;
    },


    designStoreMiner : function(spawn) {
        var energyAvailable=this.getAvailableEnergy(spawn, species.storeMiner);
        if (energyAvailable>=species.storeMiner.perfectCost) {
            return species.storeMiner.perfectParts;
        }
        if (energyAvailable<species.storeMiner.basicCost+species.storeMiner.carryCost) {
            var partArray=[WORK, CARRY, MOVE];
            return partArray;
        }

        var basicBudget=energyAvailable-species.storeMiner.carryCost;
        var partArray=this.designBasicParts(basicBudget, species.storeMiner);

        partArray=partArray.concat(species.storeMiner.carryParts);
        return partArray;
    },

    designHauler : function(spawn) {
        var energyAvailable=this.getAvailableEnergy(spawn, species.hauler);
        var partArray=this.designBasicParts(energyAvailable, species.hauler);
        return partArray;
    },

    designWorker : function(spawn) {
        var energyAvailable=this.getAvailableEnergy(spawn, species.worker);
        var partArray=this.designBasicParts(energyAvailable, species.worker);
        return partArray;
    },

    createCreep : function(spawn) {
        if (!spawn.spawning) {
            spawn.memory.spawningRole=null;
            var spawns=spawn.room.find(FIND_MY_SPAWNS);
            var spawnsBusy=_.filter(spawns, (spawn)=>spawn.spawning!=null)
            for(var i=0; i<=spawns.length-1; i++) {

            }
        }
    },


};

module.exports=spawnStoreMining;