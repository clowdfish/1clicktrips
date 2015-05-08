var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
  db.createTable('booking_user', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    booking_id: {
      type: 'int',
      foreignKey: {
        name: 'fk_booking_and_booking_user',
        rules: {
          onDelete:'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    first_name: {
      type: 'string',
      length: 160
    },
    last_name: {
      type: 'string',
      length: 160
    },
    email: {
      type: 'string',
      length: 160
    },
    phone: {
      type: 'string',
      length: 50
    },
    address_street: {
      type: 'string',
      length: 160
    },
    address_city: {
      type: 'string',
      length: 100
    },
    address_postal: {
      type: 'string',
      length: 20
    },
    address_country: {
      type: 'string',
      length: 100
    },
    company_name: {
      type: 'string',
      length: 160
    },
    company_tax_no: {
      type: 'string',
      length: 50
    }
  }, callback);
};

exports.down = function(db, callback) {
  db.dropTable('booking_user', callback);
};
