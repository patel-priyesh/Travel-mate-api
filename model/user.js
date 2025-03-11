let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required please enter a name"]
    },
    email: {
        type: String,
        required: [true, "email is required please enter a email"]
    },
    password: {
        type: String,
        required: [true, "password is required please enter a password"]
    },
    role: {
        type: String,
        default: 'user'
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

let USER = mongoose.model('User', userSchema);
module.exports = USER;