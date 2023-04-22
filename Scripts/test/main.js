const memoryManage = require("./memory.manage");
const roleHauler = require("./role.hauler");
const roleWorker = require("./role.worker");
const roomStoreMining = require("./room.storeMining");
const roleStoreMiner  = require("./role.storeMiner");
const roomInit = require("./room.init");
const roleAttackTower = require("./role.attackTower");
const flagAttack = require("./flag.attack");
const roleAttacker = require("./role.attacker");
const roleClaimer = require("./role.claimer");
const roleSapper = require("./role.sapper");

module.exports.loop = function () {
    memoryManage.clearCreepMemory();
    memoryManage.clearFlagMemory();

    var towers = _.filter(Game.structures, (structure) => structure.structureType==STRUCTURE_TOWER);
    for(var i=0; i<=towers.length-1; i=i+1) {
        roleAttackTower.run(towers[i]);
    }

    for(var name in Game.rooms) {
        var room=Game.rooms[name];
        if(room.controller.my && !room.memory.isInitialized){
            roomInit[name](room);
        }
        if(room.memory.miningType=='storeMining') {
            roomStoreMining.storeMining(room);
        }
        else if(room.memory.miningType=='dropMining') {
            
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
        else if(creep.memory.role == 'attacker') {
            roleAttacker.attackRoom(creep);
        }
        else if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        else if(creep.memory.role=='sapper'){
            roleSapper.run(creep);
        }
    }

    for(var name in Game.flags) {
        var flag = Game.flags[name];

        if(flag.memory.flagType == 'attack') {
            flagAttack.run(flag);
        }
    }
    
}