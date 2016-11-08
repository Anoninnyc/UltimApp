var mongoose = require('mongoose');
var Schema  = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var userSchema = new Schema({
    userName: String,
    password: String,
    salt: String,
    preferences: Object,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

var questionSchema = new Schema({
	user: { type: String, ref: 'User' },
	asked: { type: Date, default: Date.now },
	tags:Array,
	type:String,
	text:String,
	video:String,
	answers:Array,
})

userSchema.plugin(findOrCreate);
questionSchema.plugin(findOrCreate);

module.exports = {
	User:mongoose.model('User', userSchema),
	Question:mongoose.model('Question', questionSchema),
};