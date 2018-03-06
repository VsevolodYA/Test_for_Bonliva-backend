const RestaurantModel = require('../database/models/restaurant.model');

/**
 * Service works with restaurants' collection
 */
class RestaurantService {
  /**
   * This method creates the restaurant
   *
   * @param {object} data
   * @returns {Promise<RestaurantModel>}
   */
  static async create(data) {
    return await RestaurantModel.create(data);
  }

  /**
   * This method gets or creates the restaurant
   * @param {object} data
   */
  static async findOneOrCreate(data) {
    const restaurantModel = await RestaurantModel.findOne(data);

    if (restaurantModel) {
      return restaurantModel;
    }

    return await RestaurantService.create(data);
  }

  /**
   * This method creates a restaurant's list
   *
   * @param {Array} list
   * @returns {Promise<Array<RestaurantModel>>}
   */
  static async createList(list) {
    return await list.map(async item => await RestaurantService.findOneOrCreate(item));
  }

  /**
   * This method inserts the restaurant's list
   *
   * @param {Array} list
   * @returns {Promise<Array<RestaurantModel>>}
   */
  static async insert(list) {
    return await RestaurantModel.insertMany(list);
  }

  /**
   * This method gets restaurant's list
   *
   * @returns {Promise<Array<RestaurantModel>>}
   */
  static async all() {
    return await RestaurantModel.find({});
  }

  static async update(id, data) {
    return await RestaurantModel.findOneAndUpdate(id, data);
  }

  /**
   * This method deletes restaurant by id
   *
   * @param {string} id
   * @returns {Promise<RestaurantModel>}
   */
  static async destroy(id) {
    return await RestaurantModel.findByIdAndRemove(id);
  }
}

module.exports = RestaurantService;
