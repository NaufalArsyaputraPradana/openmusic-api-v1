/**
 * Handler class untuk mengelola request albums
 */
class AlbumsHandler {
  /**
   * @param {Object} service - Instance AlbumsService
   * @param {Object} validator - Instance AlbumValidator
   */
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    // Bind methods untuk mempertahankan context
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  /**
   * Handler untuk POST /albums
   * @param {Object} request - Hapi request object
   * @param {Object} h - Hapi response toolkit
   * @returns {Object} Response object
   */
  async postAlbumHandler(request, h) {
    this._validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;
    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  /**
   * Handler untuk GET /albums/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    const songs = await this._service.getSongsByAlbumId(id);

    return {
      status: 'success',
      data: {
        album: {
          ...album,
          songs,
        },
      },
    };
  }

  /**
   * Handler untuk PUT /albums/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async putAlbumByIdHandler(request) {
    this._validator.validateAlbumPayload(request.payload);
    const { id } = request.params;
    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  /**
   * Handler untuk DELETE /albums/{id}
   * @param {Object} request - Hapi request object
   * @returns {Object} Response object
   */
  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };
  }
}

module.exports = AlbumsHandler;
