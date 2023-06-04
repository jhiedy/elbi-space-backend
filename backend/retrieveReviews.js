import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");
const Reviews = mongoose.model("Review");
const Accommodation = mongoose.model("Accommodation");
const RegisteredUser = mongoose.model("Registered_User");

// Description: show accomodations by 
const retrieveReviews = (req, res) => {

    if (req.body.forWhat == "accommodation") {
        console.log("here");
        let filter;
        if(req.body.rating == 6) {
            filter = { accId: req.body.id };
        } else {
            filter = { accId: req.body.id, rating: req.body.rating }
        }
        
        Reviews.find(filter, (err, reviews) => {
            if (!err) {
                const total = reviews.length;
                const totalPages = Math.ceil(total / 3);

                // conditional statements
                if (reviews != null) { // non-empty list
                    let unique_userId = [];

                    for (let i = 0; i < total; i++) {
                        var userId = reviews[i].userId;
                        if (!(userId in unique_userId)) {
                            unique_userId.push(userId);
                        }
                    }

                    RegisteredUser.find({ '_id': { $in: unique_userId } }, (err, users) => {
                        if (!err) {
                            // you now retrieved the users of the reviewers
                            // creating a dictionary for each user for easier distribution in each reviews
                            let usersData = {};
                            let i, key1, key2;
                            for (i = 0; i < users.length; i++) {
                                key1 = users[i]._id + "_profile";
                                key2 = users[i]._id + "_name";

                                usersData[key1] = users[i].profilePicture
                                usersData[key2] = users[i].fname + " " + users[i].lname
                            }

                            let reviewModified = []
                            reviews.forEach(rev => {
                                key1 = rev.userId + "_profile"; // author image
                                key2 = rev.userId + "_name";
                                let revi = {
                                    _id: rev._id,
                                    userId: rev.userId,
                                    accId: rev.accId,
                                    description: rev.description,
                                    rating: rev.rating,
                                    authorImage: usersData[key1],
                                    author: usersData[key2]
                                }
                                reviewModified.push(revi);
                            })

                            console.log("sending data...");
                            console.log(reviewModified);

                            const page = req.body.page;
                            const start = (page - 1) * 3;
                            return res.send({ success: true, posts: reviewModified.slice(start, start+3), count: total, pages: totalPages });

                        } else {
                            res.send({ success: false, message: "Failed retrieving reviewers." });
                        }
                    })


                } else {
                    const page = req.body.page;
                    const start = (page - 1) * 3;
                    return res.send({ success: true, posts: reviews.slice(start, start+3), count: total, pages: totalPages });
                }
            } else {
                return res.send({ success: false, message: err });
            }
        })
    } else {
        Reviews.find({ userId: req.body.id }, (err, reviews) => {
            if (!err) {
                const total = reviews.length;
                const totalPages = Math.ceil(total / 3);
                const ordered = reviews.reverse();

                // conditional statements
                if (reviews != []) { // non-empty list
                    const accoms = [];

                    for (let i = 0; i < total; i++) {
                        accoms.push(mongoose.Types.ObjectId(ordered[i].accId));
                    }

                    Accommodation.find({ '_id': { $in: accoms } }, (err, items) => {
                        if (!err) {
                            return res.send({ success: true, posts: ordered, count: total, pages: totalPages, accs: items });
                        } else {
                            res.send({ success: false });
                        }
                    })
                } else {
                    const page = req.body.page;
                    const start = (page - 1) * 3;
                    return res.send({ success: true, posts: reviews.slice(start, start+3), count: total, pages: totalPages, accs: [] });
                }
            } else {
                return res.send({ success: false });
            }
        })
    }
}

export { retrieveReviews }