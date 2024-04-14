import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiResponse, userModel } from "../Interfaces";
import { useConfirmEmailMutation } from "../APIs/userAPI";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import toastNotify from "../Helper/toastNotify";

function EmailConfirmation() {
  const { confirmToken } = useParams();

  let token = localStorage.getItem("token");

  const [confirmEmail] = useConfirmEmailMutation();

  const navigate = useNavigate();

  const handleConfirmEmail = async (userId: string, token: string) => {
    console.log(userId, token);
    const response: apiResponse = await confirmEmail({
      userId: userId,
      token: token,
    });

    if (response.data && response.data.isSuccess) {
      navigate("/myProfile");
      location.reload();
      toastNotify("Вітаємо! Ви успішно електронну пошту в нашому сервісі. Тепер Ви можете реєструвати власні рахунки та виконувати операції за ними.");
    } else {
      navigate("/myProfile"); 
      location.reload();
      toastNotify(response.data!.errorMessages![0], "error");
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken: userModel = jwtDecode(token);
      handleConfirmEmail(decodedToken.id, confirmToken!);
    }
  }, []);

  return null;
}

export default EmailConfirmation;
