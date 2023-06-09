var roomInitW6N29={
    init : function(room) {
        room.memory.miningType='storeMining';

        const sourceId1='5bbcac899099fc012e635a5c';
        const sourcePosition1=new RoomPosition(14, 18, 'W6N29');
        const storeId1=room.storage.id;

        const sourceId2='5bbcac899099fc012e635a5d';
        const sourcePosition2=new RoomPosition(13, 19, 'W6N29');
        const storeId2=room.storage.id;

        const mineralId='5bbcb29d40062e4259e93bd9';
        const mineralPosition=new RoomPosition(5, 3, 'W6N29');


        //source worker
        room.memory.sourcePositionsIndex=[false, false];
        room.memory.sourceIds=[sourceId1, sourceId2];
        room.memory.sourceWorkSpots=[sourcePosition1, sourcePosition2];
        room.memory.sourceStorageIds=[storeId1, storeId2];

        //mineral worker
        room.memory.mineralPositionsIndex=[false];
        room.memory.mineralIds=[mineralId];
        room.memory.mineralWorkSpots=[mineralPosition];

        room.memory.isInitialized=true;
    },
};

module.exports=roomInitW6N29;