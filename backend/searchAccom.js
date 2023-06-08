import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");
const Accommodation = mongoose.model("Accommodation");


const searchAccommodation = (req, res) => {

    var updateBlock = {archiveStatus: false};
    var sort = 'name', order = 1; // default values
    var sortby = {}

    if (req.body.name != "" || req.body.name) {
        updateBlock['name'] = new RegExp(req.body.name, 'i');
    }
    if (req.body.category != "" || req.body.category) {
        updateBlock['category'] = req.body.category;
    }
    if (req.body.barangay != "" || req.body.barangay) {
        updateBlock['barangay'] = { $regex: req.body.barangay, $options: 'i' };
    }
    if (req.body.pax != "" || req.body.pax) {
        updateBlock['pax.0'] = { $lte: Number(req.body.pax) };
        updateBlock['pax.1'] = { $gte: Number(req.body.pax) };
    }
    if (req.body.minRate != "" || req.body.minRate) {
        updateBlock['rates.0'] = { $gte: Number(req.body.minRate) };
    }
    if (req.body.maxRate != "" || req.body.maxRate) {
        updateBlock['rates.1'] = { $lte: Number(req.body.maxRate) };
    }
    if (req.body.ratings != "" || req.body.ratings) {
        updateBlock['overallratings'] = { $gte: Number(req.body.ratings) };
    }
    if (req.body.amenities.length != 0 || req.body.amenities != "") {
        updateBlock['amenities'] = { $all: req.body.amenities };
    }

    // if req.body.sortby is not empty
    if (req.body.sortby == "rates") {
        sort = 'rates.0';
    } else if (req.body.sortby == "ratings") {
        sort = 'overallratings';
    } else if (req.body.sortby == "pax") {
        sort = 'pax.0';
    }

    // if req.body.order is not empty
    if (req.body.order != "" || req.body.order) {
        order = Number(req.body.order);
    }

    sortby[sort] = order;

    console.log(updateBlock);

    /**
     * barangay
     * name
     * pax
     * minRate
     * maxRate
     * ratings
     * category
     * amenities
     * 
     * order: 1->ASC   -1->DESC
     * sort:  rates, ratings, pax
     */
    //.sort({ 'rates.0': -1 })
    Accommodation.find(
        updateBlock
    ).sort(
        sortby
    ).exec((err, accommodations) => { // finds all Accommodations that fit the searched string/word regardless of text case
        if (!err) {
            // conditional statements
            const page = req.body.page;
            const start = (page - 1) * 12;
            return res.send({ success: true, pageCount: Math.ceil(accommodations.length / 12), count: accommodations.length, posts: accommodations.slice(start, start+12) });
        } else {
            console.log(err);
            return res.send({ success: false, error: err });
        }
    });
}

export { searchAccommodation }


// reference: 
//      specific find values: https://stackoverflow.com/a/53093704
//      sort by nth element in array : https://stackoverflow.com/q/35655747