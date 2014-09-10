// load the things we need
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var settingsSchema = new Schema({

    user            : ObjectId,
    profile         : {
        firstname   : String,
        lastname    : String,
        username    : String,
        email       : String,
        twitter     : String,
        address     : String
    },
    preferences     : {
        options_plane   : Number,
        options_public  : Number,
        options_taxi    : Number,
        options_rental  : Number,
        priority        : String,
        arrival         : Number,
        breakfast       : Number,
        buffer          : Number,
        transfer        : Number
    },
    privacy         : {
        newsletter  : Number
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Settings', settingsSchema);
