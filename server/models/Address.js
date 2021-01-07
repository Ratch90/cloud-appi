
const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    id : Number,
    street : String,
    city : String,
    country : {
        type : String,
        enum : ['ES', 'UK', 'DE', 'US']
    },
    postalcode : String
})

module.exports = mongoose.model('Address',AddressSchema);
