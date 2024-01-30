import reviewsModel from "../models/reviews.js";

export const getReview = async (req, res) => {
  const id = req.params.id;

  try {
    const review = await reviewsModel.findById({ _id: id });
    res.send({ success: true, review });
  } catch (error) {
    console.log(error.message);
  }
};
