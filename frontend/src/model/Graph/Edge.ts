import {Node} from './Node';

export class Edge {
  private readonly _id: string;
  private readonly _sourceId: string;
  private readonly _targetId: string;
  private readonly _answer: string;
  private readonly _weight: number;

  constructor(id: string, sourceId: string, targetId: string, answer: string='', weight: number=0) {
    this._id = id;
    this._sourceId = sourceId;
    this._targetId = targetId;
    this._answer = answer;
    this._weight = weight;
  }

  get id(): string { return this._id }

  //set source(node: Node) { this._source = node }
  get sourceId() : string { return this._sourceId }

  //set target(node: Node) { this._target = node }
  get targetId(): string { return this._targetId }

  //set weight(n: number) { this._weight = n }
  get weight(): number { return this._weight }

  //set answer(answer: string) { this._answer = answer }
  get answer() : string { return this._answer }
}

export interface EdgeJSON {
  id: string;
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

  constructor(edgeId: string, answer:string) {
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
