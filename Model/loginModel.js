// email. password e role, role es opcional y por defecto 1

const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
 
    email: {
        required: true,
        unique: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    role: {
        type: String,
        default:1
    },
},
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('login', loginSchema)