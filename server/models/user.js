const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    streetAddress: {type: String, required: true},
    cityAddress: {type: String, required: true},
    zipCode: {type: String, required: true},
    cellNumber: {type: String},
    landLine: {type: String},
    userType: {type: String},
});

UserSchema.pre("save", function(next) {
    let user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) {return next(err);}
            bcrypt.hash(user.password, salt, null, function(err, hash) {
                if (err) {return next(err);}                
                user.password = hash;
                next();
            });
        });
    } else {return next();}
});

UserSchema.methods.comparePassword = function(password, next) {
    let user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model("User", UserSchema);