import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");
const Accommodation = mongoose.model("Accommodation");
const Reviews = mongoose.model("Review");

// Description: View Reviews (pagination?)
const viewReviewList = (req, res) => {
    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, (err) => {
        if (!err) {
            Reviews.find({ accId: req.body.accId }, (err, reviews) => {
                if (!err) {
                    // return review if found
                    return res.send({ success: true , review: reviews});
                } else {
                    // if no reviews 
                    return res.send({ success: false });
                }
            });
        } else {
            return res.send({ success: false });
        }

    });
}

export { viewReviewList }