const actionCreep = require("./action.creeps");
const actionFlag = require("./action.flags");
const actionMain = require("./action.main");
const memoryManage = require("./memory.manage");

module.exports.loop = function () {
    //iterate on the objects array
    const gameElementsClass = ['flags', 'creeps'];

    for (var i=0; i<=gameElementsClass.length-1; i++){
        const gameElements=gameElementsClass[i]
        actionMain.activate(gameElements);
    }

}