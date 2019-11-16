import {Edge} from './Edge';

export class Node {
  private id: string = "";
  private title: string = "";
  private answerType: string = "";
  private isHead: boolean = false;
  private isFinalNode: boolean = false;
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

  getAnswerType() : string {
    return this.answerType;
  }

  setAnswerType(answerType: string) {
    this.answerType = answerType;
  }

  getIsHead() : boolean {
    return this.isHead;
  }

  setIsHead(isHead: boolean) {
    this.isHead = isHead;
  }

  getIsFinalNode() : boolean {
    return this.isFinalNode;
  }

  setIsFinalNode(isFinalNode: boolean) {
    this.isFinalNode = isFinalNode;
  }
  getEdges() : Edge[]  {
    return this.edges;
  }

  addEdge(edge: Edge) {
    this.edges.push(edge);
  }
}

export interface NodeJSON {
  id: string;
  metadata: {
    title: string,
    answerType: string,
    isHead: boolean,
    isFinalNode: boolean
  }
}
