import {Edge} from './Edge';

/**
 * Represents the attribute answerType of Node.
 */
export enum AnswerType {
  InputAnswer = 0,
  RegularAnswer = 1,
  ResultAnswer
}

/**
 * Represents a vertice (node) in the graph data structure.
 * Can be parsed from JSON.
 */
export class Node {
  private _id: string = "";
  private _text: string = "";
  private _answerType: AnswerType = AnswerType.RegularAnswer;
  private _isHead: boolean = false;
  private _isFinalNode: boolean = false;
  private _edges: Edge[];

  constructor(id: string, text: string, answerType: AnswerType = AnswerType.RegularAnswer,
    isHead: boolean = false, isFinalNode: boolean = false) {
    this._id = id;
    this._text = text;
    this._answerType = answerType;
    this._isHead = isHead;
    this._isFinalNode = isFinalNode;

    this._edges = [];
  }

  set id(id: string) { this._id = id }
  get id(): string { return this._id }

  set text(text: string ) { this._text = text }
  get text(): string { return this._text }

  set answerType(answerType: AnswerType) { this._answerType }
  get answerType(): AnswerType { return this._answerType }

  set isHead(isHead: boolean) { this._isHead = isHead }
  get isHead(): boolean { return this._isHead }

  set isFinalNode(isFinalNode: boolean) { this._isFinalNode = isFinalNode }
  get isFinalNode(): boolean { return this._isFinalNode }

  set edges(edges: Edge[]) { this._edges = edges }
  get edges(): Edge[] { return this._edges }

  /**
   * Add (reachable) edge.
   * @param edge
   */
  addEdge(edge: Edge) {
    this._edges.push(edge);
  }
}

/**
 * Necessary for JSON parsing.
 */
export interface NodeJSON {
  id: string;
  metadata: {
    title: string,
    answerType: string,
    isHead: boolean,
    isFinalNode: boolean
  }
}
