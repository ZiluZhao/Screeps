const actionsWorker = require("./actions.worker");



var memoryManage={
    clearCreepMemory : function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                if(Memory.creeps[name].role=='storeMiner') {
                    actionsWorker.clearResevedPositionStoreMiner(Memory.creeps[name]);
                }
                else if(Memory.creeps[name].role=='attacker') {
                    var flagName=Memory.creeps[name].flagName;
                    var flag=Game.flags[flagName];
                    flag.memory.attackerAmount=flag.memory.attackerAmount-1;
                }
                else if(Memory.creeps[name].role=='claimer') {
                    var flagName=Memory.creeps[name].flagName;
                    var flag=Game.flags[flagName];
                    flag.memory.claimerAmount=flag.memory.claimerAmount-1;
                }
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },

    clearFlagMemory: function(){
        for(var name in Memory.flags) {
            if(!Game.flags[name]) {
                delete Memory.flags[name];
                console.log('Clearing non-existing flag memory', name);
            }
        }
    }


};

module.exports=memoryManage;