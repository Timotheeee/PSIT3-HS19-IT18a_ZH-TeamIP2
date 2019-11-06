import {Graph, GraphJSON} from './Graph';
import {Node, NodeJSON} from './Node';
import {Edge, EdgeJSON} from './Edge';

export class GraphFactory {
  public static STATIC_JSON_STR_1:string = '{\n' +
    '  "nodes": [\n' +
    '    {\n' +
    '      "id": "q1",\n' +
    '      "metadata": {\n' +
    '        "isHead": true,\n' +
    '        "answerType": "input",\n' +
    '        "title" : "Hey thanks for testing out StudentScore! Do you wanna tell me your name? If not I\'ll just call you Bob"\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "id": "q2",\n' +
    '      "metadata": {\n' +
    '        "answerType": "choice",\n' +
    '    \t  "title" : "Do you play video james?"\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "id": "q3",\n' +
    '      "metadata": {\n' +
    '        "answerType": "choice",\n' +
    '    \t  "title" : "Do you play League of Legends or World of Warcraft Classic?"\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "id": "q4",\n' +
    '      "metadata": {\n' +
    '        "answerType": "choice",\n' +
    '    \t  "title" : "Do you exercise at least twice a week?"\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "id": "q5",\n' +
    '      "metadata": {\n' +
    '        "answerType": "choice",\n' +
    '    \t  "title" : "Do you get more than 7 hours of sleep every night?"\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "id": "fn1",\n' +
    '      "metadata": {\n' +
    '    \t  "title" : "Great! You are finished! Would you like to see the results?",\n' +
    '        "answerType": "result",\n' +
    '        "isFinalNode" : true\n' +
    '      }\n' +
    '    }\n' +
    '  ],\n' +
    '  "edges": [\n' +
    '    {\n' +
    '      "source": "q1",\n' +
    '      "target": "q2",\n' +
    '      "metadata": {\n' +
    '        "answer": "Bob",\n' +
    '        "score": 0\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q2",\n' +
    '      "target": "q3",\n' +
    '      "metadata": {\n' +
    '        "answer": "Yes",\n' +
    '        "score": -10\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q2",\n' +
    '      "target": "q4",\n' +
    '      "metadata": {\n' +
    '        "answer": "No",\n' +
    '        "score": 10\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q3",\n' +
    '      "target": "q5",\n' +
    '      "metadata": {\n' +
    '        "answer": "Yes",\n' +
    '        "score": -1000\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q3",\n' +
    '      "target": "q5",\n' +
    '      "metadata": {\n' +
    '        "answer": "I play other games",\n' +
    '        "score": -200\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q4",\n' +
    '      "target": "q5",\n' +
    '      "metadata": {\n' +
    '        "answer": "Yes, I am a true gym rat!",\n' +
    '        "score": 200\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q4",\n' +
    '      "target": "q5",\n' +
    '      "metadata": {\n' +
    '        "answer": "No less than that",\n' +
    '        "score": 0\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q5",\n' +
    '      "target": "fn1",\n' +
    '      "metadata": {\n' +
    '        "answer": "Yes, I love my bed!",\n' +
    '        "score": 500\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "q4",\n' +
    '      "target": "fn1",\n' +
    '      "metadata": {\n' +
    '        "answer": "No, I like Netflix way too much :(",\n' +
    '        "score": -500\n' +
    '      }\n' +
    '    },\n' +
    '    {\n' +
    '      "source": "fn1",\n' +
    '      "target": "fn1",\n' +
    '      "metadata": {\n' +
    '        "answer": "Yes please!",\n' +
    '        "score": 0\n' +
    '      }\n' +
    '    }\n' +
    '  ]\n' +
    '}\n';

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
