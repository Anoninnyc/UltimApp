var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
    userName: String,
    password: String,
    salt: String,
    preferences: Object,
});

userSchema.plugin(findOrCreate);

module.exports = {
	User:mongoose.model('User', userSchema)
};