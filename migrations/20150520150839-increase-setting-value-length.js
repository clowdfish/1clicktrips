var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.runSql('ALTER TABLE setting MODIFY COLUMN `value` VARCHAR(200) NULL', function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  db.runSql('ALTER TABLE setting MODIFY COLUMN `value` VARCHAR(45) NULL', function(err) {
    if (err) return callback(err);
    return callback();
  });
};
