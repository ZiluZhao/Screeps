var roomInitSim={
    init : function(room) {
        room.memory.miningType='storeMining';

        const sourceId1='86d0a9ac364be25a1aab5795';
        const sourcePosition1=new RoomPosition(34, 20, 'sim');
        const storeId1=room.storage.id;

        const sourceId2='86d0a9ac364be25a1aab5795';
        const sourcePosition2=new RoomPosition(35, 21, 'sim');
        const storeId2=room.storage.id;

        const mineralId='5bbcb29d40062e4259e93bd9';
        const mineralPosition=new RoomPosition(5, 3, 'sim');


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

module.exports=roomInitSim;