import React, { useEffect, useState } from "react";
import { apiResponse, responsiblePerson, userModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { withAuth } from "../../HOC";
import { useNavigate } from "react-router-dom";
import payBridgeSm from "../../assets/images/paybridge-sm.png"
import logo from "../../assets/images/defaultProfile.jpg"
import { MiniLoader } from "../../Components/Common";
import inputHelper from "../../Helper/inputHelper";
import toastNotify from "../../Helper/toastNotify";
import { useChangePasswordMutation, useConfirmEmailRequestMutation } from "../../APIs/userAPI";

function ResponsiblePersonProfile() {
  useEffect(() => {
    const foot = document.getElementById("footer");
    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const navigate = useNavigate();

  const [isLoading, setLoading] = useState<boolean>(false);

  const responsiblePersonData: responsiblePerson = useSelector(
    (state: RootState) => state.responsiblePersonStore
  );

  const [isPasswordChangeActive, setPasswordChangeActive] = useState<boolean>(false);

  const [passwordInfo, setPasswordInfo] = useState({
    login: "",
    oldPassword: ""
  })

  const [isResponsiblePersonAttachedToCompany, setResponsiblePersonAttachedToCompany] = useState<boolean>(false);

  useEffect(() => {
    if(responsiblePersonData && responsiblePersonData.companyFullName !== "Відповідальна особа не прив'язана до компанії")
      {
          setResponsiblePersonAttachedToCompany(true);
      }
  }, [responsiblePersonData])

  const userData : userModel = useSelector((state: RootState) => state.userAuthStore); 

  const [changePassword] = useChangePasswordMutation();

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const response: apiResponse = await changePassword({
      login: passwordInfo.login,
      oldPassword: passwordInfo.oldPassword,
    });

    if (response.data && response.data.isSuccess) {
      console.log(response.data.result);
      navigate(
        `/changePassword/${response.data.result.login}/${response.data.result.token}`
      );
      toastNotify(
        "Для зміни паролю, введіть новий пароль та підтвердіть його."
      );
    } else {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

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
        "Запит на підтвердження електронної пошти надіслано на E-Mail вказаний при реєстрації."
      );
    } else {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, passwordInfo);
    setPasswordInfo(tempData);
  }

  window.onload = () => {
    let storedMessage = localStorage.getItem("storedMessage");
    if(storedMessage)
    {
        let {message, type} = JSON.parse(storedMessage);
        toastNotify(message, type);
        localStorage.removeItem("storedMessage");
    }
  }

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
        <h2 className="m-3 text-center" style={{ color: "#FFF" }}>
          Особистий кабінет відповідальної особи
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
                src={logo}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">
                {responsiblePersonData.firstName} {responsiblePersonData.lastName}
              </h5>
              <p className="text-white mb-1">{responsiblePersonData.positionInCompany}</p>
              <p className="h6 mb-1">{responsiblePersonData.companyFullName}</p>
              <div className="d-flex justify-content-center mb-2">
                {!responsiblePersonData.emailConfirmed ? (
                  <form method="POST" onSubmit={handleEmailConfirmationRequest}>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="btn btn-success mt-3 mx-3"
                    >
                      {isLoading ? (
                        <MiniLoader></MiniLoader>
                      ) : (
                        "Підтвердити E-Mail"
                      )}
                    </button>
                  </form>
                ) : null}
                {isPasswordChangeActive ? (
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
                        disabled={isLoading}
                        type="submit"
                        className="btn btn-success mx-2 mt-4"
                      >
                        {isLoading ? (
                          <MiniLoader></MiniLoader>
                        ) : (
                          "Підтвердити зміну паролю"
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPasswordChangeActive((previousState) => !previousState)}
                        className="btn btn-warning mx-3 mt-4"
                      >
                        Відмінити зміну пароля
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                  onClick={() => setPasswordChangeActive((previousState) => !previousState)}
                    type="button"
                    className="btn btn-danger my-3"
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
                    {responsiblePersonData.lastName} {responsiblePersonData.firstName}{" "}
                    {responsiblePersonData.middleName}
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
                    {responsiblePersonData.email} -{" "}
                    {responsiblePersonData.emailConfirmed ? (
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
                    {responsiblePersonData.phoneNumber}
                  </p>
                </div>
              </div>
              <hr />
              </div>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#212529", color: "#0DA378" }}
            className="card mb-3"
          >
            <div className="card-body">
              <h2 className="m-2 mb-4 text-center" style={{ color: "#FFF" }}>
                Куточок відповідальної особи
              </h2>
              <div className="row">
                <div className="col-sm-3">
                  <p className="my-0 text-center">Компанія у Вашій відповідальності</p>
                </div>
                <div className="col-sm-9 text-center">
                  {isResponsiblePersonAttachedToCompany ? (<div>
                    <button
                    onClick={() => navigate("/responsiblePersonProfile/companyDetails")}
                    className="btn text-white btn-outline-success"
                  >
                    {responsiblePersonData.companyFullName}
                  </button>
                  </div>) : (<div>
                    <button
                    onClick={() => navigate("/responsiblePersonProfile/registerCorporateAccountHolder")}
                    className="btn text-white btn-outline-success"
                  >
                    Додати компанію до відповідальної особи
                  </button>
                  </div>)}
                  
                </div>
              </div>
              {isResponsiblePersonAttachedToCompany && (<div>
                <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Банківський рахунок компанії</p>
                </div>
                <div className="col-sm-9 text-center">
                  <button
                    onClick={() => navigate("/responsiblePersonProfile/corporateBankAccountDetails")}
                    className="btn text-white btn-outline-success"
                  >
                    Детальніше про рахунок
                  </button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Розрахункові рахунки</p>
                </div>
                <div className="col-sm-9 text-center">
                  <button
                    onClick={() => navigate("/responsiblePersonProfile/companyBankAssets")}
                    className="btn text-white btn-outline-success"
                  >
                    Детальніше про рахунки
                  </button>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Транзакції по рахунках компанії</p>
                </div>
                <div className="col-sm-9 text-center">
                  <button className="btn text-white btn-outline-success" onClick={() => navigate("/responsiblePersonProfile/companyTransactions")}>
                    Перейти до транзакцій
                  </button>
                </div>
              </div>
              </div>)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default withAuth(ResponsiblePersonProfile);
