const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DogSchema = new Schema({
    dogName: String,
    dogLicNum: String,
    ownerEmail: String,
    approved: String,
    photo: String,
    notesAboutDog: String,
    questionsAboutDog: String,
    ownerID: String,
    // price: Number
});

module.exports = mongoose.model("Dog", DogSchema);