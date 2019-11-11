import {AnswerStub} from './AnswerStub';
import answerStub from './AnswerStub';


export class QuestionStub {

  private answerType: string;

  constructor(answerType: string) {
    this.answerType = answerType;
  }

  public getId() : number {
    return 1;
  }

  public getQuestion() : string {
    return "this is my question";
  }

  public getAnswerType() : string {
    return this.answerType;
  }

  public getPossibleAnswers() : AnswerStub[] {
    return [answerStub];
  }

  public isLastQuestion() : boolean {
    return false;
  }
}

let questionStub = new QuestionStub("choice");
export default questionStub;

