var species=require('species');
var myConstants=required('myConstants');
var spawnStoreMining=require('spawn.storeMining')

//room memory

//memory.requiredDropMiner : # of resource depo

//memory.sourcePositionsIndex : bool array true means manned
//memory.sourceIds : array of object id
//memory.sourceWorkSpots :  array of object roomPositions
//memory.sourceStorageIds : array of object id

//memory.mineralPositions : array of object roomPositions
//memory.mineralWorkSpots : array of object roomPositions
//memory.mineralLinkPositions : array of object roomPositions


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
        room.memory.requiredAssignedEnergyDistributors=1;
        room.memory.requiredAssignedEnergyCollectors=1;

        room.memory.requiredHaulers=room.memory.requiredAssignedEnergyDistributors+room.memory.requiredAssignedEnergyCollectors;
        this.getRequiredWorkers(room);
        //room.memory.requiredBuilders
        //room.memory.requiredWorkers

        var spawns=room.find(FIND_MY_SPAWNS);
        for (var i=0; i<=spawns.length-1; i++) {
            spawnStoreMining.createCreep(spawn[i]);
        }





    },
    
    
    

};


module.exports = roomStoreMining;