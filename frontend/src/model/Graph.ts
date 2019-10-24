export class Graph {
  private nodes: Node[];

  constructor() {
    this.nodes = [];
  }

  addNode(id: string, title: string ) {
    let node: Node;
    node = this.findNode(id);
    if (node == null) {
      node = new Node();
      node.setId(id);
      node.setTitle(title);
      this.nodes.push(node);
    }
    return node;
  }

  addEdge(source: string, target: string, answer: string, score: number = 0) {
    const sourceNode: Node = this.findNode(source);
    const targetNode: Node = this.findNode(target);
    sourceNode.addEdge(new Edge(targetNode, answer, score));
  }

  findNode(id: string) : any {
    for (let i: number = 0; i < this.nodes.length; i++) {
      let node: Node = this.nodes[i];
      if (node.getId().localeCompare(id)) {
        return node;
      }
    }
    return null;
  }

  getHead(): Node {
    // TODO: michael implement this method
    return this.nodes[0];
  }

}

export class Node {
  private id: string = "";
  private title: string = "";
  private edges: Edge[];

  constructor() {
    this.edges = [];
  }

  getId() : string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getTitle() : string {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }
  getEdges() : Edge[]  {
    return this.edges;
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}

export class Edge {
  private target: Node;
  private answer: string;
  private score: number;

  constructor(target: Node, answer: string, score: number = 0) {
    this.target = target;
    this.answer = answer;
    this.score = score;
  }

  setTarget(node: Node) {
    this.target = node;
  }

  getTarget() : Node {
    return this.target;
  }

  setScore(score: number) {
    this.score = score;
  }

  getScore() : number {
    return this.score;
  }

  setAnswer(answer: string) {
    this.answer = answer;
  }

  getAnswer() : string{
    return this.answer;
  }
}
