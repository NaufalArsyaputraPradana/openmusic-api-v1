const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');

/**
 * Schema validasi untuk payload album
 */
const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
});

/**
 * Validator untuk validasi input album
 */
const AlbumValidator = {
  /**
   * Validasi payload album
   * @param {Object} payload - Data payload yang akan divalidasi
   * @param {string} payload.name - Nama album
   * @param {number} payload.year - Tahun rilis album
   * @throws {InvariantError} Jika validasi gagal
   */
  validateAlbumPayload: (payload) => {
    const validationResult = AlbumPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
