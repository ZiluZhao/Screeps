const memoryManage = require("./memory.manage");
const roleHauler = require("./role.hauler");
const roleWorker = require("./role.worker");
const roomStoreMining = require("./room.storeMining");
const roleStoreMiner  = require("./role.storeMiner");
const roomInit = require("./room.init");
const roleAttackTower = require("./role.attackTower");

module.exports.loop = function () {
    memoryManage.clearCreepMemory();

    var towers = _.filter(Game.structures, (structure) => structure.structureType==STRUCTURE_TOWER);
    for(var i=0; i<=towers.length-1; i=i+1) {
        roleAttackTower.run(towers[i]);
    }

    for(var name in Game.rooms) {
        var room=Game.rooms[name];
        if(!room.memory.isInitialized){
            roomInit[name](room);
        }
        if(room.memory.miningType=='storeMining') {
            roomStoreMining.storeMining(room);
        }
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'worker') {
            roleWorker.assign(creep);
        }
        else if(creep.memory.role == 'hauler') {
            roleHauler.assign(creep);
        }
        else if(creep.memory.role == 'storeMiner') {
            roleStoreMiner.run(creep);
        }
    }
}