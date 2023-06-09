var roomDropMining= {
    getRequiredWorkers : function(room) {
        if(!room.memory.requiredWorkers) {
            room.memory.requiredWorkers=1;
        }
        const energyUpperThreshold=40000;
        const energyLowerThreshold=20000;
        const minWorker=1;
        const maxWorker=4;
        var inFieldWorkerNumber=utilityRoom.countRole(room, 'worker');

        var storedEnergy=room.storage.store[RESOURCE_ENERGY];
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
    dropMining : function (room) {
        room.memory.requiredDropMiners=2;
        room.memory.requiredHaulers=2;
        this.getRequiredWorkers(room);
        //room.memory.requiredBuilders
        //room.memory.requiredWorkers

        var spawns=room.find(FIND_MY_SPAWNS);
        for (var i=0; i<=spawns.length-1; i++) {
            spawnDropMining.createCreep(spawns[i]);
        }


        //calculate worker assignments number
        var workerNumber=utilityRoom.countRole(room, 'worker');
        room.memory.requiredHarvesters=0;
        if (workerNumber<=0) {
            room.memory.requiredUpgraders=0;
            room.memory.requiredBuilders=0;
        }
        else if(workerNumber==1) {
            room.memory.requiredUpgraders=1;
            room.memory.requiredBuilders=0;
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
                    availableWorkerCount=availableWorkerCount-room.memory.requiredWallers;
                }
            }
            room.memory.requiredBuilders=0;
            if(constructionSiteCount+damagedNonWallStructureCount>=1) {
                room.memory.requiredBuilders=availableWorkerCount;
                availableWorkerCount=0;
            }
            
            var upgraderNumber=availableWorkerCount+1;
            room.memory.requiredUpgraders=upgraderNumber;
        }


        //calculate hauler required assignment number
        //room.memory.requiredAssignedEnergyDistributors=1;
        //room.memory.requiredAssignedEnergyCollectors=1;

        var haulerCount=utilityRoom.countRole(room, 'hauler');
        var droppedResources=room.find(FIND_DROPPED_RESOURCES);
        var structures=room.find(FIND_STRUCTURES);
        var containers=_.filter(structures, (structure)=>structure.structureType==STRUCTURE_CONTAINER);
        var almostFullConstainers=_.filter(containers, (container)=>container.store.getFreeCapacity(RESOURCE_ENERGY)<myConstants.containerFreeSpaceThreshold);

        if(!room.storage){
            room.memory.requiredAssignedCollectorFiller=haulerCount;
        }
        else if(droppedResources.length+almostFullConstainers.length>=1){
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
        }
        else {
            room.memory.requiredAssignedEnergyCollectors=0;
            room.memory.requiredAssignedEnergyDistributors=haulerCount;
        }

    },
};

module.exports=roomDropMining;