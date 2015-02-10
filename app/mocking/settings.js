// settings.js
var Promise = require('es6-promise').Promise;

module.exports = {
  set: function(userId, settingsObject) {

    return new Promise(function(resolve, reject) {
      if (userId > 0)
        resolve();
      else
        reject(new Error('There was an error.'));
    });
  },

  get: function(userId) {

    return new Promise(function(resolve, reject) {

      if(userId > 0)
        resolve(
          [
            {
              category: "General",
              description: "",
              key: "taxi",
              value: "1"
            },
            {
              category: "General",
              description: "",
              key: "priority",
              value: "taxi,plane,rental,public"
            },
            {
              category: "General",
              description: "",
              key: "newsletter",
              value: "true"
            }
          ]);
      else
        reject(new Error('Setting could not be retrieved.'));
    });
  },

  print: function(userId) {

    if(userId > 0) {
      console.log("Settings are printed.");
    }
    else {
      console.log("Settings are not printed.");
    }
  }
};