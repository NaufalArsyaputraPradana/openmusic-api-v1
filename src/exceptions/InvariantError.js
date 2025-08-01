const ClientError = require('./ClientError');

/**
 * Error class untuk invariant error (400 status code)
 * Digunakan untuk error validasi dan business logic
 */
class InvariantError extends ClientError {
  /**
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

module.exports = InvariantError;
