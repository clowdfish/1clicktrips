var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.addColumn('profile', 'language', {
    type: 'string',
    length: 10,
    defaultValue: 'en'
  }, callback);
};

exports.down = function(db, callback) {
  db.removeColumn('profile', 'language', callback);
};
