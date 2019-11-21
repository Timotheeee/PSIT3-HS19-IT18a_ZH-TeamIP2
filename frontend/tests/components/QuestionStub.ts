import {AnswerStub} from './AnswerStub';
import answerStub from './AnswerStub';
import {AnswerType} from './../../src/model/Graph/Node';


export class QuestionStub {

  private answerType: number;

  constructor(answerType: number) {
    this.answerType = answerType;
  }

  public getId() : number {
    return 1;
  }

  public getQuestion() : string {
    return "this is my question";
  }

  public getAnswerType() : number {
    return this.answerType;
  }

  public getPossibleAnswers() : AnswerStub[] {
    return [answerStub];
  }

  public isLastQuestion() : boolean {
    return false;
  }
}

let questionStub = new QuestionStub(AnswerType.RegularAnswer);
export default questionStub;

