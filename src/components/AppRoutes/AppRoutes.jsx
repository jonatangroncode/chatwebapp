import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Chat from "../../pages/Chat/Chat";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
