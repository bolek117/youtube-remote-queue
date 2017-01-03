import { DataSource } from "./dataSource";
import { CallbackData } from "./callback";
var sqlite = require("sqlite3");

export class SqliteProvider implements DataSource {
    private _handle;
    private _path = 'data/db.sqlite3';

    pop(callback: (data: CallbackData) => void) {
        var error = "test";
        var data = "test";
    
        callback(new CallbackData(error, data));
    }

    init(callback: (data: CallbackData) => void) {
        try {
            this._handle = new sqlite.Database(this._path)
        } catch (e) {
            let err: Error = e;
            if (e.code == "SQLITE_CANTOPEN")
                console.log("Cant open");
            else
                console.error(e.message)
        }

        callback(new CallbackData("", ""));
    }
}