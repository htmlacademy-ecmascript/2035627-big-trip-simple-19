import TripPointView from './view/trip-point-view.js';
import EditPointView from './view/edit-point-view.js';
import TripEventsContainerView from './view/trip-events-container.js';
import AddNewPointView from './view/add-new-point-view.js';
import { render } from './render.js';

export default class TripPresenter {
  pageComponent = new TripEventsContainerView();

  constructor({ pageContainer }) {
    this.pageContainer = pageContainer;
  }

  init() {
    render(this.pageComponent, this.pageContainer);
    render(new EditPointView(), this.pageComponent.getElement());
    render (new AddNewPointView(), this.pageComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.pageComponent.getElement());
    }
  }
}

