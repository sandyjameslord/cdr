const router = require('express').Router();
const Map = require("../models/map");

const upload = require("../middleware/upload-photo");

// get all maps
router.get("/maps", async (req, res) => {
    try {
        let maps = await Map.find();
        res.json({success: true, maps: maps})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
});


//get single map by :id
router.get("/maps/:id", async (req, res) => {
    try {
        let map = await Map.findOne({ _id: req.params.id});
        res.json({success: true, map: map})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
});

// post single map
router.post("/maps", upload.single("photo"), async (req, res) => {
    try {
        let map = new Map();
        map.dogName = req.body.dogName;
        map.ownerEmail = req.body.ownerEmail;
        map.date = req.body.date;
        map.time = req.body.time;

        map.handler = req.body.handler;
        map.photo = req.file.location;
        
        map.pickUpTime = req.body.pickUpTime;
        map.beginActivityTime = req.body.beginActivityTime;
        map.endActivityTime = req.body.endActivityTime;
        map.dropOffTime = req.body.dropOffTime;

        await map.save();

        res.json({success: true, message: "Map successfully saved."})
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