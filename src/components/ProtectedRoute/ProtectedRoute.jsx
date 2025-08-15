import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("jwt_token");
  const isAuthed = Boolean(token);

  if (!isAuthed) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Grid container direction="column" width="100%" flexWrap="nowrap">
      <Grid container direction="row" flexWrap="nowrap">
        <Grid item xs>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProtectedRoute;
