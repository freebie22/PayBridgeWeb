import React, { useEffect, useState } from "react";
import {
    apiResponse,
  bankModel,
  corporateAccountHolder,
  corporateBankAccount,
  responsiblePerson,
} from "../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { useGetCorporateBankAccountByIdQuery, useRegisterCorporateBankAccountMutation } from "../APIs/bankAccountAPI";
import { setCorporateBankAccounts } from "../Storage/Redux/bankAccountSlice";
import { useGetCorporateAccountHolderByUserIdQuery } from "../APIs/accountHolderAPI";
import { setCorporateAccountState } from "../Storage/Redux/corporateAccountHolderSlice";
import { useNavigate } from "react-router-dom";
import { useGetBanksQuery } from "../APIs/bankAPI";
import { setBanksState } from "../Storage/Redux/bankSlice";
import toastNotify from "../Helper/toastNotify";
import { MiniLoader } from "../Components/Common";

function CorporateBankAccountDetails() {
  useEffect(() => {
    const foot = document.getElementById("footer");
    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountHolderData: corporateAccountHolder = useSelector(
    (state: RootState) => state.corporateAccountHolderStore
  );

  const responsiblePersonData: responsiblePerson = useSelector(
    (state: RootState) => state.responsiblePersonStore
  );

  const [isLoading, setLoading] = useState<boolean>();

  const { data: companyData, isLoading: companyLoading } =
    useGetCorporateAccountHolderByUserIdQuery(
      responsiblePersonData.responsiblePersonId,
      { skip: accountHolderData.accountId !== 0 }
    );

  useEffect(() => {
    if (companyData && !companyLoading) {
      dispatch(setCorporateAccountState(companyData.result));
    }
  }, [companyData]);

  const [bankAccountState, setBankAccountState] =
    useState<corporateBankAccount>();

  let accountOwnerId = responsiblePersonData.responsiblePersonId;
  let accountId = undefined;

  const { data: bankAccountData, isLoading: bankAccountLoading } =
    useGetCorporateBankAccountByIdQuery(
      { accountId, accountOwnerId },
      { skip: responsiblePersonData.responsiblePersonId === 0 }
    );

  useEffect(() => {
    if (bankAccountData && !bankAccountLoading) {
      let bankAccount = bankAccountData.result as corporateBankAccount;
      setBankAccountState(bankAccount);
    }
  }, [bankAccountData]);

  const banks = useSelector((state: RootState) => state.bankStore.banks);

  const { data: bankData, isLoading: bankLoading } = useGetBanksQuery("", {
    skip: bankAccountState !== undefined,
  });

  useEffect(() => {
    if (bankData && !isLoading) {
      dispatch(setBanksState(bankData.result));
    }
  }, [bankLoading]);

  const [corporateBankAccountInput, setCorporateAccountInput] = useState({
    companyOwnerId: accountHolderData.accountId,
    bankId: 0,
  });

  const handleSelectBank = (bankId: number) => {
    setCorporateAccountInput((previousState) => ({
      ...previousState,
      bankId: bankId,
    }));
  };

  const [registerAccount] = useRegisterCorporateBankAccountMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response : apiResponse = await registerAccount({
        companyOwnerId: corporateBankAccountInput.companyOwnerId,
        bankId: corporateBankAccountInput.bankId
    })

    if(response.data && response.data?.isSuccess)
    {
        navigate("/responsiblePersonProfile");
        toastNotify("Рахунок успішно створено. Тепер Ви можете створити розрахункові рахунки, та працювати з ними");
    }
    else if(response.error)
    {
        toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  return (
    <div>
      {bankAccountState ? (
        <div>
          <div
            className="container p-3 mt-3 rounded"
            style={{ backgroundColor: "#212529" }}
          >
            <div className="text-white d-flex row justify-content-center align-items-center">
              <h4 className="text-center">
                Рахунок компанії {bankAccountState?.companyOwnerShortName}
              </h4>
              <button
                className="btn btn-warning"
                style={{ width: "30%" }}
                onClick={() => navigate(-1)}
              >
                До профілю
              </button>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Номер рахунку
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.accountNumber}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Тип рахунку
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.accountType}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Код валюти
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.currencyType}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Коротка назва компанії власника рахунку
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.companyOwnerShortName}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Код ЄДРПОУ компанії
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.companyCode}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Банк емітент рахунку
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.bankName}
                  </div>
                </div>
              </div>
            </div>
            <hr style={{ color: "#0DA378" }}></hr>
            <div className="row" style={{ borderColor: "#0DA378" }}>
              <div className="col-12">
                <div className="row">
                  <div className="col-sm-3 text-center text-white">
                    Дата реєстрації рахунку
                  </div>
                  <div
                    className="col-sm-9 text-center"
                    style={{ color: "#0DA378" }}
                  >
                    {bankAccountState?.registrationDate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container mt-3 py-3 rounded text-white"
          style={{ backgroundColor: "#212529" }}
        >
          <form method="POST" onSubmit={handleSubmit}>
            <div className="col">
              <h4 className="text-center">
                Рахунок компанії відсутній. Давайте створимо його!
              </h4>
              <h5 className="text-center" style={{ color: "#0DA378" }}>
                Оберіть банк для створення рахунку
              </h5>
              <select
                onChange={(e) => handleSelectBank(parseInt(e.target.value))}
                className="form-select d-block mx-auto mb-3"
                style={{ width: "50%" }}
              >
                <option selected disabled>
                  --Оберіть банк--
                </option>
                {banks.map((bank: bankModel, index: number) => (
                  <option key={index} value={bank.bankId}>
                    {bank.shortBankName}
                  </option>
                ))}
              </select>
              <div className="text-center row d-flex justify-content-center">
              <button
                disabled={isLoading}
                className="btn btn-success mx-3"
                type="submit"
                style={{ width: "30%" }}
              >
                {isLoading ? (<MiniLoader></MiniLoader>) : "Підтвердити реєстрацію"}
              </button>
              <button
              type="button"
                className="btn btn-warning"
                style={{ width: "30%" }}
                onClick={() => navigate(-1)}
              >
                До профілю
              </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default CorporateBankAccountDetails;
