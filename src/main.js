import FiltersView from './view/filters-view.js';
import SortingView from './view/sorting-view.js';
import TripPresenter from './trip-presenter.js';
import { render } from './render.js';

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({pageContainer: siteMainElement});

render(new FiltersView(), siteHeaderElement);
render(new SortingView(), siteMainElement);


tripPresenter.init();
