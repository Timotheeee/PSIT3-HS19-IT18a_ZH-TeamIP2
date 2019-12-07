import {Graph, GraphJSON} from './Graph';
import {Node, NodeJSON, AnswerType} from './Node';
import {Edge, EdgeJSON} from './Edge';
import {ScoreBasedRecommendationConfigJSON} from "./Recommendation/ScoreBasedRecommendationsGenerator";
import {AnswerBasedRecommendationConfigJSON} from "./Recommendation/AnswerBasedRecommendationsGenerator";

export class GraphFactory {
  static createGraphFromJSON(data: string): Graph {
    let parsedObject: Object = JSON.parse(data);
    let graphJSON: GraphJSON = new GraphJSON();

    let scoreBasedConfig: ScoreBasedRecommendationConfigJSON|null = null;
    let answerBasedConfig: AnswerBasedRecommendationConfigJSON|null = null;

    for (let [key, value] of Object.entries(parsedObject)) {
      if(key === 'nodes') {
        let nodes: NodeJSON[] = value as NodeJSON[];
        graphJSON.nodes.push(...nodes);
      }

      if(key === 'edges') {
        let edges: EdgeJSON[] = value as EdgeJSON[];
        graphJSON.edges.push(...edges);
      }

      if(key === 'recommendations') {
        for (let [key2, value2] of Object.entries(value)) {
          let currentValue = value2 as RecommendationConfigTypeJSON;

          if(currentValue.type === 'scoreBased') {
            // @ts-ignore
            scoreBasedConfig = currentValue.data as ScoreBasedRecommendationConfigJSON[];
          }

          if(currentValue.type === 'answerBased') {
            // @ts-ignore
            answerBasedConfig = currentValue.data as AnswerBasedRecommendationConfigJSON;
          }
        }
      }
    }

    return (this.createGraph(graphJSON, answerBasedConfig!, scoreBasedConfig!));
  }


  private static createGraph(jsonGraph: GraphJSON, answerBasedConfig: AnswerBasedRecommendationConfigJSON,
                             scoreBasedConfig: ScoreBasedRecommendationConfigJSON) : Graph {
    let graph: Graph = new Graph();
    this.importNodes(graph, jsonGraph.nodes);
    this.importEdges(graph, jsonGraph.edges);

    graph.answerBasedRecommendationConfig = answerBasedConfig;
    graph.scoreBasedRecommendationConfig = scoreBasedConfig;

    this.setHeadNode(graph);

    return graph;
  }

  private static setHeadNode(graph: Graph): void {
    let headNode:Node|null = null;

    const nodes = graph.nodes;
    let i = 0;
    let currentNode:Node|null;
    while(headNode == null && i < nodes.length){
      currentNode = nodes[i];

      if(currentNode.isHead){
        headNode = currentNode;
      }

      i++;
    }

    if(headNode == null){
      throw new Error('Couldn\'t set head node!');
    }

    graph.headNode = headNode;
  }

  private static importNodes(graph: Graph, nodes: NodeJSON[]) {
    for (let node of nodes) {
      if(node.metadata !== undefined && (node.metadata.isHead !== undefined || node.metadata.isFinalNode !== undefined)) {
        graph.addNode(new Node(node.id, node.metadata.title, this.answerTypeStringToAnswerType(node.metadata.answerType),
                      node.metadata.isHead, node.metadata.isFinalNode!));
      } else {
        graph.addNode(new Node(node.id, node.metadata.title, this.answerTypeStringToAnswerType(node.metadata.answerType)));
      }
    }
  }

  private static answerTypeStringToAnswerType(answerTypeStr: string): AnswerType {
    if(answerTypeStr === 'input') {
      return AnswerType.InputAnswer;
    }
    else if(answerTypeStr === 'result') {
      return AnswerType.ResultAnswer;
    }
    else {
      return AnswerType.RegularAnswer;
    }
  }

  private static importEdges(graph: Graph, edges: EdgeJSON[]) {
    for (let edge of edges) {
      if (edge.metadata !== undefined) {
        graph.addEdge(new Edge(edge.edgeId, edge.source, edge.target, edge.metadata.answer, parseInt(edge.metadata.score)));
      } else {
        graph.addEdge(new Edge(edge.edgeId, edge.source, edge.target));
      }
    }
  }
}

export interface RecommendationConfigTypeJSON {
  type: string;
  data: Object;

}
