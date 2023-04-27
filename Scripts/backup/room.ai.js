var species=require('species.js');

//room memory

//memory.requiredDropMiner : # of resource depo

//memory.sourcePositions : array of object roomPositions
//memory.sourceWorkSpots :  array of object roomPositions
//memory.sourceLinkPositions : array of object roomPositions

//memory.mineralPositions : array of object roomPositions
//memory.mineralWorkSpots : array of object roomPositions
//memory.mineralLinkPositions : array of object roomPositions



var roomAi = {
    //input rooms object, string
    countRole : function (room, role) {
        var inRoomCreeps=_.filter(room.find(FIND_MY_CREEPS), (creep)=>creep.memory.role==role);
        var workingInRoomCreeps=_.filter(inRoomCreeps, (creep)=>creep.ticksToLive>50);
        var number=workingInRoomCreeps.length;
        return number;
    },


    
    //storage is adjacent to both miners
    storeMining : function (room) {
        
    },
    
    
    

};


module.exports = roomAi;