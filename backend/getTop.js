import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");

const Accommodation = mongoose.model("Accommodation");

// Sample 
// const post = (req, res) => {
//     Post.create({
//       email: req.body.email,
//       password: req.body.password,
//       firstName: req.body.firstName
//     });

//     console.log("New Post Created!");
//     return res.send({ success: true });
// }


//  retrieve top accomodation according to category
//  then put them in a list
const topApt = (req, res) => {

    var accommsList = [];
    var categories = [];
    var cur_index = 0

    //  get accommodation categories
    Accommodation.distinct("category").exec((err, document) => {
        if (!err) {
            // console.log(document.length)
            for (var i = 0; i < document.length; i++) {
                categories.push(document[i]);
            }
            //  get top 1 per category
            Accommodation.find().sort({ overallratings: -1 }).exec((err, document) => {
                if (!err) {

                    // console.log(document);
                    while (true) {
                        for (var i = 0; i < document.length; i++) {
                            if (document[i].category == categories[cur_index]) {
                                accommsList.push(document[i]);
                                cur_index++;
                                break;
                            }
                        }
                        if (cur_index == categories.length) { break; }
                    }

                    res.send({ success: true, uniqueCategories: categories.length, posts: accommsList });
                } else {
                    res.send({ success: false });
                }
                // console.log(accommsList);
            });
        } else {
            res.send({ success: false });
        }


    });


}

export { topApt }