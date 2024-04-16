import React, { useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import { useGetUserId } from "../../hooks/useGetUserId";

import { globalContext } from "../../context/generalContext.js";
const Form = ({
  title,
  review,
  setTitle,
  setReview,
  setReviews,
  isEditTrue,
  setIsEditTrue,
  editId,
  token,
  loading,
  setLoading
}) => {
  const { isUserLoggedIn } = useContext(globalContext);
  const userId = useGetUserId();

  const clearInputs = () => {
    setTitle("");
    setReview("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isUserLoggedIn()) {
      return toast.error("login to your account to proceed");
    }

    if (title === "" || review === "") {
      return toast.error("Ensure all fields  are filled");
    }

    if (review > 10 || review < 0) {
      return toast.error("ratings range from 1-10");
    }

    try {
      if (!isEditTrue) {
        const response = await axios.post(process.env.REACT_APP_ADD_REVIEW, {
          title,
          review,
          userId,
          token,
        });

        const { message, success, reviews } = await response.data;

        if (success) {
          setReviews(reviews);

          toast.success(message);
        }

        clearInputs();
      } else {
        const response = await axios.post(process.env.REACT_APP_EDIT_REVIEW, {
          id: editId,
          title,
          review,
          token,
        });

        const { message, success, updatedReviews } = response.data;
        if (success) {
          setReviews(updatedReviews);
          setIsEditTrue(false);
          toast.success(message);
          clearInputs();
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form className="form_wrapper">
      <div className="input_wrapper">
        <input
          type="text"
          placeholder="movie title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          value={review}
          placeholder="rating(1-10)...
        "
          onChange={(e) => setReview(e.target.value)}
        />
      </div>
      <button onClick={submitHandler}>
        {isEditTrue ? "EditReview" : "AddReview"}
      </button>
    </form>
  );
};

export default Form;
