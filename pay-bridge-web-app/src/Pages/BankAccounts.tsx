import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ManagerModel, bankAccountModel } from "../Interfaces";
import { RootState } from "../Storage/Redux/store";
import { useGetPersonalBankAccountsQuery } from "../APIs/bankAccountAPI";
import { setAllBankAccounts } from "../Storage/Redux/bankAccountSlice";
import BankAccountCard from "./BankAccount/BankAccountCard";
import { MainLoader } from "../Components/Common";

function BankAccounts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const managerData: ManagerModel = useSelector(
    (state: RootState) => state.managerStore
  );

  const { data, isLoading } = useGetPersonalBankAccountsQuery("", {
    skip: managerData.managerId === 0,
  });

  const bankAccounts = useSelector(
    (state: RootState) => state.bankAccountStore.allBankAccounts
  );

  useEffect(() => {
    if (data && !isLoading) {
      dispatch(setAllBankAccounts(data.result));
    }
  }, [isLoading]);


  if (isLoading) {
    return <MainLoader></MainLoader>;
  } 
    return (
      <div
        style={{ backgroundColor: "#212529" }}
        className="container col rounded d-flex justify-content-center align-items-center p-3 mt-4"
      >
        <div className="row">
          <h2 className="text-white text-center">Рахунки клієнтів</h2>
          {bankAccounts.length > 0 &&
            bankAccounts.map((account: bankAccountModel, index: number) => (
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

export default BankAccounts;
