//drop to the ground 
var roleDropMiner = {
    run: function(creep) {
        //code here
        
        //workSpot should be a roomPosition object
        var workSpot=creep.memory.workSpot;
        

        if(creep.pos!=workSpot) {
            creep.moveTo(workSpot, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        else if(creep.pos==workSpot){
            var target=creep.room.lookForAt(LOOK_SOURCES, creep.memory.miningPosition);
            if (target.length!=1) {
                target=creep.room.lookForAt(LOOK_MINERALS, creep.memory.miningPosition);
                if (target.length!=1) {
                    console.log("No Source in the looking position");
                    return;
                }
            }
            var actionResult=creep.harvest(target[0]);
            if (actionResult!=0 || actionResult!=ERR_NOT_ENOUGH_RESOURCES) {
                console.log("Miner harvest error");
            }
        }
        else {
            console.log('Error Drop Miner');
        }
    },
};

module.exports = roleDropMiner;