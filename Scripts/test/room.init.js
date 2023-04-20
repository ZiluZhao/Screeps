const roomInitSim = require("./room.init.sim");
const roomInitW6N29 = require("./room.init.w6n29");

var roomInit = {
    W6N29 : function(room) {
        roomInitW6N29.init(room);
    },
    sim : function(room) {
        roomInitSim.init(room);
    },
};

module.exports = roomInit;