import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiResponse, changePasswordModel, userModel } from "../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { setChangePasswordState } from "../Storage/Redux/changePasswordSlice";
import {
  useChangePasswordMutation,
  useConfirmChangePasswordMutation,
} from "../APIs/userAPI";
import payBridgeSm from "../assets/images/paybridge-sm.png";
import { MiniLoader } from "../Components/Common";
import inputHelper from "../Helper/inputHelper";
import toastNotify from "../Helper/toastNotify";
import {
  emptyUserState,
  setLoggedInUser,
} from "../Storage/Redux/userAuthSlice";
import {
  emptyProflieState,
  setProfileState,
} from "../Storage/Redux/personalAccountHolderSlice";
import {
  setManagerState,
  emptyManagerState,
} from "../Storage/Redux/managerSlice";

function ChangePassword() {
  const { login, confirmToken } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordState, setPasswordState] = useState(() => ({
    newPassword: "",
    confirmPassword: "",
  }));

  const changePasswordData: changePasswordModel = useSelector(
    (state: RootState) => state.changePasswordStore
  );

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [confirmChangePassword] = useConfirmChangePasswordMutation();

  useEffect(() => {
    if (login && confirmToken) {
      dispatch(setChangePasswordState({ login, confirmToken }));
    } else if (userData && userData.id !== "") {
      console.log("Store is empty");
    }
  }, []);

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, passwordState);
    setPasswordState(tempData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const response: apiResponse = await confirmChangePassword({
      login: changePasswordData.login,
      passwordToken: changePasswordData.confirmToken,
      newPassword: passwordState.newPassword,
      confirmPassword: passwordState.confirmPassword,
    });

    if (response.data && response.data.isSuccess) {
      navigate("/");
      if (userData.id !== "") {
        localStorage.removeItem("token");
        dispatch(setProfileState({ ...emptyProflieState }));
        dispatch(setManagerState({ ...emptyManagerState }));
        dispatch(setLoggedInUser({ ...emptyUserState }));
      }
      location.reload();
      toastNotify(
        "Вітаємо! Ви успішно змінили пароль облікового запису. Щоб продовжити роботу в нашому веб-сервісі, будь-ласка, авторизуйтесь"
      );
    } else {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="container mt-5 p-3 text-center rounded"
      style={{ backgroundColor: "#212529", maxWidth: "60%" }}
    >
      <form method="POST" onSubmit={handleSubmit}>
        <h2 className="text-white">Зміна паролю</h2>
        <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
        <div className="mt-3">
          <p className="text-white">
            Для того, щоб змінити пароль, введіть новий пароль та підвтердіть
            його.
          </p>
          <p className="text-white">
            <span className="text-warning">Зверніть увагу!</span>&nbsp;Новий
            пароль має відрізнятись від старого.
          </p>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-1">
            <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
            <h5 className="text-white mt-2">Введіть новий пароль</h5>
            <input
              className="form-control"
              type="password"
              value={passwordState.newPassword}
              onChange={handlePasswordInput}
              name="newPassword"
              required
              placeholder="Введіть новий пароль"
            ></input>
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-1">
            <h5 className="text-white mt-2">Підтвердіть пароль</h5>
            <input
              className="form-control"
              type="password"
              value={passwordState.confirmPassword}
              onChange={handlePasswordInput}
              name="confirmPassword"
              required
              placeholder="Підвтердіть його"
            ></input>
          </div>
          <button
            disabled={isLoading}
            style={{ width: "200px" }}
            className="btn btn-success mt-3"
          >
            {isLoading ? <MiniLoader></MiniLoader> : "Надіслати запит"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
