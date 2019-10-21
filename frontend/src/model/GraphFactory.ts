import {Graph} from './Graph.ts';
import {JSONGraph} from './JSONGraph.ts';
import {JSONNode} from './JSONNode.ts';
import {JSONEdge} from './JSONEdge.ts';

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

  static createTestGraph() : Graph {
    // TODO: ryan finish code here. Use static json string to actually test it.
    let graph: Graph = new Graph();
    graph.addNode(new Node())
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
