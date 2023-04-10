// calculate the required roles in the room



//if sources empty, workers-1
//if sources never empty, workers+1
var roleRoom= {
    setRequiredWorkers: function(room) {
        var sources=room.find(FIND_SOURCES);
        var numberRequired=0;
        var zeroEnergyThreshold=200;
        var totalSourceEnergy=0;
        //var workerCount=0;
        
        workers=_.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.bodyType == 'worker');

        for(i=0; i<=sources.length-1; i=i+1) {
            if(sources[i].ticksToRegeneration==1) {
                if(sources[i].energy>zeroEnergyThreshold) {
                    if(workers.length>=room.memory.requiredWorkers) {
                        numberRequired=workers.length+1;
                        //set maximum worker amount
                        if(numberRequired>12) {
                            numberRequired=12;
                        }
                        room.memory.requiredWorkers=numberRequired;
                        return;
                    }
                }
            }
            if(sources[i].energy>0) {
                return;
            }
            totalSourceEnergy=totalSourceEnergy+sources[i].energy;
        }
        if(totalSourceEnergy==0) {
            //no energy in room
            if(workers.length<=room.memory.requiredWorkers) {
                numberRequired=workers.length-1;
                //set minimum worker amount
                if(numberRequired<2) {
                    numberRequired=2;
                }
                room.memory.requiredWorkers=numberRequired;
                return;
            }
        }
        else {
            return;
        }
    },



    
    run: function(room) {
        this.setRequiredWorkers(room);
        var workers=_.filter(room.find(FIND_MY_CREEPS), (creep) => creep.memory.bodyType == 'worker');
        var harvesterNumber=0;
        var builderNumber=0;
        var restWorkers=0;
        var sites=room.find(FIND_CONSTRUCTION_SITES);

        // set requiredHarvesters 
        if (room.energyAvailable==room.energyCapacityAvailable) {
            harvesterNumber=0;
        }
        else {
            harvesterNumber=Math.floor(workers/2);
        }
        room.memory.requiredHarvesters=harvesterNumber;


        //rest workers besides harvesters
        restWorkers=workers.length-harvesterNumber;

        //set builder numbers
        if (sites.length>=1) {
            //what if new claimed room?
            if(restWorkers.length<=1) {
                console.log("No enough workers(builders) in room ", room.name);
                builderNumber=restWorkers;
            }
            else {
                builderNumber=restWorkers-1;
            }
        }
        else {
            builderNumber=0;
        }
        room.memory.requiredBuilders=builderNumber;

        //rest workers besiders harvesters and builders
        restWorkers=restWorkers-builderNumber;
        
        //set upgrader number
        if(restWorkers<1) {
            console.log("No enough workers(builders) in room ", room.name);
        }
        else {
            room.memory.requiredUpgraders=restWorkers;
        }


    },
};

module.exports = roleRoom;