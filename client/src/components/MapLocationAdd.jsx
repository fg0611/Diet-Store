import React, { useState } from "react";
import MapSelectorDraw from "./MapSelectorDraw";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getLocations,
  addLocation,
  getLocation,
} from "../redux/actions/locationActions";
import Swal from "sweetalert2";
import { TextField, makeStyles, Button } from "@material-ui/core";
import { Data } from "@react-google-maps/api";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function MapLocationAdd() {
  //dispatch and history hooks assignations
  const dispatch = useDispatch();

  //history set
  const history = useHistory();

  //store data
  const store = useSelector((store) => store);
  const locations = store.locations;

  const [location, setLocation] = useState({
    description: "",
    lat: "",
    lng: "",
  });

  //this function modifies the React State using the rendered inputs
  const handleInputChange = (event) => {
    setLocation({
      ...location,
      [event.target.name]: event.target.value,
    });
  };

  //this function sends data to backEnd
  const sendData = (event) => {
    event.preventDefault();
    if (location.description.length < 6) {
      Swal.fire("La Dirección debe contener mas de 5 caracteres");
      return;
    }
    if (location.lat === "") {
      Swal.fire("Latitud invalida");
      return;
    }
    if (location.lng === "") {
      Swal.fire("Longitud Invalida");
      return;
    }
    let newLocation = {
      description: location.description,
      lat: parseFloat(location.lat),
      lng: parseFloat(location.lng),
    };
    dispatch(addLocation(newLocation));
    document.getElementById("addForm").reset();
    if (locations?.message) {
      Swal(locations.message);
    }
  };

  const classes = useStyles();

  return (
    <div>
      <form
        id="addForm"
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={sendData}
      >
        <TextField
          id="1"
          name="description"
          label="Dirección"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="2"
          name="lat"
          label="Lat"
          type="number"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          id="3"
          name="lng"
          label="Lng"
          type="number"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Agregar
        </Button>
      </form>
    </div>
  );
}
