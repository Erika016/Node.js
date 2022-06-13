// importar de mongoose
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String,
    },
    flast_name:{
        required: true,
        type: String,
    },
    email: {
        required: true,
        unique: true,
        type: String,
    },
    phone: {
        required: true,
        type: String,
    },
})

module.exports = mongoose.model('member', memberSchema)