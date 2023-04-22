var roleClaimer={
    moveToTargetRoom : function (creep, targetRoomName) {
        const exits=creep.room.findExitTo(targetRoomName);
        const exit=creep.pos.findClosestByRange(exits);
        return creep.moveTo(exit);
    },

    hasThreat : function(creep) {
        var threatCreeps=_.filter(creep.room.find(FIND_HOSTILE_CREEPS), (creep)=>creep.getActiveBodyparts(ATTACK)>0 || creep.getActiveBodyparts(RANGED_ATTACK)>0);
        var threatStructures=_.filter(creep.room.find(FIND_HOSTILE_STRUCTURES), (structure)=>structure.structureType==STRUCTURE_SPAWN || structure.structureType==STRUCTURE_TOWER);
        if (threatCreeps.length+threatStructures.length>0) {
            return true;
        }
        else {
            return false;
        }
    },

    run : function(creep) {
        var targetRoomName=creep.memory.targetRoomName;
        var flagName=creep.memory.flagName;
        var flag=Game.flags[flagName];

        if(creep.room.name!=targetRoomName) {
            this.moveToTargetRoom(creep, targetRoomName)
        }
        else {
            if(creep.room.controller && !creep.room.controller.my && creep.room.controller.level>0) {
                if(creep.attackController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            if(creep.room.controller.level==0) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            if(creep.room.controller.my) {
                flag.memory.requiredAttackers=0;
                flag.memory.requiredClaimers = 0;
            }
            else if(this.hasThreat(creep)){
                flag.memory.requiredAttackers=2;
                flag.memory.requiredClaimers = 0;
            }
        }
    },

};

module.exports=roleClaimer;