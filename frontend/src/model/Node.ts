import {Edge} from './Edge';

export class Node {
  private id: string = "";
  private title: string = "";
  private edges: Edge[];

  constructor() {
    this.edges = [];
  }

  getId() : string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getTitle() : string {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getEdges() : Edge[]  {
    return this.edges;
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}
