const algorithmSpawns = require("./algorithm.spawns");


var algorithmMain={
    creeps : undefined,
    flags : undefined,
    spawns : algorithmSpawns,
    rooms : undefined,

    iterate : function (gameElements) {
        for (var name in Memory[gameElements]) {
            //element is a creep or flag or...
            var element = Game[gameElements][name];
            if (element == undefined) {
                this[gameElements].destruct();
                delete Memory[gameElements][name];
            }
            else {
                this[gameElements].execute(element);
            }
        }
    },
};

module.exports=algorithmMain;