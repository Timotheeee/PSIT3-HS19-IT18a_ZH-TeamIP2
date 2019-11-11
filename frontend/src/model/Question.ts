import {Answer} from './Answer';

export class Question {
  private id: string;
  private question: string;
  private possibleAnswers: Answer[];
  private answerType: string;

  constructor(id: string, question: string, answerType: string) {
    this.id = id;
    this.question = question;
    this.answerType = answerType;
    this.possibleAnswers = [];
  }

  public addPossibleAnswer(answer: Answer) {
    this.possibleAnswers.push(answer);
  }

  public getId() : string {
    return this.id;
  }

  public getQuestion() : string {
    return this.question;
  }

  public getPossibleAnswers() : Answer[] {
    return this.possibleAnswers;
  }

  public getAnswerType() : string {
    return this.answerType;
  }
}
