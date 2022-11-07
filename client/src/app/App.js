import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import ProtectedRoutes from "./components/common/protectedRoute";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import AdminPage from "./layouts/adminPage";
import CreatePost from "./components/pages/createPost";
import EditPost from "./components/ui/editPost";

const App = () => {
  return (
    <>
      <AppLoader>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/adminPage/newPost" element={<CreatePost />} />
              <Route path="/users/:userId" element={<AdminPage />} />
              <Route path="/adminPage/:postId/edit" element={<EditPost />} />
            </Route>
            <Route path="/:type" element={<Login />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/" exact element={<Main />} />
            <Route path="*" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </AppLoader>
    </>
  );
};

export default App;