import {Answer} from './Answer';

export class Question {
  private id: number;
  private question: string;
  private possibleAnswers: Answer[];
  private lastQuestion: boolean;

  constructor(id: number, question: string, lastQuestion: boolean) {
    this.id = id;
    this.question = question;
    this.possibleAnswers = [];
    this.lastQuestion = lastQuestion;
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

  public isLastQuestion() : boolean {
    return this.lastQuestion;
  }
}
