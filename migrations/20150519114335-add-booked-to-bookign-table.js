var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql('ALTER TABLE `booking` ADD COLUMN `booked` boolean default 0', function(err) {
    if (err) {
      return callback(err);
    }
    return callback();
  });
};

exports.down = function(db, callback) {
  db.runSql('ALTER TABLE `booking` DROP COLUMN `booked`', function(err) {
    if (err) {
      return callback(err);
    }
    return callback();
  });
};
