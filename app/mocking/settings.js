// mocking/settings.js

var Promise = require('es6-promise').Promise;

module.exports = {
  set: function(userId, settingsObject) {

    console.log('Settings Object to be stored: '); // DEBUG
    console.log(settingsObject); // DEBUG

    return new Promise(function(resolve, reject) {
      if (userId > 0)
        resolve();
      else
        reject(new Error('There was an error.'));
    });
  },

  get: function(userId, category) {

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve(createSettingsMock());
      else
        reject(new Error('Setting could not be retrieved.'));
    });
  }
};

// ==========================================================================
// MOCKING OBJECT CREATORS ==================================================
// ==========================================================================

function createSettingsMock() {
  return [
    {
      "category": "General",
      "description": "",
      "key": "taxi",
      "value": "1"
    },
    {
      "category": "General",
      "description": "",
      "key": "priority",
      "value": "taxi,plane,rental,public"
    },
    {
      "category": "General",
      "description": "",
      "key": "newsletter",
      "value": "true"
    }
  ]
}