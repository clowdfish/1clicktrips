var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');
exports.up = function(db, callback) {
  async.waterfall([
    function(done) {
      db.addColumn('favorite', 'start_location_latitude', {
        type: 'decimal',
        length: '20,15'
      }, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.addColumn('favorite', 'start_location_longitude', {
        type: 'decimal',
        length: '20,15'
      }, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.addColumn('favorite', 'end_location_latitude', {
        type: 'decimal',
        length: '20,15'
      }, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.addColumn('favorite', 'end_location_longitude', {
        type: 'decimal',
        length: '20,15'
      }, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      var updateSql = "UPDATE favorite SET " +
                      "start_location_latitude  = SUBSTRING_INDEX(SUBSTRING_INDEX(start_location, ',' , 1), ' ', -1), " +
                      "start_location_longitude = SUBSTRING_INDEX(SUBSTRING_INDEX(start_location, ',' , -1), ' ', -1), " +
                      "end_location_latitude    = SUBSTRING_INDEX(SUBSTRING_INDEX(end_location  , ',' , 1), ' ', -1), " +
                      "end_location_longitude   = SUBSTRING_INDEX(SUBSTRING_INDEX(end_location  , ',' , -1), ' ', -1)  ";
      db.runSql(updateSql, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.removeColumn('favorite', 'start_location', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      console.log(done);
      db.removeColumn('favorite', 'end_location', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    }
  ], function(err) {
    if (err) {
      console.log('Error while running migration', err);
      callback(err);
    } else {
      callback();
    }
  });
};

exports.down = function(db, callback) {
  async.waterfall([
    function(done) {
      db.addColumn('favorite', 'start_location', {
        type: 'string',
        length: 25
      }, done);
    },
    function(done) {
      db.addColumn('favorite', 'end_location', {
        type: 'string',
        length: 25
      }, done);
    },
    function(done) {
      console.log(done);
      var updateSql = "UPDATE favorite SET " +
                      "start_location = CONCAT(start_location_latitude, ',' , start_location_longitude), " +
                      "end_location = CONCAT(end_location_latitude, ',' , end_location_longitude)";
      db.runSql(updateSql, function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.removeColumn('favorite', 'start_location_latitude', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.removeColumn('favorite', 'start_location_longitude', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.removeColumn('favorite', 'end_location_latitude', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    },
    function(done) {
      db.removeColumn('favorite', 'end_location_longitude', function(err) {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
    }
  ], function(err) {
    if (err) {
      console.log('Error while running migration', err);
      return callback(err);
    } else {
      return callback();
    }
  });
};
