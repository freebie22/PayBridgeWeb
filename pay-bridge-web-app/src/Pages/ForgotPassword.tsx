import React, { useState } from 'react'
import payBridgeSm from '../assets/images/paybridge-sm.png'
import inputHelper from '../Helper/inputHelper';
import { useForgotPasswordMutation } from '../APIs/userAPI';
import { apiResponse } from '../Interfaces';
import toastNotify from '../Helper/toastNotify';
import { useNavigate } from 'react-router-dom';
import { MiniLoader } from '../Components/Common';

function ForgotPassword() {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [userInput, setUserInput] = useState({
        login: ""
    });

    const navigate = useNavigate();

    const [forgotPassword] = useForgotPasswordMutation();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const response : apiResponse = await forgotPassword(userInput.login);

        if(response.data && response.data?.isSuccess)
        {
            navigate("/");
            toastNotify("E-Mail з скидання паролю було успішно надіслано.", "success");
            setUserInput({login : ""});
        }
        else
        {
            toastNotify(response.error.data.errorMessages[0], "error");
            setUserInput({login : ""});
        }

        setLoading(false);
    }

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
        console.log(userInput);
    }

  return (
    <div className="container mt-5 p-3 text-center rounded" style={{backgroundColor: "#212529", maxWidth: "60%"}}>
        <form method="POST" onSubmit={handleSubmit}>
            <h2 className="text-white">Запит на відновлення паролю</h2>
            <img src={payBridgeSm} alt="" style={{maxHeight: "40px"}}></img>
            <div className='mt-3'>
                <p className='text-white'>Для того, щоб відновити пароль, ми надішлемо Вам на E-Mail повідомлення з інструкцією щодо подальших дій</p>
                <div className='col-sm-6 offset-sm-3 col-xs-12 mt-1'>
                <img src={payBridgeSm} alt="" style={{maxHeight: "40px"}}></img>
                <h5 className='text-white mt-2'>Введіть Ваш логін або E-Mail, щоб був вказаний Вами при реєстрації</h5>
                    <input
                        className='form-control'
                        type='text'
                        value={userInput.login}
                        onChange={handleUserInput}
                        name="login"
                        required
                        placeholder='Введіть Ваш логін або E-Mail'
                    ></input>
                </div>
                <button disabled={isLoading} style={{width: "200px"}} className='btn btn-success mt-3'>
                    {isLoading ? (<MiniLoader></MiniLoader>) : "Надіслати запит"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default ForgotPassword