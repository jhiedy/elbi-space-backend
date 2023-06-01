// Import mongoose
import mongoose from 'mongoose';
// const mongoose = require("mongoose");
// Add setup lines of code such as mongoose.connect
// mongoose.connect("mongodb://localhost:27017/DBTeam");

// Create a mongoose model, define a schema directly in the model
const RegisteredUser = new mongoose.model("Registered_User", {
    // userId: String,
    profilePicture: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    history: Array,
    bookmarks: Array,
    bday: { type: Date, required: true },
    contact: { type: String, required: true },
    // added for email confirmation
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
});

// Create a mongoose model, define a schema directly in the model
const Admin = new mongoose.model("Admin", {
    profilePicture: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    contact: { type: String, required: true },
    bday: { type: Date, required: true },
});

// // Create a mongoose model, define a schema directly in the model
const AccommodationOwner = new mongoose.model("Accommodation_Owner", {
    profilePicture: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    accomsList: Array,
    ratings: { type: Array, required: true },
    overallratings: { type: Number, required: true },
    contact: { type: String, required: true },
    bday: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending'
    },
    confirmationCode: {
        type: String,
        unique: true
    },
});


// Create a mongoose model, define a schema directly in the model
const Accommodation = new mongoose.model("Accommodation", {
    images: Array,
    ownerId: { type: String, required: true },
    name: { type: String, required: true },
    pax: { type: Array, required: true },
    rates: { type: Array, required: true },
    paymentSchedule: { type: String, required: true },
    longitude: Number,
    latitude: Number,
    location: { type: String, required: true },
    barangay: { type: String, required: true },
    ratings: { type: Array, required: true },
    overallratings: { type: Number, required: true },
    amenities: Array,
    description: String,
    rules: String,
    policy: String,
    availability: { type: Boolean, required: true },
    category: { type: String, required: true },
    archiveStatus: { type: Boolean, required: true }
});

const Report = new mongoose.model("Report", {
    userId: { type: String, required: true },
    accId: { type: String, required: true },
    description: { type: String, required: true },
    images: Array
});

// Review
const Review = new mongoose.model("Review", {
    userId: { type: String, required: true },
    accId: { type: String, required: true },
    description: String,
    rating: { type: Number, required: true },
});

const homepage = (req, res) => {
    res.send("Welcome to the homepage");
}

export { homepage }