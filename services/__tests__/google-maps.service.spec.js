const chai = require('chai');
const should = chai.should();
const GoogleMapsService = require('../google-maps.service');

require('dotenv').config();

const { GOOGLE_MAPS_API_KEY, GOOGLE_MAPS_API_PLACE_TYPE } = process.env;

describe('Google Maps Service', () => {
  const googleMapsService = new GoogleMapsService(GOOGLE_MAPS_API_KEY);

  it('should gets geocode by address without explode', async done => {
    const address = 'Stockholm City';
    const geocodeList = await googleMapsService.getGeocodeByAddress(address);
  });
});
