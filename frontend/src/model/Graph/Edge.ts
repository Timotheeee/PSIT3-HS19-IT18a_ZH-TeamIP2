/**
 * Represents a connection between two vertices (nodes) in a graph.
 * Can be parsed from JSON.
 */
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

  get sourceId() : string { return this._sourceId }

  get targetId(): string { return this._targetId }

  get weight(): number { return this._weight }

  get answer() : string { return this._answer }
}

/**
 * Necessary for JSON parsing.
 */
export interface EdgeJSON {
  edgeId: string;
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
