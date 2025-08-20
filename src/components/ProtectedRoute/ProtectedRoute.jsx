import React from "react";
import Grid from "@mui/material/Grid";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import SideNav from "../SideNav/SideNav";

const ProtectedRoute = () => {
  const location = useLocation();

  let auth = null;
  try {
    auth = JSON.parse(sessionStorage.getItem("auth_user"));
  } catch {
    console.error("Misslyckades med att parsa auth_user från sessionStorage");
  }
  const token = auth?.token || sessionStorage.getItem("jwt_token");
  const notExpired = !auth?.exp || new Date(auth.exp * 1000) > new Date();
  const isAuthed = Boolean(token) && notExpired;

  if (!isAuthed) {
    sessionStorage.removeItem("jwt_token");
    sessionStorage.removeItem("auth_user");
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
