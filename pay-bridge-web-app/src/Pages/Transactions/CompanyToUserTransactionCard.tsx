import React from 'react'
import { companyToUserTransactionModel, personalAccountHolderProfileModel } from '../../Interfaces';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';

interface CompanyToUserTransactionProps {
    transaction: companyToUserTransactionModel
}

function CompanyToUserTransactionCard(props: CompanyToUserTransactionProps) {
    const navigate = useNavigate();

    const profileData: personalAccountHolderProfileModel = useSelector((state: RootState) => state.personalAccountHolderStore);
  
    const setCurrencySign = (currencyCode: string) : string => {
        let currencySign : string = "";
        switch(currencyCode.toLocaleLowerCase()){
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
  
  
    const setArrowSign = (receiverHolderId: number, senderHolderId: number) : [string, string, string] => {
        let arrowSign = "";
        let textStyle = "";
        let operationSign = "";
  
        if(receiverHolderId === profileData.accountId && senderHolderId !== profileData.accountId)
        {
            arrowSign = "↑";
            textStyle = "success";
            operationSign = "+";
        }
  
        if(receiverHolderId !== profileData.accountId && senderHolderId === profileData.accountId)
        {
            arrowSign = "↓";
            textStyle = "danger";
            operationSign = "-";
        }
  
        if(receiverHolderId === profileData.accountId && senderHolderId === profileData.accountId)
        {
            arrowSign = "↔";
            textStyle = "primary";
            operationSign = "-";
        }
  
        return [arrowSign, textStyle, operationSign];
    }
  
    const [arrowSign, textStyle, operationSign] = setArrowSign(props.transaction.receiverHolderId, props.transaction.senderHolderId);
  
    return (
      <div className="card mb-4" style={{border: "1px solid #0DA378", backgroundColor: "#212529"}}>
        <div className="card-header text-white text-center" style={{borderBottomColor: "#0DA378"}}>{props.transaction.transactionType}</div>
        <div className="card-body" style={{color: "#0DA378"}}>
          <h5 className="card-title">Сума операції: <span className='text-white'>{operationSign}  {props.transaction.amount} {setCurrencySign(props.transaction.currencyCode)}</span>  <span className={`text-${textStyle}`}>{arrowSign}</span></h5>
          <p className="card-text">{props.transaction.receiverHolderId === profileData.accountId ? "Номер Вашої картки:" : "Номер картки отримувача:"}  <span className='text-white'>{props.transaction.receiverBankCardNumber}</span> </p>
          <p className="card-text">{props.transaction.receiverHolderId === profileData.accountId ? (<div>Переказ здійснено компанією:  <span className='text-white'>{props.transaction.senderCompanyShortName}</span> </div>) : (<div>Переказ на рахунок клієнта: <span className='text-white'>{props.transaction.receiverCredentials}</span></div>)}</p>
          <p className="card-text">Опис:  <span className='text-white'>{props.transaction.description}</span> </p>
          <p className="card-text">Дата транзакції:  <span className='text-white'>{props.transaction.dateOfTransaction}</span></p>
        </div>
        <button className='btn btn-warning mx-auto mb-3' onClick={() => navigate(`/myProfile/transactionDetails/${props.transaction.transactionUniqueNumber}/companyToUserTransaction`)}>Детальніше</button>
      </div>
    )
}

export default CompanyToUserTransactionCard