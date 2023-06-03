import mongoose from 'mongoose';
import './controller.js';


const Accommodation = mongoose.model("Accommodation");

const archiveAccommodation = (req, res) => {

    Accommodation.updateOne({ _id: mongoose.Types.ObjectId(req.body.accId) },
        {
            $set: {
                archiveStatus: true
            }
        },
        function (err, docs) {
            if (!err) {
                res.send({ success: true })
            } else {
                res.send({ success: false })
            }
        })
}


export { archiveAccommodation }