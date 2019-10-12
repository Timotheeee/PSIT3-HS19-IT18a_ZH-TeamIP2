const mysql = require('mysql');

export class Dao {
  private graph:string = "";
  private con:any;

  constructor(){

    this.con = mysql.createConnection({
      host: "timotheeee1.site",
      port: 3306,
      user: "timothel_psit3",
      password: "psit3",
      database: "timothel_psit3"
    });

    var this2 = this;
    this.con.connect(function (err: any) {
      if (err) throw err;
      console.log("Connected to db!");
      // this2.runQuery("use timothel_psit3");
      this2.con.query("SELECT * FROM graph", function (err: any, result: any) {
        if (err) throw err;
        this2.graph = result[0].data
      });
    });
  }

  public getGraph(){
    return JSON.parse(this.graph);
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