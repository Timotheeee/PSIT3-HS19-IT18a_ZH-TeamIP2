import {Answer} from './Answer';
import {AnswerType} from './Graph/Node';

export class Question {
  private id: string;
  private question: string;
  private possibleAnswers: Answer[];
  private answerType: AnswerType;
  private isFinalQuestion: boolean;

  constructor(id: string, question: string, answerType: AnswerType) {
    this.id = id;
    this.question = question;
    this.answerType = answerType;
    this.possibleAnswers = [];
    this.isFinalQuestion = false;
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

  public getAnswerType() : AnswerType {
    return this.answerType;
  }

  public setIsFinalQuestion(value: boolean) {
    this.isFinalQuestion = value;
  }

  public getIsFinalQuestion(): boolean {
    return this.isFinalQuestion;
  }
}
