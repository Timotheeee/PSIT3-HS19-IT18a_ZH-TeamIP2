#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = require("./Dao");
const express = require('express'), bodyParser = require('body-parser'), morgan = require('morgan'), app = express(), mysql = require('mysql'), fs = require('fs');
app.use(morgan('dev'));
app.use(express.static(__dirname + '\\..\\..\\frontend\\public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
var server = app.listen(process.env.PORT || 3000, listen);
// This call back just tells us that the server has started
function listen() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://' + host + ':' + port);
}
app.get('/api/', function (req, res) {
    var graph = dao.getGraph();
    res.status(200).json(graph);
});
//make a dao, add tests
// class Dao {
//   private graph:string = "";
//   private users:string = "";
//   private con:any;
//   constructor(){
//     this.con = mysql.createConnection({
//       host: "timotheeee1.site",
//       port: 3306,
//       user: "timothel_psit3",
//       password: "psit3",
//       database: "timothel_psit3"
//     });
//     var this2 = this;
//     this.con.connect(function (err: any) {
//       if (err) throw err;
//       console.log("Connected to db!");
//       // this2.runQuery("use timothel_psit3");
//       this2.con.query("SELECT * FROM graph", function (err: any, result: any) {
//         if (err) throw err;
//         this2.graph = result[0].data
//       });
//       this2.con.query("SELECT * FROM users", function (err: any, result: any) {
//         if (err) throw err;
//         this2.users = result[0].data
//       });
//     });
//   }
//   public getGraph(){
//     return JSON.parse(this.graph);
//   }
//   public getUsers(){
//     return JSON.parse(this.users);
//   }
// }
var dao = new Dao_1.Dao();
