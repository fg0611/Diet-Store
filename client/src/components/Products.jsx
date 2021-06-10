import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { getProducts } from "../redux/actions/productActions";

export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  //CREATE A VARIABLE IN ORDER TO RENDER THE DATA FROM THE STORE
  let renderProducts = [];
  if (products.message) {
    renderProducts = <h1>No se encontraron Productos en esta Categoria</h1>;
  } else {
    renderProducts = products.map((e) => {
      return (
        <ProductCard
          key={e.uuid}
          uuid={e.uuid}
          name={e.name}
          description={e.description}
          image={e.image}
          price={e.price}
          stock={e.stock}
        />
      );
    });
  }

  return (
    <div>
      <h1>Products</h1>
      {renderProducts}
    </div>
  );
}
