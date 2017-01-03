import express = require("express");
import { DataSource } from "./modules/datasource";
import { SqliteProvider } from "./modules/sqliteProvider"
import { CallbackData } from "./modules/callback"

var app = express();
var dataSource: DataSource = new SqliteProvider();

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

  dataSource.init((callback: CallbackData) => {
    console.log("Initialized");
  })
});

app.get("/pop", (req: express.Request, res: express.Response) => {
  dataSource.pop((callback: CallbackData) => {
    res.end(callback.data);
    console.log("Pop finished")
  });
})