import {Node} from './Node';

export class Edge {
  private source: Node;
  private target: Node;
  private answer: string;
  private score: number;

  constructor(source: Node, target: Node, answer: string, score: number) {
    this.source = source;
    this.target = target;
    this.answer = answer;
    this.score = score;
  }

  setSource(node: Node) {
    this.source = node;
  }

  getSource() : Node {
    return this.source;
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

  getAnswer() : string {
    return this.answer;
  }
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
  public answer:string;
  public targetId:string;

  constructor(answer:string, targetId: string) {
    this.answer = answer;
    this.targetId = targetId;
  }
}
