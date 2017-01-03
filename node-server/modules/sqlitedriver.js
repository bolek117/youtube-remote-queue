var sqlite = require('sqlite3')
var fs = require('fs')

module.exports = {
    getQueue: function(count, callback) {
        getInstance(function(db) {
            callback(undefined, "Yay!")
        })
    }
}

var db = undefined;
var dataFolder = '../data'
var dbName = 'db.sqlite'

var assetsFolder = '../assets'
var ddlName = 'ddl.sql'

var getInstance = function(next) {
    if (db === undefined) {
        initDb(dbName, function() {
            next(db)
        })
        return
    }

    next(db);
}

var initDb = function(name, next) {
    var path = __dirname + '/' + dataFolder + '/' + dbName

    createFileIfNotExist(path, function() {
        db = new sqlite.Database(path)

        if (dbIsEmpty(path)) {
            createDbStructure(db, next);
        }
    })
    
}

var createFileIfNotExist = function(path, next) {
    fs.access(path, fs.constants.R_OK, (err) => {
        if (err !== undefined) {
            console.log('DB file does not exist')
            createEmptyFile(path, next)
            return
        }

        next()
    })
}

var createEmptyFile = function(path, next) {
    fs.writeFile(path, "", (err) => {
        if (err) {
            console.error(err)
            throw err
        }

        console.log("Created empty file in " + path)

        if (next !== undefined)
            next()
    })
}

var dbIsEmpty = function(path) {
    var stats = fs.statSync(path)
    var isEmpty = stats["size"] < 100

    if (isEmpty)
        console.log("Database is empty")

    return isEmpty
}

var createDbStructure = function(handle, callback) {
    var path = __dirname + '/' + assetsFolder + '/' + ddlName

    console.log("Creating database from ddl " + path)
    fs.readFile(path, function(error, data) {
        if (error) {
            console.log(error)
            throw err
        }
        handle.exec(data.toString())
        console.log("New database created")

        callback()
    })
}