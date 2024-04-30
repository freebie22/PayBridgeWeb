import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastNotify from "../../Helper/toastNotify";
import {
  useGetCompanyToCompanyTransactionByIdQuery,
  useGetCompanyToUserTransactionByIdQuery,
  useGetUserToCompanyTransactionByIdQuery,
  useGetUserToUserTransactionByIdQuery,
} from "../../APIs/transactionAPI";
import {
  companyToUserTransactionModel,
  userToCompanyTransactionModel,
  userToUserTransactionModel,
} from "../../Interfaces";
import companyToCompanyTransactionModel from "../../Interfaces/companyToCompanyTransactionModel";

function TransactionDetails() {
  const navigate = useNavigate();
  const { transactionUniqueNumber, transactionType } = useParams();
  const [transaction, setTransaction] = useState<any>();

  const [userToUserTransaction, setUserToUserTransaction] =
    useState<userToUserTransactionModel>();
  const [userToCompanyTransaction, setUserToCompanyTransaction] =
    useState<userToCompanyTransactionModel>();
  const [companyToUserTransaction, setCompanyToUserTransaction] =
    useState<companyToUserTransactionModel>();
  const [companyToCompanyTransaction, setCompanyToCompanyTransaction] =
    useState<companyToCompanyTransactionModel>();

  const [isUserToUserTransaction, setIsUserToUserTransaction] =
    useState<boolean>(false);
  const [isUserToCompanyTransaction, setIsUserToCompanyTransaction] =
    useState<boolean>(false);
  const [isCompanyToUserTransaction, setIsCompanyToUserTransaction] =
    useState<boolean>(false);
  const [isCompanyToCompanyTransaction, setIsCompanyToCompanyTransaction] =
    useState<boolean>(false);

  //UserToUserTransaction
  useEffect(() => {
    if (isUserToUserTransaction === true) {
      setUserToUserTransaction(transaction as userToUserTransactionModel);
    }
  }, [isUserToUserTransaction, transaction]);

  //userToCompanyTransaction
  useEffect(() => {
    if (isUserToCompanyTransaction === true) {
      setUserToCompanyTransaction(transaction as userToCompanyTransactionModel);
    }
  }, [isUserToCompanyTransaction, transaction]);

  //companyToUserTransaction

  useEffect(() => {
    if (isCompanyToUserTransaction === true) {
      setCompanyToUserTransaction(transaction as companyToUserTransactionModel);
    }
  }, [isCompanyToUserTransaction, transaction]);

  //companyToCompanyTransaction

  useEffect(() => {
    if (isCompanyToCompanyTransaction === true) {
      setCompanyToCompanyTransaction(
        transaction as companyToCompanyTransactionModel
      );
    }
  }, [isCompanyToCompanyTransaction, transaction]);

  useEffect(() => {
    switch (transactionType) {
      case "userToUserTransaction":
        setIsUserToUserTransaction(true);
        break;
      case "userToCompanyTransaction":
        setUserToCompanyTransaction(
          transaction as userToCompanyTransactionModel
        );
        setIsUserToCompanyTransaction(true);
        break;
      case "companyToUserTransaction":
        setCompanyToUserTransaction(
          transaction as companyToUserTransactionModel
        );
        setIsCompanyToUserTransaction(true);
        break;
      case "companyToCompanyTransaction":
        setCompanyToCompanyTransaction(
          transaction as companyToCompanyTransactionModel
        );
        setIsCompanyToCompanyTransaction(true);
        break;
    }
  }, [transactionType]);

  const {
    data: userToUserTransactionResponse,
    isLoading: userToUserTransactionLoading,
  } = useGetUserToUserTransactionByIdQuery(transactionUniqueNumber, {
    skip:
      transactionUniqueNumber === undefined ||
      isUserToUserTransaction === false,
  });

  const {
    data: userToCompanyTransactionResponse,
    isLoading: userToCompanyTransactionLoading,
  } = useGetUserToCompanyTransactionByIdQuery(transactionUniqueNumber, {
    skip:
      transactionUniqueNumber === undefined ||
      isUserToCompanyTransaction === false,
  });

  const {
    data: companyToUserTransactionResponse,
    isLoading: companyToUserTransactionLoading,
  } = useGetCompanyToUserTransactionByIdQuery(transactionUniqueNumber, {
    skip:
      transactionUniqueNumber === undefined ||
      isCompanyToUserTransaction === false,
  });

  const {
    data: companyToCompanyTransactionResponse,
    isLoading: companyToCompanyTransactionLoading,
  } = useGetCompanyToCompanyTransactionByIdQuery(transactionUniqueNumber, {
    skip:
      transactionUniqueNumber === undefined ||
      isCompanyToCompanyTransaction === false,
  });

  useEffect(() => {
    if (transactionUniqueNumber === undefined) {
      navigate("/");
      toastNotify("Увага! Транзакцію з даним номером не знайдено.", "warning");
    }
  }, [transactionUniqueNumber]);

  useEffect(() => {
    if (userToUserTransactionResponse && !userToUserTransactionLoading) {
      setTransaction(userToUserTransactionResponse.result);
    }
  }, [userToUserTransactionResponse]);

  useEffect(() => {
    if (userToCompanyTransactionResponse && !userToCompanyTransactionLoading) {
      setTransaction(userToCompanyTransactionResponse.result);
    }
  }, [userToCompanyTransactionResponse]);

  useEffect(() => {
    if (companyToUserTransactionResponse && !companyToUserTransactionLoading) {
      setTransaction(companyToUserTransactionResponse.result);
    }
  }, [companyToUserTransactionResponse]);

  useEffect(() => {
    if (
      companyToCompanyTransactionResponse &&
      !companyToCompanyTransactionLoading
    ) {
      setTransaction(companyToCompanyTransactionResponse.result);
    }
  }, [companyToCompanyTransactionResponse]);

  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const setCurrencySign = (currencyCode: string | undefined): string => {
    let currencySign: string = "";
    switch (currencyCode?.toLocaleLowerCase()) {
      case "uah": {
        currencySign = "₴";
        break;
      }
      case "usd": {
        currencySign = "$";
        break;
      }
      case "eur": {
        currencySign = "€";
        break;
      }
    }
    return currencySign;
  };

  return (
    <div
      className="container p-3 mt-3 rounded"
      style={{ backgroundColor: "#212529" }}
    >
      {/*UserToUserTransactions*/}
      {isUserToUserTransaction && (
        <div>
          <div className="text-white d-flex row justify-content-center align-items-center">
            <h4 className="text-center">Деталі операції</h4>
            <button
              className="btn btn-warning"
              style={{ width: "30%" }}
              onClick={() => navigate(-1)}
            >
              До транзакцій
            </button>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Дата операції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.dateOfTransaction}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Сума операції, код валюти
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.amount},{" "}
                  {setCurrencySign(transaction?.currencyCode)}{" "}
                  {transaction?.currencyCode.toLocaleUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Призначення
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.description}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">Отримувач</div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverCredentials}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Номер карти отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankCardNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Відправник
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderCredentials}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Номер карти відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankCardNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Статус транзакції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*UserToCompanyTransaction*/}
      {isUserToCompanyTransaction && (
        <div>
          <div className="text-white d-flex row justify-content-center align-items-center">
            <h4 className="text-center">Деталі операції</h4>
            <button
              className="btn btn-warning"
              style={{ width: "30%" }}
              onClick={() => navigate(-1)}
            >
              До транзакцій
            </button>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Дата операції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.dateOfTransaction}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Сума операції, код валюти
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.amount},{" "}
                  {setCurrencySign(transaction?.currencyCode)}{" "}
                  {transaction?.currencyCode.toLocaleUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Призначення
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.description}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">Компанія-отримувач</div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverCompanyShortName}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  IBAN-номер отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiver_CBA_IBANNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Відправник
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderCredentials}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Номер карти відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankCardNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Статус транзакції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*CompanyToUserTransaction*/}
      {isCompanyToUserTransaction && (
        <div>
          <div className="text-white d-flex row justify-content-center align-items-center">
            <h4 className="text-center">Деталі операції</h4>
            <button
              className="btn btn-warning"
              style={{ width: "30%" }}
              onClick={() => navigate(-1)}
            >
              До транзакцій
            </button>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Дата операції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.dateOfTransaction}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Сума операції, код валюти
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.amount},{" "}
                  {setCurrencySign(transaction?.currencyCode)}{" "}
                  {transaction?.currencyCode.toLocaleUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Призначення
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.description}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">Компанія-відправник</div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderCompanyShortName}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  IBAN-номер відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.sender_CBA_IBANNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Отримувач
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverCredentials}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Номер карти отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankCardNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Статус транзакції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/*CompanyToCompanyTransaction*/}
      {isCompanyToCompanyTransaction && (
        <div>
          <div className="text-white d-flex row justify-content-center align-items-center">
            <h4 className="text-center">Деталі операції</h4>
            <button
              className="btn btn-warning"
              style={{ width: "30%" }}
              onClick={() => navigate(-1)}
            >
              До транзакцій
            </button>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Дата операції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.dateOfTransaction}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Сума операції, код валюти
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.amount},{" "}
                  {setCurrencySign(transaction?.currencyCode)}{" "}
                  {transaction?.currencyCode.toLocaleUpperCase()}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Призначення
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.description}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">Компанія-відправник</div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderCompanyShortName}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  IBAN-номер відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.sender_CBA_IBANNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент відправника
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.senderBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Компанія-отримувач
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverCompanyShortName}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  IBAN номер отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiver_CBA_IBANNumber}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Банк-емітент отримувача
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.receiverBankEmitent}
                </div>
              </div>
            </div>
          </div>
          <hr style={{ color: "#0DA378" }}></hr>
          <div className="row" style={{ borderColor: "#0DA378" }}>
            <div className="col-12">
              <div className="row">
                <div className="col-sm-3 text-center text-white">
                  Статус транзакції
                </div>
                <div
                  className="col-sm-9 text-center"
                  style={{ color: "#0DA378" }}
                >
                  {transaction?.status}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default TransactionDetails;
