export class AnswerStub {

  constructor() {
  }

  getId() : number {
    return 1;
  }

  getAnswer() : String {
    return 'this is my answer';
  }
}

let answerStub = new AnswerStub();
export default answerStub;

