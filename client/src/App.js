import React from "react";
import { Route } from "react-router-dom";
import AddCategory from "./components/AddCategory";
import NavBar from "./components/NavBar";
import ProductDetail from "./components/ProductDetail";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct.jsx";
import SearchProduct from "./components/SearchProduct.jsx";
import AddUser from "./components/AddUser.jsx";
import Cart from "./components/Cart.jsx";
import CartTotal from "./components/CartTotal";
import Home from "./components/Home.jsx";
import LoginPage from "./components/LoginPage";
import MapSelector from "./components/MapSelector";
import MapLocationAdd from "./components/MapLocationAdd";
import MapLocationAdmin from "./components/MapLocationAdmin";

const App = () => {
  return (
    <React.Fragment>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Products} />
      <Route path="/product/detail" component={ProductDetail} />
      <Route exact path="/category/add" component={AddCategory} />
      <Route exact path="/product/add" component={AddProduct} />
      <Route path="/products/search" component={SearchProduct} />
      <Route exact path="/user/add" component={AddUser} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/cart" component={CartTotal} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/location" component={MapSelector} />
      <Route exact path="/location/add" component={MapLocationAdd} />
      <Route exact path="/location/admin" component={MapLocationAdmin} />
    </React.Fragment>
  );
};

export default App;
