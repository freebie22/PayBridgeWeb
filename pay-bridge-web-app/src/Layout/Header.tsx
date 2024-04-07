import React from "react";
import logo from "../assets/images/logo.jpg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg p-2"
        style={{ backgroundColor: "#212529" }}
      >
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            style={{ height: "40px" }}
            alt=""
            className="m-1"
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink
                style={{ color: "white" }}
                className="nav-link"
                aria-current="page"
                to="/"
              >
                <h3>PayBridge</h3>
              </NavLink>
            </li>
            <li className="nav-item pt-1">
              <a style={{ color: "white" }} className="nav-link" href="#">
                <h5 className="p-1">Перелік послуг</h5>
              </a>
            </li>
            <li className="nav-item  pt-1">
              <a style={{ color: "white" }} className="nav-link" href="#">
                <h5 className="p-1">Про нас</h5>
              </a>
            </li>
            <li className="nav-item pt-1">
              <a style={{ color: "white" }} className="nav-link" href="#">
                <h5 className="p-1">Контакти</h5>
              </a>
            </li>
            <div className="d-flex p-1">
              <li className="nav-item pt-1">
                <NavLink to="/login">
                  <button
                    className="btn btn-success btn-outlined text-white mx-2"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    Увійти
                  </button>
                </NavLink>
              </li>
              <li className="nav-item pt-1">
                <NavLink to="/register">
                  <button
                    className="btn btn-primary btn-outlined text-white mx-2"
                    style={{
                      border: "none",
                      height: "40px",
                      width: "100px",
                    }}
                  >
                    Реєстрація
                  </button>
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
