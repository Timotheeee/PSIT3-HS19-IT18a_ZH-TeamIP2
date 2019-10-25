import {AnswerStub} from './AnswerStub';
import answerStub from './AnswerStub';


export class QuestionStub {

  constructor() {

  }

  public getId() : number {
    return 1;
  }

  public getQuestion() : string {
    return "this is my question";
  }

  public getPossibleAnswers() : AnswerStub[] {
    return [answerStub];
  }

  public isLastQuestion() : boolean {
    return false;
  }
}

let questionStub = new QuestionStub();
export default questionStub;

