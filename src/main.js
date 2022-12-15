import './views/filter-view';
import './views/sort-view';
import './views/point-view';
import './views/list-view';
import './views/new-point-editor-view';
import Store from './store';
import './adapters/point-adapter'

const BASE = 'https://19.ecmascript.pages.academy/big-trip-simple/';
const AUTH = 'Basic 7qwerty890';

/**
 * @type {Store<Point>}
 */
const pointsStore = new Store(`${BASE}/points`, AUTH);

/**
 * @type {Store<Destination>}
 */
const destinationsStore = new Store(`${BASE}/destinations`, AUTH);


pointsStore.list().then(async (items) => {
  const {log} = console;

  log('Points: List', items);
  const date = new Date().toJSON();
  const item = await pointsStore.add({
    'base_price': 100,
    'date_from': date,
    'date_to': date,
    'destination': 1,
    'offers': [],
    'type': 'bus'
  });

  log('Points: Add', item);

  item['base_price'] = 200;
  log('Points: Update', await pointsStore.update(item));

  log('Points: Delete', await pointsStore.delete(item.id));

  log('Destinations: List', await destinationsStore.list());
});
