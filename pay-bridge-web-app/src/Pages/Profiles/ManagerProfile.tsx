import React, { useState } from "react";
import { ManagerModel, apiResponse, userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import payBridgeSm from "../../assets/images/paybridge-sm.png";
import defaultPhoto from "../../assets/images/defaultProfile.jpg";
import { MiniLoader } from "../../Components/Common";
import inputHelper from "../../Helper/inputHelper";
import {
  useChangePasswordMutation,
  useConfirmEmailMutation,
  useConfirmEmailRequestMutation,
} from "../../APIs/userAPI";
import toastNotify from "../../Helper/toastNotify";
import { useNavigate } from "react-router-dom";

function ManagerProfile() {
  const [isPasswordButtonActive, setPasswordButtonActive] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const [error, setError] = useState<string>("");

  const [passwordInfo, setPasswordInfo] = useState(() => ({
    login: "",
    oldPassword: "",
  }));

  const [isLoading, setLoading] = useState<boolean>(false);
  const [passwordLoading, setPasswordLoading] = useState<boolean>(false);

  const managerData: ManagerModel = useSelector(
    (state: RootState) => state.managerStore
  );

  const [makeEmailConfirmationRequest] = useConfirmEmailRequestMutation();

  const handleEmailConfirmationRequest = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await makeEmailConfirmationRequest({
      userId: userData.id,
      email: userData.email,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify(
        "E-Mail з запитом на підтвердження надіслано на електронну пошту, вказану при реєстрації!"
      );
    } else {
      setError(response.error.data.errorMessages[0]);
      toastNotify(error, "error");
    }

    setLoading(false);
  };

  const [changePasswordRequest] = useChangePasswordMutation();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordLoading(true);

    const response: apiResponse = await changePasswordRequest({
      login: passwordInfo.login,
      oldPassword: passwordInfo.oldPassword,
    });

    if (response.data && response.data.isSuccess) {
      navigate(
        `/changePassword/${response.data.result.login}/${response.data.result.token}`
      );
      toastNotify("Для зміни пароля, введіть новий та підтвердіть його.");
    } else {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setPasswordLoading(false);
  };

  const handlePasswordButton = () => {
    setPasswordButtonActive((previousState) => !previousState);
    setPasswordInfo({ login: "", oldPassword: "" });
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, passwordInfo);
    setPasswordInfo(tempData);
  };

  return (
    <div className="container py-5">
      <div
        className="d-flex justify-content-center rounded mb-3"
        style={{ backgroundColor: "#212529" }}
      >
        <img
          className="m-3"
          src={payBridgeSm}
          alt=""
          style={{ maxHeight: "40px" }}
        ></img>
        <h2 className="m-3" style={{ color: "#FFF" }}>
          Особистий кабінет менеджера
        </h2>
        <img
          className="m-3"
          src={payBridgeSm}
          alt=""
          style={{ maxHeight: "40px" }}
        ></img>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div
            style={{ backgroundColor: "#212529", color: "#0DA378" }}
            className="card mb-4"
          >
            <div className="card-body text-center">
              <img
                src={defaultPhoto}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">
                {managerData.firstName} {managerData.lastName}
              </h5>
              <p className="text-white mb-1">
                <span style={{ color: "#0DA378" }}>{managerData.position}</span>{" "}
                сервісу PayBridge
              </p>
              <p className="text-white mb-2">{managerData.description}</p>
              <div className="d-flex justify-content-center mb-2">
                {!managerData.emailConfirmed ? (
                  <form method="POST" onSubmit={handleEmailConfirmationRequest}>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-success"
                    >
                      {isLoading ? (
                        <MiniLoader></MiniLoader>
                      ) : (
                        "Підтвердити E-Mail"
                      )}
                    </button>
                  </form>
                ) : null}
                {isPasswordButtonActive ? (
                  <form method="POST" onSubmit={handleChangePassword}>
                    <div className="container m-3">
                      <h5 className="text-white">
                        Для зміни паролю введіть логін/E-mail та старий пароль
                      </h5>
                      <div className="col-12 row">
                        <div className="col-6">
                          <input
                            className="form-control"
                            placeholder="Введіть логін"
                            type="text"
                            onChange={handleInput}
                            name="login"
                            required
                            value={passwordInfo.login}
                          ></input>
                        </div>
                        <div className="col-6">
                          <input
                            className="form-control"
                            placeholder="Введіть пароль"
                            type="password"
                            onChange={handleInput}
                            name="oldPassword"
                            required
                            value={passwordInfo.oldPassword}
                          ></input>
                        </div>
                      </div>
                      <button
                        disabled={passwordLoading}
                        type="submit"
                        className="btn btn-success mx-2 mt-4"
                      >
                        {passwordLoading ? (
                          <MiniLoader></MiniLoader>
                        ) : (
                          "Підтвердити зміну паролю"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePasswordButton}
                        className="btn btn-warning mx-3 mt-4"
                      >
                        Відмінити зміну пароля
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={handlePasswordButton}
                    type="button"
                    className="btn btn-danger ms-1"
                  >
                    Змінити пароль
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div
            style={{ backgroundColor: "#212529", color: "#0DA378" }}
            className="card mb-4"
          >
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">П.І.Б.</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {managerData.lastName} {managerData.firstName}{" "}
                    {managerData.middleName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">E-Mail</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {managerData.email} -{" "}
                    {managerData.emailConfirmed ? (
                      <span style={{ color: "#0DA378" }}>Підтверджений</span>
                    ) : (
                      <span className="text-danger"> Не підтверджений</span>
                    )}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Тел.</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {managerData.phoneNumber}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Чи працює менеджер ?</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {managerData.isActive ? "Так" : "Ні"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerProfile;
