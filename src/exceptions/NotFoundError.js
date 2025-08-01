const ClientError = require('./ClientError');

/**
 * Error class untuk not found error (404 status code)
 * Digunakan ketika resource yang diminta tidak ditemukan
 */
class NotFoundError extends ClientError {
  /**
   * @param {string} message - Error message
   */
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
