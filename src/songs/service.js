const mysql = require('mysql2/promise');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { mapDBToModel } = require('../utils/mapDBToModel');

/**
 * Service class untuk mengelola data songs
 */
class SongsService {
  constructor() {
    this._pool = mysql.createPool({
      host: process.env.PGHOST || 'localhost',
      port: process.env.PGPORT || 3306,
      user: process.env.PGUSER || 'root',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'openmusic',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
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
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    try {
      const [result] = await this._pool.execute(query, [
        id, 
        title, 
        year, 
        genre, 
        performer, 
        duration || null, 
        albumId || null,
      ]);
      
      if (!result.affectedRows) {
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
      
      if (title) {
        conditions.push(' title LIKE ?');
        queryParams.push(`%${title}%`);
      }
      
      if (performer) {
        conditions.push(' performer LIKE ?');
        queryParams.push(`%${performer}%`);
      }
      
      query += conditions.join(' AND');
    }
    
    try {
      const [rows] = await this._pool.execute(query, queryParams);
      return rows;
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
    const query = 'SELECT * FROM songs WHERE id = ?';
    
    try {
      const [rows] = await this._pool.execute(query, [id]);
      
      if (!rows.length) {
        throw new NotFoundError('Lagu tidak ditemukan');
      }
      
      return mapDBToModel.song(rows[0]);
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
      SET title = ?, year = ?, genre = ?, performer = ?, duration = ?, album_id = ?
      WHERE id = ?
    `;
    
    try {
      const [result] = await this._pool.execute(query, [
        title, 
        year, 
        genre, 
        performer, 
        duration || null, 
        albumId || null, 
        id,
      ]);
      
      if (!result.affectedRows) {
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
    const query = 'DELETE FROM songs WHERE id = ?';
    
    try {
      const [result] = await this._pool.execute(query, [id]);
      
      if (!result.affectedRows) {
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
