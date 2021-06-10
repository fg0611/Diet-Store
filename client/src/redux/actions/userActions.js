import { loginWithGoogle, singOutGoogle } from "../../firebase";
import Swal from "sweetalert2";

/* export const ADD_USER = 'ADD_USER'
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOG_OUT = 'LOG_OUT'
export const CHECK_USER_IN_DB = 'CHECK_USER_IN_DB' */

export const addUser = (data) => {
  return async (dispatch) => {
    console.log(data);
    if (data.password === data.confirmPassword) {
      const res = await fetch("http://localhost:3001/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      dispatch({
        type: "ADD_USER",
        payload: resJson,
      });
      Swal.fire(resJson.message);
    } else {
      dispatch({
        type: "ADD_USER",
        payload: { message: "Las contraseñas no coinciden" },
      });
    }
  };
};

//action para loguearse con google
export let googleLoginAction = () => (dispatch, getState) => {
  dispatch({
    type: "LOGIN",
  });
  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photo: user.photoURL,
        },
      });
      saveStorage(getState());
    })
    .catch((e) => {
      console.log(e);
      dispatch({
        type: "LOGIN_ERROR",
        payload: e.message, //en firebase el error viene en message
      });
    });
};

//funcion auxiliar que nos ayuda a guardar cosas en el local storage
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage);
}

//action para recuperar la sesion iniciada
export let restoreSessionAction = () => (dispatch) => {
  let storage = localStorage.getItem("storage");
  storage = JSON.parse(storage);
  if (storage && storage.user) {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: storage.user,
    });
  }
};

//action para cerrar sesion (necesitamos sacar al usuario del state y mover el loggedIn a false)
// pero tambien necesitamos borrarlo del localStorage

export let logOutAction = () => (dispatch, getState) => {
  singOutGoogle();
  dispatch({
    type: "LOG_OUT",
  });
  localStorage.removeItem("users");
};

/* export const userLogin = (data) => {
  return async (dispatch) => {
    console.log(data);
    //la data debe ser un objeto asi :
    {
      "userName": "Administrador",
      "password": "henry"
} 
    if (data) {
      const res = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await res.json();
      dispatch({
        type: "USER_LOGIN",
        payload: resJson,
      });
    } else {
      dispatch({
        type: "USER_LOGIN",
        payload: { message: "Usuario o Clave invalida" },
      });
    }
  };
};

  //funcion auxiliar que nos ayuda a guardar cosas en el local storage 
  function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage)
    }

export const googleLoginAction = (dispatch, getState) => {
  dispatch({
    type: "LOGIN"
})
const res = await loginWithGoogle()
if (res) {
  const resJson = await res.json()
  dispatch({
    type: "LOGIN_SUCCESS",
    payload: {
      uid: resJson.uid,
      displayName: resJson.displayName,
      email: resJson.email,
      photo: resJson.photoURL 
    },
  });
  saveStorage(getState())
} else {
      dispatch({
        type: "USER_LOGIN",
        payload: { message: "Google no ha podido autenticarte" },
      });
    }
  };

  //action para recuperar la sesion iniciada 
export const restoreSessionAction = () => dispatch => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if(storage && storage.user) {
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: storage.user
        })
    }
  }
  //action para cerrar sesion (necesitamos sacar al usuario del state y mover el loggedIn a false)
  // pero tambien necesitamos borrarlo del localStorage 
  export const logOutAction = () => (dispatch, getState) => {
  singOutGoogle()
  dispatch({
    type: "LOG_OUT"
  })
  localStorage.removeItem('users')
} */
