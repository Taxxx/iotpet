var mongoose = require('mongoose');

module.exports = mongoose.model('Pet', {
	name : {type : String, default: ''},
	specie : {type : String, default: ''},
	breed : {type : String, default: ''},
	weight : {type : String, default: ''}

});