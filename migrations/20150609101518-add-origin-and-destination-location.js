var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  var addColumnQuery = 'ALTER TABLE `booking` ADD COLUMN `origin_location_latitude` decimal(20,15) null;' +
                       'ALTER TABLE `booking` ADD COLUMN `origin_location_longitude` decimal(20,15) null;' +
                       'ALTER TABLE `booking` ADD COLUMN `destination_location_latitude` decimal(20,15) null;' +
                       'ALTER TABLE `booking` ADD COLUMN `destination_location_longitude` decimal(20,15) null';
  db.runSql(addColumnQuery, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  var removeColumnQuery = 'ALTER TABLE `booking` DROP COLUMN `origin_location_latitude`;' +
                         'ALTER TABLE `booking` DROP COLUMN `origin_location_longitude`;' +
                         'ALTER TABLE `booking` DROP COLUMN `destination_location_latitude`;' +
                         'ALTER TABLE `booking` DROP COLUMN `destination_location_longitude`';
  db.runSql(removeColumnQuery, function(err) {
    if (err) return done(err);
    return done();
  });
};
