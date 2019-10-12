import {Node} from './Node.ts';

export class Edge {
    private source: Node;
    private target: Node;
    private answer: string;
    private score: string;

    constructor(source: Node, target: Node, answer: string, score: string) {
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

    setScore(score: string) {
      this.score = score;
    }

    getScore() : string {
      return this.score;
    }

    setAnswer(answer: string) {
      this.answer = answer;
    }

    getAnswer() : string {
      return this.answer;
    }
}
