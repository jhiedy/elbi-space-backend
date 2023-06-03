import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { config } from './config/auth.config.js';

// import collections
const RegisteredUser = mongoose.model("Registered_User");
const AccommodationOwner = mongoose.model("Accommodation_Owner");
const Admin = mongoose.model("Admin");

// Function to find and check for user type based on credentials
// Description: Finds instance of user's account from all collections and determines their user type
async function checkUserType(email, password, res) {
  // find all instances of user in all collections using email 
  const [user, owner, admin] = await Promise.all([
    RegisteredUser.findOne({ email }),
    AccommodationOwner.findOne({ email }),
    Admin.findOne({ email }),
  ]);
  // check if user was found
  if (!user && !owner && !admin) {
    console.log("Account not found!");
    res.send({ success: false , message: "Account not found!"});
    return { userType: null, role: null };
  }
  // determine and return user type as well as check if password matches
  if (user && await bcrypt.compare(password, user.password)) {
    if (owner && await bcrypt.compare(password, owner.password)) {
      return res.send({
        success: false,
        message: "Verify user type.",
        userId: user._id,
        userStatus: user.status,
        ownerId: owner._id,
        ownerStatus: owner.status,
      });
    }
    return { userType: user, role: "user" };
  }

  if (owner && await bcrypt.compare(password, owner.password)) {
    return { userType: owner, role: "owner" };
  }

  if (admin && await bcrypt.compare(password, admin.password)) {
    return { userType: admin, role: "admin" };
  }

  console.log(" Wrong password. ")
  res.send({ success: false , message: "Wrong password."});
  return { userType: null, role: null };
}

// Function to call for logging in
// Description: checks if password is correct and email is verified
const login = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const password = req.body.password;

    // find and check user type
    const { userType, role } = await checkUserType(email, password, res);
    if (userType && role){
      // check if user has verified their email
      if (userType.status != "Active") {
        return res.status(401).send({ message: "Pending Account. Please Verify Your Email!" });
      } 
  
      // If no errors were encountered, create a token for authentication and authorization
      console.log("Successfully logged in");
      const tokenPayload = {
          _id: userType._id,
          role
      }
      const secretKey = config.secret;
      const token = jwt.sign(tokenPayload, secretKey);
      // res.cookie('authToken', token, {
      //   domain: 'elbi-space.vercel.app', // Replace with your actual domain
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: 'none',
      //   maxAge: 60 * 60 * 1000, // Set maxAge to 1 hour (in milliseconds)
      // });
      // return the token to the client
      return res.send({ success: true, token, id: userType._id, message: "Successfully logged in.", userType: role });
    }
  // Catch server-side errors encountered
  } catch (error) { 
      console.log(error);
      res.status(500).json({ message: 'Something went wrong' });
      return res.send({ success: false });
  }
}

// Function to call for logging in after user has verified user type
// Description: Checks user type and proceed to login
const verifiedUserType = async (req, res) => {
  try {  
    let id, role, status;
    console.log("Verifying user type: ");
    console.log(req.body.userType);
    if (req.body.userType === "RegisteredUser"){
      id = req.body.userId;
      role = "user";
      status = req.body.userStatus
    } else {
      id = req.body.ownerId;
      role = "owner";
      status = req.body.ownerStatus
    }
    // check if email has been verified
    if (status != "Active") {
      return res.status(401).send({ message: "Pending Account. Please Verify Your Email!" });
    } 
    // If no errors were encountered, create a token for authentication and authorization
    console.log("Successfully logged in");
    const tokenPayload = {
        _id: id,
        role
    }
    const secretKey = config.secret;
    const token = jwt.sign(tokenPayload, secretKey);
    // res.cookie('authToken', token, {
    //   domain: 'elbi-space.vercel.app', // Replace with your actual domain
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   maxAge: 60 * 60 * 1000, // Set maxAge to 1 hour (in milliseconds)
    // });
    // return the token to the client
    return res.send({ success: true, token, id: id, message: "Successfully logged in.", userType: role });
  // Catch server-side errors encountered
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
    return res.send({ success: false });
  }
}

// Function to call for checking if there is a currently logged in user
// Description: Checks and validates received token for the client
const checkIfLoggedIn = (req, res) => {
  try {
    // console.log("entered try");
    // if (!req.cookies || !req.cookies.authToken) {
    //   // No cookies / no authToken cookie sent
    //   return res.send({ isLoggedIn: false, error: 'No cookie sent' });
    // }
    const { token } = req.body;

    if (!token) {
      // No token present in the request body
      return res.send({ isLoggedIn: false });
    }
    // Token is present. Validate it
    return jwt.verify(
      // req.cookies.authToken,
      token,
      config.secret,
      async (err, tokenPayload) => {
        if (err) {
          // Error validating token
          return res.send({ isLoggedIn: false, error: 'Invalid token' });
        }
        // find user by id indicated in token
        const userId = tokenPayload._id;
        const [user, owner, admin] = await Promise.all([
          RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(userId) }),
          AccommodationOwner.findOne({ _id: mongoose.Types.ObjectId(userId) }),
          Admin.findOne({ _id: mongoose.Types.ObjectId(userId) }),
        ]);
        // Failed to find user based on id inside token payload
        if (!user && !owner && !admin) {
          return res.send({ isLoggedIn: false, error: 'User not found' });
        }
        
        //Token and user id are valid
        console.log("User is currently logged in");
        return res.send({ isLoggedIn: true });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
    return res.send({ success: false });
  }
}

// Export all needed functions to be exported in router.js
export { login, checkIfLoggedIn, verifiedUserType }