const spawnAttack = require("./spawn.attack");

var flagAttack={

    //set required creeps
    run : function (flag){
        if(flag.memory.requiredAttacker==undefined) {
            flag.memory.requiredAttacker=2;
            flag.memory.requiredClaimer=1;
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