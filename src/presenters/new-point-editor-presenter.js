import { PointType } from '../enums';
import { pointTitleMap } from '../maps';
import { formatNumber } from '../utils';
import Presenter from './presenter';

/**
 * @template {NewPointEditorView} View
 * @extends {Presenter<View>}
 */
export default class NewPointEditorPresenter extends Presenter {
  constructor() {
    super(...arguments);

    const pointTypeOptions =
      Object.entries(pointTitleMap).map(([value, title]) => ({title, value}));

    const destinationOptions =
     this.destinationsModel.listAll().map(({name}) => ({title: '', value: name}));


    this.view.pointTypeView.setOptions(pointTypeOptions);
    this.view.pointTypeView.addEventListener('change', this.handlePointTypeViewChange.bind(this));

    this.view.destinationView.setOptions(destinationOptions);
    this.view.destinationView.addEventListener('input', this.handleDestinationViewInput.bind(this));

    this.view.datesView.setConfig({
      dateFormat: 'd/m/y H:m',
      locale: {firstDayOfWeek: 1, 'time_24hr': true}
    });

    this.view.addEventListener('submit', this.handleViewSubmit.bind(this));
    this.view.addEventListener('reset', this.handleViewReset.bind(this));
    this.view.addEventListener('close', this.handleViewClose.bind(this));
  }

  /**
   * @param {PointAdapter} point
   */
  updateView(point) {
    const destination = this.destinationsModel.findById(point.destinationId);

    this.view.pointTypeView.setValue(point.type);
    this.view.destinationView.setLabel(pointTitleMap[point.type]);
    this.view.destinationView.setValue(destination.name);
    this.view.datesView.setValues([point.startDate, point.endDate]);
    this.view.basePriceView.setValue(point.basePrice);

    this.updateOffersView(point.offerIds);
    this.updateDestinationDetailsView(destination);
  }

  /**
   * @param {string[]} offerIds
   */
  updateOffersView(offerIds = []) {
    const pointType = this.view.pointTypeView.getValue();
    const offerGroup = this.offerGroupsModel.findById(pointType);

    const options = offerGroup.items.map((offer) => ({
      ...offer,
      price: formatNumber(offer.price),
      checked: offerIds.includes(offer.id)
    }));

    this.view.offersView.setOptions(options);
    this.view.offersView.hidden = !options.length;
  }

  /**
   * @param {DestinationAdapter} [destination]
   */
  updateDestinationDetailsView(destination) {
    this.view.destinationDetailsView.hidden = !destination;

    if (destination) {
      this.view.destinationDetailsView.setContent(destination);
    }
  }

  /**
   * @param {PointAdapter} point
   */
  async save(point) {
    await this.pointsModel.add(point);
  }

  /**
   * @override
   */
  handleNavigation() {
    if (this.location.pathname === '/new') {
      const point = this.pointsModel.item();

      point.type = PointType.FLIGHT;
      point.destinationId = this.destinationsModel.item(2).id;
      point.startDate = new Date().toJSON();
      point.endDate = point.startDate;
      point.basePrice = 100;
      point.offerIds = ['2', '3'];

      this.view.open();
      this.updateView(point);
    }
    else {
      this.view.close(false);
    }
  }

  /**
   * @param {SubmitEvent} event
   */
  async handleViewSubmit(event) {
    event.preventDefault();

    this.view.awaitSave(true);

    try {
      const point = this.pointsModel.item();

      const [startDate, endDate] = this.view.datesView.getValues();
      const destinationName = this.view.destinationView.getValue();
      const destination = this.destinationsModel.findBy('name', destinationName);

      point.type = this.view.pointTypeView.getValue();
      point.basePrice = this.view.basePriceView.getValue();
      point.startDate = startDate;
      point.endDate = endDate;
      point.offerIds = this.view.offersView.getValues();
      point.destinationId = destination?.id;

      await this.save(point);
      this.view.close();
    }

    catch (exception) {
      this.view.shake();

      if (exception.cause?.error) {
        const [{fieldName}] = exception.cause.error;

        this.view.findByName(fieldName)?.focus();
      }
    }

    this.view.awaitSave(false);
  }

  /**
   * @param {Event} event
   */
  handleViewReset(event) {
    event.preventDefault();
    this.view.close();
  }

  handleViewClose() {
    this.navigate('/');
  }

  handlePointTypeViewChange() {
    const pointType = this.view.pointTypeView.getValue();

    this.view.destinationView.setLabel(pointTitleMap[pointType]);
    this.updateOffersView();
  }

  handleDestinationViewInput() {
    const destinationName = this.view.destinationView.getValue();
    const destination = this.destinationsModel.findBy('name', destinationName);

    this.updateDestinationDetailsView(destination);
  }
}
