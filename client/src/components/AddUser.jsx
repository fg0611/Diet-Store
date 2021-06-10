import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addUser } from "../redux/actions/userActions.js";
import Swal from "sweetalert2";
import { Button, Grid, TextField, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AddUser() {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const msg = store.user.user;

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: "",
  });
  const [box, setBox] = useState({
    checkedA: false,
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const boxChangeState = (event) => {
    setBox({ ...box, [event.target.name]: event.target.checked });
  };

  /*  setData({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: "",
  }); */

  let showAdminInput;
  if (box.checkedA === true) {
    showAdminInput = (
      <TextField
        id="outlined-name"
        label="Clave de administrador"
        name="isAdmin"
        onChange={handleInputChange}
        variant="outlined"
      />
    );
  } else {
    showAdminInput = <p></p>;
  }

  const sendData = (event) => {
    event.preventDefault();
    if (data.userName.length < 6) {
      Swal.fire("usuario vacio o menor a 6 caracteres");
      return;
    }
    /*    if (!data.email.includes("@") || !data.email.includes(".com")) {
      Swal.fire("email invalido");
      return;
    } */
    if (data.password.length < 6) {
      Swal.fire("la clave debe contener mas de 6 caracteres");
      return;
    }
    if (data.password !== data.confirmPassword) {
      Swal.fire("la clave no coincide");
      return;
    }
    dispatch(addUser(data));
    document.getElementById("addForm").reset();
  };

  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <form id="addForm" onSubmit={sendData}>
          {/* USERNAME */}
          <TextField
            id="outlined-name"
            label="Usuario"
            name="userName"
            onChange={handleInputChange}
            variant="outlined"
          />
          {/* EMAIL */}
          <TextField
            id="emailAddress"
            type="email"
            label="Correo Electronico"
            name="email"
            onChange={handleInputChange}
            variant="outlined"
          />
          {/* PASSWORD */}
          <TextField
            id="outlined-name"
            label="Contraseña"
            name="password"
            type="password"
            onChange={handleInputChange}
            variant="outlined"
          />

          {/* PASSWORD CONFIRM */}
          <TextField
            id="outlined-name"
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            onChange={handleInputChange}
            variant="outlined"
          />

          {/* CHECKBOX ADMIN TRUE? */}
          {/* <FormControlLabel
          control={
            <Checkbox
              checked={box.checkedA}
              onChange={boxChangeState}
              name="checkedA"
            />
          }
          label="cuenta de administrador"
        />

        {showAdminInput} */}

          {/* BUTTON SEND DATA */}
          <Button
            size="large"
            variant="outlined"
            color="primary"
            type="submit"
            justify="center"
            AlignItems="center"
          >
            Agregar
          </Button>
        </form>
      </Grid>
    </div>
  );
}
