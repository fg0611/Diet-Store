import React from "react";
import {
  Grid,
  makeStyles,
  Avatar,
  Typography,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";
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

const ReviewCard = ({ text, username, rating }) => {
  console.log("REV DATA:::", text, username, rating);
  const classes = useStyles();

  return (
    <div className={classes.root} key={username}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>{username[0]}</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>Usuario: {username}</Typography>
            <Typography>{text}</Typography>
          </Grid>
          <Box component="fieldset" mb={3} borderColor="transparent">
            <StyledRating
              name="customized-color"
              defaultValue={rating}
              precision={1}
              icon={<FavoriteIcon fontSize="inherit" />}
            />
          </Box>
        </Grid>
      </Paper>
    </div>
  );
};

export default ReviewCard;
