import mongoose from 'mongoose';

// How to import objects from Schema 
// const <Object Name> = mongoose.model("<Object Name>");
// Example:
// const Post = mongoose.model("Post");

// Report model placeholder <sample lang toh, hindi toh gawa ng database>
const RegisteredUser = mongoose.model("Registered_User");
const Report = mongoose.model("Report");

// Function to call when reporting an accomodation
// Description: Saves the report as an instance of the model Report. Only admins can read the reports.
const reportAcc = (req, res) => {
    const id = mongoose.Types.ObjectId(req.body.userId);
    // Report once verified that user exist
    RegisteredUser.findOne({ _id: mongoose.Types.ObjectId(req.body.userId) }, (err, document) => {
        if(!err) {
            if(document) {

                Report.create({         // create ginamit instead of save dahil parehas lang naman, lahat ng checking gagawin na lng pag tapos na front
                    images: req.body.imageArray,
                    userId: id,
                    accId: req.body.accId,
                    description: req.body.description
                });

                console.log("Accomodation Successfully Reported!");         // notif of the server side, prompt to be printed when success
                return res.send({ success: true });

            } else {
                console.log("Reporter does not exist in our system!");         // notif of the server side, prompt to be printed when fail to find user
                return res.send({ success: false, input: "userId: "+req.body.userId, error: "Reporter does not exist in our system!"});
            }
        
        } else {
            console.log("RegisteredUser collection does not exist in our system!");         // notif of the server side, prompt to be printed when fail to find user
            return res.send({ success: false, input: "userId: "+req.body.userId, error: "RegisteredUser collection does not exist in our system!"});
        }
    });
}

const homepage = (req, res) => {
    res.send("Welcome to the homepage");
}

export { reportAcc, homepage }