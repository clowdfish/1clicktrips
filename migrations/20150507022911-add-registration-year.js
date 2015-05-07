var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql('ALTER TABLE `profile` ADD COLUMN `registration_date` DATETIME  DEFAULT CURRENT_TIMESTAMP', callback);
};

exports.down = function(db, callback) {
  db.runSql('ALTER TABLE `profile` DROP COLUMN `registration_date`', callback);
};
