import React, { useEffect, useState } from "react";
import {
  apiResponse,
  personalAccountHolderProfileModel,
  userModel,
} from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import logo from "../../assets/images/defaultProfile.jpg";
import { useConfirmEmailRequestMutation } from "../../APIs/userAPI";
import toastNotify from "../../Helper/toastNotify";
import { MiniLoader } from "../../Components/Common";
import { useLocation, useNavigate } from "react-router-dom";
import payBridgeSm from "../../assets/images/paybridge-sm.png";
import { withAuth } from "../../HOC";

function PersonalAccountHolderProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const profileData: personalAccountHolderProfileModel = useSelector(
    (state: RootState) => state.personalAccountHolderStore
  );

  useEffect(() => {
    console.clear();
    console.log(userData);
    console.log(profileData);
  }, [userData, profileData]);

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toastNotify(location.state.successMessage);
    }
    if (location.state && location.state.errorMessage) {
      toastNotify(location.state.errorMessage, "error");
    }
  }, []);

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
      setError(response.error.data.errorMessages[0]);
      toastNotify(error, "error");
    }

    setLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center rounded mb-3" style={{backgroundColor: "#212529"}}>
        <img className="m-3" src={payBridgeSm} alt="" style={{maxHeight: "40px"}}></img>
        <h2 className="m-3" style={{ color: "#FFF" }}>Особистий кабінет</h2>
        <img className="m-3" src={payBridgeSm} alt="" style={{maxHeight: "40px"}}></img>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div
            style={{ backgroundColor: "#212529", color: "#0DA378" }}
            className="card mb-4"
          >
            <div className="card-body text-center">
              <img
                src={
                  profileData.profileImage !== "No Image"
                    ? profileData.profileImage
                    : logo
                }
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">
                {profileData.firstName} {profileData.lastName}
              </h5>
              <p className="text-white mb-1">Клієнту сервісу PayBridge</p>
              <p className="text-white mb-4">
                {profileData.country}, {profileData.state}
              </p>
              <div className="d-flex justify-content-center mb-2">
                {!profileData.emailConfirmed ? (
                  <form method="POST" onSubmit={handleEmailConfirmationRequest}>
                    <button
                      disabled={loading}
                      type="submit"
                      className="btn btn-success"
                    >
                      {loading ? (
                        <MiniLoader></MiniLoader>
                      ) : (
                        "Підтвердити E-Mail"
                      )}
                    </button>
                  </form>
                ) : null}

                <button type="button" className="btn btn-outline-primary ms-1">
                  Розпочати діалог
                </button>
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
                    {profileData.lastName} {profileData.firstName}{" "}
                    {profileData.middleName}
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
                    {profileData.email} -{" "}
                    {profileData.emailConfirmed ? (
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
                    {profileData.phoneNumber}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Дата народження</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.dateOfBirth}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Країна</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.country}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Повна адреса</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.state}, м. {profileData.city},{" "}
                    {profileData.streetAddress}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Поштовий індекс</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.postalCode}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Номер платника податків</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.taxIdentificationNumber}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Серія та номер паспорту</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {profileData.passportSeries} - {profileData.passportNumber}
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

export default withAuth(PersonalAccountHolderProfile);
