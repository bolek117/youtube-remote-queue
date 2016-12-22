var db = require('./sqlitedriver')

module.exports = {
    pop: function() {
        console.log('Pop')
        return getQueue(1);
    }
}

var getQueue = function(count) {
    return db.getQueue(count);
}