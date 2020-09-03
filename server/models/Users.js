var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
    FirstName : { type:String, required:true},
    LastName : { type:String, required:true},
    username: {type:String, require:true},
    email : {type:String, require:true},
    password:{type:String, require:true},
});

schema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

schema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('Userss',schema);