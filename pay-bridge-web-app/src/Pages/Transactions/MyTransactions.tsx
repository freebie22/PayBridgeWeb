import React, { useEffect } from "react";
import { useGetUserToUserTransactionsQuery } from "../../APIs/transactionAPI";
import {
  personalAccountHolderProfileModel,
  userToUserTransactionModel,
} from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { setUserToUserTransactions } from "../../Storage/Redux/transactionSlice";
import { useFetcher } from "react-router-dom";
import { MainLoader } from "../../Components/Common";
import TransactionCard from "./TransactionCard";

function MyTransactions() {
  const profileData: personalAccountHolderProfileModel = useSelector(
    (state: RootState) => state.personalAccountHolderStore
  );

  const userToUserTransactionsStore = useSelector(
    (state: RootState) => state.transactionStore.userToUserTransactions
  );

  const dispatch = useDispatch();

  const {
    data: userToUserTransactions,
    isLoading: userToUserTransactionsLoading,
  } = useGetUserToUserTransactionsQuery(profileData.accountId, {
    skip: profileData.accountId === 0,
  });

  useEffect(() => {
    if (userToUserTransactions && !userToUserTransactionsLoading) {
      dispatch(setUserToUserTransactions(userToUserTransactions.result));
    }
  }, [userToUserTransactions]);


  if (userToUserTransactionsLoading) {
    return <MainLoader></MainLoader>;
  }

  return (
    <div
      className="container rounded pt-3 mt-3"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-white">Ваші транзакції</h3>
      </div>
      {userToUserTransactionsStore &&
        userToUserTransactionsStore.map(
          (transaction: userToUserTransactionModel, index: number) => (
            <div
              key={index}
              className="d-flex justify-content-center align-items-center"
            >
              <TransactionCard transaction={transaction}></TransactionCard>
            </div>
          )
        )}
    </div>
  );
}

export default MyTransactions;
