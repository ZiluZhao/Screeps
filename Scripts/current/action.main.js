const action = require("./action");

var actionMain={
    //gameElements == 'flags', 'creeps' ...
    activate : function (gameElements) {
        for (var name in Memory[gameElements]) {
            //element is a creep or flag or...
            var element = Game[gameElements][name];
            if (element == undefined) {
                action[gameElements].destruct();
                delete Memory[gameElements][name];
            }
            else {
                action[gameElements].run(element);
            }
        }
    },


};

module.exports=actionMain