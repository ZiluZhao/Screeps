var spawnAttack={
    produce :function(spawn,  flag) {
        if(!spawn.spawning){
            var spawnsBusy=_.filter(spawn.room.find(FIND_MY_SPAWNS), (spawn)=>spawn.spawning!=null);
            if (flag.memory.attackerAmount<flag.memory.requiredAttackers) {
                var newName='Attacker' + Game.time;
                var result=spawn.spawnCreep([TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE, TOUGH, MOVE,
                ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE, ATTACK, MOVE], newName, {
                    memory: {
                        role : 'attacker',
                        home : spawn.room.name,
                        flagName : flag.name,
                        targetRoomName : flag.memory.target,
                    }
                });
                if(result==OK){
                    flag.memory.attackerAmount=flag.memory.attackerAmount+1;
                }

            }
            else if (flag.memory.claimerAmount<flag.memory.requiredClaimers) {
                var newName='Claimer' + Game.time;
                var result=spawn.spawnCreep([CLAIM, MOVE], newName, {
                    memory: {
                        role : 'claimer',
                        home : spawn.room.name,
                        flagName : flag.name,
                        targetRoomName : flag.memory.target,
                    }
                });
                if(result==OK){
                    flag.memory.claimerAmount=flag.memory.claimerAmount+1;
                }

            }
        }
    },
};

module.exports=spawnAttack;