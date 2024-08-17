const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        default: function() {
            return this._id;
        }
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        
    },
    firstName: {
        type: String,
        default: '' 
    },
    lastName: {
        type: String,
        default: '' 
    },
    organization: {
        type: String,
        default: '' 
    },
    address: {
        type: String,
        default: '' 
    },
    city: {
        type: String,
        default: '' 
    },
    state: {
        type: String,
        default: '' 
    },
    country: {
        type: String,
        default: '' 
    },
    number: {
        type: String,
        default: '' 
    },
    picture: {
        type: String,
        default: '' 
    },
    authProvider: {
        type: String,
        enum: ['local', 'google-oauth2', 'facebook', 'windowslive'],
        required: true,
      },
    emailVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
