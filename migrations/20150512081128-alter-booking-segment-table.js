var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');
exports.up = function(db, callback) {

  async.waterfall([
    function(done) {
      db.dropTable('booking_segment', done);
    },
    function(done) {
      db.createTable('booking_segment', {
        booking_id: {
          type: 'int',
          foreignKey: {
            name: 'fk_booking_and_booking_segment',
            rules: {
              onDelete:'CASCADE',
              onUpdate: 'RESTRICT'
            },
            mapping: 'id'
          }
        },
        segment_id: {
          type: 'string',
          length: 20
        },
        segment_selected: {
          type: 'boolean',
          defaultValue: false
        },
        provider_id: {
          type: 'string',
          length: 30
        },
        provider_booking_id: {
          type: 'string',
          length: 30
        },
        segment_price: {
          type: 'decimal',
          length: '10,2'
        },
        segment_tax: {
          type: 'decimal',
          length: '10,2'
        },
        segment_currency: {
          type: 'string',
          length: '10'
        },
        segment_start_time: {
          type: 'datetime'
        },
        segment_start_location_longitude: {
          type: 'string',
          length: 20
        },
        segment_start_location_latitude: {
          type: 'string',
          length: 20
        },
        segment_start_location_name: {
          type: 'string',
          length: 160
        },
        segment_end_time: {
          type: 'datetime'
        },
        segment_end_location_longitude: {
          type: 'string',
          length: 20
        },
        segment_end_location_latitude: {
          type: 'string',
          length: 20
        },
        segment_end_location_name: {
          type: 'string',
          length: 160
        },
        segment_type: {
          type: 'smallint',
          unsigned: true
        },
        segment_order: {
          type: 'smallint',
          unsigned: true
        },
        segment_checkin_url: {
          type: 'string',
          length: 200
        }
      }, done);
    }
  ], callback);
};

exports.down = function(db, callback) {
  db.dropTable('booking_segment', callback);
};
