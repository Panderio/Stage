const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const emotionSchema = new Schema({
    emotion:{type: String},
    UserID :{type: String},
    CourseTitle :{type: String}
})

module.exports = mongoose.model('Emotion', emotionSchema, 'emotions')