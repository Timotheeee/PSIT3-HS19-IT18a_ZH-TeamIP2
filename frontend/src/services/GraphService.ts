import axios from 'axios';
import {GraphIterator, MyGraphIterator} from './../model/MyGraphIterator';

export class GraphService {
  readonly url: string = '/graph';
  constructor() {

  }

  postGraph(graph: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: this.url,
        data: {
          graph: graph
        }
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })

  }

  getGraphIterator(): Promise<any> {
    return new Promise((resolve, reject) => {
      let promise = this.getGraph();

      promise.then(result => {
        let graphIterator = new MyGraphIterator(result);
        resolve(graphIterator);
      })

      promise.catch(error => {
        reject(error);
      })
    })
  }

  private getGraph(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: this.url,
      })
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
    })
  }
}
