import {Node} from './Node.ts';
import {Edge} from './Edge.ts';

export class Graph {
  private nodes: Node[];

  constructor() {
    this.nodes = [];
  }

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

  addEdge(source: string, target: string, answer: string, score: number) {
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

  findNode(id: string) : any {
    for (let node of this.nodes) {
      if (node.getId().localeCompare(id)) {
        return node;
      }
    }
    return null;
  }

}
