import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "sonner";

import "./dashboard.css";
import Form from "./Form";
import FormContainer from "./FormContainer";
import { globalContext } from "../../context/generalContext.js";
import { useGetUserId } from "../../hooks/useGetUserId.js";

const Dashboard = () => {
  const { cookie, id } = useContext(globalContext);

  const token = cookie.access_token;
  const [adminUser, setAdminUser] = useState(false);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isEditTrue, setIsEditTrue] = useState(false);
  const [editId, setEditId] = useState("");

  const { userId } = useGetUserId();

  useEffect(() => {
    if (!cookie.access_token || cookie.access_token == "undefined") {
      window.localStorage.removeItem("userId");
    }
  }, []);

  const isThereUserId = () => userId !== null && userId !== "";

  const getReviews = async () => {
    const response = await axios.get(process.env.REACT_APP_GET_REVIEWS);
    const { allReviews, success } = response.data;

    if (success) {
      setReviews(allReviews);
    } else {
      toast.info("Retry amigo!");
    }
  };

  const determineAdmin = async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_DETERMINE_ADMIN, {
        id,
      });

      const { isAdmin } = response.data;
      setAdminUser(isAdmin);
    } catch (error) {
      console.log(error.message);
    }
  };
  const myReviews = reviews.filter((review) => review.reviewOwner === id);

  const determineMyReviews = () => {
    getReviews();
    determineAdmin();
  };

  useEffect(() => {
    determineMyReviews();
  }, []);

  return (
    <div className="dashboard_wrapper">
      <h3>Movie Review Hub</h3>
      <Form
        title={title}
        review={review}
        setReviews={setReviews}
        setReview={setReview}
        setTitle={setTitle}
        isEditTrue={isEditTrue}
        setIsEditTrue={setIsEditTrue}
        editId={editId}
        token={token}
        isThereUserId={isThereUserId}
        userId={userId}
      />
      <FormContainer
        reviews={reviews}
        setReviews={setReviews}
        setReview={setReview}
        setTitle={setTitle}
        title={title}
        review={review}
        isEditTrue={isEditTrue}
        setIsEditTrue={setIsEditTrue}
        setEditId={setEditId}
        token={token}
        adminUser={adminUser}
        myReviews={myReviews}
        id={id}
      />
    </div>
  );
};

export default Dashboard;
