var roleSapper={
    moveToTargetRoom : function (creep, targetRoomName) {
        const exits=creep.room.findExitTo(targetRoomName);
        const exit=creep.pos.findClosestByRange(exits);
        return creep.moveTo(exit);
    },

    run :function(creep) {
        var targetRoomName=creep.memory.targetRoomName;
        var flagName=creep.memory.flagName;
        var flag=Game.flags[flagName];

        if(creep.room.name!=targetRoomName) {
            this.moveToTargetRoom(creep, targetRoomName)
        }
        else {
            var wall=Game.getObjectById(creep.memory.destroyTargetId);
            if(wall==null) {
                flag.memory.requiredSappers=0;
            }
            else{
                if(wall) {
                    if(creep.dismantle(wall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(wall);
                    }
                }
            }
        }
    }

};

module.exports=roleSapper;