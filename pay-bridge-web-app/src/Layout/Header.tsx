import React, { useEffect, useState } from "react";
import logo from "../assets/images/paybridge-sm.png";
import sign from "../assets/images/paybridgeSign.png";
import { NavLink, useNavigate } from "react-router-dom";
import { userModel } from "../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import {
  emptyUserState,
  setLoggedInUser,
} from "../Storage/Redux/userAuthSlice";
import {
  emptyProflieState,
  setProfileState,
} from "../Storage/Redux/personalAccountHolderSlice";

function Header() {
  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    dispatch(setProfileState({ ...emptyProflieState }));
    navigate("/");
  };

  const [profileLink, setProfileLink] = useState<string>("");

  useEffect(() => {
            switch (userData.role) {
      case "Manager":
        setProfileLink("/managerProfile");
        break;
      case "Admin":
        setProfileLink("/adminProfile");
        break;
      default:
        setProfileLink("/myProfile");
        break;
    }
  }, [userData]);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg p-2"
        style={{ backgroundColor: "#212529" }}
      >
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            style={{ height: "60px" }}
            alt=""
            className="mx-1"
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
              <NavLink to="/">
                <img style={{ maxHeight: "90%" }} src={sign} alt=""></img>
              </NavLink>
            </li>
            <li className="nav-item pt-1">
              <a style={{ color: "white" }} className="nav-link" href="#">
                <h5 className="p-1 m-1">Каталог послуг</h5>
              </a>
            </li>
            <li className="nav-item  pt-1">
              <NavLink style={{ color: "white" }} className="nav-link" to="/infoPage">
                <h5 className="p-1 m-1">Про нас</h5>
              </NavLink>
            </li>
            <li className="nav-item pt-1">
              <a style={{ color: "white" }} className="nav-link" href="#">
                <h5 className="p-1 m-1">Контакти</h5>
              </a>
            </li>
            <div className="d-flex p-1">
              {userData.id ? (
                <li className="nav-item pt-2">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#authorizedModal"
                    className="btn btn-warning btn-outlined text-white m-1"
                  >
                    Мій профіль
                  </button>
                </li>
              ) : (
                <li className="nav-item pt-2">
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    className="btn btn-success btn-outlined text-white m-1"
                  >
                    Авторизація
                  </button>
                </li>
              )}

              <div
                className="modal fade"
                id="loginModal"
                autoFocus={false}
                aria-labelledby="loginModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div
                    className="modal-content"
                    style={{ backgroundColor: "#212529" }}
                  >
                    <div
                      className="modal-header row"
                      style={{
                        justifyContent: "center",
                        margin: "0px",
                        borderBottomColor: "#0DA378",
                      }}
                    >
                      <h4
                        style={{ color: "#0DA378" }}
                        className="modal-title text-center"
                        id="loginModalLabel"
                      >
                        Авторизуйтесь для подальшої роботи в нашому сервісі
                      </h4>
                    </div>
                    <div
                      style={{ color: "#0DA378", display: "block" }}
                      className="modal-body"
                    >
                      <div
                        data-bs-dismiss="modal"
                        className="btn-group-vertical col-12 p-3"
                      >
                        <NavLink
                          style={{
                            backgroundColor: "#0DA378",
                            color: "white",
                            border: "none",
                          }}
                          className="btn mb-2"
                          to="/login"
                        >
                          Увійти
                        </NavLink>
                        <NavLink
                          style={{ color: "white" }}
                          className="btn btn-primary mb-2"
                          to="/register"
                        >
                          Зареєструватись
                        </NavLink>
                      </div>
                    </div>
                    <div
                      className="modal-footer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        borderTopColor: "#0DA378",
                      }}
                    >
                      <button
                        className="btn btn-danger form-control"
                        data-bs-dismiss="modal"
                      >
                        Закрити
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="modal fade"
                id="authorizedModal"
                autoFocus={false}
                aria-labelledby="authorizedModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div
                    className="modal-content"
                    style={{ backgroundColor: "#212529" }}
                  >
                    <div
                      className="modal-header row"
                      style={{
                        justifyContent: "center",
                        margin: "0px",
                        borderBottomColor: "#0DA378",
                      }}
                    >
                      <h4
                        style={{ color: "#0DA378" }}
                        className="modal-title text-center"
                        id="authorizedModalLabel"
                      >
                        Вітаємо, {userData.userName}! Оберіть одну з наступних
                        дій.
                      </h4>
                    </div>
                    <div
                      style={{ color: "#0DA378", display: "block" }}
                      className="modal-body"
                    >
                      <div
                        data-bs-dismiss="modal"
                        className="btn-group-vertical col-12 p-3"
                      >
                        <NavLink
                          style={{
                            backgroundColor: "#0DA378",
                            color: "white",
                            border: "none",
                          }}
                          className="btn mb-2"
                          to={profileLink}
                        >
                          Особистий кабінет
                        </NavLink>
                        <button
                          style={{ color: "white" }}
                          className="btn btn-danger mb-2"
                          onClick={handleLogout}
                        >
                          Вийти з облікового запису
                        </button>
                      </div>
                    </div>
                    <div
                      className="modal-footer"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        borderTopColor: "#0DA378",
                      }}
                    >
                      <button
                        className="btn btn-warning form-control"
                        data-bs-dismiss="modal"
                      >
                        Закрити
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Header;
