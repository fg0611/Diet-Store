import React from "react";
import { useSelector } from "react-redux";
import { Grid, makeStyles, Box, withStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const ProductRating = () => {
  const classes = useStyles();

  const reviews = useSelector((store) => store.products.productReviews);

  let promRevs = 0;
  if (reviews.length) {
    for (let rev of reviews) {
      promRevs += rev.rating;
    }
    promRevs = Math.ceil(promRevs / reviews.length);
  }

  return (
    <div className={classes.root} key={promRevs}>
      <Grid>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <StyledRating
            name="customized-color"
            value={promRevs}
            precision={1}
            icon={<FavoriteIcon fontSize="inherit" />}
          />
        </Box>
      </Grid>
    </div>
  );
};

export default ProductRating;
