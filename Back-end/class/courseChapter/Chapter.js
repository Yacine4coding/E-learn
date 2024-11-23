import Queez from "./Queez";
export default class Chapter {
  // * properties
  #title = "";
  #description = "";
  #number = "";
  #link = "";
  #queezes = [];
  // * constructors
  constructor(title, description, link, queezes) {
    this.setTitle(title);
    this.setDescription(description);
    this.setLink(link);
    queezes.forEach(({ number, question, choices, correctAnwserNumber }) => {
      const queez = new Queez(number, question, choices, correctAnwserNumber);
      this.setQueezes(queez);
    });
  }
  // * getters / setters
  getQueezes = () => {
    const queez = [];
    this.#queezes.forEach((ele) => {
      queez.push(ele.generateQueez());
    });
    return queez;
  };
  getTitle = () => this.#title;
  getDescription = () => this.#description;
  getNumber = () => this.#number;
  getLink = () => this.#link;
  setTitle = (ele) => (this.#title = ele);
  setDescription = (ele) => (this.#description = ele);
  setNumber = (ele) => (this.#number = ele);
  setLink = (ele) => (this.#link = ele);
  setQueezes = (ele) => this.#queezes.push(ele);
  // * methodes
  generateChapter = () => {
    return {
      number: this.getNumber(),
      link: this.getLink(),
      description: this.getDescription(),
      title: this.getTitle(),
      queezes: this.getQueezes(),
    };
  };
  verifyChapter = () => {
    const isTitle = Boolean(this.getTitle);
    const isdescription = Boolean(this.getDescription);
    const isNumber = Boolean(this.getNumber);
  };
}
