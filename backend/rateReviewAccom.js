import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");

const RegisteredUser = mongoose.model("Registered_User");
const Accommodation = mongoose.model("Accommodation");
const Review = mongoose.model("Review");

// Description: Add rating and review for the accomodation
// NOTE: Accomodations can have ratings with no reviews
function addRateAndReview(req, res) {

    // create rating and review
    Review.create({
        userId: req.body.userId,
        accId: req.body.accId,
        description: req.body.description,
        rating: req.body.rating
    });

    // find accommodation
    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, async (err, accommodation) => {
        if (!err) {
            accommodation.ratings.push(req.body.rating);
            accommodation.save();

            var cnt = accommodation.ratings.length;     // cnt = count of elements on ratings array
            var sum = 0;                                // sum = placeholder for sum of elements in the array
            accommodation.ratings.forEach(rate => {     // sum = sum of all elements on ratings array
                sum += rate;
            });

            // compute new average
            let ave = sum / cnt;
            ave = ave.toFixed(2);   // 2 decimal places

            // update overallratings to new computed average
            await Accommodation.updateOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, {
                $set: { overallratings: ave }
            }, function (err, docs) {
                if (!err) {
                    return res.send({ success: true });
                } else {
                    return res.send({ success: false });
                }
            }
            );

        } else {
            return res.send({ success: false });
        }

    });
}

//editing review
const editReview = (req, res) => {

    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, async (err, accommodation) => {


        Review.findOne({ accId: req.body.accId, userId: req.body.userId }, (err, review) => {
            if (!err) {
                let prevRating = review.rating;
                let ratingArray = accommodation.ratings;
                ratingArray.splice(ratingArray.indexOf(prevRating), 1, req.body.rating);
                // ratingArray.push(rating);

                let sumOfRatings = 0;
                accommodation.ratings.forEach(rate => {
                    sumOfRatings += rate;
                });
                let newOverallRatings = sumOfRatings / (accommodation.ratings.length)


                Accommodation.updateOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, {
                    $set: { overallratings: newOverallRatings, ratings: ratingArray }
                }, async (err, accommodation) => {
                    if (!err) {
                        Review.updateOne({ accId: req.body.accId, userId: req.body.userId }, { $set: { description: req.body.description, rating: req.body.rating } }, async (err, review) => {
                            if (!err) {

                                return res.send({ success: true });
                            } else {
                                return res.send({ success: false });
                            }
                        });
                    }
                    else {
                        return res.send({ success: false });
                    }
                })
            }
        })
    })
}

const rateAndReview = (req, res) => {
    // check if user is registered
    RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(req.body.userId) }, (err, user) => {
        if (!err && user) {
            if (req.body.mode == "EDIT") {
                return editReview(req, res);
            } else {
                return addRateAndReview(req, res);
            }

        } else {

            return res.send({ success: false });
        }
    });
}

const findExistingReview = (req, res) => {
    Review.findOne({ accId: req.body.accId, userId: req.body.userId }, (err, review) => {
        if (!err && review) {
            return res.send({ success: true, review: review });
        } else {
            return res.send({ success: false });
        }
    })
}

export { rateAndReview, findExistingReview }