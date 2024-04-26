import React, { ReactElement, useEffect, useState } from "react";
import { useRegisterUserMutation } from "../APIs/userAPI";
import { NavLink, useNavigate } from "react-router-dom";
import inputHelper from "../Helper/inputHelper";
import { apiResponse } from "../Interfaces";
import toastNotify from "../Helper/toastNotify";
import { MainLoader, MiniLoader } from "../Components/Common";
import payBridgeSm from "../assets/images/paybridge-sm.png";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [userInput, setUserInput] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  const [imageToStore, setImageToStore] = useState<any>();

  const navigate = useNavigate();
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput);
    setUserInput(tempData);
  };

  useEffect(() => {
    const foot = document.getElementById("footer");
    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const imgType = file.type.split("/")[1];
      const validImgTypes = ["jpg", "jpeg", "png"];

      const isImageTypeValid = validImgTypes.filter((e) => {
        return (e = imgType);
      });

      if (file.size > 1000 * 1024) {
        setImageToStore("");
        return;
      } else if (isImageTypeValid.length === 0) {
        setImageToStore("");
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      setImageToStore(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("username", userInput.username);
    formData.append("password", userInput.password);
    formData.append("email", userInput.email);
    formData.append("phoneNumber", userInput.phoneNumber);
    formData.append("role", userInput.role);
    if (imageToStore) formData.append("profileImage", imageToStore);

    let response: apiResponse = await registerUser(formData);

    if (response.data && response.data.isSuccess) {
      if (userInput.role === "Client") {
        toastNotify(
          "Реєстрація успішна! Будь-ласка, авторизуйтесь та створіть обліковий запис фізичної особи, щоб продовжити роботу в нашому сервісі."
        );
        navigate("/");
      }
      if (userInput.role === "Responsible_Person") {
        toastNotify(
          "Реєстрація успішна! Будь-ласка, авторизуйтесь та створіть обліковий запис відповідальної особи компанії, щоб продовжити роботу в нашому сервісі."
        );
        navigate("/");
      }
      setUserInput({
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
        role: "",
      });
    } else if (response.error) {
      console.log(response.error.data.errorMessages);
    }
    setLoading(false);
  };

  const handleRolePick = (role: string) => {
    setUserInput((previousState) => ({
      ...previousState,
      role: role,
    }));
  };

  return (
    <div
      className="container rounded text-center mt-5 py-3"
      style={{ backgroundColor: "#212529" }}
    >
      <form onSubmit={handleSubmit} encType="multipart/form-data" method="post">
        <div>
          <img src={payBridgeSm} alt="" style={{ height: "70px" }}></img>
          <h1 className="mt-2 text-white">Реєстрація</h1>
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
            <select
              className="form-select"
              name="role"
              required
              onChange={(e) => handleRolePick(e.target.value)}
            >
              <option selected disabled>
                Оберіть тип облікового запису
              </option>
              <option value={"Client"}>Фізична особа</option>
              <option value={"Responsible_Person"}>
                Відповідальна особа за фін.операції на підприємстві
              </option>
            </select>
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <div className="text-center pt-3">
            <NavLink className="text-white" to="/login">
              Вже маєте обліковий запис? Авторизуйтесь!
            </NavLink>
          </div>
          <div className="mt-4 pb-5">
            <button type="submit" className="btn btn-success">
              {isLoading ? <MiniLoader></MiniLoader> : "Зареєструватись"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
