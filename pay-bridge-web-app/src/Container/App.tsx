import React, { useEffect } from "react";
import { Footer, Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import {
  ChangePassword,
  ForgotPassword,
  Home,
  Login,
  PersonalAccountHolderProfile,
  Register,
} from "../Pages";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { ManagerModel, userModel } from "../Interfaces";
import { useGetPersonalAccountHolderByUserIdQuery } from "../APIs/accountHolderAPI";
import { RootState } from "../Storage/Redux/store";
import { setProfileState } from "../Storage/Redux/personalAccountHolderSlice";
import EmailConfirmation from "../Pages/EmailConfirmation";
import { useGetManagerByIdQuery } from "../APIs/managerAPI";
import { setManagerState } from "../Storage/Redux/managerSlice";
import ManagerProfile from "../Pages/Profiles/ManagerProfile";

function App() {
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const managerStore: ManagerModel = useSelector(
    (state: RootState) => state.managerStore
  );

  const { data: personalAccountData, isLoading: personalAccountLoading } =
    useGetPersonalAccountHolderByUserIdQuery(userData.id, {
      skip: userData.id === "" || userData.role !== "Client",
    });

  const { data: managerData, isLoading: managerLoading } =
    useGetManagerByIdQuery(userData.id, {
      skip: userData.id === "" || userData.role !== "Manager",
    });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const { id, userName, email, role }: userModel = jwtDecode(token);
      dispatch(setLoggedInUser({ id, userName, email, role }));
    }
  }, []);

  useEffect(() => {
    if (
      userData.id !== "" &&
      userData.role === "Client" &&
      !personalAccountLoading
    ) {
      dispatch(setProfileState(personalAccountData.result));
    }
    if (userData.id !== "" && userData.role === "Manager" && !managerLoading) {
      dispatch(setManagerState(managerData.result));
    }
  }, [personalAccountData, managerData]);

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/forgotPassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/changePassword/:login?/:confirmToken?"
          element={<ChangePassword></ChangePassword>}
        ></Route>
        <Route
          path="/myProfile"
          element={
            <PersonalAccountHolderProfile></PersonalAccountHolderProfile>
          }
        ></Route>
        <Route path = "/managerProfile" element={<ManagerProfile></ManagerProfile>}></Route>
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
