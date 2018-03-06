const GoogleMaps = require('@google/maps');

/**
 * @typedef {Object} GoogleMapsService
 * @property {function} getGeocodeByAddress
 * @property {function} getPlaceListByLocation
 * @property {GoogleMapsClient} googleMapsClient
 */

/**
 * Class helper for searching the place and geocode
 */
class GoogleMapsService {
  /**
   * @param {string} key
   * @returns {GoogleMapsService}
   */
  constructor(key) {
    this.googleMapsClient = GoogleMaps.createClient({ key, Promise });
  }

  /**
   * @typedef {Object} Geocode
   * @property {array} address_components
   * @property {string} formatted_address
   * @property {array} geometry
   * @property {string} place_id
   * @property {array} types
   */

  /**
   * This method gets geocode's list by address.
   *
   * @param {string} address
   * @returns {Promise<Array<Geocode>>}
   */
  async getGeocodeByAddress(address) {
    try {
      const { json: { results } } = await this.googleMapsClient.geocode({ address }).asPromise();

      return results;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   * @typedef {Object} LatLng
   * @property {string} lat
   * @property {string} lng
   */

  /**
   * @typedef {Object} PlaceItem
   * @property {string} formatted_address
   * @property {Array<Object>} geometry
   * @property {string} icon
   * @property {string} id
   * @property {string} name
   * @property {Array<Object>} opening_hours
   * @property {Array<Object>} photos
   * @property {string} place_id
   * @property {number} rating
   * @property {string} reference
   * @property {Array<string>} types
   */

  /**
   * @typedef {Object} Place
   * @property {Array<PlaceItem>} placeList
   * @property {string} next_page_token
   */

  /**
   * This method gets place's list by location and type
   *
   * @param {LatLng} location
   * @param {string} type
   * @param {string} pagetoken
   *
   * @returns {Promise<Place>}
   */
  async getPlaceListByLocation(location, type, pagetoken = null) {
    try {
      const { json: { results: placeList, next_page_token } } = await this.googleMapsClient
        .places({ location, pagetoken, type })
        .asPromise();

      return { placeList, next_page_token };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = GoogleMapsService;
