import axios from 'axios';
import {GraphIterator, MyGraphIterator} from './../model/MyGraphIterator';
import {GraphFactory} from './../model/GraphFactory';
import { Graph } from '../model/Graph';

export class GraphService {
  readonly url: string = '/graph';
  constructor() {

  }

  postGraph(graph: Graph): Promise<string> {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: this.url,
        data: {
          graph: graph
        }
      })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        reject(error);
      });
    })

  }

  public getGraphIterator(): Promise<GraphIterator> {
    return new Promise((resolve, reject) => {
      let promise = this.getGraph();

      promise.then(result => {
        let graphIterator: GraphIterator = new MyGraphIterator(result);
        resolve(graphIterator);
      })

      promise.catch(error => {
        reject(error);
      })
    })
  }

  private getGraph(): Promise<Graph> {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: this.url,
      })
      .then(result => {
        let graph: Graph = GraphFactory.createGraphFromJSON(result.data);
        resolve(graph);
      })
      .catch(error => {
        reject(error);
      });
    })
  }
}
