import {AxiosController} from './AxiosController'
import { Graph } from '../model/Graph';
import { GraphFactory } from '../model/GraphFactory';

export class GraphService {
  readonly url: string = '/graph';
  readonly axiosSerivce: AxiosController;

  constructor() {
    this.axiosSerivce = new AxiosController();
  }

  public async post(graphToPost: JSON): Promise<string> {
    const result = await this.axiosSerivce.post(this.url, {graph: graphToPost});
    const status: string = result.data.message;
    return status;
  }

  public async get(): Promise<Graph> {
    const result = await this.axiosSerivce.get(this.url);
    const graph: Graph = GraphFactory.createGraphFromJSON(result.data.graph);
    return graph;
  }
}
