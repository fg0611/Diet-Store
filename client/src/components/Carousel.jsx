import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

export default function Carouselmages(props) {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.categories.categories);

  var images;
  if (categories.length > 0) {
    images = categories.map((e) => (
      <img
        key={e.name}
        src={e.image}
        alt=""
        onClick={() => {
          dispatch(filterByCategory(e.name));
          history.push("/products");
          window.scrollTo(0, 0);
        }}
      />
    ));
  }

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
