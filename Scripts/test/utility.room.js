var utilityRoom = {
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

};

module.exports=utilityRoom;