var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');
exports.up = function(db, callback) {
  async.waterfall([
    function(done) {
      var sqlList = [
                  'ALTER TABLE `booking` DROP COLUMN `title`',
                  'ALTER TABLE `booking` DROP COLUMN `destination`',
                  'ALTER TABLE `booking` DROP COLUMN `tags`',
                  'ALTER TABLE `booking` DROP COLUMN `start_date`',
                  'ALTER TABLE `booking` ADD COLUMN `booking_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
                  'ALTER TABLE `booking` ADD COLUMN `subject` VARCHAR(300)',
                  'ALTER TABLE `booking` ADD COLUMN `user_id` int(11) default -1;'
                ];
      async.each(sqlList, function(sql, done) {
        db.runSql(sql, done)
      }, callback);
    }
  ], callback)
};

exports.down = function(db, callback) {
  var sqlList = ['ALTER TABLE `booking` DROP COLUMN `booking_date`',
            'ALTER TABLE `booking` DROP COLUMN `subject`',
            'ALTER TABLE `booking` DROP COLUMN `user_id`',
            'ALTER TABLE `booking` ADD COLUMN `title` VARCHAR(45)',
            'ALTER TABLE `booking` ADD COLUMN `destination` VARCHAR(45)',
            'ALTER TABLE `booking` ADD COLUMN `tags` VARCHAR(255)',
            'ALTER TABLE `booking` ADD COLUMN `start_date` DATETIME  DEFAULT CURRENT_TIMESTAMP'];
  async.each(sqlList, function(sql, done) {
    db.runSql(sql, done);
  }, callback)
};
