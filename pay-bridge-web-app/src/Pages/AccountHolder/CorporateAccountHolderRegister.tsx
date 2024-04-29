import React, { useEffect, useState } from 'react'
import { apiResponse, citiesAndVillages, responsiblePerson } from '../../Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../Storage/Redux/store'
import { useNavigate } from 'react-router-dom';
import { useCreateCorporateAccountHolderMutation } from '../../APIs/accountHolderAPI';
import CitiesAndVillages from "../../JSON/CitiesAndVillages.json"
import inputHelper from '../../Helper/inputHelper';
import toastNotify from '../../Helper/toastNotify';
import { MiniLoader } from '../../Components/Common';

function CorporateAccountHolderRegister() {

  const responsiblePersonData: responsiblePerson = useSelector((state: RootState) => state.responsiblePersonStore);

  const [corporateAccountHolderInput, setCorporateAccountHolderInput] = useState({
    shortCompanyName: "",
    fullCompanyName: "",
    companyCode: "",
    contactEmail: "",
    contactPhone: "",
    emailConfirmed: true,
    dateOfEstablishment: "",
    postalCode: 0,
    country: "Україна",
    state: "",
    city: "",
    streetAddress: "",
    isActive: true,
    status: "Активна",
    responsiblePersonId: 0
  })

  useEffect(() => {
    if(responsiblePersonData && responsiblePersonData.responsiblePersonId !== 0)
      {
        setCorporateAccountHolderInput((previousState) => ({
          ...previousState,
          responsiblePersonId: responsiblePersonData.responsiblePersonId
        }))
      }
  }, [responsiblePersonData]);

  const [isLoading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const [createCorporateAccountHolder] = useCreateCorporateAccountHolderMutation();


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
    setCorporateAccountHolderInput((previousState) => ({
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
    setCorporateAccountHolderInput((previousState) => ({
      ...previousState,
      city: city,
    }));
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, corporateAccountHolderInput);
    setCorporateAccountHolderInput(tempData);
  };

  const handleDatePick = (date: string) => {
    const dataStr = date;
    const newDate = new Date(dataStr);

    const ukrainianDate = newDate.toLocaleDateString("uk-UA");
    setCorporateAccountHolderInput((previousState) => ({
        ...previousState,
        dateOfEstablishment: ukrainianDate
      }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(corporateAccountHolderInput);

    const response : apiResponse = await createCorporateAccountHolder({
      shortCompanyName: corporateAccountHolderInput.shortCompanyName,
      fullCompanyName: corporateAccountHolderInput.fullCompanyName,
      companyCode: corporateAccountHolderInput.companyCode,
      contactEmail: corporateAccountHolderInput.contactEmail,
      contactPhone: corporateAccountHolderInput.contactPhone,
      emailConfirmed: corporateAccountHolderInput.emailConfirmed,
      dateOfEstablishment: corporateAccountHolderInput.dateOfEstablishment,
      postalCode: corporateAccountHolderInput.postalCode,
      country: corporateAccountHolderInput.country,
      state: corporateAccountHolderInput.state,
      city: corporateAccountHolderInput.city,
      streetAddress: corporateAccountHolderInput.streetAddress,
      isActive: corporateAccountHolderInput.isActive,
      status: corporateAccountHolderInput.status,
      responsiblePersonId: corporateAccountHolderInput.responsiblePersonId
    })

    if(response.data && response.data.isSuccess)
    {
        localStorage.setItem("storedMessage", JSON.stringify({message: "До Вашого облікового запису відповідальної було успішно додано компанію. Подальші операції Ви можете проводити в особистому кабінеті", type: "success"}));
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
          <h3 className="text-white">Реєстрація компанії / ФОП</h3>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="shortCompanyName" className="h5 text-center text-white">
            Скорочена назва компанії
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Коротка назва..."
            required
            value={corporateAccountHolderInput.shortCompanyName}
            name="shortCompanyName"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="lastName" className="h5 text-center text-white">
            Повна назва компанії
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Повна назва..."
            required
            value={corporateAccountHolderInput.fullCompanyName}
            name="fullCompanyName"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="companyCode" className="h5 text-center text-white">
            Код ЄДРПОУ компанії
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="ЄДРПОУ..."
            required
            value={corporateAccountHolderInput.companyCode}
            name="companyCode"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="contactEmail" className="h5 text-center text-white">
            Контактний E-Mail
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="E-Mail"
            required
            value={corporateAccountHolderInput.contactEmail}
            name="contactEmail"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="contactPhone" className="h5 text-center text-white">
            Контактний номер телефон
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="+380990010101..."
            required
            value={corporateAccountHolderInput.contactPhone}
            name="contactPhone"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="dateOfEstablishment" className="h5 text-center text-white">
            Дата заснування компаныъ
          </label>
          <input
            type="date"
            className="form-control"
            min="1940-01-01"
            max="2023-01-01"
            required
            onChange={(e) => handleDatePick(e.target.value)}
            name="dateOfEstablishment"
          ></input>
        </div>
        {regions && regions.length > 0 && (
          <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
            <h5 className="text-white">Область реєстрації компанії</h5>
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
            <h5 className="text-white">Місто реєстрації компанії</h5>
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
            value={corporateAccountHolderInput.postalCode}
            name="postalCode"
            onChange={handleUserInput}
          ></input>
        </div>
        <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
          <label htmlFor="streetAddress" className="h5 text-center text-white">
            Адреса офісу компанії
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="вул. Миру, 1"
            required
            value={corporateAccountHolderInput.streetAddress}
            name="streetAddress"
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

export default CorporateAccountHolderRegister