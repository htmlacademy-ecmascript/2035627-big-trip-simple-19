import { pointIconMap, pointTitleMap } from '../maps';
import { formatDate, formatNumber, formatTime } from '../utils';
import Presenter from './presenter';

/**
* @extends {Presenter<ListView>}
*/
export default class ListPresenter extends Presenter {
  constructor() {
    super(...arguments);

    this.updateView();
  }

  updateView() {
    const points = this.pointsModel.list();
    const pointViewStates = points.map(this.createPointViewState, this);
    this.view.setItems(pointViewStates);
  }

  /**
   * @param {PointAdapter} point
   */
  createPointViewState(point) {
    const destination = this.destinationsModel.findById(point.destinationId);
    const offerGroup = this.offerGroupsModel.findById(point.type);
    const offerViewStates = offerGroup.items;

    const offerCurrent = [];
    for (const id of point.offerIds) {
      offerCurrent.push(offerViewStates.find(o => o.id === id));
    }

    console.log(point, destination);
    return {
      date: formatDate(point.startDate),
      icon: pointIconMap[point.type],
      title: `${pointTitleMap[point.type]} ${destination.name}`,
      startTime: formatTime(point.startDate),
      endTime: formatTime(point.endDate),
      endDate: formatDate(point.endDate),
      basePrice: formatNumber(point.basePrice),
      offers: offerCurrent
    };
  }
}
