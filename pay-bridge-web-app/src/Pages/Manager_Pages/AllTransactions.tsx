import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import {
  useGetCompanyToCompanyTransactionsQuery,
  useGetCompanyToUserTransactionsQuery,
  useGetUserToCompanyTransactionsQuery,
  useGetUserToUserTransactionsQuery,
} from "../../APIs/transactionAPI";
import {
  setCompanyToCompanyTransactions,
  setCompanyToUserTransactions,
  setUserToCompanyTransactions,
  setUserToUserTransactions,
} from "../../Storage/Redux/transactionSlice";
import { MainLoader } from "../../Components/Common";
import payBridgeSm from "../../assets/images/paybridge-sm.png";
import {
  companyToUserTransactionModel,
  userToCompanyTransactionModel,
  userToUserTransactionModel,
} from "../../Interfaces";
import UserToUserTransactionCard from "../Transactions/UserToUserTransactionCard";
import UserToCompanyTransactionCard from "../Transactions/UserToCompanyTransactionCard";
import CompanyToUserTransactionCard from "../Transactions/CompanyToUserTransactionCard";
import companyToCompanyTransactionModel from "../../Interfaces/companyToCompanyTransactionModel";
import CompanyToCompanyTransactionCard from "../Transactions/CompanyToCompanyTransactionCard";

