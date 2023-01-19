import View from './view';
import './ui-blocker-view.css';

export default class UiBlockerView extends View {
  constructor() {
    super();

    this.classList.add('ui-blocker');
  }

  /**
   * @param {boolean} flag
   */
  toggle(flag) {
    if (flag) {
      document.body.append(this);
      document.addEventListener('keydown', this.handleKeydown);
    }
    else {
      this.remove();
      document.removeEventListener('keydown', this.handleKeydown);
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleKeydown(event) {
    event.preventDefault();
  }
}

customElements.define(String(UiBlockerView), UiBlockerView);
