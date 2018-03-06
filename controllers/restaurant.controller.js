const RestaurantService = require('../services/restaurant.service');

/**
 * This class describes restaurant's endpoint list.
 */
class RestaurantController {
  /**
   * This method returns restaurant's list.
   *
   * @param {object} req
   * @param {object} res
   */
  static async all(req, res) {
    return res.send(await RestaurantService.all());
  }

  /**
   * This method updates restaurant by the request data and id.
   *
   * @param {*} req
   * @param {*} res
   */
  static async update(req, res) {
    const { params: { id }, body } = req;

    return res.send(await RestaurantService.update(id, body));
  }

  /**
   * This method removes restaurant by id.
   *
   * @param {object} req
   * @param {object} res
   */
  static async destroy(req, res) {
    const { id } = req.params;

    return res.send(await RestaurantService.destroy(id));
  }
}

module.exports = RestaurantController;
