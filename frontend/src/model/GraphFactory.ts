import {Graph} from './Graph';

export class GraphFactory {
  /*
   * Creates and returns a Graph object from the given JSONGraph.
   */
  /*static createGraph(JSONGraph: JSONGraph) : Graph {
    let graph: Graph = new Graph();
    this.importNodes(graph, JSONGraph.nodes);
    this.importEdges(graph, JSONGraph.edges);
    return graph;
  }*/

  static createGraphFromJSON(data: string): Graph {
    // TODO michael implement this method
    let graph: Graph = JSON.parse(data);    
    return new Graph();
  }

  /*private static importNodes(graph: Graph, nodes: JSONNode[]) {
    for (let node of nodes) {
      graph.addNode(node.id, node.metadata.title);
    }
  }

  private static importEdges(graph: Graph, edges: JSONEdge[]) {
    for (let edge of edges) {
      graph.addEdge(edge.source, edge.source, edge.metadata.answer, parseInt(edge.metadata.score));
    }
  }*/
}
