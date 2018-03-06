const router = require('express').Router();
const restaurantRoutes = require('./restaurant.routes');

/**
 * Registering of the api routes.
 */
router.use('/restaurants', restaurantRoutes);

module.exports = router;
