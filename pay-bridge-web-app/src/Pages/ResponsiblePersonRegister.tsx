import React, { useEffect, useState } from 'react'
import { useCreateResponsiblePersonMutation } from '../APIs/responsiblePersonAPI';
import { useNavigate } from 'react-router-dom';
import { apiResponse, citiesAndVillages, userModel } from '../Interfaces';
import { jwtDecode } from 'jwt-decode';
import CitiesAndVillages from "../JSON/CitiesAndVillages.json"
import inputHelper from '../Helper/inputHelper';
import toastNotify from '../Helper/toastNotify';
import { MiniLoader } from '../Components/Common';

function ResponsiblePersonRegister() {
    const [responsiblePersonInput, setResponsiblePersonInput] = useState({
        firstName: "",
        lastName: "",
        isActive: true,
        middleName: "",
        positionInCompany: "",
        login: "",
      });
    
      const [isLoading, setLoading] = useState<boolean>(false);
    
      const navigate = useNavigate();
    
      const [createResponsiblePerson] = useCreateResponsiblePersonMutation();
    
    
    
      const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, responsiblePersonInput);
        setResponsiblePersonInput(tempData);
      };
    
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
    
        const response : apiResponse = await createResponsiblePerson({
            firstName: responsiblePersonInput.firstName,
            lastName: responsiblePersonInput.lastName,
            isActive: responsiblePersonInput.isActive,
            middleName: responsiblePersonInput.middleName,
            positionInCompany: responsiblePersonInput.positionInCompany,
            login: responsiblePersonInput.login,
        })
    
        if(response.data && response.data.isSuccess)
        {
            localStorage.setItem("storedMessage", JSON.stringify({message: "До Вашого облікового запису було успішно додано аккаунт відповідальної особи. Подальші операції Ви можете проводити в особистому кабінеті", type: "success"}));
            navigate("/");
            window.location.reload();
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
              <h3 className="text-white">Реєстрація відповідальної особи</h3>
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
              <label htmlFor="login" className="h5 text-center text-white">
                Введіть Ваш логін або E-Mail
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Логін або E-mail..."
                required
                value={responsiblePersonInput.login}
                name="login"
                onChange={handleUserInput}
              ></input>
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
                value={responsiblePersonInput.lastName}
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
                value={responsiblePersonInput.firstName}
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
                value={responsiblePersonInput.middleName}
                name="middleName"
                onChange={handleUserInput}
              ></input>
            </div>
            <div className="col-sm-6 offset-sm-3 col-xs-12 py-1 my-2">
              <label htmlFor="lastName" className="h5 text-center text-white">
                Ваша посада в компанії
              </label>
              <select onChange={handleUserInput} name="positionInCompany" className='form-select' required>
                <option disabled selected>--Оберіть посаду з переліку--</option>
                <option value={"Бухгалтер на підприємстві"}>Бухгалтер на підприємстві</option>
                <option value={"Фінансовий менеджер"}>Фінансовий менеджер</option>
              </select>
            </div>
            <div className="d-flex justify-content-center align-items-center py-3">
              <button disabled={isLoading} type="submit" className="btn btn-success">
                {isLoading ? (<MiniLoader></MiniLoader>) : "Підтвердити реєстрацію"}
              </button>
            </div>
          </form>
        </div>
      )
}

export default ResponsiblePersonRegister