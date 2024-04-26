import React, { useEffect, useState } from "react";
import CitiesAndVillages from "../../JSON/CitiesAndVillages.json";
import { apiResponse, citiesAndVillages, userModel } from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import inputHelper from "../../Helper/inputHelper";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useCreatePersonalAccountHolderMutation } from "../../APIs/accountHolderAPI";
import toastNotify from "../../Helper/toastNotify";
import { MiniLoader } from "../../Components/Common";

function PersonalAccountHolderRegister() {
  const [personalAccountHolderInput, setPersonalAccountHolderInput] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    postalCode: "",
    country: "Україна",
    state: "",
    city: "",
    streetAddress: "",
    passportSeries: "",
    passportNumber: "",
    taxIdentificationNumber: "",
    userId: "",
  });

  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [createPersonalAccountHolder] = useCreatePersonalAccountHolderMutation();

  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    if (jwtToken) {
      const { id, email, userName, role }: userModel = jwtDecode(jwtToken);
      setPersonalAccountHolderInput((previousState) => ({
        ...previousState,
        userId: id,
      }));
    } else {
      navigate("/");
    }
  }, [jwtToken]);

  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const citiesAndVillagesJson: citiesAndVillages[] =
    CitiesAndVillages as citiesAndVillages[];

  useEffect(() => {
    let regions: string[] = [];
    citiesAndVillagesJson.forEach((objFromJson: citiesAndVillages) => {
      if (regions.indexOf(objFromJson.region) === -1) {
        regions.push(objFromJson.region);
      }
    });

    if (regions && regions.length > 0) {
      setRegions(regions);
    }
  }, [citiesAndVillagesJson]);

  const handleChooseRegion = (region: string) => {
    setPersonalAccountHolderInput((previousState) => ({
      ...previousState,
      state: region,
    }));
    let citiesAndVillagesByRegion = citiesAndVillagesJson.filter(
      (obj: citiesAndVillages) => obj.region === region
    );
    let citiesAndVillages: string[] = [];
    citiesAndVillagesByRegion.forEach((obj: citiesAndVillages) => {
      if (obj.object_category === "Місто") {
        citiesAndVillages.push("м. " + obj.object_name);
      }
    });

    if (citiesAndVillages && citiesAndVillages.length > 0) {
      setCities(citiesAndVillages.sort());
    }
  };

  const handleChooseCity = (city: string) => {
    setPersonalAccountHolderInput((previousState) => ({
      ...previousState,
      city: city,
    }));
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, personalAccountHolderInput);
    setPersonalAccountHolderInput(tempData);
    console.log(personalAccountHolderInput);
  };

  const handleDatePick = (date: string) => {
    const dataStr = date;
    const newDate = new Date(dataStr);

    const ukrainianDate = newDate.toLocaleDateString("uk-UA");
    setPersonalAccountHolderInput((previousState) => ({
        ...previousState,
        dateOfBirth: ukrainianDate
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response : apiResponse = await createPersonalAccountHolder({
        firstName: personalAccountHolderInput.firstName,
        lastName: personalAccountHolderInput.lastName,
        middleName: personalAccountHolderInput.middleName,
        dateOfBirth: personalAccountHolderInput.dateOfBirth,
        postalCode: personalAccountHolderInput.postalCode,
        country: "Україна",
        state: personalAccountHolderInput.state,
        city: personalAccountHolderInput.city,
        streetAddress: personalAccountHolderInput.streetAddress,
        passportSeries: personalAccountHolderInput.passportSeries,
        passportNumber: personalAccountHolderInput.passportNumber,
        taxIdentificationNumber: personalAccountHolderInput.taxIdentificationNumber,
        userId: personalAccountHolderInput.userId,
    })

    if(response.data && response.data.isSuccess)
    {
        localStorage.setItem("storedMessage", JSON.stringify({message: "До Вашого облікового запису було успішно додано аккаунт фізичної особи. Подальші операції Ви можете проводити в особистому кабінеті", type: "success"}));
        navigate("/");
        location.reload();
    }

    else if(response.error)
    {
        toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div
      className="container rounded mt-5"
      style={{ backgroundColor: "#212529" }}
    >
      <form method="POST" onSubmit={handleSubmit}>
        <div className="text-center py-3">
          <h3 className="text-white">Реєстрація фізичної особи</h3>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="lastName" className="h5 text-center text-white">
            Ваше прізвище
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Прізвище..."
            required
            value={personalAccountHolderInput.lastName}
            name="lastName"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="lastName" className="h5 text-center text-white">
            Ваше ім'я
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Ім'я..."
            required
            value={personalAccountHolderInput.firstName}
            name="firstName"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="lastName" className="h5 text-center text-white">
            Ваше по-батькові
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="По-батькові"
            required
            value={personalAccountHolderInput.middleName}
            name="middleName"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="dateOfBirth" className="h5 text-center text-white">
            Дата народження
          </label>
          <input
            type="date"
            className="form-control"
            min="1940-01-01"
            max="2006-01-01"
            required
            onChange={(e) => handleDatePick(e.target.value)}
            name="dateOfBirth"
          ></input>
        </div>
        {regions && regions.length > 0 && (
          <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
            <h5 className="text-white">Область проживання</h5>
            <select
              required
              onChange={(e) => handleChooseRegion(e.target.value)}
              className="form-select"
            >
              <option selected disabled>
                Оберіть область
              </option>
              {regions.map((region: string, index: number) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        )}
        {cities && cities.length > 0 && (
          <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
            <h5 className="text-white">Місто проживання</h5>
            <select
              required
              onChange={(e) => handleChooseCity(e.target.value)}
              className="form-select"
            >
              <option selected disabled>
                Оберіть населений пункт
              </option>
              {cities.map((settlement: string, index: number) => (
                <option key={index} value={settlement}>
                  {settlement}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="postalCode" className="h5 text-center text-white">
            Індекс
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="01001"
            required
            value={personalAccountHolderInput.postalCode}
            name="postalCode"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="streetAddress" className="h5 text-center text-white">
            Адреса
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="вул. Миру, 1"
            required
            value={personalAccountHolderInput.streetAddress}
            name="streetAddress"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="passportSeries" className="h5 text-center text-white">
            Серія паспорту
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Серія..."
            required
            value={personalAccountHolderInput.passportSeries}
            name="passportSeries"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="passportNumber" className="h5 text-center text-white">
            Номер паспорту
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Номер..."
            required
            value={personalAccountHolderInput.passportNumber}
            name="passportNumber"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="passportSeries" className="h5 text-white">
            Ідентифікаційний номер платника податків
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Код..."
            required
            value={personalAccountHolderInput.taxIdentificationNumber}
            name="taxIdentificationNumber"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="d-flex justify-content-center align-items-center py-3">
          <button disabled={isLoading} type="submit" className="btn btn-success">
            {isLoading ? (<MiniLoader></MiniLoader>) : "Підтвердити реєстрацію"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalAccountHolderRegister;
