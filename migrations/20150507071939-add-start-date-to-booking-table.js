var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql('ALTER TABLE `booking` ADD COLUMN `start_date` DATETIME  DEFAULT CURRENT_TIMESTAMP', callback);
};

exports.down = function(db, callback) {
  db.runSql('ALTER TABLE `booking` DROP COLUMN `start_date`', callback);
};
