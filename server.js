const express = require('express');
const bodyParser = require('body-parser');
const DB = require('./database');
const routes = require('./routes');

require('dotenv').config();

const {
  NODE_ENV,
  [`${NODE_ENV}_DB_NAME`]: database,
  [`${NODE_ENV}_DB_HOST`]: dbHost,
} = process.env;

/**
 * This class describes server with express framework.
 */
class Server {
  constructor() {
    this.db = DB;
    this.db.connect(`mongodb://${dbHost}/${database}`);
    this.express = express();
  }

  /**
   *  This method uses for registering routes in the express application.
   */
  useRoutes() {
    this.express.use('/api', routes);
  }

  /**
   * This method runs server.
   */
  run() {
    const { PORT: port } = process.env;

    this.express.use(bodyParser.json());
    this.useRoutes();
    this.express.listen(port, () => console.log(`Server listening on port ${port}!`));
  }
}

/**
 * If this module is not main runs the server.
 */
if (!module.parent) {
  return new Server().run();
}

module.exports = Server;
