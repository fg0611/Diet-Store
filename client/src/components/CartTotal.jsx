import React, { useState, useEffect } from "react";
import { Container, Typography, Button } from "@material-ui/core";
import { useSelector } from "react-redux";

export const CartTotal = () => {
  const [total, setTotal] = useState(0);

  //const dispatch = useDispatch();
  // Retrieve the JSON string
  let cartInLocal = localStorage.getItem("cart");
  // Parse JSON string to object
  let cartItems = JSON.parse(cartInLocal);

  let sumProduct = 0;
  for (let item of cartItems) {
    sumProduct += item.price * item.qty;
  }
  useEffect(() => {
    setTotal(sumProduct);
  }, [cartItems]);

  return (
    <Container>
      <Typography> total: {total}</Typography>
    </Container>
  );
};

export default CartTotal;
