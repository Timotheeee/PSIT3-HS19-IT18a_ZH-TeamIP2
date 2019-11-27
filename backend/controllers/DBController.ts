const mysql = require('mysql');
const fs = require('fs');
const filelocation = "./config/db.json";

export class DBController {
  private graph: string = '';
  private con: any;

  constructor() {
    fs.readFile(filelocation, 'utf8', (err: any, data: string) =>  {
      if (err) {
        throw Error(`error while reading file: ${err}`);
      }
      this.graph = data;
    });
  }

  public getLoadedFile() {
    return this.graph;
  }

  public save2File(json: string) {
    fs.writeFile(filelocation, json, function (err: any) {
      if (err) {
        throw Error(`error while writing to file: {err}`);
      }
    });
  }

  //used for tests
  public getLoadedFileAsync() {
    var this2 = this;
    var prom = new Promise(function (resolve, reject) {
      var si = setInterval(function () {
        if (this2.graph != "") {
          clearInterval(si)
          resolve(this2.graph);
        }
      }, 50);
    });
    return prom;
  }
}
