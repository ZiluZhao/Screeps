const species=require('./species');



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
            var spawnsBusy=_.filter(spawns, (spawn)=>spawn.spawning!=null);
            var creeps=spawn.room.find(FIND_MY_CREEPS);


            var spawnsSpawningStoreMiner=_.filter(spawnsBusy, (spawn)=>spawn.memory.spawningRole=='storeMiner');
            var spawnsSpawningHauler=_.filter(spawnsBusy, (spawn)=>spawn.memory.spawningRole=='hauler');
            var spawnsSpawningWorker=_.filter(spawnsBusy, (spawn)=>spawn.memory.spawningRole=='worker');


            
            var storeMiners=_.filter(creeps, (creep)=>creep.memory.role=='storeMiner');
            var haulers=_.filter(creeps, (creep)=>creep.memory.role=='hauler');
            var workers=_.filter(creeps, (creep)=>creep.memory.role=='worker');

            var totStoreMiners=storeMiners.length+spawnsSpawningStoreMiner.length;
            var totHaulers=haulers.length+spawnsSpawningHauler.length;
            var totWorkers=workers.length+spawnsSpawningWorker.length;


            if(totHaulers<spawn.room.memory.requiredHaulers) {
                var haulerParts=this.designHauler(spawn);
                var newName = 'Hauler' + Game.time;
                var result = spawn.createCreep(haulerParts, newName, {
                    memory: {
                        role : 'hauler',
                        assignment : 'energyDistributor',
                        home : spawn.room.name
                    }
                });
                if(result==OK) {
                    spawn.memory.spawningRole='hauler';
                }
            }
            else if(totStoreMiners<spawn.room.memory.requiredStoreMiners) {
                var indexChoice=-1;
                for (var i=0; i<=spawn.room.memory.sourcePositionsIndex.length; i++) {
                    if(spawn.room.memory.sourcePositionsIndex[i]==false) {
                        indexChoice=i;
                        break;
                    }
                }
                if(indexChoice<0) {
                    console.log('spawn miner error');
                    return;
                }
                var storeMinerParts=this.designStoreMiner(spawn);
                var newName='StoreMiner' + Game.time;
                var result= spawn.createCreep(storeMinerParts, newName, {
                    memory:{
                        role : 'storeMiner',
                        home : spawn.room.name,
                        workSpotIndex : indexChoice, 
                        workSpotPosition : spawn.room.memory.sourceWorkSpots[indexChoice],
                        mineObjectId : spawn.room.memory.sourceIds[indexChoice],
                        storageId : spawn.room.memory.sourceStorageIds[indexChoice],
                        hasClearedRoomIndex : false
                    }
                });
                if(result==OK) {
                    spawn.memory.spawningRole='storeMiner';
                    spawn.room.memory.sourcePositionsIndex[indexChoice]=true;
                }
            }
            else if(totWorkers<spawn.room.requiredHaulers) {
                var workerParts=this.designWorker(spawn);
                var newName='Worker' + Game.time;
                var result=spawn.createCreep(workerParts, newName, {
                    memory:{
                        role : 'worker',
                        assignment : 'upgrader',
                        home : spawn.room.name
                    }
                });
                if(result==OK) {
                    spawn.memory.spawningRole='worker';
                }
            }

        }
    },


};

module.exports=spawnStoreMining;