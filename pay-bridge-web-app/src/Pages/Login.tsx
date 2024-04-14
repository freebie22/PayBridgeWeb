import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../APIs/userAPI";
import { apiResponse, userModel } from "../Interfaces";
import { jwtDecode } from "jwt-decode";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import inputHelper from "../Helper/inputHelper";
import toastNotify from "../Helper/toastNotify";
import { NavLink, useNavigate } from "react-router-dom";
import { MainLoader } from "../Components/Common";
import payBridgeSm from "../assets/images/paybridge-sm.png"

function Login() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const handleUserLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
    console.log(userInput);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await loginUser({
      login: userInput.login,
      password: userInput.password,
    });

    setUserInput({ login: "", password: "" });

    if (response.data) {
      const token = response.data.result["token"];
      const { id, userName, email, role }: userModel = jwtDecode(token);
      localStorage.setItem("token", token);
      dispatch(setLoggedInUser({ id, userName, email, role }));
      toastNotify(`Авторизація успішна. Вітаємо Вас, ${userName}!`);
      navigate("/");
      console.log({ id, userName, email, role });
    } else if (response.error) {
      setError(response.error.data.errorMessages[0]);
    }

    setLoading(false);
  };


  return (
    <div className="container mt-5 pt-2 rounded text-center" style={{backgroundColor: "#212529", maxWidth: "50%"}}>
      {isLoading && <MainLoader></MainLoader>}
      <form onSubmit={handleSubmit} method="post">
        <img className="" src={payBridgeSm} alt="" style={{maxHeight: "70px"}}></img>
        <h1 className="text-white">Вхід до облікового запису</h1>
        <div className="mt-3">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              name="login"
              placeholder="Введіть логін або E-Mail"
              value={userInput.login}
              onChange={handleUserLogin}
              required
            ></input>
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Введіть пароль"
              value={userInput.password}
              onChange={handleUserLogin}
              required
            ></input>
          </div>
        </div>
        <div className="mt-3">
          <NavLink to="/forgotPassword" className="text-white">Забули пароль ?</NavLink>
        </div>
        <div className="mt-2">
          {error ? (
            <div>
              <p className="text-danger">{error}</p>
            </div>
          ) : null}
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-success my-3"
            style={{ width: "200px" }}
          >
            Увійти
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
