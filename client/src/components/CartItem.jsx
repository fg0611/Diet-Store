import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  changeProductQuantity,
} from "../redux/actions/cartActions";

//estilos
const useStyle = makeStyles({
  item: {
    marginLeft: "auto",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    alignItems: "center",
    background: "#f3f6f7",
  },
  image: {
    height: 150,
    display: "flex",
    justifyContent: "space-between",
  },
});

//function
const CartItem = ({ product }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const [productQuantity, setProductQuantity] = useState(product.qty);

  const handleChangeQuantity = (e) => {
    const { value } = e.target;
    setProductQuantity(value);
    dispatch(changeProductQuantity(product.uuid, productQuantity));
  };

  const removeProductFromCart = () =>
    dispatch(
      removeFromCart(product.uuid),
      history.push("/"),
      history.push("/cart"),
      window.scrollTo(0, 0)
    );

  return (
    <Container className={classes.item}>
      <div>
        <img className={classes.image} src={product.image} alt={product.name} />
      </div>

      <Typography variant="span">{product.name}</Typography>
      <Typography variant="span">${product.price}</Typography>
      <TextField
        type="number"
        label="cantidad"
        value={productQuantity}
        onChange={handleChangeQuantity}
      />
      <Button variant="contained" onClick={removeProductFromCart}>
        <IconButton>
          <DeleteForeverIcon />
        </IconButton>
      </Button>
    </Container>
  );
};

export default CartItem;
