import React from "react";
import { useLocation } from "react-router-dom";

function Header({
  isLoggedIn,
  email,
  navRegistration,
  navLogin,
  navExit,
  navValue,
}) {
  const isRegistered = useLocation().pathname === "/sign-up" ? true : false;

  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__container">
        {isLoggedIn ? <p className="header__email">{email}</p> : ""}
        <button
          onClick={
            isLoggedIn ? navExit : isRegistered ? navLogin : navRegistration
          }
          className="header__navigation"
          style={{ color: isLoggedIn ? "#A9A9A9" : "#FFFFFF" }}
        >
          {isLoggedIn ? "Выйти" : isRegistered ? "Войти" : "Регистрация"}
        </button>
      </div>
    </header>
  );
}

export default Header;
