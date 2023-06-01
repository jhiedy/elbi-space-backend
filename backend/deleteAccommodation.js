import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
const AccommodationOwner = mongoose.model("Accommodation_Owner");
const Accommodation = mongoose.model("Accommodation");
const Admin = mongoose.model("Admin");
const Report = mongoose.model("Report");

const deleteOneAccommodation = (req, res) => {
    // For checking if Accommodation exists.

    // Deletes Accommodation if found.
    Accommodation.deleteOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, (err, document) => {        // mas better if _id sana at siguradong unique
        if (!err) {
            if (document.deletedCount > 0) {
                console.log(document.deletedCount)
                // Deletes all reports related to that Accommodation.
                Report.deleteMany({ accId: req.body.accId }, (err) => {
                    if (!err) {
                        console.log("Deleted reports related to the accommodation");
                        // return res.send({ success: true });
                    } else {
                        // need ayusin para kapag nadelete Accommodation pero hindi ung mga reports.
                        console.log("Report deleteMany execution halted.");
                        return res.send({ success: false, input: "accId: " + req.body.accId, error: "Report deleteMany execution halted but Accommodation deleted." });
                    }
                });

                AccommodationOwner.updateOne({ _id: mongoose.Types.ObjectId(req.body.accOwnerId) },
                    { $pull: { accomsList: mongoose.Types.ObjectId(req.body.accId) } }, (err) => {
                        if (!err) {
                            res.send({ success: true })
                        }
                    });
            } else {
                console.log("No accommodation deleted");
                res.send({ success: false, message: "No accommodation deleted" });
            }

        } else {
            console.log("Accommodation deleteOne execution halted.");
            return res.send({ success: false, input: "_id: " + req.body._id, error: "Accommodation deleteOne execution halted." });
        }
    });

}

const deleteAccOwner = (req, res) => {

    // For checking if admin exists.
    AccommodationOwner.findOne({ _id: mongoose.Types.ObjectId(req.body.accOwnerId) }, (err, document) => {
        if (!err) {
            if (document) {
                return deleteOneAccommodation(req, res);
            } else {
                console.log("Accommodation Owner does not exist in our system!");
                return res.send({ success: false, input: "accOwnerId: " + req.body.accOwnerId, error: "Admin does not exist in our system!" });
            }
        }
        // If the outside res.send() fails, uncomment this:
        else {
            console.log("Accommodation Owner findOne execution halted.");
            return res.send({ success: false, input: "accOwnerId: " + req.body.accOwnerId, error: "Accommodation Owner findOne execution halted." });
        }
    });

    // If this is reached, the user that wants to request the delete Accommodation function does not exist, to prevent breaches.
    // return res.send({ success: false });
}

// For deleting Accommodations
// Description: Can be called by admin and Accommodation owner to delete an Accommodation
// for admin pa lng nagagawa, need pa ng Accommodation owner
const deleteAccAdmin = (req, res) => {

    // For checking if admin exists.
    Admin.findOne({ _id: mongoose.Types.ObjectId(req.body.adminId) }, (err, document) => {
        if (!err) {
            if (document) {
                return deleteOneAccommodation(req, res);
            } else {
                console.log("Admin does not exist in our system!");
                return res.send({ success: false, input: "adminId: " + req.body.adminId, error: "Admin does not exist in our system!" });
            }
        }
        // If the outside res.send() fails, uncomment this:
        else {
            console.log("Admin findOne execution halted.");
            return res.send({ success: false, input: "adminId: " + req.body.adminId, error: "Admin findOne execution halted." });
        }
    });

    // If this is reached, the user that wants to request the delete Accommodation function does not exist, to prevent breaches.
    // return res.send({ success: false });
}

export { deleteAccAdmin, deleteAccOwner }