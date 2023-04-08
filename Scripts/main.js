var typeWorker = require('type.worker');
var roleSpawn = require('role.spawn');



Creep.prototype.suicide=function(){
    say("hello");
}
module.exports.loop = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    
   
    var tower = Game.getObjectById('642ec9932064b45a41a09bb9');
    if(tower) {
/*         var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        } */

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.spawns) {
        var spawn = Game.spawns[name];
        roleSpawn.spawnWorker(spawn);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.bodyType == 'worker') {
            typeWorker.run(creep);
        }
    }
}