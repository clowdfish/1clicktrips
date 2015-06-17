var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  var sql = 'ALTER TABLE `country` MODIFY COLUMN code VARCHAR(10) NOT NULL ;' +
            'ALTER TABLE `country` ADD INDEX country_code_index (code ASC);';
  db.runSql(sql, function(err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  var sql = 'ALTER TABLE `country` DROP INDEX country_code_index;';
  db.runSql(sql, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
