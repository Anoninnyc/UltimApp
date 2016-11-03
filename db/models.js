var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
    userName: String,
    password: String,
    salt: String,
    preferences: Object,
});

var questionSchema = new Schema({
	user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	type:String,
	text:String,
	video:String,
})

userSchema.plugin(findOrCreate);
questionSchema.plugin(findOrCreate);

module.exports = {
	User:mongoose.model('User', userSchema),
	Question:mongoose.model('Question', questionSchema),
};