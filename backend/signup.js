import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { emailConfirmation } from './config/nodemailer.config.js';
import { config } from './config/auth.config.js';

const RegisteredUser = mongoose.model("Registered_User");
const AccommodationOwner = mongoose.model("Accommodation_Owner");

// Function to call for registered user sign up
// Description: Creates a new instance of the RegisteredUser and saves it to the database
const signUpRegUser = (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password;
        // Check first if user is already registered, i.e. e-mail has already been used
        RegisteredUser.findOne({ email: email }, async (err, user) => {
            if(!err){
                if(!user){
                    // Apply basic hashing to plaintext password before storing it
                    // **Remove this if functionality is already added to the RegisteredUser Model
                    const hashedPassword = await bcrypt.hash(password, 10); 
                    // create a token for the confirmation code needed for verifying the user's email
                    const token = jwt.sign({email: req.body.email}, config.secret)
                    // Create a new instance of RegisteredUser
                    const newUser = new RegisteredUser({
                        email: email,
                        password: hashedPassword,
                        fname: req.body.fname,
                        lname: req.body.lname,
                        history: [],
                        bookmarks: [],
                        bday: req.body.bday,
                        contact: req.body.contact,
                        confirmationCode: token,
                    });
                    // For checking on backend side
                    console.log("New user: ");
                    console.log(newUser);

                    // Save new user to database, return response if successful or not
                    newUser.save((err) => {
                        if (err) { 
                            console.log(err);
                            return res.send({ success: false, message: "Error encountered in saving user to database." }); 
                        }
                        else { 
                            emailConfirmation(
                                newUser.fname, 
                                newUser.lname, 
                                newUser.email, 
                                newUser.confirmationCode
                            );
                            return res.send({ success: true, message: "Successfully signed up! Please confirm your email." }); 
                        }
                    });
                // Existing user was found
                } else{ 
                    console.log("User already exists.")
                    return res.send({ success: false, message: "Email already used for user account." });
                }
            // Error encountered
            } else{ 
                console.log("Error encountered when searching for user..")
                return res.send({ success: false, message: "Error encountered when searching for user." });
            }
        })
    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to call for accomodation owner signup
// Description: Creates a new instance of the AccommodationOwner and saves it to the database
const signUpAccOwner = (req, res) => {
    try {
        const email = req.body.email.trim();
        const password = req.body.password;
                // Check first if user is already registered, i.e. e-mail has already been used
                AccommodationOwner.findOne({ email: email }, async (err, owner) => {
                    if(!err){
                        if(!owner){
                            // Apply basic hashing to plaintext password before storing it
                            // **Remove this if functionality is already added to the RegisteredUser Model
                            const hashedPassword = await bcrypt.hash(password, 10); 
                            // create a token for the confirmation code needed for verifying the user's email
                            const token = jwt.sign({email: req.body.email}, config.secret)
                            // Create a new instance of RegisteredUser
                            const newOwner = new AccommodationOwner({
                                // userId: req.body.userId,
                                email: email,
                                password: hashedPassword,
                                fname: req.body.fname,
                                lname: req.body.lname,
                                accomsList: [],
                                rating: 0,
                                overallratings: 0,
                                contact: req.body.contact,
                                bday: req.body.bday,
                                confirmationCode: token,
                                profilePicture: "https://res.cloudinary.com/dallscgfp/image/upload/v1685442497/qxxj8a7xexjpfdmeva19.png"
                            });
                            // For checking on backend side
                            console.log("New user: ");
                            console.log(newOwner);

                            // Save new user to database, return response if successful or not
                            newOwner.save((err) => {
                                if (err) { 
                                    console.log(err);
                                    return res.send({ success: false, message: "Error encountered in saving user to database." }); 
                                }
                                else { 
                                    emailConfirmation(
                                        newOwner.fname, 
                                        newOwner.lname, 
                                        newOwner.email, 
                                        newOwner.confirmationCode
                                    );
                                    return res.send({ success: true, message: "Successfully signed up! Please confirm your email." }); 
                                }
                            });
                        // Existing user was found
                        } else{ 
                            console.log("User already exists.")
                            return res.send({ success: false, message: "Email already used for owner account." });
                        }
                    // Error encountered
                    } else{ 
                        console.log("Error encountered when searching for user..")
                        return res.send({ success: false, message: "Error encountered when searching for user." });
                    }
                })
    // Catch server-side errors encountered
    } catch (error) { 
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Function to call for verifying user email
// Description: Change the user's status from Pending to Active, allowing the user to log in
// Tutorial: https://betterprogramming.pub/how-to-create-a-signup-confirmation-email-with-node-js-c2fea602872a
// FOR FRONTEND: Refer to Step 5 of the tutorial for what to do with next after confirming email.
const verifyUser = async (req, res, next) => {
    try {
        let userType;
        // search for user based on confirmation code
        const [user, owner] = await Promise.all([
            RegisteredUser.findOne({ confirmationCode: req.params.confirmationCode }),
            AccommodationOwner.findOne({ confirmationCode: req.params.confirmationCode }),
        ]);
        console.log(req.params.confirmationCode)
        // check if user exists
        if (!user && !owner) {
            return res.status(404).send({ message: "User Not found." });
        }
        // determine user type
        if (user){
            userType = user;
        }
        if (owner){
            userType = owner;
        }
        // set status to active
        userType.status = "Active";
        userType.save((err) => {
            if (err) {
                return res.status(500).send({ message: err });;
            }
            else{
                res.redirect('https://elbi-space.vercel.app');
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { signUpRegUser, signUpAccOwner, verifyUser }