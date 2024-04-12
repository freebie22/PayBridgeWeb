import React, { ReactElement, useState } from "react";
import { useRegisterUserMutation } from "../APIs/userAPI";
import { useNavigate } from "react-router-dom";
import inputHelper from "../Helper/inputHelper";
import { apiResponse } from "../Interfaces";
import toastNotify from "../Helper/toastNotify";
import { MainLoader } from "../Components/Common";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "Client",
  });

  const [imageToStore, setImageToStore] = useState<any>();

  const navigate = useNavigate();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if(file) {
        const imgType = file.type.split("/")[1];
        const validImgTypes = ["jpg", "jpeg", "png"];

        const isImageTypeValid = validImgTypes.filter((e) => {
            return (e = imgType);
        })

        if(file.size > 1000 * 1024)
        {
            setImageToStore("");
            return;
        }
        else if(isImageTypeValid.length === 0){
            setImageToStore("");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        setImageToStore(file);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // const response: apiResponse = await registerUser({
    //   username: userInput.username,
    //   password: userInput.password,
    //   email: userInput.email,
    //   phoneNumber: userInput.phoneNumber,
    //   role: userInput.role,
    // });

    const formData = new FormData();

    formData.append("username", userInput.username);
    formData.append("password", userInput.password);
    formData.append("email", userInput.email);
    formData.append("phoneNumber", userInput.phoneNumber);
    formData.append("role", userInput.role);
    if(imageToStore) formData.append("profileImage", imageToStore);

    let response : apiResponse = await registerUser(formData);

    if (response.data && response.data.isSuccess) {
      toastNotify(
        "Реєстрація успішна! Будь-ласка, увійдіть в обліковий запис."
      );
      navigate("/");
    } else if (response.error) {
      console.log(response.error.data.errorMessages);
    }
    setLoading(false);
  };

  return <div className="container text-center">
    <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <h1 className="mt-5">Реєстрація</h1>
        <div className="mt-5">
        <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Введіть логін"
              name="username"
              required
              value={userInput.username}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Введіть пароль"
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Введіть Email"
              name="email"
              value={userInput.email}
              onChange={handleUserInput}
              required
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Введіть номер телефону"
              name="phoneNumber"
              required
              value={userInput.phoneNumber}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="mt-5">
            <button type="submit" className = "btn btn-success">
                {isLoading ? (<MainLoader></MainLoader>) : "Зареєструватись"}
            </button>
        </div>
    </form>
  </div>;
}

export default Register;
