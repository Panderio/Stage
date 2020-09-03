const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    personImage: { type: String }
});

module.exports = mongoose.model('Person', personSchema);