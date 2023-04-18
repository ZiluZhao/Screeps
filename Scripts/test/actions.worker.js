var auxiliary={
    orStructureType: function(structure, typeArray) {
        var sum=false;
        for(var i=0; i<=typeArray-1; i++) {
            sum=sum||(structure.structureType==typeArray[i]);
            if(sum==true) {
                return sum;
            }
        }
        return sum;
    },
};

var actionsWorker={

    //move to the work spot
    //require:
    //  creep.workSpotPosition
    moveToWorkSpot : function(creep) {
        var workSpotPosition=creep.memory.workSpotPosition;
        if(creep.ticksToLive==1) {
            if(creep.pos!=workSpotPosition) {
                console.log("cannot reach work spot");
            }
        }
        creep.moveTo(workSpotPosition);
    },


    //store energy to storage
    //require:
    //  creep.memory.storageId
    storeEnergy : function(creep) {
        var storage=Game.getObjectById(creep.memory.storageId);
        var actionReturn=creep.transfer(storage, RESOURCE_ENERGY);
        if(actionReturn==ERR_FULL) {
            console.log('storage full');
        }
        else if(actionReturn!=OK) {
            console.log("store action error");
        }
    },


    //mine {source/mineral-}object
    //require:
    //  creep.memory.minObjectId
    mine : function(creep) {
        var source=Game.getObjectById(creep.memory.mineObjectId);
        var actionReturn=creep.harvest(source);
        if(actionReturn!=0 && actionReturn!=ERR_NOT_ENOUGH_RESOURCES && actionReturn!=ERR_TIRED) {
            console.log('mining error');
        }
    },



    collectEnergyFromStorage: function(creep) {
        if(creep.withdraw(creep.room.storage) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.storage);
        }
    },


    
    
    distributeEnergy: function(creep){
        var structures=creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure)=>{
                var isCorrectType=auxiliary.orStructureType(structure, [STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_LAB,STRUCTURE_TOWER]);
                return isCorrectType;
            }
        });
        //get not not fully stored
        structures=_.filter(structures, (structure)=>structure.store.getFreeCapacity(RESOURCE_ENERGY)>0);
        var spawnExtensions=_.filter(structures, (structure)=>(structure.structureType==STRUCTURE_SPAWN||structure.structureType==STRUCTURE_EXTENSION));
        if(spawnExtensions.length>0) {
            var target=creep.pos.findClosestByRange(spawnExtensions);
        }
        else{
            var towers=_.filter(structures, (structure)=>structure.structureType==STRUCTURE_TOWER);
            if(towers.length>0) {
                var target=creep.pos.findClosestByRange(towers);
            }
            else {
                // only labs
                var target=creep.pos.findClosestByRange(structures);
            }
        }
        if(creep.transfer(target, RESOURCE_ENERGY)==ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }


    },
};

module.exports=actionsWorker;