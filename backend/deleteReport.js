import mongoose from 'mongoose';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");

// Report model placeholder <sample lang toh, hindi toh gawa ng database>
const Report = mongoose.model("Report");
const Admin = mongoose.model("Admin");

// Function to call when deleting a report
// Description: Deletes a report. Can be called when accomodation no longer exists or when admin deletes a report.
const deleteReport = (req, res) => {

    // For checking if admin exists.
    Admin.findOne({ _id: mongoose.Types.ObjectId(req.body.adminId) }, (err, document) => {
        if (!err) {
            if (document) {
                // Deletes report.
                Report.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reportId) }, (err, document) => {
                    if (!err) {
                        if (document.deletedCount > 0) {
                            return res.send({ success: true });
                        } else {
                            return res.send({ success: false, message: "No report found to be deleted" });
                        }
                    } else {
                        console.log("Report deleteOne execution halted.");
                        return res.send({ success: false, input: "reportId: " + req.body.reportId, error: "Report deleteOne execution halted but accomodation deleted." });
                    }
                });

            } else {
                console.log("Admin does not exist in our system!");
                return res.send({ success: false, input: "adminId: " + req.body.adminId, error: "Admin does not exist in our system!" });
            }

        } else {
            console.log("Admin findOne execution halted.");
            return res.send({ success: false, input: "adminId: " + req.body.adminId, error: "Admin findOne execution halted." });
        }
    });
}

export { deleteReport }