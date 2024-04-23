import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toastNotify from "../../Helper/toastNotify";
import { useGetUserToUserTransactionByIdQuery } from "../../APIs/transactionAPI";
import { userToUserTransactionModel } from "../../Interfaces";

function TransactionDetails() {
  const navigate = useNavigate();
  const { transactionUniqueNumber } = useParams();
  const [transaction, setTransaction] = useState<userToUserTransactionModel>();

  const { data: transactionResponse, isLoading: transactionLoading } =
    useGetUserToUserTransactionByIdQuery(transactionUniqueNumber, {
      skip: transactionUniqueNumber === undefined,
    });

  useEffect(() => {
    if (transactionUniqueNumber === undefined) {
      navigate("/");
      toastNotify("Увага! Транзакцію з даним номером не знайдено.", "warning");
    }
  }, [transactionUniqueNumber]);

  useEffect(() => {
    if (transactionResponse && !transactionLoading) {
      setTransaction(transactionResponse.result);
    }
  }, [transactionResponse]);

  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const setCurrencySign = (currencyCode: string | undefined) : string => {
    let currencySign : string = "";
    switch(currencyCode?.toLocaleLowerCase()){
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
}

  return (
    <div
      className="container p-3 mt-3 rounded"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="text-white d-flex row justify-content-center align-items-center">
        <h4 className="text-center">Деталі операції</h4>
        <button className="btn btn-warning" style={{width: "30%"}} onClick={() => (navigate(-1))}>До транзакцій</button>
      </div>
      <hr style={{color: "#0DA378"}}></hr>
      <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Дата операції</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.dateOfTransaction}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Сума операції, код валюти</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.amount}, {setCurrencySign(transaction?.currencyCode)} {transaction?.currencyCode.toLocaleUpperCase()}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Призначення</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.description}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
      <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Отримувач</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.receiverCredentials}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Номер карти отримувача</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.receiverBankCardNumber}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Банк-емітент отримувача</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.receiverBankEmitent}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Відправник</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.senderCredentials}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Номер карти відправника</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.senderBankCardNumber}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Банк-емітент відправника</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.senderBankEmitent}
        </div>
      </div>
    </div>
  </div>
  <hr style={{color: "#0DA378"}}></hr>
  <div className="row" style={{ borderColor: "#0DA378" }}>
    <div className="col-12">
      <div className="row">
        <div className="col-sm-3 text-center text-white">Статус транзакції</div>
        <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
          {transaction?.status}
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default TransactionDetails;
