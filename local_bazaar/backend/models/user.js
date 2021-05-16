var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require('uuid/v1');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstname:{
        type: String,
        required: true,
        max_length: 32,
        trim: true
    },
    lastname:{
        type: String,
        required: false,
        max_length: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    //TODO: come back here
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    roles:{ // 0-user
        type: Number,
        default: 0
    },
    purchases : {
        type: Array,
        default: []
    }

}, { timestamps: true });

userSchema.virtual("password")
    .set(function(password){
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {

    authenticate: function(plain_password){
        return this.securePassword(plain_password) === this.encry_password
    },

    securePassword: function(plain_password){
        if(!plain_password) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plain_password)
            .digest('hex');
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)