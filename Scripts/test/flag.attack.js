const spawnAttack = require("./spawn.attack");

var flagAttack={

    //set required creeps
    run : function (flag){
        flag.memory.target=flag.room.name;
        if(flag.memory.requiredAttackers==undefined) {
            flag.memory.requiredAttackers=2;
            flag.memory.requiredClaimers=1;
        }
        if(flag.memory.requiredSappers==undefined) {
            flag.memory.requiredSappers=1;
        }


        //initialize
        if(!flag.memory.attackerAmount) {
            flag.memory.attackerAmount=0;
        }
        if(!flag.memory.claimerAmount) {
            flag.memory.claimerAmount=0;
        }

        

        var home=Game.rooms[flag.memory.base];
        var homeSpawns=home.find(FIND_MY_SPAWNS);

        for(var i=0; i<=homeSpawns.length-1; i++) {
            var spawn=homeSpawns[i];
            spawnAttack.produce(spawn, flag);
        }
    },

};

module.exports=flagAttack;