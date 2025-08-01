/**
 * Base class untuk client error (4xx status codes)
 */
class ClientError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code (default: 400)
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
