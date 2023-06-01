import mongoose from 'mongoose';
import './controller.js';

const Accommodation = mongoose.model("Accommodation");

const editAccommodation = (req, res) => {

    Accommodation.updateOne({ _id: req.body.id },
        {
            $set: {
                name: req.body.name,
                pax: [req.body.minPax, req.body.maxPax],
                rates: [req.body.minRates, req.body.maxRates],
                paymentSchedule: req.body.paymentSchedule,
                // distance: req.body.distance,
                location: req.body.location,
                barangay: req.body.barangay,
                amenities: req.body.amenities,
                description: req.body.description,
                rules: req.body.rules,
                policy: req.body.policy,
                availability: req.body.availability,
                category: req.body.category,
                archiveStatus: req.body.availability,
                images: req.body.images
            }
        },
        function (err, docs) {
            if (!err) {
                res.send({ success: true, message: "Accommodation detail's edited successfully!" })
            } else {
                res.send({ success: false, message: "Failed to edit accommodation details!" })
            }
        })
}


export { editAccommodation }