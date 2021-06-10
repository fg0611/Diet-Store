import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReview } from "../redux/actions/productActions";
import PropTypes from "prop-types";
import {
  TextField,
  Container,
  Button,
  withStyles,
  Typography,
  Box,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

//COMPONENT
const ReviewAdd = ({ /* email */ productUuid, value }) => {
  const dispatch = useDispatch();
  // Parse JSON string to object

  let local = JSON.parse(localStorage.getItem("storage"));
  let mailInlocal = local.user.email;

  console.log("PRODUCT TO REVIEW:::", productUuid, value);
  console.log("USER TO REVIEW:::", mailInlocal);

  const CHARACTER_LIMIT = 200;
  const [values, setValues] = useState({
    name: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const [count, setCount] = useState(1);

  const userRating = (e) => {
    console.log("VAL:::", typeof e.target.defaultValue);
    setCount(e.target.defaultValue);
  };

  const handleClick = () => {
    let data = {
      email: mailInlocal,
      productUuid,
      text: values.name,
      rating: count,
    };
    console.log(data);
    dispatch(addReview(data));
  };

  return (
    <div>
      <Container maxWidth="sm">
        {/* TEXT */}
        <TextField
          label="Escribe tu Reseña"
          fullWidth="true"
          multiline
          inputProps={{ maxLength: CHARACTER_LIMIT }}
          value={values.name}
          onChange={handleChange("name")}
          margin="normal"
          variant="outlined"
          helperText={`${values.name.length}/${CHARACTER_LIMIT}`}
        ></TextField>

        {/* RATING */}
        <Box component="fieldset" mb={3} borderColor="transparent">
          <StyledRating
            name="customized-color"
            onClick={userRating}
            defaultValue={1}
            getLabelText={(value) => `${value} Heart${value !== 1 ? "s" : ""}`}
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </Box>

        {/* SEND INFO */}
        <Button variant="contained" color="default" onClick={handleClick}>
          Enviar
        </Button>
      </Container>
    </div>
  );
};

export default ReviewAdd;
