/**
 * Vue viewmodel.
 */
export class Answer {
  private id: number;
  private answer: string;
  private targetId : string;

  constructor(id: number, answer: string, targetId: string) {
    this.id = id;
    this.answer = answer;
    this.targetId = targetId;
  }

  getId() : number {
    return this.id;
  }

  getAnswer() : string {
    return this.answer;
  }

  setAnswer(answer: string) {
    this.answer = answer;
  }

  getTargetId(): string {
    return this.targetId;
  }
}
