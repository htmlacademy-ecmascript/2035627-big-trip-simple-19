import './view.css';

export default class View extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('beforeend', this.createHtml(...arguments));
  }

  createHtml() {
    void arguments;

    return '';
  }

  shake() {
    this.classList.add('shake');

    this.addEventListener('animationend', () => {
      this.classList.remove('shake');
    }, {
      once: true
    });
  }

  static get localName() {
    return this.name.replace(/(?!^)[A-Z]/g, '-$&').toLowerCase();
  }

  static toString() {
    return this.localName;
  }
}
