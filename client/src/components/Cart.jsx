import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CartItem from "../components/CartItem";
import { Button } from "@material-ui/core";
import CartTotal from "../components/CartTotal";
import { makeStyles } from "@material-ui/core/styles";
import { cartReset } from "../redux/actions/cartActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyle = makeStyles({
  cart: {
    marginLeft: "0px",
  },
  title: {
    color: "gray",
  },
});

const Cart = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const cartInLocal = localStorage.getItem("cart");
  // Parse JSON string to object
  const cartItems = JSON.parse(cartInLocal);
  const history = useHistory();
  const handleEmptyCart = () =>
    dispatch(
      cartReset(),
      history.push("/"),
      history.push("/cart"),
      window.scrollTo(0, 0)
    );

  //esto va a mostrar todos los productos que tiene un usuario en su carrito//y mostraremos los items cart y el total cart
  return (
    <Container className={classes.cart}>
      <div>
        <h4 className={classes.title}>mis productos</h4>
      </div>{" "}
      <hr />
      <Container>
        <Container>
          {cartItems.map((product) => (
            <CartItem product={product} />
          ))}
        </Container>
      </Container>
      <hr />
      <Button variant="contained" onClick={handleEmptyCart}>
        Vaciar Carrito
      </Button>
      <Container></Container>
    </Container>
  );
};

export default Cart;
