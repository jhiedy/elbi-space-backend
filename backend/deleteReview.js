import mongoose from 'mongoose';




const Accommodation = mongoose.model("Accommodation");
const Review = mongoose.model("Review");



const deleteReview = (req, res) => {

    // Reviews.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reviewId) }, (err, document) => {
    //     if(!err){

    //     }else {
    //         return res.send({ success: false, message: "Deleting review failed" });
    //     }
    // })

    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, async (err, accommodation) => {


        Review.findOne({ _id: mongoose.Types.ObjectId(req.body.reviewId) }, (err, review) => {
            if (!err) {
                let prevRating = review.rating;
                let ratingArray = accommodation.ratings;
                ratingArray.splice(ratingArray.indexOf(prevRating), 1);
                // ratingArray.push(rating);

                let newOverallRatings
                if (ratingArray.length === 0) {
                    newOverallRatings = 0;
                } else {
                    let sumOfRatings = 0;
                    ratingArray.forEach(rate => {
                        sumOfRatings += rate;
                    });
                    newOverallRatings = sumOfRatings / (ratingArray.length)
                    console.log(newOverallRatings)
                }


                Accommodation.updateOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, {
                    $set: { overallratings: newOverallRatings, ratings: ratingArray }
                }, async (err, accommodation) => {
                    if (!err) {
                        Review.deleteOne({ _id: mongoose.Types.ObjectId(req.body.reviewId) }, (err, document) => {
                            if (!err) {
                                return res.send({ success: true, message: "Review Successfully deleted" });
                            } else {
                                return res.send({ success: false, message: "Deleting review failed" });
                            }
                        })
                    }
                    else {
                        console.log(err);
                        return res.send({ success: false });
                    }
                })
            }
        })
    })
}

export { deleteReview }