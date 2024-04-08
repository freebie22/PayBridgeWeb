import React from "react";
import { personalAccountHolderProfileModel } from "../../Interfaces";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import logo from "../../assets/images/defaultProfile.jpg";

function PersonalAccountHolderProfile() {

  const profileData : personalAccountHolderProfileModel = useSelector((state : RootState) => state.personalAccountHolderStore);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center mb-3">
        <h2 style={{color : "#0DA378"}}>Особистий кабінет</h2>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div style={{backgroundColor: "#212529", color: "#0DA378"}} className="card mb-4">
            <div className="card-body text-center">
              <img
                src={profileData.profileImage !== "No image" ? profileData.profileImage : logo}
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: "150px" }}
              />
              <h5 className="my-3">{profileData.firstName} {profileData.lastName}</h5>
              <p className="text-white mb-1">Клієнту сервісу PayBridge</p>
              <p className="text-white mb-4">{profileData.country}, {profileData.state}</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">
                  Follow
                </button>
                {/* <button type="button" className="btn btn-outline-primary ms-1">
                  Розпочати діалог
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div style={{backgroundColor: "#212529", color: "#0DA378"}} className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">П.І.Б.</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.lastName} {profileData.firstName} {profileData.middleName}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">E-Mail</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.email}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Тел.</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.phoneNumber}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Дата народження</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.dateOfBirth}</p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Країна</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.country}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Повна адреса</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.state}, м. {profileData.city}, {profileData.streetAddress}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Поштовий індекс</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.postalCode}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Номер платника податків</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.taxIdentificationNumber}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Серія та номер паспорту</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">{profileData.passportSeries} - {profileData.passportNumber}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalAccountHolderProfile;
