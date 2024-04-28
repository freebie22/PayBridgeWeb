import React, { useEffect } from "react";
import { Footer, Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import {
  BankCards,
  ChangePassword,
  CompanyBankAssets,
  CorporateAccountHolderRegister,
  CorporateBankAccountDetails,
  ForgotPassword,
  Home,
  InfoPage,
  Login,
  MyBankAccounts,
  MyBankCards,
  PersonalAccountHolderProfile,
  PersonalAccountHolderRegister,
  Register,
  ResponsiblePersonProfile,
  ServiceCatalog,
} from "../Pages";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { ManagerModel, userModel } from "../Interfaces";
import {
  useGetCorporateAccountHolderByUserIdQuery,
  useGetPersonalAccountHolderByUserIdQuery,
} from "../APIs/accountHolderAPI";
import { RootState } from "../Storage/Redux/store";
import { setProfileState } from "../Storage/Redux/personalAccountHolderSlice";
import EmailConfirmation from "../Pages/EmailConfirmation";
import { useGetManagerByIdQuery } from "../APIs/managerAPI";
import { setManagerState } from "../Storage/Redux/managerSlice";
import ManagerProfile from "../Pages/Profiles/ManagerProfile";
import BankAccounts from "../Pages/BankAccounts";
import MyTransactions from "../Pages/Transactions/MyTransactions";
import TransactionDetails from "../Pages/Transactions/TransactionDetails";
import { setCorporateAccountState } from "../Storage/Redux/corporateAccountHolderSlice";
import { useGetResponsiblePersonByUserIdQuery } from "../APIs/responsiblePersonAPI";
import { setResponsiblePersonState } from "../Storage/Redux/responsiblePersonSlice";
import CompanyDetails from "../Pages/CompanyDetails";

function App() {
  const dispatch = useDispatch();

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );


  const { data: personalAccountData, isLoading: personalAccountLoading } =
    useGetPersonalAccountHolderByUserIdQuery(userData.id, {
      skip: userData.id === "" || userData.role !== "Client",
    });

  const { data: managerData, isLoading: managerLoading } =
    useGetManagerByIdQuery(userData.id, {
      skip: userData.id === "" || userData.role !== "Manager",
    });

  const { data: responsiblePersonData, isLoading: responsiblePersonLoading } =
    useGetResponsiblePersonByUserIdQuery(userData.id, {
      skip: userData.id === "" || userData.role !== "Responsible_Person",
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
    if (
      userData.id !== "" &&
      userData.role === "Responsible_Person" &&
      !responsiblePersonLoading
    ) 
    {
      dispatch(setResponsiblePersonState(responsiblePersonData.result));
    }
  }, [personalAccountData, managerData, responsiblePersonData]);

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
        <Route
          path="/myProfile/myBankAccounts"
          element={<MyBankAccounts></MyBankAccounts>}
        ></Route>
        <Route
          path="/managerProfile/bankAccounts"
          element={<BankAccounts></BankAccounts>}
        ></Route>
        <Route
          path="/myProfile/myBankCards"
          element={<MyBankCards></MyBankCards>}
        ></Route>
        <Route path="/responsiblePersonProfile" element={<ResponsiblePersonProfile></ResponsiblePersonProfile>}></Route>
        <Route path="/responsiblePersonProfile/companyDetails" element={<CompanyDetails></CompanyDetails>}></Route>
        <Route path="/responsiblePersonProfile/companyBankAssets" element={<CompanyBankAssets></CompanyBankAssets>}></Route>
        <Route path="/responsiblePersonProfile/corporateBankAccountDetails" element={<CorporateBankAccountDetails></CorporateBankAccountDetails>}></Route>
        <Route
          path="/managerProfile/bankCards"
          element={<BankCards></BankCards>}
        ></Route>
        <Route
          path="/myProfile/myTransactions"
          element={<MyTransactions></MyTransactions>}
        ></Route>
        <Route
          path="/myProfile/transactionDetails/:transactionUniqueNumber?"
          element={<TransactionDetails></TransactionDetails>}
        ></Route>
        <Route
          path="/managerProfile"
          element={<ManagerProfile></ManagerProfile>}
        ></Route>
        <Route
          path="/emailConfirmation/:confirmToken"
          element={<EmailConfirmation></EmailConfirmation>}
        ></Route>
        <Route path="/infoPage" element={<InfoPage></InfoPage>}></Route>
        <Route
          path="/serviceCatalog"
          element={<ServiceCatalog></ServiceCatalog>}
        ></Route>
        <Route
          path="/registerPersonalAccountHolder"
          element={
            <PersonalAccountHolderRegister></PersonalAccountHolderRegister>
          }
        ></Route>
        <Route
          path="/registerCorporateAccountHolder"
          element={
            <CorporateAccountHolderRegister></CorporateAccountHolderRegister>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
