
//memory.energyContainerId
//memory.storing

const myConstants = require("./myConstants");

var assignmentHaulerCollectFiller = {

    storeResource :function(creep) {
        var target=creep.room.storage;
            var carriedResources=_.filter(Object.keys(creep.store), (resource)=>creep.store[resource]>0);
            var resource=carriedResources[0];
            if (!target) {
                console.log('no storage');
                return;
            }
            if(creep.transfer(target, resource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
    },

    //collect form * to (storage)
    //pick up,
    //container,
    //link (in room.memory.storageLinkPosition)
    collectEnergy: function(creep) {
        var room=creep.room;
        var droppedResources=room.find(FIND_DROPPED_RESOURCES);
        var structures=room.find(FIND_STRUCTURES);
        
        var containers=_.filter(structures, (structure)=>structure.structureType==STRUCTURE_CONTAINER);
        var nonEmptyContainers=_.filter(containers, (container)=>container.store.getUsedCapacity()>0);
        var energyContainers=_.filter(nonEmptyContainers, (container)=>container.store[RESOURCE_ENERGY]>0);
        //var linkArray=_.filter(room.lookForAt(LOOK_STRUCTURES, room.memory.storageLinkPosition), (structure)=>structureType==STRUCTURE_LINK);

        var carriedResources=_.filter(Object.keys(creep.store), (resource)=>creep.store[resource]>0);
        

        if(creep.memory.storing && carriedResources.length <= 0) {
            creep.memory.storing = false;
            creep.say('🔄 collecting');
        }
        if(!creep.memory.storing && creep.store.getFreeCapacity() == 0) {
            creep.memory.storing = true;
            creep.say('⚡ storing');
        }

        

        //collect energy
        if(!creep.memory.storing) {
            if(droppedResources.length>0) {
                var target=creep.pos.findClosestByRange(droppedResources);
                if(target) {
                    if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target);
                    }
                }
            }
            else if (energyContainers.length>0) {
                //initializeMemory
                if(!creep.memory.energyContainerId) {
                    creep.memory.energyContainerId=energyContainers[0].id;
                }
                var inMemoryId=creep.memory.energyContainerId;
                var inMemoryEnergyContainer=Game.getObjectById(inMemoryId);
                var inContainerEnergyThreshold=2000-myConstants.containerFreeSpaceThreshold;
                if(inMemoryEnergyContainer.store[RESOURCE_ENERGY]<inContainerEnergyThreshold) {
                    //find container contains the most resources
                    var maxIndex=0;
                    var maxValue=0;
                    for (i=0; i<=energyContainers.length-1; i++) {
                        var energyContainer=energyContainers[i];
                        var energyInside=energyContainer.store[RESOURCE_ENERGY];
                        if(energyInside>maxValue) {
                            maxIndex=i;
                            maxValue=energyInside;
                        }
                    }
                    if(maxValue>=inContainerEnergyThreshold) {
                        inMemoryEnergyContainer = energyContainers[maxIndex];
                        inMemoryId=inMemoryEnergyContainer.id;
                        creep.memory.energyContainerId=inMemoryId;
                    }
                }
                if(creep.withdraw(inMemoryEnergyContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(inMemoryEnergyContainer);
                }
            }
            else {
                creep.memory.storing = true;
            }
        }
        // store energy
        else {
            actionsWorker.distributeEnergy(creep);
        }


    },
};

module.exports = assignmentHaulerCollectFiller;