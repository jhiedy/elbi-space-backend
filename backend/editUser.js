import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import './controller.js';

const RegisteredUser = mongoose.model("Registered_User");
const AccommodationOwner = mongoose.model("Accommodation_Owner");
const Admin = mongoose.model("Admin");

async function editUserWithPasswordChange(req, res) {
    const userType = req.body.userType;
    const id = mongoose.Types.ObjectId(id);

    console.log(id);
    console.log(userType);

    if(userType == "owner"){

        const owner = await AccommodationOwner.findOne({ _id: id });
        // const hashedOldPassword = await bcrypt.hash(req.body.oldPassword, 10); 

        if (await bcrypt.compare(req.body.oldPassword, owner.password)) {

            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10); 
            // Check if the user and the password is correct
            AccommodationOwner.updateOne({ _id: id },
                {
                    $set: {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        password: hashedPassword,
                        bday: req.body.bday,
                        contact: req.body.contact,
                        profilePicture: req.body.profilePicture
                    }
                },
            function (err) {
                if (!err) {
                    res.send({ success: true, message: "Owner detail's edited successfully!" })
                } else {
                    res.send({ success: false, message: "Failed to edit owner details!" })
                }
            })
        }
        else{
            res.send({success: false, message: "Wrong password!"})
        }
    }
    else if(userType == "user"){
        
        const user = await RegisteredUser.findOne({ _id: id });
        // const hashedOldPassword = await bcrypt.hash(req.body.oldPassword, 10); 

        if (await bcrypt.compare(req.body.oldPassword, user.password)) {

            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10); 
            // Check if the user and the password is correct
            RegisteredUser.updateOne({ _id: id },
                {
                    $set: {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        password: hashedPassword,
                        bday: req.body.bday,
                        contact: req.body.contact,
                        profilePicture: req.body.profilePicture
                    }
                },
            function (err) {
                if (!err) {
                    res.send({ success: true, message: "User detail's edited successfully!" })
                } else {
                    res.send({ success: false, message: "Failed to edit user details!" })
                }
            })
        }
        else{
            res.send({success: false, message: "Wrong password!"})
        }
    }
    else{
        const admin = await Admin.findOne({ _id: id });
        // const hashedOldPassword = await bcrypt.hash(req.body.oldPassword, 10); 

        if (await bcrypt.compare(req.body.oldPassword, admin.password)) {

            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10); 
            // Check if the user and the password is correct
            Admin.updateOne({ _id: id },
                {
                    $set: {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        password: hashedPassword,
                        bday: req.body.bday,
                        contact: req.body.contact,
                        profilePicture: req.body.profilePicture
                    }
                },
            function (err) {
                if (!err) {
                    res.send({ success: true, message: "Admin detail's edited successfully!" })
                } else {
                    res.send({ success: false, message: "Failed to edit admin details!" })
                }
            })
        }
        else{
            res.send({success: false, message: "Wrong password!"})
        }
    }
}

const editUserWithoutPasswordChange = (req, res) => {
    const userType = req.body.userType;
    const id = mongoose.Types.ObjectId(id);

    console.log(id);
    console.log(userType);

    if(userType == "owner"){
        // Check if the user and the password is correct
        AccommodationOwner.updateOne({ _id: id },
            {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    bday: req.body.bday,
                    contact: req.body.contact,
                    profilePicture: req.body.profilePicture
                }
            },
        function (err) {
            if (!err) {
                res.send({ success: true, message: "Owner detail's edited successfully!" })
            } else {
                res.send({ success: false, message: "Failed to edit owner details!" })
            }
        })
    }
    else if(userType == "user"){
        // Check if the user and the password is correct
        RegisteredUser.updateOne({ _id: id },
            {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    bday: req.body.bday,
                    contact: req.body.contact,
                    profilePicture: req.body.profilePicture
                }
            },
        function (err) {
            if (!err) {
                res.send({ success: true, message: "User detail's edited successfully!" })
            } else {
                res.send({ success: false, message: "Failed to edit user details!" })
            }
        })
    }
    else{
        // Check if the user and the password is correct
        Admin.updateOne({ _id: id },
            {
                $set: {
                    fname: req.body.fname,
                    lname: req.body.lname,
                    bday: req.body.bday,
                    contact: req.body.contact,
                    profilePicture: req.body.profilePicture
                }
            },
        function (err) {
            if (!err) {
                res.send({ success: true, message: "Admin detail's edited successfully!" })
            } else {
                res.send({ success: false, message: "Failed to edit admit details!" })
            }
        })
    }
}


export { editUserWithPasswordChange,  editUserWithoutPasswordChange}