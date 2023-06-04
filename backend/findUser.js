import mongoose from 'mongoose';
import './controller.js';

const RegisteredUser = mongoose.model("Registered_User");
const AccommodationOwner = mongoose.model("Accommodation_Owner");
const Admin = mongoose.model("Admin");

const findUser = (req, res) => {
    const userType = req.body.userType;
    const id = req.body.id;

    console.log(id);
    console.log(userType);

    if(userType === "owner"){
        // Check if the user and the password is correct
        AccommodationOwner.findOne({ _id: id }, (err, owner) => {
            // If the user doesn't exist
            if (err || !owner){
                return res.send({ success: false, message: "Accommodation owner doesn't exist!"});
            }
            return res.send({success: true, user: owner})
        })
    }
    else if(userType === "user"){
        RegisteredUser.findOne({ _id: id }, (err, user) => {
            // If the user doesn't exist
            if (err || !user){
                return res.send({ success: false, message: "Registered user doesn't exist!"});
            }
            return res.send({success: true, user: user, message: "Successfully found user!"})
        })
    }
    else{
        Admin.findOne({ _id: id }, (err, admin) => {
            // If the admin doesn't exist
            if (err || !admin){
                return res.send({ success: false, message: "Admin doesn't exist!"});
            }
            return res.send({success: true, user: admin})
        })
    }
}


export { findUser }