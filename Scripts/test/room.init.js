const roomInitW6N29 = require("./room.init.w6n29");

var roomInit = {
    W6N29 : function(room) {
        roomInitW6N29.init(room);
    },
    sim : function(room) {
        console.log('init sim');
    },
};

module.exports = roomInit;