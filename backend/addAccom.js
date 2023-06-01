import mongoose from 'mongoose';
import './controller.js';

const Accommodation = mongoose.model("Accommodation");
const AccommodationOwner = mongoose.model("Accommodation_Owner");

// creating new Accommodation
const newAccommodation = (req, res) => {
    const newAccom = new Accommodation({
        ownerId: req.body.ownerId,
        name: req.body.name,
        pax: [req.body.minPax, req.body.maxPax],
        rates: [req.body.minRates, req.body.maxRates],
        paymentSchedule: req.body.paymentSchedule,
        // distance: req.body.distance,
        location: req.body.location,
        barangay: req.body.barangay,
        ratings: [], // since newly created
        overallratings: 0,
        amenities: req.body.amenities,
        description: req.body.description,
        rules: req.body.rules,
        policy: req.body.policy,
        availability: req.body.availability,
        category: req.body.category,
        archiveStatus: req.body.archiveStatus,
        images: req.body.images
    });

    console.log("New Accommodation: ");
    console.log(newAccom);

    newAccom.save((err, accom) => {
        if (err) {
            console.log(err);
            return res.send({ success: false, message: "error saving accommodation in database" });
        }
        else {
            // Set the success field of response to true if no error was found
            console.log("Accommodation added successfully.");

            var objectId = accom._id
            var userId = accom.ownerId;

            AccommodationOwner.updateOne({ _id: userId }, { $push: { accomsList: objectId } }, (err, output) => {
                if (err) {
                    return res.send({ success: false, message: "added accommodation in database but was not able to add it in owner's accommodation's list", accId: objectId })
                } else {
                    return res.send({ success: true, message: "added accommodation in database; also added to owner accommodation lists" })
                }
            })
        }
    });
}

export { newAccommodation }
