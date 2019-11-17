import {Graph, GraphJSON} from './Graph';
import {Node, NodeJSON, AnswerType} from './Node';
import {Edge, EdgeJSON} from './Edge';
import { Answer } from '../Answer';

export class GraphFactory {
  public static STATIC_JSON_STR_1:string = "{\r\n    \"nodes\": [\r\n        {\r\n            \"id\": \"q1\",\r\n            \"metadata\": {\r\n                \"isHead\": true,\r\n                \"answerType\": \"input\",\r\n                \"title\": \"Hey thanks for testing out StudentScore! Do you wanna tell me your name? If not I'll just call you Bob\"\r\n            }\r\n        },\r\n        {\r\n            \"id\": \"q2\",\r\n            \"metadata\": {\r\n                \"answerType\": \"choice\",\r\n                \"title\": \"Do you play video games?\"\r\n            }\r\n        },\r\n        {\r\n            \"id\": \"q3\",\r\n            \"metadata\": {\r\n                \"answerType\": \"choice\",\r\n                \"title\": \"Ah I see you are a person of culture as well %username%. Do you play League of Legends or World of Warcraft Classic?\"\r\n            }\r\n        },\r\n        {\r\n            \"id\": \"q4\",\r\n            \"metadata\": {\r\n                \"answerType\": \"choice\",\r\n                \"title\": \"Do you exercise at least twice a week?\"\r\n            }\r\n        },\r\n        {\r\n            \"id\": \"q5\",\r\n            \"metadata\": {\r\n                \"answerType\": \"choice\",\r\n                \"title\": \"Do you get more than 7 hours of sleep every night?\"\r\n            }\r\n        },\r\n        {\r\n            \"id\": \"fn1\",\r\n            \"metadata\": {\r\n                \"title\": \"Great! You are finished! Would you like to see the results?\",\r\n                \"answerType\": \"result\",\r\n                \"isFinalNode\": true\r\n            }\r\n        }\r\n    ],\r\n    \"edges\": [\r\n        {\r\n            \"source\": \"q1\",\r\n            \"target\": \"q2\",\r\n            \"id\": \"e1\",\r\n            \"metadata\": {\r\n                \"answer\": \"Bob\",\r\n                \"score\": 0\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q2\",\r\n            \"target\": \"q3\",\r\n            \"id\": \"e2\",\r\n            \"metadata\": {\r\n                \"answer\": \"Yes\",\r\n                \"score\": -10\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q2\",\r\n            \"target\": \"q4\",\r\n            \"id\": \"e3\",\r\n            \"metadata\": {\r\n                \"answer\": \"No\",\r\n                \"score\": 10\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q3\",\r\n            \"target\": \"q5\",\r\n            \"id\": \"e4\",\r\n            \"metadata\": {\r\n                \"answer\": \"Yes\",\r\n                \"score\": -1000\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q3\",\r\n            \"target\": \"q5\",\r\n            \"id\": \"e5\",\r\n            \"metadata\": {\r\n                \"answer\": \"I play other games\",\r\n                \"score\": -200\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q4\",\r\n            \"target\": \"q5\",\r\n            \"id\": \"e6\",\r\n            \"metadata\": {\r\n                \"answer\": \"Yes, I am a true gym rat!\",\r\n                \"score\": 200\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q4\",\r\n            \"target\": \"q5\",\r\n            \"id\": \"e7\",\r\n            \"metadata\": {\r\n                \"answer\": \"No less than that\",\r\n                \"score\": 0\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q5\",\r\n            \"target\": \"fn1\",\r\n            \"id\": \"e8\",\r\n            \"metadata\": {\r\n                \"answer\": \"Yes, I love my bed!\",\r\n                \"score\": 500\r\n            }\r\n        },\r\n        {\r\n            \"source\": \"q5\",\r\n            \"target\": \"fn1\",\r\n            \"id\": \"e9\",\r\n            \"metadata\": {\r\n                \"answer\": \"No, I like Netflix way too much :(\",\r\n                \"score\": -500\r\n            }\r\n        }\r\n    ]\r\n}";

  /**
   * This method is purely to be used for test purposes.
   * It creates a graph (question catalogue) using a fix string that represents the json format
   * of the simplest possible situation: the gaming questionaire with the sleep/fitness question.
   */
  public static createTestGraph(): Graph {
    return this.createGraphFromJSON(GraphFactory.STATIC_JSON_STR_1);
  }

  static createGraphFromJSON(data: string): Graph {
    let graph: GraphJSON = JSON.parse(data);
    return (this.createGraph(graph));
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
      // TODO: ryan don't forget about about isFinalNode
      // TODO: ryan clean this mess up
      if(node.metadata !== undefined && (node.metadata.isHead !== undefined || node.metadata.isFinalNode !== undefined)) {
        graph.addNode(new Node(node.id, node.metadata.title, this.answerTypeStringToAnswerType(node.metadata.answerType),
                      node.metadata.isHead, node.metadata.isFinalNode!));
      } else {
        graph.addNode(new Node(node.id, node.metadata.title, this.answerTypeStringToAnswerType(node.metadata.answerType)));
      }
    }
  }

  private static answerTypeStringToAnswerType(answerTypeStr: string): AnswerType {
    if(answerTypeStr === 'resultType') {
      return AnswerType.InputAnswer;
    } else  {
      return AnswerType.RegularAnswer;
    }
  }

  private static importEdges(graph: Graph, edges: EdgeJSON[]) {
    let currentEdge: Object;
    for (let edge of edges) {
        if (edge.metadata !== undefined) {
          graph.addEdge(new Edge(edge.id, edge.source, edge.target, edge.metadata.answer, parseInt(edge.metadata.score)));
        } else {
          graph.addEdge(new Edge(edge.id, edge.source, edge.target));
        }
    }
  }
}
