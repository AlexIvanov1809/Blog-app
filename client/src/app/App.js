import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import ProtectedRoutes from "./components/protectedRoute";
import Login from "./layouts/login";
import Users from "./layouts/users";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<Users />} />
            <Route path="/users/:userId/:edit" element={<Users />} />
          </Route>
          <Route path="/:type" element={<Login />} />
          {/* <Route path="/logout" element={<LogOut />} /> */}
          <Route path="/" exact element={<Main />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
