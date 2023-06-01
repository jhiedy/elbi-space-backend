import { newAccommodation } from "./addAccom.js";
import { archiveAccommodation } from "./archiveAccom.js";
import { login, checkIfLoggedIn, verifiedUserType } from "./login.js";
import { signUpRegUser, signUpAccOwner, verifyUser } from "./signup.js";
import { deleteAccAdmin, deleteAccOwner } from "./deleteAccommodation.js";
import { deleteReport } from "./deleteReport.js";
import { reportAcc } from "./reportAcc.js";
import { rateAndReview, findExistingReview } from "./rateReviewAccom.js";
import { viewReviewList } from "./viewReviews.js";
import { searchAccommodation } from "./searchAccom.js";
import { viewAccommodation } from "./viewAccom.js";
import { retrieveAccom } from "./retrieveAccom.js"
import { retrieveReviews } from "./retrieveReviews.js"
import { findUser } from "./findUser.js";
// import { deleteAcc } from "./deleteAcc.js";
import { retrieveDimensions, uploadImage, retrieveImage } from "./imagehandler.js";
import { topApt } from "./getTop.js";
import { addBookmark, removeBookmark, retrievebookmarked, checkBookmark } from "./addBookmark.js";
import { getReport } from "./generateReport.js";
import { retrieveOwnerAccom } from "./retrieveOwnerAccom.js";
import handler from "./upload.js";
import { editAccommodation } from "./editAccom.js";
import { editUserWithoutPasswordChange, editUserWithPasswordChange } from "./editUser.js";

const homepage = (req, res) => {
  res.send("Welcome to the homepage");
}

const setUpRoutes = (app) => {

  // landing page
  app.post("/signup-user", signUpRegUser);
  app.post("/signup-accommodation-owner", signUpAccOwner);
  app.post("/login", login);
  app.post("/verifiedUserType", verifiedUserType);
  app.post("/checkifloggedin", checkIfLoggedIn);
  app.post("/retrieveAccom", retrieveAccom);
  app.get("/topCategory", topApt);

  // search page
  app.post("/searchAccom", searchAccommodation);
  app.get("/viewAccom", viewAccommodation);

  // accommodation  page
  app.post("/reportAcc", reportAcc);
  app.post("/addRateAndReview", rateAndReview);
  app.post("/findExistingReview", findExistingReview);
  app.post("/retrieveReviews", retrieveReviews);
  app.get("/viewReviewList", viewReviewList); // disregard, duplicate of previous line
  app.post("/add-bookmark", addBookmark);
  app.post("/remove-bookmark", removeBookmark);
  app.post("/check-bookmark", checkBookmark);
  app.post("/edit-accommodation", editAccommodation);

  // owner page
  app.post("/addAccommodation", newAccommodation);
  app.post("/archiveAccom", archiveAccommodation);
  app.post("/deleteAccOwner", deleteAccOwner);
  app.post("/retrieved-bookmarked", retrievebookmarked);
  app.post("/generate-report", getReport);
  app.post("/retrieveOwnerAccommodations", retrieveOwnerAccom);
  app.post("/edit-user-without-pword", editUserWithoutPasswordChange);
  app.post("/edit-user-with-pword", editUserWithPasswordChange);
  // use /viewAccom to retrieve data of an accommodation owner clicks an accommodation


  app.post("/deleteAccAdmin", deleteAccAdmin);

  // not sure what page
  app.get("/api/auth/confirm/:confirmationCode", verifyUser);
  app.post("/retrieveDimensions", retrieveDimensions);
  // app.post("/uploadImage", uploadImage);
  app.post("/uploadImage", handler);
  app.post("/retrieveImage", retrieveImage);
  app.post("/deleteReport", deleteReport);
  app.post("/find-user", findUser);
}

export default setUpRoutes;