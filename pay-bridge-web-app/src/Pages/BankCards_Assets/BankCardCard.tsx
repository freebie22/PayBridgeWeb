import React, { useEffect, useState } from "react";
import "./bankCardStyle.css";
import { bankAccountModel, bankCardModel } from "../../Interfaces";
import mastercardLogo from "../../assets/images/bankCardImages/mastercard_logo.png";
import visaLogo from "../../assets/images/bankCardImages/visa_logo.png";
import privateLogo from "../../assets/images/bankImages/privatbank.png";
import oschadLogo from "../../assets/images/bankImages/oschadbank.png";
import ukrgazLogo from "../../assets/images/bankImages/ukrgaz.png";
import raifLogo from "../../assets/images/bankImages/raif.png";

interface BankCardProps {
  bankCard: bankCardModel;
}

function BankCardCard(props: BankCardProps) {
  const bankNames = [
    "ПРИВАТБАНК",
    "ОЩАДБАНК",
    "УКРГАЗБАНК",
    "РАЙФФАЙЗЕН БАНК АВАЛЬ",
  ];

  const setBankCardImage = (bankName: string): string | undefined => {
    let foundBank = bankNames.find((bank) => bankName.includes(bank));
    let bankLogo = "";

    switch (foundBank) {
      case "ПРИВАТБАНК": {
        bankLogo = privateLogo;
        break;
      }
      case "ОЩАДБАНК": {
        bankLogo = oschadLogo;
        break;
      }

      case "РАЙФФАЙЗЕН БАНК АВАЛЬ": {
        bankLogo = raifLogo;
        break;
      }

      case "УКРГАЗБАНК": {
        bankLogo = ukrgazLogo;
        break;
      }
    }
    return bankLogo;
  };

  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  return (
    <div>
      <div
        className="bank-card mb-3"
        style={{ backgroundColor: "#0DA378", color: "white" }}
      >
        <div className="col">
          <div className="row">
            <div className="text-start">
              {props.bankCard.cardNumber[0] === "4" ? (
                <img src={visaLogo} alt="" style={{ width: "70px" }}></img>
              ) : (
                <img
                  src={mastercardLogo}
                  style={{ width: "70px" }}
                  alt=""
                ></img>
              )}
            </div>
            <div className="text-end">
              <img
                className="rounded"
                src={setBankCardImage(props.bankCard.bankEmitent)}
                alt=""
                style={{ width: "90px", backgroundColor: "white" }}
              ></img>
            </div>
          </div>
        </div>
        <div className="bank-card-number">
          {props.bankCard.cardNumber}
        </div>
        <div className="bank-card-expires text-end">
          {props.bankCard.expiryDate}
        </div>
        <div className="bank-card-name mt-5 row">
          Баланс по даній карті: {props.bankCard.balance} грн.
        </div>
      </div>
    </div>
  );
}

export default BankCardCard;
