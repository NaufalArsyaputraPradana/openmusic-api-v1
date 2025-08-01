/**
 * Handler class untuk mengelola request songs
 */
class SongsHandler {
  /**
   * @param {Object} service - Instance SongsService
   * @param {Object} validator - Instance SongValidator
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Bind methods untuk mempertahankan context
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  /**
   * Handler untuk POST /songs
   * @param {Object} request - Hapi request object
   * @param {Object} h - Hapi response toolkit
   * @returns {Object} Response object
   */
  async postSongHandler(request, h) {
    this._validator.validateSongPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } = request.payload;
    
    const songId = await this._service.addSong({
      title, year, genre, performer, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handler untuk GET /songs
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async getSongsHandler(request) {
    const { title, performer } = request.query;
    const songs = await this._service.getSongs({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  /**
   * Handler untuk GET /songs/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async getSongByIdHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  /**
   * Handler untuk PUT /songs/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async putSongByIdHandler(request) {
    this._validator.validateSongPayload(request.payload);
    const { id } = request.params;
    const { title, year, genre, performer, duration, albumId } = request.payload;
    
    await this._service.editSongById(id, {
      title, year, genre, performer, duration, albumId,
    });

    return {
      status: 'success',
      message: 'Lagu berhasil diperbarui',
    };
  }

  /**
   * Handler untuk DELETE /songs/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async deleteSongByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
