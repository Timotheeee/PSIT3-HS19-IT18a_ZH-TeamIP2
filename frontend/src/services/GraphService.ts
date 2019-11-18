import {AxiosController} from './AxiosController'
import { Graph } from '../model/Graph/Graph';
import { GraphFactory } from '../model/Graph/GraphFactory';

export class GraphService {
  readonly url: string = '/graph';
  readonly axiosService: AxiosController;

  constructor() {
    this.axiosService = new AxiosController();
  }

  public async post(graphToPost: string): Promise<boolean> {
    const result = await this.axiosService.post(this.url, {graph: graphToPost});

    if(result.success) {
      return true;
    } else {
      throw Error(result.error_message);
    }
  }

  public async get(): Promise<Graph> {
    const result = await this.axiosService.get(this.url);

    if(result.success) {
      const graph: Graph = GraphFactory.createGraphFromJSON(result.data);
      return graph;
    } else {
      throw Error(result.error_message);
    }
  }

  public async getJSON(): Promise<Graph> {
    const result = await this.axiosService.get(this.url);
    return result.data.graph;
  }
}