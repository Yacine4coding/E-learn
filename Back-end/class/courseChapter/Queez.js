export default class Queez {
  // * properties
  #number = 0;
  #question = "";
  #choices = [];
  #correctAnwserNumber = 0;
  // * constructors
  constructor(number, question, choicese, correctAnwserNumber) {
    this.setNumber(number);
    this.setQuestion(question);
    this.setCorrectAnswerNumber(correctAnwserNumber);
    choicese.forEach((ele) => this.setChoice(ele));
  }
  // * getters and setters
  getNumeber = () => this.#number;
  getCorrectAnwserNumber = () => this.#correctAnwserNumber;
  getQuestion = () => this.#question;
  getChoices = () => {
    const res = [];
    this.#choices.forEach((ele) => {
      res.push(ele.generateChoice());
    });
    return res;
  };
  setNumber = (ele) => (this.#number = ele);
  setQuestion = (ele) => (this.#question = ele);
  setCorrectAnswerNumber = (ele) => (this.#correctAnwserNumber = ele);
  setChoice = ({ text, number }) => {
    const choice = new Choice(text, number);
    this.#choices.push(choice);
  };
  // * methodes
  generateQueez = () => {
    return {
      number: this.getNumeber(),
      question: this.getQuestion(),
      correctAnwserNumber: this.getChoices(),
      choicese: this.getChoices(),
    };
  };
}

class Choice {
  #text = "";
  #number = "";
  constructor(text, number) {
    this.setText(text);
    this.setNumber(number);
  }

  getText = () => this.#text;
  getNumber = () => this.#number;
  setText = (ele) => (this.#text = ele);
  setNumber = (ele) => (this.#number = ele);
  generateChoice = () => {
    return {
      text: this.getText,
      number: this.getNumber,
    };
  };
}
