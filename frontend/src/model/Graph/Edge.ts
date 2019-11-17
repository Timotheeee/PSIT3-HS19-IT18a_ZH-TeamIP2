import {Node} from './Node';

export class Edge {
  private readonly _id: string;
  private readonly _source: Node;
  private readonly _target: Node;
  private readonly _answer: string;
  private readonly _weight: number;

  constructor(id: string, source: Node, target: Node, answer: string, weight: number) {
    this._id = id;
    this._source = source;
    this._target = target;
    this._answer = answer;
    this._weight = weight;
  }

  get id(): string { return this._id }

  //set source(node: Node) { this._source = node }
  get source() : Node { return this._source }

  //set target(node: Node) { this._target = node }
  get target(): Node { return this._target }

  //set weight(n: number) { this._weight = n }
  get weight(): number { return this._weight }

  //set answer(answer: string) { this._answer = answer }
  get answer() : string { return this._answer }
}

export interface EdgeJSON {
  source: string;
  target: string;
  metadata: {
    answer: string;
    score: string;
  }
}

export class EdgeResult {
  private readonly _answer:string;
  private readonly _edgeId:string;

  constructor(answer:string, edgeId: string) {
    this._answer = answer;
    this._edgeId = edgeId;
  }

  get answer(): string {
    return this._answer;
  }

  get edgeId(): string {
    return this._edgeId;
  }
}
