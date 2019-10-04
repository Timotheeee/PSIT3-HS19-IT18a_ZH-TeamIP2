class Question {
  id: number;
  question: string;
  possibleAnswers: Answer[];

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
    this.possibleAnswers = [];
  }
}
