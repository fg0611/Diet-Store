import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { findProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import Reviews from "./Reviews";
import ProductRating from "./ProductRating";

import clsx from "clsx";
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    boxShadow: "0 0 30px",
    marginLeft: "500px",
    background: "#f3f6f7",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductDetail({ location }) {
  const { pathname } = location;
  const uuid = pathname.split("/")[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findProduct(uuid));
  }, [dispatch]);

  const [count, setCount] = useState(0);
  const defaultImg =
    "https://lh3.googleusercontent.com/proxy/lDX77oEN-GsT0mLlLb6s3Y0sf3-EG9S3dqBV7cOsOrSSJ9_mlEtMb9I-nIj469riZT-Q3EA2N4nP6gzt-iwoSuOR_Fihd8cC";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const detail = useSelector((store) => store.products.product);
  //const cart = useSelector((store) => store.cart.cartItems);
  console.log("UUID PRODUCT DETAIL", detail.uuid);

  function handleChange(e) {
    setCount(e.target.value);
    if (detail.stock < count) {
      setCount(detail.stock);
      e.target.value = detail.stock;
    }
  }
  //agregarAlCarrito
  function handleClick() {
    if (count <= detail.stock) {
      dispatch(addToCart(detail.uuid, count));
    }
  }
  let checkStock;
  if (detail.stock > 0) {
    checkStock = (
      <div>
        <p>Stock: {detail.stock}</p>
        <input
          type="number"
          placeholder=""
          value={count}
          onChange={handleChange}
        />
        <button value={detail.uuid} onClick={handleClick}>
          Agregar al Carrito
        </button>
      </div>
    );
  } else {
    checkStock = (
      <div>
        <p>Stock: Sin Stock</p>
        <button value={detail.uuid} disabled>
          Agregar al Carrito
        </button>
      </div>
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              diet
            </Avatar>
          }
          title={detail.name}
        />
        <CardMedia
          className={classes.media}
          image={detail.image || defaultImg}
          title={detail.name}
        />
        <CardContent>
          <Typography variant="body" color="primary" component="p">
            Descripción: {detail.description}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            Precio: ${detail.price},00
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            Categorias del Producto:
            {detail.categories}
          </Typography>
          <Typography variant="body2" color="primary" component="p">
            {checkStock}
          </Typography>
          {/* RATING */}
          <Typography variant="body2" color="primary" component="p">
            Califiación del Producto
          </Typography>
          <ProductRating />
          {/*  */}
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          ></IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent></CardContent>
        </Collapse>
      </Card>
      <div>
        <Reviews uuid={detail.uuid} />
      </div>
    </div>
  );
}

/* import React from "react";
import {
  makeStyles,
  CardHeader,
  Card,
  CardMedia,
  CardActions,
  Collapse,
  CardContent,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { findProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    boxShadow: "0 0 30px",
    marginLeft: "500px",
    background: "#f3f6f7",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductDetail({ location }) {
  const { pathname } = location;
  const uuid = pathname.split("/")[3];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findProduct(uuid));
  }, [dispatch]);
  const [count, setCount] = useState(0);
  const defaultImg =
    "https://lh3.googleusercontent.com/proxy/lDX77oEN-GsT0mLlLb6s3Y0sf3-EG9S3dqBV7cOsOrSSJ9_mlEtMb9I-nIj469riZT-Q3EA2N4nP6gzt-iwoSuOR_Fihd8cC";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const detail = useSelector((store) => store.products.product);

  function handleChange(e) {
    setCount(e.target.value);
    if (detail.stock < count) {
      setCount(detail.stock);
      e.target.value = detail.stock;
    }
  }
  //agregarAlCarrito
  function handleClick() {
    if (count <= detail.stock) {
      dispatch(addToCart(detail.uuid, count));
    } else {
      return;
    }
  }
  let checkStock;
  if (detail.stock > 0) {
    checkStock = (
      <div>
        <p>Stock: {detail.stock}</p>
        <input
          type="number"
          placeholder=""
          value={count}
          onChange={handleChange}
        />
        <button value={detail.uuid} onClick={handleClick}>
          Agregar al Carrito
        </button>
      </div>
    );
  } else {
    checkStock = (
      <div>
        <p>Stock: Sin Stock</p>
        <button value={detail.uuid} disabled>
          Agregar al Carrito
        </button>
      </div>
    );
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            diet
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={detail.name}
      />
      <CardMedia
        className={classes.media}
        image={detail.image || defaultImg}
        title={detail.name}
      />
      <CardContent>
        <Typography variant="body" color="primary" component="p">
          DESCRIPTION: {detail.description}
        </Typography>
        <Typography variant="body2" color="primary" component="p">
          PRICE: ${detail.price},00
        </Typography>
        <Typography variant="body2" color="primary" component="p">
          Categorias del Producto:
          {detail.categories}
        </Typography>
        <Typography variant="body2" color="primary" component="p">
          Categorias del Producto:
          {detail.categories}
        </Typography>
        <Typography variant="body2" color="primary" component="p">
          {checkStock}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
} */
