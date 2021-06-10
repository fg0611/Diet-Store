import { Link, useHistory } from "react-router-dom";
import Search from "./Search";
import SearchBar from "./SearchBar.jsx";
import ProductsByCategory from "./ProductsByCategory";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { logOutAction } from "../redux/actions/userActions";

import React from "react";
import {
  fade,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  MenuItem,
  Menu,
} from "@material-ui/core";

import { faBars, faUser, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "#212121",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.3),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  link: {
    textDecoration: "none",
  },
  color: {
    backgroundColor: "#4caf50",
  },
}));

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profile, setProfile] = React.useState(null);
  const cartInLocal = localStorage.getItem("cart");
  const logIn = useSelector((store) => store.user.loggedIn);
  // Parse JSON string to object
  const cartItems = JSON.parse(cartInLocal);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  const isProfileOpen = Boolean(profile);

  function logOut() {
    dispatch(logOutAction());
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileOpen = (event) => {
    setProfile(event.currentTarget);
  };
  const handleProfileClose = () => {
    setProfile(null);
  };

  const goToCart = () => {
    if (cartItems && cartItems.length > 0) {
      history.push("/cart");
      window.scroll(0, 0);
      return;
    } else {
      Swal.fire({
        icon: "warning",
        title: "Carrito Vacio",
        showConfirmButton: false,
        timer: 1500,
      });
      history.push("/products");
      return;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <IconButton>
          <Link className={classes.link} to="/products">
            Products
          </Link>
        </IconButton>
        <IconButton>
          <Link className={classes.link} to="/user/add">
            Nuevo Usuario
          </Link>
        </IconButton>
      </MenuItem>
    </Menu>
  );

  const profileId = "primary-search-account-menu";
  const renderProfile = (
    <Menu
      profile={profile}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={profileId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isProfileOpen}
      onClose={handleProfileClose}
    >
      <MenuItem onClick={handleProfileClose}>
        <IconButton>
          <Link className={classes.link} to="/profile">
            perfil
          </Link>
        </IconButton>
        <Button variant="outlined" color="secondary" onClick={logOut}>
          CERRAR SESION
        </Button>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.color} position="static">
        <Toolbar>
          {/* MENU */}
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenuOpen}
          >
            <FontAwesomeIcon icon={faBars} />
          </IconButton>

          {/* TITULO */}
          <IconButton color="inherit">
            <Link to="/" className={classes.link}>
              <Typography className={classes.title} variant="h6" noWrap>
                HEALTHY-HENRY
              </Typography>
            </Link>
          </IconButton>

          {/* SEARCHBAR */}
          {/* <div className={classes.search}>
            <SearchBar />
          </div> */}

          {/* SEARCH */}

          <Search />

          {/* CATEGORIAS */}
          <MenuItem>
            <ProductsByCategory />
          </MenuItem>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* CART */}
            <IconButton color="inherit" aria-label="agregar" onClick={goToCart}>
              <FontAwesomeIcon icon={faCartPlus} />
            </IconButton>

            {/* <Link className={classes.link} to='/login'>  */}

            {/* user */}
            {logIn ? (
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={handleProfileOpen}
              >
                <FontAwesomeIcon icon={faUser} />
              </IconButton>
            ) : (
              <IconButton>
                <Link className={classes.link} to="/login">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </IconButton>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderProfile}
    </div>
  );
};

export default NavBar;
