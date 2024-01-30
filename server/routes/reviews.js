import express from "express";
import addReviewController from "../controller/addReviewController.js";
import { getReviews } from "../controller/getReviews.js";
import { deleteReview } from "../controller/deleteReview.js";
import { editReview } from "../controller/editReview.js";
import { getReview } from "../controller/getReview.js";
import {
  verifyParamsToken,
  verifyPostToken,
} from "../middleware/verifyToken.js";
import { isUserAdmin } from "../middleware/isUserAdmin.js";
import { determineAdmin } from "../controller/determineAdmin.js";

const router = express.Router();

router.post("/add_review", verifyPostToken, addReviewController);
router.get("/get_reviews", getReviews);
router.delete("/delete_review/:id/:token", verifyParamsToken, deleteReview);
router.post("/edit_review", verifyPostToken, editReview);
router.get("/get_review/:id/:token", verifyParamsToken, getReview);
router.post("/determine_admin", determineAdmin);

export { router as reviewsRoute };
