import {AxiosController} from './AxiosController'
import { Graph } from '../model/Graph/Graph';
import { GraphFactory } from '../model/Graph/GraphFactory';

export class GraphService {
  readonly url: string = '/graph';
  readonly axiosService: AxiosController;

  constructor() {
    this.axiosService = new AxiosController();
  }

  public async post(graphToPost: string): Promise<any> {
    const result = await this.axiosService.post(this.url, {graph: graphToPost});
    const status: string = result.data.message;
    return status;
  }

  public async get(): Promise<Graph> {
    const resultFromServer = await this.axiosService.get(this.url);

    if(resultFromServer.success) {
      const graph: Graph = GraphFactory.createGraphFromJSON(resultFromServer.data);
      return graph;
    } else {
      throw Error(resultFromServer.error_message);
    }
  }

  public async getJSON(): Promise<Graph> {
    const result = await this.axiosService.get(this.url);
    return result.data.graph;
  }
}