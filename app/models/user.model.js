import mongoose from 'mongoose';
import crypto from 'crypto';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
        firstName: String,
        lastName: String,
        username: { 
              type: String, 
              unique: true,
              required: 'Username is required',
              trim: true
        },
        email: { type: String, unique: true },
        tel:{type: String},
        password: {
            type: String,
            //required: 'Password is required',
            validate: [
                (password) => { return password && password.length>=1; },
                'Password cannot be empty'
            ]
        },
        created: {
                type: Date,
                default: Date.now
        },
        salt: { // random for merge with hash
             type: String
        },
        provider: {
            type: String,
            default : 'local'
        },
        providerId: String,
        providerData: {},
        department: { 
            type: String, 
            required: 'Department is required'
      }
}); 

UserSchema.pre('save', function(next){//hash password
    if (this.password) {
           this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
           this.password = this.hashPassword(this.password);
    }
    next();
}); 

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64,'sha512').toString('base64');
}


UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
}

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, (err, user) => {
        if (!err) {
            if (!user) callback(possibleUsername);
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback );
            }
        }
        else {
            callback(null);
        }
    });
}


mongoose.model('User', UserSchema);