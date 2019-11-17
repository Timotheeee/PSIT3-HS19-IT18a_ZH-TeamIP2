import {Node, NodeJSON, AnswerType} from './Node';
import {Edge, EdgeJSON } from './Edge';

export class Graph {
  private _nodes: Node[];
  private _headNode: Node|null = null;

  constructor() {
    this._nodes = [];
  }

  get nodes(): Node[] { return this._nodes }

  get headNode() { return this._headNode! }
  set headNode(headNode: Node) { this._headNode = headNode }

  /**
   * Adds a node if a node with the same nodeId does not yet exist.
   * The passed object will be cloned before it is added to the collection.
   * @param node2Add 
   */
  addNode(node2Add: Node): void {
    if (this.findNode(node2Add.id) === null) {
      this.nodes.push(node2Add);
    } else {
      throw new Error(`error while adding Node: a node with the id: ${node2Add.id} already exists!`);
    }
  }

  /**
   * Adds an edge to the graph if it's source node and target node do exist.
   * The passed edge object will be cloned before it is added to the collection.
   * @param edge2Add 
   */
  addEdge(edge2Add: Edge): void {
    /* check if the source node exists */
    let sourceNode: Node|null = this.findNode(edge2Add.sourceId);
    if (sourceNode == null) {
      throw new Error(`error while adding edge: ${edge2Add.id} source: ${edge2Add.sourceId} does not exist!`);
    }
    /* check if the target node exists */
    let targetNode: Node|null = this.findNode(edge2Add.targetId);
    if (targetNode == null) {
      throw new Error(`error while adding edge: ${edge2Add.id} target: ${edge2Add.targetId} does not exist!`);
    }
    
    sourceNode.addEdge(edge2Add);
  }

  /*
   * Finds an existing node by Id. Returns null if node doesn't exist.
   */
  findNode(nodeId: string) : Node|null {
    for (let node of this._nodes) {      
      // check if node id already exists
      if (node.id === nodeId) {
        return node;
      }
    }
    return null;
  }  
}

export interface GraphJSON {
  nodes: NodeJSON[];
  edges: EdgeJSON[];
}