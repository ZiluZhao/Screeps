// calculate the required roles in the room

var roleRoom= {
    run: function(room) {
        var sites=room.find(FIND_CONSTRUCTION_SITES);
        if (sites.length>0) {
            room.memory.requiredHarvesters=3;
            room.memory.requiredUpgraders=3;
            room.memory.requiredBuilders=1;
        }
        else {
            room.memory.requiredHarvesters=3;
            room.memory.requiredUpgraders=3;
            room.memory.requiredBuilders=0;
        }
    }
};

module.exports = roleRoom;