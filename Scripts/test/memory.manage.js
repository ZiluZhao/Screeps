const actionsWorker = require("actions.worker");



var memoryManage={
    clearCreepMemory : function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                if(Memory.creeps[name].role=='storeMiner') {
                    actionsWorker.clearResevedPositionStoreMiner(Memory.creeps[name]);
                }
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },


};

module.exports=memoryManage;