const Joi = require('joi');
const InvariantError = require('../exceptions/InvariantError');

/**
 * Schema validasi untuk payload song
 */
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().integer().min(0).optional(),
  albumId: Joi.string().optional(),
});

/**
 * Validator untuk validasi input song
 */
const SongValidator = {
  /**
   * Validasi payload song
   * @param {Object} payload - Data payload yang akan divalidasi
   * @param {string} payload.title - Judul lagu
   * @param {number} payload.year - Tahun rilis lagu
   * @param {string} payload.genre - Genre lagu
   * @param {string} payload.performer - Nama performer
   * @param {number} [payload.duration] - Durasi lagu dalam detik
   * @param {string} [payload.albumId] - ID album tempat lagu berada
   * @throws {InvariantError} Jika validasi gagal
   */
  validateSongPayload: (payload) => {
    const validationResult = SongPayloadSchema.validate(payload);
    
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongValidator;
