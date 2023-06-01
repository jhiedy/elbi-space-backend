import mongoose from 'mongoose';
// import jwt from 'jsonwebtoken';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");

const RegisteredUser = mongoose.model("Registered_User");
const Accommodation = mongoose.model("Accommodation");

function bookmark(req, res, flag) {
    RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(req.body.userId) }, (err, user) => {
        if (!err && user) {
            Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, (err, accom) => {
                if (!err && accom) {

                    // if object id needs to be stored
                    // user.bookmarks.push(mongoose.Types.ObjectId(req.body.accId));    // append accomodation id to user bookmarks list
                    // user.save();

                    // if id as string needs to be stored
                    if(flag == 1){
                        user.bookmarks.push(req.body.accId);    // append accomodation id to user bookmarks list
                        user.save();
                    } else { 
                        user.bookmarks.pull(req.body.accId);
                        user.save();                    
                    }

                    return res.send({ success: true });
                }
            });
        } else {
            return res.send({ success: false });
        }
    });
}

const removeBookmark = (req, res)=> {
    bookmark(req, res, 0);
}

const addBookmark = (req, res) => {
    bookmark(req, res, 1);
}

function retrievebookmarked(req, res) {
    // let bookmarked = [];
    RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(req.body.userId) }, (err, user) => {
        if (!err && user) {
            const bookmarked = user.bookmarks;
            const bList = [];

            for (let i = 0; i < bookmarked.length ; i++) {
                bList.push(mongoose.Types.ObjectId(bookmarked[i]));
            }

            Accommodation.find({'_id': { $in:bList }}, (err, items) => {
                if (!err) {
                    console.log(items);
                    res.send({success: true, items: items.reverse()});
                } else {
                    res.send({success: false});
                }
            })
        } else {
            res.send({success: false});
        }
    });

    // const items = [];
    // for (let i = 0; i < bookmarked.length ; i++) {
    //     await Accommodation.findOne({ _id: mongoose.Types.ObjectId(bookmarked[0]) }, (err, accom) => {
            // if (!err && accom) {
            //     console.log(accom);
            //     items.push(accom);
            // } else {
            //     res.send({success: false});
            // }
    //     })
    // }
    // res.send({success: true, items: items});
}

const checkBookmark = (req, res) => {
    RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(req.body.userId) }, (err, user) => {
        if (!err && user) {
            const result = user.bookmarks.find(acc => acc == req.body.accId);
            // console.log(result);
            if(result) {
                res.send({success: true, bookmarked: true});
            } else {
                res.send({success: true, bookmarked: false});
            }
        } else {
            res.send({success: false});
        }
    })
}


export { addBookmark, removeBookmark, retrievebookmarked, checkBookmark }