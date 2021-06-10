import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  searchProducts,
  setSearchedProducts,
} from "../redux/actions/productActions";
import {
  TextField,
  IconButton,
  Input,
  InputAdornment,
  FormControl,
  Typography,
} from "@material-ui/core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./componentsStyles/SearchStyleCSS.css";

export default function Search() {
  //react states
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");

  //hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const wrapperRef = useRef(null);

  //redux status
  const products = useSelector((state) => state.products.search); //data from back
  // const input = useSelector((state) => state.search.input); //input
  //const options = useSelector((state) => state.search.options); // suggest
  //const page = useSelector((state) => state.catalogReducer.page); // page

  //logic for clickOutside
  useEffect(() => {
    console.log("USE EFFECT::::");
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const handleClickSetProducts = (e) => {
    e.preventDefault();
    dispatch(setSearchedProducts(search));
  };

  const setToInput = (e) => {
    setSearch(e);
    setDisplay(false);
  };

  let displayOpts;
  if (display && products.length && options.length) {
    displayOpts = options
      .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
      .map((e, i) => {
        return (
          <div className="option" key={i} onClick={() => setToInput(e.name)}>
            <Typography variant="subtitle1">{e.name}</Typography>
          </div>
        );
      });
  }
  console.log(options, displayOpts);

  return (
    <div>
      <form ref={wrapperRef} onSubmit={handleClickSetProducts}>
        <Input
          id="auto"
          placeholder="Busqueda..."
          onClick={() => setDisplay(!display)}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            dispatch(searchProducts(search));
            setOptions(products);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit">
                <FontAwesomeIcon icon={faSearch} color="#404040" />
              </IconButton>
            </InputAdornment>
          }
        />
        <div className="autoContainer">{displayOpts}</div>
      </form>
    </div>
  );
}
