import {Answer} from './Answer';

export class Question {
  private id: string;
  private question: string;
  private possibleAnswers: Answer[];
  private answerType: string;
  private lastQuestion: boolean;

  constructor(id: string, question: string, answerType: string, lastQuestion: boolean) {
    this.id = id;
    this.question = question;
    this.possibleAnswers = [];
    this.answerType = answerType;
    this.lastQuestion = lastQuestion;
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

  public isLastQuestion() : boolean {
    return this.lastQuestion;
  }
}
