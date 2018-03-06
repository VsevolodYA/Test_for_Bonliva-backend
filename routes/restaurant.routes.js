const restaurantRouter = require('express').Router();
const RestaurantController = require('../controllers/restaurant.controller');
const RestaurantMiddleware = require('../middlewares/restaurant.middlewares');

/**
 * Restaurant's endpoint middleware list.
 */

restaurantRouter.delete('/:id', (req, res, next) => RestaurantMiddleware.destroy(req, res, next));
restaurantRouter.post('/:id', (req, res, next) => RestaurantMiddleware.update(req, res, next));

/**
 * Restaurant's endpoint list.
 */
restaurantRouter.get('/', (req, res) => RestaurantController.all(req, res));
restaurantRouter
  .route('/:id')
  .post((req, res) => RestaurantController.update(req, res))
  .delete((req, res) => RestaurantController.destroy(req, res));

module.exports = restaurantRouter;
