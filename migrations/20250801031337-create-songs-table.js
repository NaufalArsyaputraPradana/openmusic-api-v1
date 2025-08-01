'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
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
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE SET NULL
    );
  `);
};

exports.down = function(db) {
  return db.runSql('DROP TABLE IF EXISTS songs;');
};

exports._meta = {
  "version": 1
};
