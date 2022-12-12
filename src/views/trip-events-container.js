import { createElement } from '../render.js';

function createTripEventsContainerTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class TripEventsContainerView {
  getTemplate() {
    return createTripEventsContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
