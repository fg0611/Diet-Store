import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import ReviewAdd from "./ReviewAdd";
import { getProductReviews } from "../redux/actions/productActions";
import Swal from "sweetalert2";

export default function Reviews({ uuid }) {
  console.log("Rev Comp:::", uuid);
  const dispatch = useDispatch();

  //SET REVIEWS INSIDE A VARIABLE ATTACHED TO THE REDUX GLOBAL STORE
  const reviews = useSelector((store) => store.products.productReviews);
  console.log(reviews);
  //SEARCH FOR ALL PRODUCT REVIEWS
  useEffect(() => {
    dispatch(getProductReviews(uuid));
  }, [dispatch]);
  console.log(reviews);

  //CREATE A VARIABLE IN ORDER TO RENDER THE DATA FROM THE STORE
  let renderReviews;
  if (reviews.message) {
    renderReviews = <h1>No hay reseñas sobre este producto</h1>;
  } else {
    renderReviews = reviews.map((e) => {
      return <ReviewCard text={e.text} username={e.user} rating={e.rating} />;
    });
  }

  return (
    <div>
      <div>
        <ReviewAdd productUuid={uuid} />
      </div>
      <div>{renderReviews}</div>
    </div>
  );
}
