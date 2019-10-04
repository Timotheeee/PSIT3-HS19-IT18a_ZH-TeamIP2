export class Answer {
  private id: number;
  private answer: string;

  constructor(id: number, answer: string) {
    this.id = id;
    this.answer = answer;
  }

  getId() : number {
    return this.id;
  }

  getAnswer() : String {
    return this.answer;
  }
}
