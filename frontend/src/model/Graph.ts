import {Node, NodeJSON} from './Node';
import {Edge, EdgeJSON} from './Edge';
import { GraphFactory } from './GraphFactory';

export class Graph {
  private nodes: Node[];

  constructor() {
    this.nodes = [];
  }

  /*
   * Adds a new node to the graph. The newly added or existing node is returned.
   */
  addNode(id: string, title: string ) {
    let node: Node = this.findNode(id);
    if (node == null) {
      node = new Node();
      node.setId(id);
      node.setTitle(title);
      this.nodes.push(node);
    }
    return node;
  }

  /*
   * Adds an edge between two existing nodes.
   */
  addEdge(source: string, target: string, answer: string = "", score: number = 0) {
    let sourceNode: Node = this.findNode(source);
    if (sourceNode == null) {
      throw new Error("Source node not found.");
    }
    let targetNode: Node = this.findNode(target);
    if (targetNode == null) {
      throw new Error("Target node not found.");
    }
    let newEdge: Edge = new Edge(sourceNode, targetNode, answer, score);
    sourceNode.addEdge(newEdge);
  }

  /*
   * Finds a existing node by Id. Returns null if node doesn't exist.
   */
  findNode(id: string) : any {
    for (let node of this.nodes) {
      // check if node id already exists
      if (node.getId().localeCompare(id) === 0) {
        return node;
      }
    }
    return null;
  }

  getNodes() : Node[] {
    return this.nodes;
  }

  getHead() : Node {
    return this.nodes[0];
  }

  /*static reviver(key: string, value: any): any {
    return key === "" ? Graph.fromJSON(value) : value;
  }*/
}

export interface GraphJSON {
  nodes: NodeJSON[];
  edges: EdgeJSON[];
}
