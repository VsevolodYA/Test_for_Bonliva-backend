const mongoose = require('mongoose');

/**
 * @typedef {Object} Database
 * @property {function} connect
 * @property {DefaultOptions} defaultOptions
 */

/**
 * This class describes connecting to the database.
 */
class Database {
  /**
   * @returns {Database}
   */
  constructor() {}
  /**
   * @typedef {Object} DefaultOptions
   * @property {boolean} autoIndex
   * @property {number} reconnectTries
   * @property {number} reconnectInterval
   * @property {number} poolSize
   * @property {number} bufferMaxEntries
   */

  /**
   * This property returns default database's config.
   *
   * @returns {DefaultOptions}
   */
  get defaultOptions() {
    return {
      autoIndex: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0
    };
  }

  /**
   * This method connects to the database.
   *
   * @param {string} uri
   * @param {object} options
   */
  connect(uri, options = {}) {
    return (this.instance = mongoose.connect(uri, { ...options, ...this.defaultOptions }));
  }
}

module.exports = new Database();
