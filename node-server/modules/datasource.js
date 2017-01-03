var db = require('./sqlitedriver')

module.exports = {
    pop: function(callback) {
        console.log('Pop invoked')
        getQueue(1, callback)
    }
}

var getQueue = function(count, callback) {
    db.getQueue(count, callback)
}