
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    dogName: String,
    ownerEmail: String,
    address: String,
    cellNumber: String,
    date: String,
    time: String,
    initialAppointment: String,
    confirmed: String,
    completed: String,
    handlerEmail: String,
    handlerName: String,
    handlerCellNumber: String
    // price: Number
});

module.exports = mongoose.model("Appointment", AppointmentSchema);