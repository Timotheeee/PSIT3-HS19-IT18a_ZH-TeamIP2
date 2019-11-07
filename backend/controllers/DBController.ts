const mysql = require('mysql');
const fs = require('fs');
const filelocation = "./config/db.json";

export class DBController {
  private graph:string = "";
  private con:any;

  constructor(){
    var this2 = this;
    fs.readFile(filelocation, function (err: any, data: string) {
      if (err) {
        console.log("err: " + err);
        return;
      }
      this2.graph = data;
    });

    return;
    //the code to use a mysql db in case we want to use that instead
    this.con = mysql.createConnection({
      host: "timotheeee1.site",
      port: 3306,
      user: "timothel_psit3",
      password: "psit3",
      database: "timothel_psit3"
    });

    this.con.connect(function (err: any) {
      if (err) throw err;
      console.log("Connected to db!");
      this2.con.query("SELECT * FROM graph", function (err: any, result: any) {
        if (err) throw err;
        this2.graph = result[0].data;

      });
    });
  }

  public getGraph(){
    let graphJson;
    try {
      graphJson = JSON.parse(this.graph)
    } catch {
      graphJson = null;
    }
    return graphJson;
  }

  public saveGraph(graph:any){
    fs.writeFile(filelocation, JSON.stringify(graph), function (err: any) {
      if (err) {
          console.log(err);
      }
  });
  }

  //used for tests
  public getGraphAsync(){
    var this2 = this;
    var prom = new Promise(function(resolve, reject) {
      var si = setInterval(function() {
        if(this2.graph != ""){
          clearInterval(si)
          resolve(this2.graph);
        }
      }, 50);
    });
    return prom;
  }
}
