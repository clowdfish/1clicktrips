var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql('ALTER TABLE `hotel` MODIFY COLUMN `id` int(11) NOT NULL AUTO_INCREMENT', function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  callback();
};
