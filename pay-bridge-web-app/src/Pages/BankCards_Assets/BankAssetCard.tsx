import React from 'react'
import bankAsset from '../../Interfaces/bankAssetModel';
import mastercardLogo from "../../assets/images/bankCardImages/mastercard_logo.png";
import visaLogo from "../../assets/images/bankCardImages/visa_logo.png";
import privateLogo from "../../assets/images/bankImages/privatbank.png";
import oschadLogo from "../../assets/images/bankImages/oschadbank.png";
import ukrgazLogo from "../../assets/images/bankImages/ukrgaz.png";
import raifLogo from "../../assets/images/bankImages/raif.png";


interface BankAssetProps{
    bankAsset: bankAsset
}

function BankAssetCard(props: BankAssetProps) {

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
    }

  return (
    <div className="card mb-4" style={{border: "1px solid #0DA378", backgroundColor: "#212529"}}>
      <div className="card-header text-white text-center" style={{borderBottomColor: "#0DA378"}}>Рахунок #{props.bankAsset.assetUniqueNumber}</div>
      <div className="card-body" style={{color: "#0DA378"}}>
        <h5 className="card-title">IBAN-номер рахунку: <span className='text-white'>{props.bankAsset.ibaN_Number}</span></h5>
        <p className="card-text pt-2 h6">Баланс:  <span className='text-white'>{props.bankAsset.balance} {props.bankAsset.currencyType.toLocaleUpperCase()}</span> </p>
        <p className="card-text h6">Банк-емітент рахунку:  <span className='text-white'>{props.bankAsset.bankName} <img src={setBankCardImage(props.bankAsset.bankName)} alt="" style={{maxHeight: "50px"}}></img></span></p>
        <p className="card-text pb-3 h6">Рахунок активний:  {props.bankAsset.isActive ? (<span className='text-success'>Так - {props.bankAsset.status}</span>) : (<span className='text-danger'>Ні - {props.bankAsset.status}</span>)}</p>
        <p className="card-text h6">Дата реєстрації:  <span className='text-white'>{props.bankAsset.registrationDate}</span></p>
      </div>
    </div>
  )
}

export default BankAssetCard