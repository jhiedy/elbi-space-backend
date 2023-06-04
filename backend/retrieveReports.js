import mongoose from 'mongoose';

const Report = mongoose.model("Report");
const Accommodation = mongoose.model("Accommodation");
const RegisteredUser = mongoose.model("Registered_User");

// Description: show accomodations by 
const retrieveReports = async (req, res) => {
    try {
      const reports = await Report.find({});
      const usersArray = [];
      const accomsArray = [];
  
      for (const report of reports) {
        const userId = mongoose.Types.ObjectId(report.userId);
        const accId = mongoose.Types.ObjectId(report.accId);
  
        const user = await RegisteredUser.findOne({ _id: userId });
        if (user) {
        //   console.log("Adding user reportee");
          usersArray.push(user);
          
        } else {
          console.log("Reportee not found");
        }
  
        const accom = await Accommodation.findOne({ _id: accId });
        if (accom) {
        //   console.log("Adding reported accom");
          accomsArray.push(accom);
        } else {
          console.log("Accommodation not found");
        }
      }
  
    //   console.log("Here");
    //   console.log(usersArray);
    //   console.log(accomsArray);
      return res.send({ success: true, reports: reports, users: usersArray, accoms: accomsArray, message: "Successfully retrieved reported accommodations!"});
    } catch (error) {
      console.log(error);
      return res.send({
        success: false,
        message: "Failed to retrieve reported accommodations.",
      });
    }
  };
  
export { retrieveReports }