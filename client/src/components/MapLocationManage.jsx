import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateLocation,
  deleteLocation,
} from "../redux/actions/locationActions";
import Swal from "sweetalert2";
import {
  Button,
  Typography,
  makeStyles,
  Card,
  CardContent,
  TextField,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function MapLocationManage({ location }) {
  const classes = useStyles();
  console.log("location", location);

  const { uuid } = location;
  const store = useSelector((store) => store);
  const locations = store.locations;
  const dispatch = useDispatch();

  const [data, setData] = useState({
    description: "",
    lat: "",
    lng: "",
  });

  //this function modifies the React State using the rendered inputs
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  //UPDATE
  const handleUpdate = (event) => {
    event.preventDefault();
    if (data.description.length < 6) {
      Swal.fire("La Dirección debe contener mas de 5 caracteres");
      return;
    }
    if (data.lat === "") {
      Swal.fire("Latitud invalida");
      return;
    }
    if (data.lng === "") {
      Swal.fire("Longitud Invalida");
      return;
    }
    let newLocation = {
      uuid: uuid,
      description: data.description,
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng),
    };
    dispatch(updateLocation(newLocation));
    document.getElementById("addForm").reset();
    if (locations?.message) {
      Swal(locations.message);
    }
  };

  //DELETE
  function handleDelete() {
    dispatch(deleteLocation(uuid));
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography>DATOS DE SUCURSAL SELECCIONADA</Typography>
          <Typography>Dirección: {location.description}</Typography>
          <Typography>Latitud: {location.lat}</Typography>
          <Typography>Longitud: {location.lng}</Typography>

          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={handleDelete}
          >
            Eliminar
          </Button>

          {/* UPDATE FORM */}
          <div>______________________________</div>
          <div>
            <Grid container direction="column" style={{ minHeight: "30vh" }}>
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

              <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleUpdate}
              >
                Actualizar
              </Button>
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default MapLocationManage;
