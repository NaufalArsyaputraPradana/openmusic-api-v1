const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { mapDBToModel } = require('../utils/mapDBToModel');

/**
 * Service class untuk mengelola data songs
 */
class SongsService {
  constructor() {
    this._pool = new Pool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 5432,
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'openmusic',
    });
  }

  /**
   * Menambahkan lagu baru
   * @param {Object} songData - Data lagu
   * @param {string} songData.title - Judul lagu
   * @param {number} songData.year - Tahun rilis lagu
   * @param {string} songData.genre - Genre lagu
   * @param {string} songData.performer - Nama performer
   * @param {number} [songData.duration] - Durasi lagu dalam detik
   * @param {string} [songData.albumId] - ID album tempat lagu berada
   * @returns {Promise<string>} ID lagu yang dibuat
   */
  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const query = `
      INSERT INTO songs (id, title, year, genre, performer, duration, album_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    
    try {
      const result = await this._pool.query(query, [
        id, 
        title, 
        year, 
        genre, 
        performer, 
        duration || null, 
        albumId || null,
      ]);
      
      if (!result.rowCount) {
        throw new InvariantError('Lagu gagal ditambahkan');
      }
      
      return id;
    } catch (error) {
      if (error instanceof InvariantError) {
        throw error;
      }
      throw new InvariantError('Lagu gagal ditambahkan');
    }
  }

  /**
   * Mendapatkan semua lagu dengan filter opsional
   * @param {Object} filters - Filter pencarian
   * @param {string} [filters.title] - Filter berdasarkan judul lagu
   * @param {string} [filters.performer] - Filter berdasarkan performer
   * @returns {Promise<Array>} Array lagu-lagu
   */
  async getSongs({ title, performer }) {
    let query = 'SELECT id, title, performer FROM songs';
    const queryParams = [];
    
    if (title || performer) {
      query += ' WHERE';
      const conditions = [];
      let paramIndex = 1;
      
      if (title) {
        conditions.push(` title ILIKE $${paramIndex}`);
        queryParams.push(`%${title}%`);
        paramIndex++;
      }
      
      if (performer) {
        conditions.push(` performer ILIKE $${paramIndex}`);
        queryParams.push(`%${performer}%`);
      }
      
      query += conditions.join(' AND');
    }
    
    try {
      const result = await this._pool.query(query, queryParams);
      return result.rows;
    } catch {
      throw new InvariantError('Gagal mendapatkan lagu');
    }
  }

  /**
   * Mendapatkan lagu berdasarkan ID
   * @param {string} id - ID lagu
   * @returns {Promise<Object>} Data lagu
   */
  async getSongById(id) {
    const query = 'SELECT * FROM songs WHERE id = $1';
    
    try {
      const result = await this._pool.query(query, [id]);
      
      if (!result.rows.length) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }
      
      return mapDBToModel.song(result.rows[0]);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Gagal mendapatkan lagu');
    }
  }

  /**
   * Mengupdate lagu berdasarkan ID
   * @param {string} id - ID lagu
   * @param {Object} songData - Data lagu yang akan diupdate
   * @param {string} songData.title - Judul lagu
   * @param {number} songData.year - Tahun rilis lagu
   * @param {string} songData.genre - Genre lagu
   * @param {string} songData.performer - Nama performer
   * @param {number} [songData.duration] - Durasi lagu dalam detik
   * @param {string} [songData.albumId] - ID album tempat lagu berada
   */
  async editSongById(id, { title, year, genre, performer, duration, albumId }) {
    const query = `
      UPDATE songs 
      SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6
      WHERE id = $7
    `;
    
    try {
      const result = await this._pool.query(query, [
        title, 
        year, 
        genre, 
        performer, 
        duration || null, 
        albumId || null, 
        id,
      ]);
      
      if (!result.rowCount) {
        throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Gagal memperbarui lagu');
    }
  }

  /**
   * Menghapus lagu berdasarkan ID
   * @param {string} id - ID lagu
   */
  async deleteSongById(id) {
    const query = 'DELETE FROM songs WHERE id = $1';
    
    try {
      const result = await this._pool.query(query, [id]);
      
      if (!result.rowCount) {
        throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Lagu gagal dihapus');
    }
  }
}

module.exports = SongsService;
