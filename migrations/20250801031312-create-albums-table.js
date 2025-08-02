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
    CREATE TABLE IF NOT EXISTS albums (
      id VARCHAR(50) NOT NULL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      year INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

exports.down = function(db) {
  return db.runSql('DROP TABLE IF EXISTS albums;');
};

exports._meta = {
  version: 1
};
