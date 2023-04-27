const actionCreeps = require("./action.creeps");
const actionFlags = require("./action.flags");
const actionPlanning = require("./action.planning");
const actionSpecies = require("./action.species");

var action={
    flags : actionFlags,
    creeps : actionCreeps,
    
    planning : actionPlanning,
    species : actionSpecies,
    
};

module.exports=action