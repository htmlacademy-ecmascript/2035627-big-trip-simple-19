import TripPresenter from './presenters/trip-presenter';
import './views/filter-view';
import './views/sort-view';
import './views/point-view';
import './views/list-view';
import './views/new-point-editor-view';

const siteMainElement = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter({pageContainer: siteMainElement});


tripPresenter.init();
