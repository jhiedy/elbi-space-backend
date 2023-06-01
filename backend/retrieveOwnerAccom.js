import mongoose from 'mongoose';

const Accommodation = mongoose.model("Accommodation");

// Description: retrieves all the accommodations that belongs to the specified owner
const retrieveOwnerAccom = (req, res) => {
    Accommodation.find({ ownerId: req.body.userId, archiveStatus: req.body.status }, (err, accoms) => {
        // If the user doesn't exist
        if (err || !accoms){
            return res.send({ success: false, message: ""});
        }
        return res.send({success: true, posts: accoms.reverse()})
    })
}

export { retrieveOwnerAccom }