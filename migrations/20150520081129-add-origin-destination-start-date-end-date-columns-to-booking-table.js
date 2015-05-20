var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');
exports.up = function(db, callback) {
  var addColumnQuery = 'ALTER TABLE `booking` ADD COLUMN `origin` varchar(160) null; ' +
                       'ALTER TABLE `booking` ADD COLUMN `destination` varchar(160) null;' +
                       'ALTER TABLE `booking` ADD COLUMN `start_date` datetime null;' +
                       'ALTER TABLE `booking` ADD COLUMN `end_date` datetime null;'
  db.runSql(addColumnQuery, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  var dropColumnQuery = 'ALTER TABLE `booking` DROP COLUMN `origin`; ' +
                        'ALTER TABLE `booking` DROP COLUMN `destination`;' +
                        'ALTER TABLE `booking` DROP COLUMN `start_date`;' +
                        'ALTER TABLE `booking` DROP COLUMN `end_date`;'
  db.runSql(queries, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
