import {AxiosController} from './AxiosController'
import { Graph } from '../model/Graph/Graph';
import { GraphFactory } from '../model/Graph/GraphFactory';

export class GraphService {
  readonly url: string = '/graph';
  readonly axiosSerivce: AxiosController;

  constructor() {
    this.axiosSerivce = new AxiosController();
  }

  public async post(graphToPost: string): Promise<string> {
    const result = await this.axiosSerivce.post(this.url, {graph: graphToPost});
    const status: string = result.data.message;
    return status;
  }

  public async get(): Promise<Graph> {
    let json = await this.axiosSerivce.get(this.url, 'text');

    console.log('inside of GraphService().get()');    

    const jsonStr = JSON.stringify(json.data);
    console.log(jsonStr);
    //json = JSON.stringify(json.data);

    const graph: Graph = GraphFactory.createGraphFromJSON(jsonStr);
    return graph;
  }

  public async getJSON(): Promise<Graph> {
    const result = await this.axiosSerivce.get(this.url, 'text');
    return result.data.graph;
  }
}