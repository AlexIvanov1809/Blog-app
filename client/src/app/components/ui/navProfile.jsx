import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserData());
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center text-white">
        <div className="me-2 mob">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt=""
          className="img-responsive rounded-circle"
          width="40"
          height="40"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to="/" className="mobmax">
          Посты
        </Link>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Профиль
        </Link>
        <Link to={"logout"} className="dropdown-item">
          Выйти
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
