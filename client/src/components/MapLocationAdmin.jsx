import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapLocationAdd from "./MapLocationAdd";
import MapLocationManage from "./MapLocationManage";
import MapSelector from "./MapSelector";
import { getLocations } from "../redux/actions/locationActions";
import { Grid } from "@material-ui/core";

export default function MapLocationAdmin() {
  let location = useSelector((store) => store.locations.location);
  console.log(location);
  let locations = useSelector((store) => store.locations.locations);

  //dispatch and history hooks assignations
  const dispatch = useDispatch();
  //this one brings to a global redux state all locations
  useEffect(() => {
    dispatch(getLocations());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocations());
  }, [location]);

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <table>
          <th>
            <MapSelector />
          </th>
          <th>
            <MapLocationManage location={location} />
          </th>
        </table>
        <MapLocationAdd />
      </Grid>
    </div>
  );
}
