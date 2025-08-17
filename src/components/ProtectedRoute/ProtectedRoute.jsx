import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import SideNav from "../SideNav/SideNav";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = sessionStorage.getItem("jwt_token");
  const isAuthed = Boolean(token);

  if (!isAuthed) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return (
    <Grid container direction="row" width="100%" flexWrap="nowrap">
      <SideNav />
      <Grid container direction="row" flexWrap="nowrap">
        <Grid>
          <Outlet />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ProtectedRoute;
