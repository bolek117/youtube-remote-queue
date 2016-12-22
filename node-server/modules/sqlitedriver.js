var sqlite = require('sqlite3')
var fs = require('fs')

module.exports = {
    getQueue: function(count) {
        var db = getInstance()
        return 'Test'
    }
}

var db = undefined;
var dataFolder = '../data'
var dbName = 'db.sqlite'

var assetsFolder = '../assets'
var ddlName = 'ddl.sql'

var initDb = function(name) {
    var path = __dirname + '/' + dataFolder + '/' + dbName

    createFileIfNotExist(path, function() {
        db = new sqlite.Database(path)

        if (dbIsEmpty(path)) {
            createDbStructure(db);
        }
    })
    
}

var createFileIfNotExist = function(path, next) {
    if (!fs.exists(path)) {
        fs.writeFile(path, "", function(err) {
            if (err) {
                console.log(err)
                throw err
            }
        });

        next()
    }
}

var getInstance = function() {
    if (db === undefined) {
        initDb(dbName)
    }

    return db;
}

var dbIsEmpty = function(path) {
    var stats = fs.statSync(path)
    var isEmpty = stats["size"] < 100

    if (isEmpty)
        console.log("Database is empty")

    return stats["size"] < 100
}

var createDbStructure = function(handle) {
    var path = __dirname + '/' + assetsFolder + '/' + ddlName

    console.log("Creating database from ddl " + path)
    fs.readFile(path, function(error, data) {
        if (error) {
            console.log(error)
            throw err
        }
        handle.exec(data.toString())
        console.log("New database created")
    })
}