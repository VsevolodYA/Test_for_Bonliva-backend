const Middleware = require('./middleware');
const RestaurantModel = require('../database/models/restaurant.model');

/**
 * This class validates restaurant's endpoint list.
 */
class RestaurantMiddleware extends Middleware {
  /**
   * This method validates and update restaurant's endpoint.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async update(req, res, next) {
    const { params: { id }, body: { isVisible } } = req;
    const errors = {};

    const restaurantModel = await RestaurantModel.findById(id);

    if (!restaurantModel) {
      return res.status(404).send();
    }

    if (typeof isVisible !== 'boolean') {
      errors.isVisible = this.buildError(errors, 'isVisible', 'isVisible field must be boolean!');
    }

    if (this.isErrors(errors)) {
      return res.status(400).send(errors);
    }

    next();
  }

  /**
   * This method validates and destroy restaurant's endpoint.
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async destroy(req, res, next) {
    const { id } = req.params;

    if (await RestaurantModel.findById(id)) {
      return next();
    }

    return res.status(404).send();
  }
}

module.exports = RestaurantMiddleware;
