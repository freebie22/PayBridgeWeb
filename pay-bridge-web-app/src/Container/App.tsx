import React, { useEffect } from "react";
import { Footer, Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import { ChangePassword, ForgotPassword, Home, Login, PersonalAccountHolderProfile, Register } from "../Pages";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { userModel } from "../Interfaces";
import { useGetPersonalAccountHolderByUserIdQuery } from "../APIs/accountHolderAPI";
import { RootState } from "../Storage/Redux/store";
import { setProfileState } from "../Storage/Redux/personalAccountHolderSlice";
import EmailConfirmation from "../Pages/EmailConfirmation";

function App() {
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const { data, isLoading } = useGetPersonalAccountHolderByUserIdQuery(
    userData.id,
    {
      skip: userData.id === "",
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { id, userName, email, role }: userModel = jwtDecode(token);
      dispatch(setLoggedInUser({ id, userName, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading && userData.id !== "") {
      dispatch(setProfileState(data.result));
    }
  }, [data]);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path="/changePassword/:login?/:confirmToken?" element={<ChangePassword></ChangePassword>}></Route>
        <Route
          path="/myProfile"
          element={
            <PersonalAccountHolderProfile></PersonalAccountHolderProfile>
          }
        ></Route>
        <Route
          path="/emailConfirmation/:confirmToken"
          element={<EmailConfirmation></EmailConfirmation>}
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
