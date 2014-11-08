// settings.js

var Promise  = require('es6-promise').Promise;
var Settings = require('../models/settings');
var mongoose = require('mongoose');

exports.createSettings = function(userId, options, callback) {
    // check if settings already exist
    Settings.findOne({'user': userId}, function(err, settings) {
        var settings_object;

        if (err || settings == null) {
            // create new settings object
            settings_object = new Settings();
            settings_object.user = mongoose.Types.ObjectId(userId);
        }
        else
            settings_object = settings;

        addSettings(settings_object, options);

        settings_object.save(function(err, success) {
            callback(err, success);
        });
    });
};

exports.getSettings = function(userId, callback) {
    Settings.findOne({'user': userId}, function(err, settings) {

        if (err) {
            console.error('Settings for user "' + userId + '" could not be loaded.');
        }
        callback(settings);
    });
};

exports.print = function(settingsObject) {
   printSettings(settingsObject, 0);
};

/**
 * Helper functions
 */

function addSettings(settingsObject, toAdd) {
    for (var key in toAdd) {
        if(toAdd.hasOwnProperty(key)) {

            if(settingsObject[key] && typeof settingsObject[key] === 'object') {
               addSettings(settingsObject[key], toAdd[key]);
            }
            else {
                settingsObject[key] = toAdd[key];
            }
        }
    }
}

function printSettings(settingsObject, level) {
    if(!level)
        level = 0;

    var spaceholder = "";
    for(var i=0; i<level; i++)
        spaceholder += "-";

    for (var key in settingsObject) {
        if(settingsObject.hasOwnProperty(key)) {

            if (settingsObject[key] && typeof settingsObject[key] !== 'string') {
                console.log(spaceholder + key);
                printSettings(settingsObject[key], level + 3);
            }
            else {
                console.log(spaceholder + key + ': ' + settingsObject[key]);
            }
        }
    }
}










