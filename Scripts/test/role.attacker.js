
//creep.memory.targetRoomName
var roleAttacker = {
    moveToTargetRoom : function (creep, targetRoomName) {
        const exits=creep.room.findExitTo(targetRoomName);
        const exit=creep.pos.findClosestByRange(exits);
        return creep.moveTo(exit);
    },

    hasThreat : function(creep) {
        var threatCreeps=_.filter(creep.room.find(FIND_HOSTILE_CREEPS), (creep)=>creep.getActiveBodyparts(ATTACK)>0 || creep.getActiveBodyparts(RANGED_ATTACK)>0);
        var threatStructures=_.filter(creep.room.find(FIND_HOSTILE_STRUCTURES), (structure)=>structure.structureType==STRUCTURE_SPAWN || structure.structureType==STRUCTURE_TOWER);
        if (threatCreeps.length+threatStructures.length>0) {
            return true;
        }
        else {
            return false;
        }
    },

    findStrongestEnemyWith : function (creep, part) {
        var partEnemies=_.filter(creep.room.find(FIND_HOSTILE_CREEPS), (creep)=>creep.getActiveBodyparts(part)>0);
        var maxParts=0;
        var maxIndex=0;

        for(var i=0; i<=partEnemies.length-1; i++) {
            if (partEnemies[i].getActiveBodyparts>maxParts) {
                maxParts=partEnemies[i].getActiveBodyparts;
                maxIndex=i;
            }
        }
        return partEnemies[i];
    },

    //null if not found
    findClosestEnemyWith : function (creep, part) {
        var partEnemies=_.filter(creep.room.find(FIND_HOSTILE_CREEPS), (creep)=>creep.getActiveBodyparts(part)>0);

        var target=creep.pos.findClosestByPath(partEnemies);
        return target;
    },


    //null if not found
    findClosestStructureType : function(creep, type) {
        var structures=_.filter(creep.room.find(FIND_STRUCTURES), (structure)=>structure.structureType==type);
        var target=creep.pos.findClosestByPath(structures);
        return target;
    },





    attackRoom: function(creep) {
        var targetRoomName=creep.memory.targetRoomName;
        var rangedTarget=null;
        var healerTarget=null;
        var spawnTarget=null;
        var attackerTarget=null;
        var flagName=creep.memory.flagName;
        var flag=Game.flags[flagName];

        rangedTarget=this.findClosestEnemyWith(creep, RANGED_ATTACK);
        attackerTarget=this.findClosestEnemyWith(creep, ATTACK);
        healerTarget=this.findClosestEnemyWith(creep, HEAL);
        spawnTarget=this.findClosestStructureType(creep, STRUCTURE_SPAWN);

        if(creep.room.name!=targetRoomName) {
            creep.moveTo(flag);
        }
        else {
            if(rangedTarget){
                if(creep.attack(rangedTarget)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(rangedTarget);
                }


            }
            else if(healerTarget) {
                if(creep.attack(healerTarget)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(healerTarget);
                }
            }
            else if(attackerTarget) {
                if(creep.attack(attackerTarget)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(attackerTarget);
                }
            }
            else if(spawnTarget){
                if(creep.attack(spawnTarget)==ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnTarget);
                }
            }
            if(this.hasThreat(creep)){
                
                flag.memory.requiredAttackers=2;
                flag.memory.requiredClaimers = 0;

            }
            else{
                flag.memory.requiredAttackers=0;
                flag.memory.requiredClaimers = 0;
            }
        }

    },
};

module.exports=roleAttacker;