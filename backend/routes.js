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
  app.post("/api/signup-user", signUpRegUser);
  app.post("/api/signup-accommodation-owner", signUpAccOwner);
  app.post("/api/login", login);
  app.post("/api/verifiedUserType", verifiedUserType);
  app.post("/api/checkifloggedin", checkIfLoggedIn);
  app.post("/api/retrieveAccom", retrieveAccom);
  app.get("/api/topCategory", topApt);

  // search page
  app.post("/api/searchAccom", searchAccommodation);
  app.get("/api/viewAccom", viewAccommodation);

  // accommodation  page
  app.post("/api/reportAcc", reportAcc);
  app.post("/api/addRateAndReview", rateAndReview);
  app.post("/api/retrieveReviews", retrieveReviews);
  app.get("/api/viewReviewList", viewReviewList); // disregard, duplicate of previous line
  app.post("/api/findExistingReview", findExistingReview);
  app.post("/api/add-bookmark", addBookmark);
  app.post("/api/remove-bookmark", removeBookmark);
  app.post("/api/check-bookmark", checkBookmark);
  app.post("/api/edit-accommodation", editAccommodation);

  // owner page
  app.post("/api/addAccommodation", newAccommodation);
  app.post("/api/archiveAccom", archiveAccommodation);
  app.post("/api/deleteAccOwner", deleteAccOwner);
  app.post("/api/retrieved-bookmarked", retrievebookmarked);
  app.post("/api/generate-report", getReport);
  app.post("/api/retrieveOwnerAccommodations", retrieveOwnerAccom);
  app.post("/api/edit-user-without-pword", editUserWithoutPasswordChange);
  app.post("/api/edit-user-with-pword", editUserWithPasswordChange);
  // use /viewAccom to retrieve data of an accommodation owner clicks an accommodation


  app.post("/api/deleteAccAdmin", deleteAccAdmin);

  // not sure what page
  app.get("/api/auth/confirm/:confirmationCode", verifyUser);
  app.post("/api/retrieveDimensions", retrieveDimensions);
  // app.post("/uploadImage", uploadImage);
  app.post("/api/uploadImage", handler);
  app.post("/api/retrieveImage", retrieveImage);
  app.post("/api/deleteReport", deleteReport);
  app.post("/api/find-user", findUser);
}

export default setUpRoutes;