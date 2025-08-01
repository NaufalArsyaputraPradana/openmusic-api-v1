const mysql = require('mysql2/promise');
const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { mapDBToModel } = require('../utils/mapDBToModel');

/**
 * Service class untuk mengelola data albums
 */
class AlbumsService {
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
   * Menambahkan album baru
   * @param {Object} albumData - Data album
   * @param {string} albumData.name - Nama album
   * @param {number} albumData.year - Tahun rilis album
   * @returns {Promise<string>} ID album yang dibuat
   */
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = 'INSERT INTO albums (id, name, year) VALUES (?, ?, ?)';
    
    try {
      const [result] = await this._pool.execute(query, [id, name, year]);
      
      if (!result.affectedRows) {
        throw new InvariantError('Album gagal ditambahkan');
      }
      
      return id;
    } catch (error) {
      if (error instanceof InvariantError) {
        throw error;
      }
      throw new InvariantError('Album gagal ditambahkan');
    }
  }

  /**
   * Mendapatkan album berdasarkan ID
   * @param {string} id - ID album
   * @returns {Promise<Object>} Data album
   */
  async getAlbumById(id) {
    const query = 'SELECT * FROM albums WHERE id = ?';
    
    try {
      const [rows] = await this._pool.execute(query, [id]);
      
      if (!rows.length) {
        throw new NotFoundError('Album tidak ditemukan');
      }
      
      return mapDBToModel.album(rows[0]);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Gagal mendapatkan album');
    }
  }

  /**
   * Mendapatkan lagu-lagu berdasarkan album ID
   * @param {string} albumId - ID album
   * @returns {Promise<Array>} Array lagu-lagu dalam album
   */
  async getSongsByAlbumId(albumId) {
    const query = 'SELECT id, title, performer FROM songs WHERE album_id = ?';
    
    try {
      const [rows] = await this._pool.execute(query, [albumId]);
      return rows;
    } catch {
      throw new InvariantError('Gagal mendapatkan lagu-lagu album');
    }
  }

  /**
   * Mengupdate album berdasarkan ID
   * @param {string} id - ID album
   * @param {Object} albumData - Data album yang akan diupdate
   * @param {string} albumData.name - Nama album
   * @param {number} albumData.year - Tahun rilis album
   */
  async editAlbumById(id, { name, year }) {
    const query = 'UPDATE albums SET name = ?, year = ? WHERE id = ?';
    
    try {
      const [result] = await this._pool.execute(query, [name, year, id]);
      
      if (!result.affectedRows) {
        throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Gagal memperbarui album');
    }
  }

  /**
   * Menghapus album berdasarkan ID
   * @param {string} id - ID album
   */
  async deleteAlbumById(id) {
    const query = 'DELETE FROM albums WHERE id = ?';
    
    try {
      const [result] = await this._pool.execute(query, [id]);
      
      if (!result.affectedRows) {
        throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      throw new InvariantError('Album gagal dihapus');
    }
  }
}

module.exports = AlbumsService;
