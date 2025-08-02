'use strict';

// eslint-disable-next-line no-unused-vars
var dbm;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options) {
  dbm = options.dbmigrate;
};

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS songs (
      id VARCHAR(50) NOT NULL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      genre VARCHAR(100) NOT NULL,
      performer VARCHAR(255) NOT NULL,
      duration INT,
      album_id VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL
    );
  `);
};

exports.down = function(db) {
  return db.runSql('DROP TABLE IF EXISTS songs;');
};

exports._meta = {
  version: 1
};
