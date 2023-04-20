const species=require('./species');
const myConstants=require('./myConstants');
const spawnStoreMining=require('./spawn.storeMining')

//room memory


//memory.sourcePositionsIndex : bool array true means manned
//memory.sourceIds : array of object id
//memory.sourceWorkSpots :  array of object roomPositions
//memory.sourceStorageIds : array of object id

//memory.mineralIds : array of object roomPositions
//memory.mineralWorkSpots : array of object roomPositions



//spawn.memory.currentSpawningRole :string


//creep.memory.role
//creep.memory.roleClass


var roomStoreMining = {
    //input rooms object, string
    countRole : function (room, role) {
        var ticksToLiveThreshold=myConstants.ticksToLiveThreshold;
        var inRoomCreeps=_.filter(room.find(FIND_MY_CREEPS), (creep)=>creep.memory.role==role);
        var workingInRoomCreeps=_.filter(inRoomCreeps, (creep)=>creep.ticksToLive>ticksToLiveThreshold);
        var number=workingInRoomCreeps.length;
        return number;
    },

    countRoleInSpawn : function (room, role) {
        var spawns=room.find(FIND_MY_SPAWNS);
        var spawnsWithRole=_.filter(spawns, (spawn)=>spawn.memory.currentSpawningRole==role);
        var number=spawnsWithRole.length;
        return number;
    },

    countRoleAliveAndSpawning : function (room, role) {
        var inField=this.countRole(room, role);
        var inSpawn=this.countRoleInSpawn(room, role);
        var sum=inField+inSpawn;
        return sum;
    },

    getRequiredWorkers : function(room) {
        if(!room.memory.requiredWorkers) {
            room.memory.requiredWorkers=1;
        }
        const energyUpperThreshold=40000;
        const energyLowerThreshold=20000;
        const minWorker=1;
        const maxWorker=6;
        var inFieldWorkerNumber=this.countRole(room, 'worker');

        var storedEnergy=room.storage.store(RESOURCE_ENERGY);
        if(storedEnergy>energyUpperThreshold) {
            if(inFieldWorkerNumber>=room.memory.requiredWorkers){
                room.memory.requiredWorkers=inFieldWorkerNumber+1;
            }

        }
        else if (storedEnergy<energyLowerThreshold) {
            if(inFieldWorkerNumber<=room.memory.requiredWorkers) {
                room.memory.requiredWorkers=inFieldWorkerNumber-1;
            }
        }

        if(room.memory.requiredWorkers>maxWorker) {
            room.memory.requiredWorkers=maxWorker;
        }
        if(room.memory.requiredWorkers<minWorker) {
            room.memory.requiredWorkers=minWorker;
        }

    },


    
    //storage is adjacent to both miners
    storeMining : function (room) {
        room.memory.requiredStoreMiners=2;
        room.memory.requiredHaulers=2;
        this.getRequiredWorkers(room);
        //room.memory.requiredBuilders
        //room.memory.requiredWorkers

        var spawns=room.find(FIND_MY_SPAWNS);
        for (var i=0; i<=spawns.length-1; i++) {
            spawnStoreMining.createCreep(spawn[i]);
        }


        //calculate worker assignments number
        var workerNumber=this.countRole(room, 'worker');
        room.memory.requiredHarvesters=0;
        if (workerNumber<=0) {
            room.memory.requiredUpgraders=0;
            room.memory.requiredBuilders=0;
            return;
        }
        else if(workerNumber==1) {
            room.memory.requiredUpgraders=1;
            room.memory.requiredBuilders=0;
            return
        }
        else{
            var constructionSites=room.find(FIND_MY_CONSTRUCTION_SITES);
            var damagedStructures = _.filter(room.find(FIND_STRUCTURES), (structure) => (structure.hits<structure.hitsMax*0.8));
            var damagedNonWallStructures = _.filter(damagedStructures, (structure)=>structure.structureType!=STRUCTURE_WALL);
            var damagedStructureCount=damagedStructures.length;


            var constructionSiteCount=constructionSites.length;            
            var damagedNonWallStructureCount=damagedNonWallStructures.length;
            var damagedWallCount=damagedStructureCount-damagedNonWallStructureCount;

            //at least one upgrader and zero harvester
            var availableWorkerCount=workerNumber-1-0;

            room.memory.requiredWallers=0;
            if(availableWorkerCount>=2) {
                if(damagedWallCount>0) {
                    room.memory.requiredWallers=1;
                    availableWorkerCount=availableWorkerCount-room.requiredWallers;
                }
            }
            room.memory.requiredBuilders=0;
            if(constructionSiteCount+damagedNonWallStructureCount>=1) {
                room.memory.requiredBuilders=availableWorkerCount;
                availableWorkerCount=0;
            }
            
            upgraderNumber=availableWorkerCount+1;
            room.memory.requiredUpgraders=upgraderNumber;
        }


        //calculate hauler required assignment number
        //room.memory.requiredAssignedEnergyDistributors=1;
        //room.memory.requiredAssignedEnergyCollectors=1;
        var haulerCount=this.countRole(room, 'hauler');
        if(haulerCount<=0) {
            room.memory.requiredAssignedEnergyDistributors=0;
            room.memory.requiredAssignedEnergyCollectors=0;
        }
        else if(haulerCount==1) {
            room.memory.requiredAssignedEnergyDistributors=1;
            room.memory.requiredAssignedEnergyCollectors=0;
        }
        else if(haulerCount>=2) {
            room.memory.requiredAssignedEnergyCollectors=Math.floor(haulerCount/2);
            room.memory.requiredAssignedEnergyDistributors=haulerCount-room.memory.requiredAssignedEnergyCollectors;
        } 





    },
    
    
    

};


module.exports = roomStoreMining;