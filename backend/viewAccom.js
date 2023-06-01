import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");
const Accommodation = mongoose.model("Accommodation");

const viewAccommodation = (req, res) => {
    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body._id) }, (err, accommodation) => { // finds the accommodation using its id for viewing
        if(!err) {   
            return res.send({ success: true, posts: accommodation });
        } else {
            return res.send({ success: false });
        }
    });
  }

export { viewAccommodation }