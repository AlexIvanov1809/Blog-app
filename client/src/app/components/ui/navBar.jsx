import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getCurrentUserData, getUsersIsLoggeedIn } from "../../store/users";

const NavBar = () => {
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  const currentUser = useSelector(getCurrentUserData());
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-light  p-3">
        <div className=" text-black-50">
          <h3>Blog</h3>
        </div>
        <nav className="navbar">
          <div className="container-fluid">
            <ul className="nav">
              <li className="nav-item" style={{ margin: "auto 0" }}>
                <Link className="nav-link" aria-current="page" to="/">
                  Main
                </Link>
              </li>
              {currentUser && currentUser.admin && (
                <li className="nav-item" style={{ margin: "auto 0" }}>
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to="/adminPage"
                  >
                    Admin Page
                  </Link>
                </li>
              )}
              <li className="nav-item">
                {isLoggedIn ? (
                  <NavProfile />
                ) : (
                  <Link className="nav-link" aria-current="page" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
