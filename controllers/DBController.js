"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require('mysql');
const fs = require('fs');
const filelocation = "./config/db.json";
class DBController {
    constructor() {
        this.graph = '';
        fs.readFile(filelocation, 'utf8', (err, data) => {
            if (err) {
                throw Error(`error while reading file: ${err}`);
            }
            this.graph = data;
        });
    }
    getLoadedFile() {
        return this.graph;
    }
    save2File(json) {
        fs.writeFile(filelocation, json, function (err) {
            if (err) {
                throw Error(`error while writing to file: {err}`);
            }
        });
    }
    //used for tests
    getLoadedFileAsync() {
        var this2 = this;
        var prom = new Promise(function (resolve, reject) {
            var si = setInterval(function () {
                if (this2.graph != "") {
                    clearInterval(si);
                    resolve(this2.graph);
                }
            }, 50);
        });
        return prom;
    }
}
exports.DBController = DBController;
