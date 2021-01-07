const mongoose = require('mongoose');
const Address = require('./Address');

const UserSchema = mongoose.Schema({
    id : {
        type : Number,
        required : true
    },
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    birthDate : {
        type : String,
        required : true
    },
    address : {
        type : mongoose.Schema.Types.ObjectId, ref : 'Address',
        required : true
    }
})

module.exports = mongoose.model('User', UserSchema);