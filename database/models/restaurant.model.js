const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * RestaurantModel describes 'restaurants''s collection
 */
const RestaurantModel = mongoose.model(
  'restaurants',
  new Schema({
    formatted_address: String,
    geometry: [{ location: { lat: Number, lng: Number } }],
    icon: String,
    id: String,
    name: String,
    photos: [{ height: Number, html_attributions: [], photo_reference: String, width: Number }],
    place_id: String,
    rating: Number,
    reference: String,
    types: [String],
    isVisible: { type: Boolean, default: true },
  }),
);

module.exports = RestaurantModel;
