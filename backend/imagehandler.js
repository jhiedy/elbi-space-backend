import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import imageSize from 'image-size';
import { cloudinaryConfig } from "./config/cloudinary_config.js";

const Accommodation = mongoose.model("Accommodation");

// Fetch dimensions
const retrieveDimensions = (req, res) => {
    imageSize(req.body.dir, (err, dimension) => {
        if (err) {
            console.log(err)                
            return res.send({ success: false });
        }  else {
            console.log("Height="+dimension.height+", Width="+dimension.width)
            return res.send({ success: true, width: dimension.width, height: dimension.height });
        }
    })
}

// Upload
const uploadImage = (req, res) => {
    const response = cloudinary.uploader.upload(req.body.dir)

    response.then((data) => {
        return res.send({success: true, image: data.secure_url})

    }).catch((err) => {
        console.log(err);
        return res.send({ success: false, message: err });
    });
}

// Generate 
const retrieveImage = (req, res) => {
    Accommodation.findOne({ _id: mongoose.Types.ObjectId(req.body.accId) }, (err, document) => {
        if(!err) {
            if(document) {
                console.log(document);
                return res.send({ success: true, images: document.images});
            } else {
                return res.send({ success: false, message: err });
            }
        } else {
            return res.send({ success: false, message: err });
        }
    })
}


export { retrieveDimensions, uploadImage, retrieveImage }