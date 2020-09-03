const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
//  _id: mongoose.Schema.Types.ObjectId,
  Firstname: {
    type: String
  },
  LastName: {
    type: String
  },
  avatar: {
    type: String
  },
  email:{
    type:String
  },
  password: {
    type: String
  },
  checkpass: {
    type: String
  }
}
/*
, {
    collection: 'users'
  }*/
  )

module.exports = mongoose.model('User', userSchema, 'users')