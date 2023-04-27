var roomInitW7N24={
    init : function(room) {
        room.memory.miningType='dropMining';

        const sourceId1='5bbcac7d9099fc012e6358af';
        const sourcePosition1=new RoomPosition(17, 5, 'W7N24');
        //const storeId1=room.storage.id;

        const sourceId2='5bbcac7d9099fc012e6358b1';
        const sourcePosition2=new RoomPosition(44, 45, 'W7N24');
        //const storeId2=room.storage.id;

        const mineralId='5bbcb29440062e4259e93b7b';
        const mineralPosition=new RoomPosition(33, 32, 'W7N24');


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

module.exports=roomInitW7N24;
