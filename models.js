var mongoose = require('mongoose');
var Schema  = mongoose.Schema;


var userSchema = new Schema({
	id: {type:String, required:true},
	userName: String,
	Password: String,
	email: String,
	salt: String,
});


module.exports = mongoose.model('User', userSchema);