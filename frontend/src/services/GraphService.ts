import {AxiosController} from './AxiosController'
import { Graph } from '../model/Graph/Graph';
import { GraphFactory } from '../model/Graph/GraphFactory';

/**
 * Class for accessing & saving a graph to the backend
 */
export class GraphService {
  readonly url: string = '/graph';
  readonly axiosService: AxiosController;


  constructor() {
    this.axiosService = new AxiosController();
  }

  /**
   * Saves the graph in the database.
   * @param {string} graphToPost - The graph which will be saved.
   * @returns A boolean promise if the post request was successful.
   */
  public async post(graphToPost: string): Promise<boolean> {
    const result = await this.axiosService.post(this.url, {graph: graphToPost});

    if(result.success) {
      return true;
    } else {
      throw Error(result.error_message);
    }
  }

  /**
   * Accesses the graph from the backend.
   * @returns A promise with the graph object.
   */
  public async get(): Promise<Graph> {
    const result = await this.axiosService.get(this.url);

    if(result.success) {
      const graph: Graph = GraphFactory.createGraphFromJSON(result.data);
      return graph;
    } else {
      throw Error(result.error_message);
    }
  }

  /**
   * Accesses the graph in the backend.
   * @returns The graph in JSON-Format.
   */
  public async getJSON(): Promise<string> {
    const result = await this.axiosService.get(this.url);
    return result.data;
  }
}
