import {Graph, GraphJSON} from './Graph';
import {NodeJSON} from './Node';
import {EdgeJSON} from './Edge';

export class GraphFactory {
  /*
   * Creates and returns a Graph object from the given JSONGraph.
   */
  private static createGraph(JSONGraph: GraphJSON) : Graph {
    let graph: Graph = new Graph();
    this.importNodes(graph, JSONGraph.nodes);
    this.importEdges(graph, JSONGraph.edges);
    return graph;
  }

  static createGraphFromJSON(data: string): Graph {
    //let graph: Graph = JSON.parse(data, Graph.reviver);
    let graph: GraphJSON = JSON.parse(data);
    return (this.createGraph(graph));
  }

  private static importNodes(graph: Graph, nodes: NodeJSON[]) {
    for (let node of nodes) {
      graph.addNode(node.id, node.metadata.title);
    }
  }

  private static importEdges(graph: Graph, edges: EdgeJSON[]) {
    let currentEdge: Object;
    for (let edge of edges) {
      //if ("metadata" in edge) {
        if (edge.metadata !== undefined) {
          graph.addEdge(edge.source, edge.target, edge.metadata.answer, parseInt(edge.metadata.score));
        } else {
          graph.addEdge(edge.source, edge.target);
        }
    }
  }
}
