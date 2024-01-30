import reviewsModel from "../models/reviews.js";

export const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const reviewToBeDeleted = await reviewsModel.findByIdAndDelete({
      _id: reviewId,
    });

    const reviews = await reviewsModel.find({}).sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "review successfully deleted",
      updatedReviews: reviews,
    });
  } catch (error) {
    console.log(error.message);
  }
};
