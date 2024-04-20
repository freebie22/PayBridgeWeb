import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import {
  useGetPersonalBankAccountsQuery,
  useRegisterPersonalBankAccountMutation,
} from "../APIs/bankAccountAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { setUserBankAccounts } from "../Storage/Redux/bankAccountSlice";
import {
  apiResponse,
  bankAccountModel,
  bankModel,
  personalAccountHolderProfileModel,
} from "../Interfaces";
import BankAccountCard from "./BankAccount/BankAccountCard";
import { MainLoader, MiniLoader } from "../Components/Common";
import { useGetBanksQuery } from "../APIs/bankAPI";
import { setBanksState } from "../Storage/Redux/bankSlice";
import toastNotify from "../Helper/toastNotify";

function MyBankAccounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isCreatingNewAccount, setCreatingNewAccount] =
    useState<boolean>(false);

  const [selectedBankId, setBankId] = useState<number>(0);

  const [isFormLoading, setFormLoading] = useState<boolean>(false);

  const profileData: personalAccountHolderProfileModel = useSelector(
    (state: RootState) => state.personalAccountHolderStore
  );

  const myBankAccounts = useSelector(
    (state: RootState) => state.bankAccountStore.userBankAccounts
  );

  const banks = useSelector((state: RootState) => state.bankStore.banks);

  const { data, isLoading } = useGetPersonalBankAccountsQuery(
    profileData.accountId,
    {
      skip: profileData.accountId === 0,
    }
  );

  const { data: bankData, isLoading: bankLoading } = useGetBanksQuery("", {
    skip: !isCreatingNewAccount,
  });

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setUserBankAccounts(data.result));
    }
  }, [isLoading, profileData]);

  useEffect(() => {
    if (bankData && !isLoading) {
      dispatch(setBanksState(bankData.result));
    }
  }, [bankLoading]);

  const handleCreatingNewAccount = () => {
    setCreatingNewAccount((previous) => !previous);
  };

  const [createAccount] = useRegisterPersonalBankAccountMutation();

  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);

    const response: apiResponse = await createAccount({
      accountOwnerId: profileData.accountId,
      bankId: selectedBankId,
    });

    if (response.data && response.data.isSuccess) {
      setCreatingNewAccount(false);
      localStorage.setItem(
        "toastMessage",
        JSON.stringify({
          message: response.data.result.toString(),
          type: "success",
        })
      );
      location.reload();
    } else {
      localStorage.setItem(
        "toastMessage",
        JSON.stringify({
          message: response.error.data.errorMessages[0],
          type: "error",
        })
      );
      location.reload();
    }

    setFormLoading(false);
  };

  window.onload = () => {
    const storedMessage = localStorage.getItem("toastMessage");
    if (storedMessage) {
      const { message, type } = JSON.parse(storedMessage);
      toastNotify(message, type);
      localStorage.removeItem("toastMessage");
    }
  };

  const handleSelectBank = (bankId: number) => {
    setBankId(bankId);
    console.log(bankId);
  };

  if (isLoading) {
    return <MainLoader></MainLoader>;
  }

  return (
    <div
      style={{ backgroundColor: "#212529" }}
      className="container col rounded d-flex justify-content-center align-items-center p-3 mt-4"
    >
      <div className="row">
        <h2 className="text-white text-center">Ваші рахунки</h2>
        <div className="col text-center">
          {isCreatingNewAccount ? (
            <form method="POST" onSubmit={handleCreateAccount}>
              <div>
                <h5 style={{ color: "#0DA378" }}>
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
                <div className="col text-center">
                  <button
                    type="submit"
                    disabled={isFormLoading}
                    className="btn form-control btn-outline-success text-white w-50 mb-3 d-block mx-auto"
                  >
                    {isFormLoading ? (
                      <MiniLoader></MiniLoader>
                    ) : (
                      "Зареєструвати новий рахунок"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn form-control btn-primary w-25 mb-3 d-block mx-auto"
                  >
                    Відмінити
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <button
                type="button"
                disabled={bankLoading}
                onClick={handleCreatingNewAccount}
                className="btn form-control btn-primary w-25 mb-3"
              >
                {bankLoading ? (
                  <MiniLoader></MiniLoader>
                ) : (
                  "Створити новий рахунок"
                )}
              </button>
            </div>
          )}
        </div>
        {myBankAccounts.length > 0 &&
          myBankAccounts.map((account: bankAccountModel, index: number) => (
            <div className="col-12" key={index}>
              <BankAccountCard
                accountIndex={index + 1}
                bankAccount={account}
              ></BankAccountCard>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MyBankAccounts;
