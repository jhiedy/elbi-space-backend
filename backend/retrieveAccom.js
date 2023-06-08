import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");
const Accommodation = mongoose.model("Accommodation");


// Description: show accomodations by 
const retrieveAccom = (req, res) => {
    const ctgy = req.body.category;
    if(ctgy) { // may category pero walang barangay
        Accommodation.find({ category: ctgy, archiveStatus: false }, (err, accommodations) => {
            if(!err) {   
                // conditional statements
                if(accommodations != null) { // non-empty list
                    accommodations.sort((a, b) => a.rates - b.rates);
                    const page = req.body.page;
                    const start = (page - 1) * 12;
                    return res.send({ success: true, pageCount: Math.ceil(accommodations.length / 12), 
                    posts: accommodations.slice(start, start+12) });
                } else { // empty list of accommodations
                    return res.send({ success: true, posts: accommodations });
                }
            } else {
                console.log(err);
                return res.send({ success: false });
            }
        });
    } else { // parehong wala
        Accommodation.find( {archiveStatus: false}, (err, accommodations) => {
            if(!err) {   
                // conditional statements
                if(accommodations != null) { // non-empty list
                    accommodations.sort((a, b) => a.rates - b.rates);
                    const page = req.body.page;
                    const start = (page - 1) * 12;
                    return res.send({ success: true, pageCount: Math.ceil(accommodations.length / 12), 
                    posts: accommodations.slice(start, start+12) });
                } else { // empty list of accommodations
                    return res.send({ success: true, posts: accommodations });
                }
            } else {
                console.log(err);
                return res.send({ success: false });
            }
        });
    }


    

    // need bang i-sort to???????
    
    /*
    dapat may availability true
    */

    // req.body{
    //     barangay
    //     categorry
    //     page
    // }

    // if (req.body.barangay  and  req.body.category  is not empty)    // dapat available!
    // else if (if req.body.barangay is empty)
    // else (req.body.categiry)


    // document
    // price
    // ratings

    // res.send 

    // if (req.body.barangay != NULL) {
    //     // console.log("hoy")
    //     Accommodation.find({ barangay: req.body.barangay }, (err, accommodation) => {
    //         // console.log("hoy1")
    //         // console.log(req.body.barangay)
    //         if (!err) {
    //             return res.send({ success: true, accomperbrgy: accommodation });
    //         } else {
    //             return res.send({ success: false });
    //         }
    //     });
    //     // TODO:
    // } else {

    // }
}



export { retrieveAccom }