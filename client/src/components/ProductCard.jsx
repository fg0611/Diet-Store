import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";

import defaultImg from "../imgs/default.svg";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "0 0 50px rgb(234, 232, 300)",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: green[500],
  },
}));

export default function ProductCard({ uuid, name, description, image, price }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function addToCartOnClick(uuid, qty) {
    dispatch(addToCart(uuid, qty));
    window.scrollTo(0, 0);
  }
  function handleClick(e) {
    dispatch(findProduct(uuid));
    history.push("/product/detail/" + uuid);
    window.scrollTo(0, 0);
  }
  const classes = useStyles();
  return (
    <Card onClick={handleClick} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            diet
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={image || defaultImg}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description} <hr />${price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="agregar" onClick={addToCartOnClick}>
          <FontAwesomeIcon icon={faCartPlus} />
        </IconButton>
        <Button color="primary" variant="outlined">
          {" "}
          COMPRAR{" "}
        </Button>
      </CardActions>
      <Collapse in={classes.expand} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}

/* import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findProduct } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";
import { makeStyles } from "@material-ui/core/styles";

import defaultImg from "../imgs/default.svg";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: "0 0 50px rgb(234, 232, 300)",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
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
    backgroundColor: green[500],
  },
}));

export default function ProductCard({ uuid, name, description, image, price }) {
  const dispatch = useDispatch();
  const history = useHistory();

  function addToCartOnClick(uuid, qty) {
    dispatch(addToCart(uuid, qty));
    window.scrollTo(0, 0);
  }
  function handleClick(e) {
    dispatch(findProduct(uuid));
    history.push("/product/detail/" + uuid);
    window.scrollTo(0, 0);
  }
  const classes = useStyles();
  return (
    <Card onClick={handleClick} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            diet
          </Avatar>
        }
        title={name}
      />
      <CardMedia
        className={classes.media}
        image={image || defaultImg}
        title={name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description} <hr />${price}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="agregar" onClick={addToCartOnClick}>
          <FontAwesomeIcon icon={faCartPlus} />
        </IconButton>
        <Button color="primary" variant="outlined">
          {" "}
          COMPRAR{" "}
        </Button>
      </CardActions>
      <Collapse in={classes.expand} timeout="auto" unmountOnExit></Collapse>
    </Card>
  );
}
 */
