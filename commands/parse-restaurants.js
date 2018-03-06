const GoogleMaps = require('@google/maps');
const RestaurantService = require('../services/restaurant.service');
const GoogleMapsService = require('../services/google-maps.service');
const DB = require('../database');

require('dotenv').config();

const address = process.argv[2] || 'Stockholm City';

const {
  NODE_ENV,
  [`${NODE_ENV}_DB_NAME`]: database,
  [`${NODE_ENV}_DB_HOST`]: dbHost,
} = process.env;
const { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_PLACE_TYPE } = process.env;

const googleMapsService = new GoogleMapsService(GOOGLE_MAPS_API_KEY);

/**
 * @typedef {Object} LatLng
 * @property {string} lat
 * @property {string} lng
 */

/**
 * This method inserts the restaurant's list to the database
 *
 * @param {LatLng} location
 * @param {string} pagetoken
 *
 * @returns {void}
 */
const insertRestaurants = async (location, pagetoken = null) => {
  try {
    const { placeList, next_page_token } = await googleMapsService.getPlaceListByLocation(
      location,
      GOOGLE_MAPS_API_PLACE_TYPE,
      pagetoken,
    );

    await RestaurantService.createList(placeList);

    if (next_page_token) {
      await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
      return await insertRestaurants(location, next_page_token);
    }
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * This method gets and inserts restaurant's list to the database by address
 *
 * @returns {void}
 */
const parse = async () => {
  try {
    const geocodeList = await googleMapsService.getGeocodeByAddress(address);

    const [firstGeocode] = geocodeList;
    const { geometry: { location } } = firstGeocode;

    await DB.connect(`mongodb://${dbHost}/${database}`);

    return await insertRestaurants(location);
  } catch (e) {
    throw new Error(e);
  }
};

return parse()
  .then(() => {
    console.log('restaurant parse finished');
    process.exit(0);
  })
  .catch(error => {
    console.error(...error);
    process.exit(2);
  });
