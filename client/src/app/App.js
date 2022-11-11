import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import ProtectedRoutes from "./components/common/protectedRoute";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import CreatePost from "./components/ui/createPost";
import EditPost from "./components/ui/editPost";
import Posts from "./layouts/posts";
import UserPost from "./components/pages/userPost";
import EditUserPage from "./components/ui/editUserPage";

const App = () => {
  return (
    <>
      <AppLoader>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/users/:userId" element={<Posts />} />
              <Route path="/users/:userId/edit" element={<EditUserPage />} />
              <Route path="/users/:userId/newPost" element={<CreatePost />} />
              <Route
                path="/users/:userId/:postId/edit"
                element={<EditPost />}
              />
            </Route>
            <Route path="/posts/:postId" element={<UserPost />} />
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