function AllTransactions() {
  const userToUserTransactionsStore = useSelector(
    (state: RootState) => state.transactionStore.userToUserTransactions
  );

  const userToCompanyTransactionsStore = useSelector(
    (state: RootState) => state.transactionStore.userToCompanyTranasctions
  );

  const companyToUserTransactionsStore = useSelector(
    (state: RootState) => state.transactionStore.companyToUserTransactions
  );

  const companyToCompanyTransactionsStore = useSelector(
    (state: RootState) => state.transactionStore.companyToCompanyTransactions
  );

  const [showUserToUserTransactions, setShowUserToUserTransactions] =
    useState<boolean>(false);
  const [showUserToCopmanyTransactions, setShowUserToCompanyTransactions] =
    useState<boolean>(false);
  const [showCompanyToUserTransactions, setShowCompanyToUserTransactions] =
    useState<boolean>(false);
  const [
    showCompanyToCompanyTransactions,
    setShowCompanyToCompanyTransactions,
  ] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const {
    data: userToUserTransactions,
    isLoading: userToUserTransactionsLoading,
  } = useGetUserToUserTransactionsQuery("", {
    skip: showUserToUserTransactions === false,
  });

  const {
    data: userToCompanyTransactions,
    isLoading: userToCompanyTransactionsLoading,
  } = useGetUserToCompanyTransactionsQuery({senderAccountId: undefined, receiverAccountId: undefined}, {
    skip: showUserToCopmanyTransactions === false,
  });

  const {
    data: companyToUserTransactions,
    isLoading: companyToUserTransactionsLoading,
  } = useGetCompanyToUserTransactionsQuery({senderAccountId: undefined, receiverAccountId: undefined}, {
    skip: showCompanyToUserTransactions === false,
  });

  const {
    data: companyToCompanyTransactions,
    isLoading: companyToCompanyTransactionsLoading,
  } = useGetCompanyToCompanyTransactionsQuery(undefined, {
    skip: showCompanyToCompanyTransactions === false,
  });

  useEffect(() => {
    if (userToUserTransactions && !userToUserTransactionsLoading) {
      dispatch(setUserToUserTransactions(userToUserTransactions.result));
    }
  }, [userToUserTransactions]);

  useEffect(() => {
    if (userToCompanyTransactions && !userToCompanyTransactionsLoading) {
      dispatch(setUserToCompanyTransactions(userToCompanyTransactions.result));
    }
  }, [userToCompanyTransactions]);

  useEffect(() => {
    if (companyToUserTransactions && !companyToUserTransactionsLoading) {
      dispatch(setCompanyToUserTransactions(companyToUserTransactions.result));
    }
  }, [companyToUserTransactions]);

  useEffect(() => {
    if (companyToCompanyTransactions && !companyToCompanyTransactionsLoading) {
      dispatch(
        setCompanyToCompanyTransactions(companyToCompanyTransactions.result)
      );
    }
  }, [companyToCompanyTransactions]);

  if (userToUserTransactionsLoading) {
    return <MainLoader></MainLoader>;
  }

  return (
    <div
      className="container rounded pt-3 mt-3"
      style={{ backgroundColor: "#212529" }}
    >
      {/*UserToUserTransactions*/}
      <div className="d-flex row justify-content-center align-items-center">
        <img
          src={payBridgeSm}
          alt=""
          className="mx-auto"
          style={{ maxHeight: "40px", maxWidth: "70px" }}
        ></img>
        <h3 className="text-white text-center mx-2">
          Історія усіх операцій в сервісі PayBridge
        </h3>
        <img
          src={payBridgeSm}
          alt=""
          style={{ maxHeight: "40px", maxWidth: "70px" }}
        ></img>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <h3 className="text-white">Перекази між банківськими картками</h3>
      </div>
      {showUserToUserTransactions ? (
        <div>
          <div className="d-flex justify-content-center my-2">
            <button
              onClick={() =>
                setShowUserToUserTransactions((previousState) => !previousState)
              }
              className="btn btn-warning"
            >
              Приховати
            </button>
          </div>
          {userToUserTransactionsStore &&
          userToUserTransactionsStore.length > 0 ? (
            userToUserTransactionsStore.map(
              (transaction: userToUserTransactionModel, index: number) => (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                >
                  <UserToUserTransactionCard
                    transaction={transaction}
                  ></UserToUserTransactionCard>
                </div>
              )
            )
          ) : (
            <div className="text-center mb-4">
              <h5 className="text-white">
                Транзакцій даного типу не знайдено.
              </h5>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button
            onClick={() =>
              setShowUserToUserTransactions((previousState) => !previousState)
            }
            className="btn btn-primary mb-4 mt-2"
          >
            Детальніше
          </button>
        </div>
      )}


      {/*CompanyToCompanyTransactions*/}
      <div className="d-flex row justify-content-center align-items-center">
      <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
        <h3 className="text-white text-center">Перекази між компаніями</h3>
      </div>
      {showCompanyToCompanyTransactions ? (<div>
        <div className="d-flex justify-content-center my-2">
        <button onClick={() => setShowCompanyToCompanyTransactions((previousState) => !previousState)} className="btn btn-warning">Приховати</button>
        </div>
        {companyToCompanyTransactionsStore && companyToCompanyTransactionsStore.length > 0 ?
       ( companyToCompanyTransactionsStore.map((transaction: companyToCompanyTransactionModel, index: number) => (
          <div className="d-flex justify-content-center align-items-center" key={index}>
            <CompanyToCompanyTransactionCard transaction={transaction}></CompanyToCompanyTransactionCard>
          </div>
        ))) : (
          <div className="text-center mb-4">
            <h5 className="text-white">Транзакцій даного типу не знайдено.</h5>
          </div>
        )
      }
      </div>) : (<div className="d-flex justify-content-center">
        <button onClick={() => setShowCompanyToCompanyTransactions((previousState) => !previousState)} className="btn btn-primary mb-4 mt-2">Детальніше</button>
      </div>)}  


      {/*UserToCompanyTransactions*/}
      <div className="d-flex row justify-content-center align-items-center">
      <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
        <h3 className="text-white text-center">Перекази на рахунки компаній</h3>
      </div>
      {showUserToCopmanyTransactions ? (<div>
        <div className="d-flex justify-content-center my-2">
        <button onClick={() => setShowUserToCompanyTransactions((previousState) => !previousState)} className="btn btn-warning">Приховати</button>
        </div>
        {userToCompanyTransactionsStore && userToCompanyTransactionsStore.length > 0 ?
        (userToCompanyTransactionsStore.map((transaction: userToCompanyTransactionModel, index: number) => (
          <div className="d-flex justify-content-center align-items-center" key={index}>
            <UserToCompanyTransactionCard transaction={transaction}></UserToCompanyTransactionCard>
          </div>
        )))
        :
        (<div className="text-center mb-4">
            <h5 className="text-white">Транзакцій даного типу не знайдено.</h5>
          </div>)
      }
      </div>) : (<div className="d-flex justify-content-center">
        <button onClick={() => setShowUserToCompanyTransactions((previousState) => !previousState)} className="btn btn-primary my-2">Детальніше</button>
      </div>)}  

      {/*CompanyToUserTransactions*/}
      <div className="d-flex row justify-content-center align-items-center">
      <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
        <h3 className="text-white text-center">Перекази з рахунків компаній</h3>
      </div>
      {showCompanyToUserTransactions ? (<div>
        <div className="d-flex justify-content-center my-2">
        <button onClick={() => setShowCompanyToUserTransactions((previousState) => !previousState)} className="btn btn-warning">Приховати</button>
        </div>
        {companyToUserTransactionsStore && companyToUserTransactionsStore.length > 0 ?
       ( companyToUserTransactionsStore.map((transaction: companyToUserTransactionModel, index: number) => (
          <div className="d-flex justify-content-center align-items-center" key={index}>
            <CompanyToUserTransactionCard transaction={transaction}></CompanyToUserTransactionCard>
          </div>
        ))) : (
          <div className="text-center mb-4">
            <h5 className="text-white">Транзакцій даного типу не знайдено.</h5>
          </div>
        )
      }
      </div>) : (<div className="d-flex justify-content-center">
        <button onClick={() => setShowCompanyToUserTransactions((previousState) => !previousState)} className="btn btn-primary mb-4 mt-2">Детальніше</button>
      </div>)}   

    </div>
  );
}

export default AllTransactions;
