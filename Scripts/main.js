var typeWorker = require('type.worker');
var roleSpawn = require('role.spawn');
var roleRoom = require('role.room');
const roleAttackTower = require('./role.attackTower');



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

    
   
    var towers = _.filter(Game.structures, (structure) => structure.structureType==STRUCTURE_TOWER);
    for(var i=0; i<=towers.length-1; i=i+1) {
        roleAttackTower(towers[i]);
    }

    for(var name in Game.rooms) {
        var room=Game.rooms[name];
        roleRoom.run(room);
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