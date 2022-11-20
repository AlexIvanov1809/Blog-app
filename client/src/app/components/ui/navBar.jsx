import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { useSelector } from "react-redux";
import { getUsersIsLoggeedIn } from "../../store/users";

const NavBar = () => {
  const isLoggedIn = useSelector(getUsersIsLoggeedIn());
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-secondary  p-3">
        <div className=" text-dark">
          <h3>Blog</h3>
        </div>
        <nav className="navbar">
          <div className="container-fluid">
            <ul className="nav">
              <li className="nav-item" style={{ margin: "auto 0" }}>
                <Link
                  className="nav-link text-white mob"
                  aria-current="page"
                  to="/"
                >
                  Посты
                </Link>
              </li>
              <li className="nav-item">
                {isLoggedIn ? (
                  <NavProfile />
                ) : (
                  <Link
                    className="nav-link text-white"
                    aria-current="page"
                    to="/login"
                  >
                    Войти
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
