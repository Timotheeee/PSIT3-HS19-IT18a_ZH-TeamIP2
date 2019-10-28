import {Graph, GraphJSON} from './Graph';
import {Node, NodeJSON} from './Node';
import {Edge, EdgeJSON} from './Edge';

export class GraphFactory {
  /*
   * Creates and returns a Graph object from the given JSONGraph.
   */
  private static createGraph(JSONGraph: GraphJSON) : Graph {
    let graph: Graph = new Graph();
    this.importNodes(graph, JSONGraph.nodes);
    this.importEdges(graph, JSONGraph.edges);

    this.setHeadNode(graph);

    return graph;
  }

  private static setHeadNode(graph: Graph): void {
    let headNode:Node|null = null;

    const nodes = graph.getNodes();
    let i = 0;
    let currentNode:Node|null;
    while(headNode == null && i < nodes.length){
      currentNode = nodes[i];

      if(currentNode.getIsHead()){
        headNode = currentNode;
      }

      i++;
    }

    if(headNode == null){
      throw new Error('Couln\'t set head node!');
    }

    graph.setHeadNode(headNode);    
  }

  static createGraphFromJSON(data: string): Graph {   
    let graph: GraphJSON = JSON.parse(data);
    return (this.createGraph(graph));
  }

  private static importNodes(graph: Graph, nodes: NodeJSON[]) {
    for (let node of nodes) {
      // TODO: ryan don't forget about about isFinalNode
      // TODO: ryan clean this mess up
      if(node.metadata !== undefined && (node.metadata.isHead !== undefined || node.metadata.isFinalNode !== undefined)) {
        graph.addNode(node.id, node.metadata.title, node.metadata.isHead, node.metadata.isFinalNode!);
      } else {
        graph.addNode(node.id, node.metadata.title);
      }      
    }
  }

  private static importEdges(graph: Graph, edges: EdgeJSON[]) {
    let currentEdge: Object;
    for (let edge of edges) {
        if (edge.metadata !== undefined) {
          graph.addEdge(edge.source, edge.target, edge.metadata.answer, parseInt(edge.metadata.score));
        } else {
          graph.addEdge(edge.source, edge.target);
        }
    }
  }
}
