const router = require('express').Router();
const Appointment = require("../models/appointment");

const upload = require("../middleware/upload-photo");

// get all appointments
router.get("/appointments", async (req, res) => {
    try {
        let appointments = await Appointment.find();
        res.json({success: true, appointments: appointments})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
});


















// //get single appointment by :id
// router.get("/appointments/:id", async (req, res) => {
//     try {
//         let appointment = await Appointment.findOne({ _id: req.params.id});
//         res.json({success: true, appointment: appointment})
//     } catch (err) {
//         res.status(500).json({success: false, message: err.message})
//     }
// });




















// post single appointment
router.post("/appointments", upload.single("photo"), async (req, res) => {
    try {
        let appointment = new Appointment();
        appointment.dogName = req.body.dogName;
        appointment.ownerEmail = req.body.ownerEmail;
        appointment.address = req.body.address;
        appointment.cellNumber = req.body.cellNumber;
        

        appointment.date = req.body.date;
        appointment.time = req.body.time;
        appointment.initialAppointment = req.body.initialAppointment;
        appointment.confirmed = req.body.confirmed;
        appointment.completed = req.body.completed;
        appointment.handlerEmail = req.body.handlerEmail;
        appointment.handlerName = req.body.handlerName;
        appointment.handlerCellNumber = req.body.handlerCellNumber;

        await appointment.save();

        res.json({success: true, message: "Appointment successfully saved."})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
});

//update appointment to completed == true status
router.put(`/appointments/:id`, async (req, res) => {
// router.put("/appointments/:id", upload.single("photo"), async (req, res) => {
    try {
        let appointment = await Appointments.findOneAndUpdate(
            { _id: req.params.id },
            { $set: {
                completed: req.body.completed,
            }},
            { upsert: true }
        );
        
        res.json({success: true, updatedAppointment: appointment})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
});

// update single dog
// router.put("/dogs/:id", upload.single("photo"), async (req, res) => {
//     try {
//         let dog = await Dogs.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: {
//                 dogName: req.body.title,
//                 dogLicNum: req.body.description,
//                 photo: req.file.location,
//             }},
//             { upsert: true }
//         );
        
//         res.json({success: true, updatedDog: dog})
//     } catch (err) {
//         res.status(500).json({success: false, message: err.message})
//     }
// });
















// update single dog
// router.put("/dogs/:id", upload.single("photo"), async (req, res) => {
//     try {
//         let dog = await Dogs.findOneAndUpdate(
//             { _id: req.params.id },
//             { $set: {
//                 dogName: req.body.title,
//                 dogLicNum: req.body.description,
//                 photo: req.file.location,
//             }},
//             { upsert: true }
//         );
        
//         res.json({success: true, updatedDog: dog})
//     } catch (err) {
//         res.status(500).json({success: false, message: err.message})
//     }
// });

// delete single dog
// router.delete("/dogs/:id", async (req, res) => {
//     try {
//         let deletedDog = await Dog.findOneAndDelete({ _id: req.params.id});
//         if (deletedDog) {
//             res.json({success: true, message: "Dog successfully deleted from database."})
//         }
//         res.json({success: true, dog: dog})
//     } catch (err) {
//         res.status(500).json({success: false, message: err.message})
//     }
// });

module.exports = router;