import React, { useContext } from "react";
import axios from "axios";
import { Trash, Pencil } from "phosphor-react";
import { toast } from "sonner";
import { globalContext } from "../../context/generalContext";
const FormContainer = ({
  reviews,
  setReviews,
  setTitle,
  setReview,
  setIsEditTrue,
  setEditId,
  token,
  adminUser,
  id,
  loading,
  setLoading,
}) => {
  const { cookie } = useContext(globalContext);

  const deleteHandler = async (id) => {
    if (cookie.access_token) {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_DELETE_REVIEW}/${id}/${token}`
        );
        const { success, message, updatedReviews } = response.data;
        if (success) {
          setReviews(updatedReviews);
          toast.info(message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("make sure you're signed in");
    }
  };

  const editHandler = async (id) => {
    if (cookie.access_token) {
      try {
        const getReview = await axios.get(
          `${process.env.REACT_APP_GET_REVIEW}/${id}/${token}`
        );

        const { review } = getReview.data;

        setTitle(review.title);
        setReview(review.review);
        setEditId(id);
        setIsEditTrue(true);
      } catch (error) {
        console.log(error.message);
      }
    } else {
      toast.error("make sure you're signed in and try again");
    }
  };

  const isMyReview = (reviewId) => {
    if (adminUser) {
      return true;
    } else {
      return !adminUser && reviewId === id;
    }
  };

  return (
    <div className="reviews_wrapper">
      <div className="review_header">
        <p>No</p>
        <p>Title</p>
        <p>Rating</p>
        <p>Actions</p>
      </div>

      {reviews?.map((review, idx) => (
        <div className="review" key={idx}>
          <p>{idx + 1}</p>
          <p>{review.title}</p>
          <p>{review.review}</p>
          <p
            style={{
              opacity: !isMyReview(review.reviewOwner) ? 0.4 : 1,
              cursor: !isMyReview(review.reviewOwner) ? "not-allowed" : "auto",
            }}
          >
            <button
              disabled={!isMyReview(review.reviewOwner)}
              style={{
                cursor: !isMyReview(review.reviewOwner)
                  ? "not-allowed"
                  : "pointer",
              }}
              onClick={() => editHandler(review._id)}
            >
              <Pencil color="seagreen" />
            </button>
            <button
              disabled={!isMyReview(review.reviewOwner)}
              style={{
                cursor: !isMyReview(review.reviewOwner)
                  ? "not-allowed"
                  : "pointer",
              }}
              onClick={() => deleteHandler(review._id)}
            >
              <Trash color="red" />
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default FormContainer;
