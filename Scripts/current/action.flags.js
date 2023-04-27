const action = require("./action");
const planning = require("./action.planning");

var actionFlags = {
    construct : function(pos, planning, name=undefined, color=undefined, secondaryColor=undefined) {
        var flagName = pos.createFlag(name, color, secondaryColor);
        if (typeof flagName == 'string') {
            var flag=Game.flags[flagName];
            flag.memory.planning=planning;
            var subresult=action.planning[planning].construct();
            if(subresult==OK){
                return flagName;
            }
            else {
                flag.remove();
                return subresult;
            }
        }
        else {
            var errorCode=flagName;
            return errorCode;
        }
    },

    destruct : function (flagMemory) {
        var planning=flagMemory.planning;
        action.planning[planning].destruct(flagMemory);

    },

    run : function(flag) {
        //plan = 'colony ...'
        var planning=flag.memory.planning;
        action.planning[planning].run();

    }
};

module.exports=actionFlags;