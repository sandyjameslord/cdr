const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MapSchema = new Schema({
    dogName: String,
    ownerEmail: String,
    date: String,
    time: String,
    handler: String,
    photo: String,
    pickUpTime: String,
    beginActivityTime: String,
    endActivityTime: String,
    dropOffTime: String,
    // price: Number
});

module.exports = mongoose.model("Map", MapSchema);