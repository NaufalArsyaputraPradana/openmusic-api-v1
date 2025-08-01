/* istanbul ignore file */

/**
 * Utility untuk mapping data dari database ke model yang digunakan client
 */
const mapDBToModel = {
  /**
   * Mapping data album dari database ke model client
   * @param {Object} dbAlbum - Data album dari database
   * @param {string} dbAlbum.id - ID album
   * @param {string} dbAlbum.name - Nama album
   * @param {number} dbAlbum.year - Tahun rilis album
   * @param {Date} dbAlbum.created_at - Timestamp pembuatan
   * @param {Date} dbAlbum.updated_at - Timestamp update terakhir
   * @returns {Object} Album model untuk client
   */
  album: ({
    id,
    name,
    year,
    created_at,
    updated_at,
  }) => ({
    id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
  }),

  /**
   * Mapping data song dari database ke model client
   * @param {Object} dbSong - Data song dari database
   * @param {string} dbSong.id - ID lagu
   * @param {string} dbSong.title - Judul lagu
   * @param {number} dbSong.year - Tahun rilis lagu
   * @param {string} dbSong.genre - Genre lagu
   * @param {string} dbSong.performer - Nama performer
   * @param {number} dbSong.duration - Durasi lagu dalam detik
   * @param {string} dbSong.album_id - ID album tempat lagu berada
   * @param {Date} dbSong.created_at - Timestamp pembuatan
   * @param {Date} dbSong.updated_at - Timestamp update terakhir
   * @returns {Object} Song model untuk client
   */
  /**
   * Mapping data song dari database ke model client
   * @param {Object} dbSong - Data song dari database
   * @param {string} dbSong.id - ID song
   * @param {string} dbSong.title - Judul song
   * @param {number} dbSong.year - Tahun rilis song
   * @param {string} dbSong.genre - Genre song
   * @param {string} dbSong.performer - Nama performer
   * @param {number} dbSong.duration - Durasi song dalam detik
   * @param {string} dbSong.album_id - ID album terkait
   * @param {Date} dbSong.created_at - Timestamp pembuatan
   * @param {Date} dbSong.updated_at - Timestamp update terakhir
   * @returns {Object} Song model untuk client
   */
  song: ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
    created_at,
    updated_at,
  }) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId: album_id,
    createdAt: created_at,
    updatedAt: updated_at,
  }),
};

module.exports = { mapDBToModel };
