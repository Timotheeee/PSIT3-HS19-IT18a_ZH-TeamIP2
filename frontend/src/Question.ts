import {Answer} from "./Answer"

export class Question {
  private id: number;
  private question: string;
  private possibleAnswers: Answer[];

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
    this.possibleAnswers = [];
  }

  public addPossibleAnswer(answer: Answer) {
    this.possibleAnswers.push(answer);
  }

  public getId() : number {
    return this.id;
  }

  public getQuestion() : string {
    return this.question;
  }

  public getPossibleAnswers() : Answer[] {
    return this.possibleAnswers;
  }
}
