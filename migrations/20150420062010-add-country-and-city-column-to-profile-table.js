var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');
exports.up = function(db, callback) {
  async.series([
    db.addColumn.bind(db, 'profile', 'city', {
      type: 'string',
      length: 10
    }),
    db.addColumn.bind(db, 'profile', 'country', {
      type: 'string',
      length: 10
    }),
    db.addForeignKey.bind(db, 'profile', 'country', 'fk_profile_country', {
      country: 'code'
    }, {
      onDelete: 'CASCADE',
      onUpdate: 'RESTRICT'
    })
  ], function(err) {
    if (err) {
      console.log(err);
    }
    callback(err);
  });
};

exports.down = function(db, callback) {
  async.waterfall([
    function(done) {
      db.removeColumn('profile', 'country', done);
    }
  ], callback);
};
