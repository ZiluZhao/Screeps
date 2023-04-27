const action = require("./action");

var actionCreep = {
    //return spawnCreep result
    construct : function(spawn,  species, name, memory={}) {
        memory={memory, species: species};
        var actionResult=action.species[species].construct(spawn,  species, name, memory);
        return actionResult;
    },

    destruct : function(creepMemory) {

    },

    run : function(creep) {

    }
};

module.exports=actionCreep;