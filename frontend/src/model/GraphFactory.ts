import {Graph, GraphJSON} from './Graph';
import {Node, NodeJSON} from './Node';
import {Edge, EdgeJSON} from './Edge';

export class GraphFactory {
  public static STATIC_JSON_STR_1:string = '{ "nodes": [ { "id": "q1", "metadata": { "isHead": true, "answerType": "input", "title" : "Hey thanks for testing out StudentScore! Do you wanna tell me your name? If not I\'ll just call you Bob" } }, { "id": "q2", "metadata": { "answerType": "choice", "title" : "Do you play video james?" } }, { "id": "q3", "metadata": { "answerType": "choice", "title" : "Ah I see you are a person of culture as well %username%. Do you play League of Legends or World of Warcraft Classic?" } }, { "id": "q4", "metadata": { "answerType": "choice", "title" : "Do you exercise at least twice a week?" } }, { "id": "q5", "metadata": { "answerType": "choice", "title" : "Do you get more than 7 hours of sleep every night?" } }, { "id": "fn1", "metadata": { "title" : "Great! You are finished! Would you like to see the results?", "answerType": "result", "isFinalNode" : true } } ], "edges": [ { "source": "q1", "target": "q2", "metadata": { "answer": "Bob", "score": 0 } }, { "source": "q2", "target": "q3", "metadata": { "answer": "Yes", "score": -10 } }, { "source": "q2", "target": "q4", "metadata": { "answer": "No", "score": 10 } }, { "source": "q3", "target": "q5", "metadata": { "answer": "Yes", "score": -1000 } }, { "source": "q3", "target": "q5", "metadata": { "answer": "I play other games", "score": -200 } }, { "source": "q4", "target": "q5", "metadata": { "answer": "Yes, I am a true gym rat!", "score": 200 } }, { "source": "q4", "target": "q5", "metadata": { "answer": "No less than that", "score": 0 } }, { "source": "q5", "target": "fn1", "metadata": { "answer": "Yes, I love my bed!", "score": 500 } }, { "source": "q4", "target": "fn1", "metadata": { "answer": "No, I like Netflix way too much :(", "score": -500 } }, { "source": "fn1", "target": "fn1", "metadata": { "answer": "Yes please!", "score": 0 } } ] }';

  /**
   * This method is purely to be used for test purposes.
   * It creates a graph (question catalogue) using a fix string that represents the json format
   * of the simplest possible situation: the gaming questionaire with the sleep/fitness question.
   */
  public static createTestGraph(): Graph {
    return this.createGraphFromJSON(GraphFactory.STATIC_JSON_STR_1);
  }

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
      throw new Error('Couldn\'t set head node!');
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
        graph.addNode(node.id, node.metadata.title, node.metadata.answerType, node.metadata.isHead, node.metadata.isFinalNode!);
      } else {
        graph.addNode(node.id, node.metadata.title, node.metadata.answerType);
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
