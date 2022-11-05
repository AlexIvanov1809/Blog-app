import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center bg-light mb-3 navbar">
        <div className="ms-3 text-black-50">
          <h3>Blog</h3>
        </div>
        <nav className="">
          <div className="container-fluid">
            <ul className="nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Main
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/user">
                  User
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default NavBar;
