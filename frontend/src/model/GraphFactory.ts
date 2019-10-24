import {Graph} from './Graph';
import {JSONGraph} from './JSONGraph';
import {JSONNode} from './JSONNode';
import {JSONEdge} from './JSONEdge';

export class GraphFactory {
  /*
   * Creates and returns a Graph object from the given JSONGraph.
   */
  static createGraph(JSONGraph: JSONGraph) : Graph {
    let graph: Graph = new Graph();
    this.importNodes(graph, JSONGraph.nodes);
    this.importEdges(graph, JSONGraph.edges);
    return graph;
  }

  static createGraphFromJSON(json: string): Graph {
    // TODO michael implement this method
    return new Graph();
  }

  private static importNodes(graph: Graph, nodes: JSONNode[]) {
    for (let node of nodes) {
      graph.addNode(node.id, node.metadata.title);
    }
  }

  private static importEdges(graph: Graph, edges: JSONEdge[]) {
    for (let edge of edges) {
      graph.addEdge(edge.source, edge.source, edge.metadata.answer, parseInt(edge.metadata.score));
    }
  }
}
