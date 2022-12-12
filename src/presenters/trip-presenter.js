import EditPointView from '../views/edit-point-view.js';
import TripEventsContainerView from '../views/trip-events-container.js';
import AddNewPointView from '../views/add-new-point-view.js';
import { render } from '../render.js';

export default class TripPresenter {
  pageComponent = new TripEventsContainerView();

  constructor({ pageContainer }) {
    this.pageContainer = pageContainer;
  }

  init() {
    render(this.pageComponent, this.pageContainer);
    render(new EditPointView(), this.pageComponent.getElement());
    render (new AddNewPointView(), this.pageComponent.getElement());
  }
}

