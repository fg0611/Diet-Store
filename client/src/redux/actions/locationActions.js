import axios from "axios";
import Swal from "sweetalert2";

export const getLocations = () => {
  return async (dispatch) => {
    try {
      const result = await fetch(`http://localhost:3001/location/`);
      const locations = await result.json();
      dispatch({
        type: "GET_LOCATIONS",
        payload: locations,
      });
      if (typeof locations.message === "string") {
        Swal.fire(locations.message);
      }
    } catch (error) {
      dispatch({
        type: "GET_LOCATIONS",
        payload: { message: "Error de llamada" },
      });
      return { error: error };
    }
  };
};

export const getLocation = (uuid) => {
  return async (dispatch) => {
    let location;
    try {
      const result = await fetch(`http://localhost:3001/location?uuid=${uuid}`);
      location = await result.json();
      dispatch({
        type: "GET_LOCATION",
        payload: location,
      });
      if (typeof location.message === "string") {
        Swal.fire(location.message);
      }
    } catch (error) {
      dispatch({
        type: "GET_LOCATION",
        payload: { message: "Error de llamada" },
      });
      return { error: error };
    }
  };
};

export const addLocation = (data) => {
  return async (dispatch) => {
    try {
      const result = await fetch(`http://localhost:3001/location/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resJson = await result.json();
      dispatch({
        type: "ADD_LOCATION",
        payload: resJson,
      });
      if (typeof resJson.message === "string") {
        Swal.fire(resJson.message);
      }
    } catch (error) {
      dispatch({
        type: "ADD_LOCATION",
        payload: { message: "Error de llamada" },
      });
      return { error: error };
    }
  };
};

export const deleteLocation = (uuid) => {
  return async (dispatch) => {
    //http://localhost:3001/location/delete?uuid=bc54b265-dc56-4719-b9f6-2267b47b15f9
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/location/delete?uuid=${uuid}`
      );
      const resJson = await data.json();
      dispatch({
        type: "DELETE_LOCATION",
        payload: resJson,
      });
      if (typeof resJson.message === "string") {
        Swal.fire(resJson.message);
      }
    } catch (error) {
      dispatch({
        type: "DELETE_LOCATION",
        payload: { message: "Error de llamada" },
      });
      return { error: error };
    }
  };
};

export const updateLocation = ({ uuid, description, lat, lng }) => {
  return async (dispatch) => {
    //http://localhost:3001/location/update?uuid=bc54b265-dc56-4719-b9f6-2267b47b15f9
    /*  {
      "description": "av general paz 539",
      "lat": -31.408666942379764,
      "lng": -64.18432312420376
  } */
    try {
      const body = {
        description,
        lat,
        lng,
      };
      console.log(uuid);

      const { data } = await axios.put(
        `http://localhost:3001/location/update?uuid=${uuid}`,
        body
      );
      const resJson = await data.json();
      dispatch({
        type: "UPDATE_LOCATION",
        payload: resJson,
      });
      if (typeof resJson.message === "string") {
        Swal.fire(resJson.message);
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_LOCATION",
        payload: { message: "Error de llamada" },
      });
      return { error: error };
    }
  };
};
