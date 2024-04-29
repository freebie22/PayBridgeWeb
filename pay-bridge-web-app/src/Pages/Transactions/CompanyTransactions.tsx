import React, { useEffect, useState } from 'react'
import { companyToUserTransactionModel, responsiblePerson, userToCompanyTransactionModel } from '../../Interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Storage/Redux/store';
import { useGetCompanyToCompanyTransactionsQuery, useGetCompanyToUserTransactionsQuery, useGetUserToCompanyTransactionsQuery } from '../../APIs/transactionAPI';
import { setCompanyToCompanyTransactions, setCompanyToUserTransactions, setUserToCompanyTransactions } from '../../Storage/Redux/transactionSlice';
import { MainLoader } from '../../Components/Common';
import payBridgeSm from "../../assets/images/paybridge-sm.png"
import companyToCompanyTransactionModel from '../../Interfaces/companyToCompanyTransactionModel';
import UserToCompanyTransactionCard from './UserToCompanyTransactionCard';
import CompanyToUserTransactionCard from './CompanyToUserTransactionCard';
import CompanyToCompanyTransactionCard from './CompanyToCompanyTransactionCard';

function CompanyTransactions() {
      
      const responsiblePersonData : responsiblePerson = useSelector((state: RootState) => state.responsiblePersonStore);
    
      const companyToCompanyTransactionsStore = useSelector(
        (state: RootState) => state.transactionStore.companyToCompanyTransactions
      );
    
      const userToCompanyTransactionsStore = useSelector((state: RootState) => state.transactionStore.userToCompanyTranasctions);
    
      const companyToUserTransactionsStore = useSelector((state: RootState) => state.transactionStore.companyToUserTransactions);
    
      const [showCompanyToCompanyTransactions, setShowCompanyToCompanyTransactions] = useState<boolean>(false);
      const [showUserToCopmanyTransactions, setShowUserToCompanyTransactions] = useState<boolean>(false);
      const [showCompanyToUserTransactions, setShowCompanyToUserTransactions] = useState<boolean>(false);
    
      const dispatch = useDispatch();
    
      useEffect(() => {
        const foot = document.getElementById("footer");
    
        foot?.classList.add("fixed-bottom");
    
        return () => {
          foot?.classList.remove("fixed-bottom");
        };
      }, []);
    
    
      const {
        data: companyToCompanyTransactions,
        isLoading: companyToCompanyTransactionsLoading,
      } = useGetCompanyToCompanyTransactionsQuery(responsiblePersonData.responsiblePersonId, {
        skip: responsiblePersonData.responsiblePersonId === 0 || showCompanyToCompanyTransactions === false,
      });
    
    
      const {
        data: userToCompanyTransactions,
        isLoading: userToCompanyTransactionsLoading
      } = useGetUserToCompanyTransactionsQuery({senderAccountId: undefined, receiverAccountId: responsiblePersonData.responsiblePersonId}, {
        skip: responsiblePersonData.responsiblePersonId === 0 || showUserToCopmanyTransactions === false
      });
    
      const {
        data: copmanyToUserTransactions,
        isLoading: copmanyToUserTransactionsLoading
      } = useGetCompanyToUserTransactionsQuery({senderAccountId: responsiblePersonData.responsiblePersonId, receiverAccountId:  undefined}, {
        skip: responsiblePersonData.responsiblePersonId === 0 || showCompanyToUserTransactions === false
      });
    
    
      useEffect(() => {
        if (companyToCompanyTransactions && !companyToCompanyTransactionsLoading) {
          dispatch(setCompanyToCompanyTransactions(companyToCompanyTransactions.result));
        }
      }, [companyToCompanyTransactions]);
    
      useEffect(() => {
        if(userToCompanyTransactions && !userToCompanyTransactionsLoading)
          {
            dispatch(setUserToCompanyTransactions(userToCompanyTransactions.result));
          }
      }, [userToCompanyTransactions])
    
      useEffect(() => {
        if(copmanyToUserTransactions && ! copmanyToUserTransactionsLoading)
          {
            dispatch(setCompanyToUserTransactions(copmanyToUserTransactions.result));
          }
      }, [copmanyToUserTransactions])
    
    
      if (companyToCompanyTransactionsLoading) {
        return <MainLoader></MainLoader>;
      }
    
      return (
        <div
          className="container rounded pt-3 mt-3"
          style={{ backgroundColor: "#212529"}}
        >
          <div className="d-flex row justify-content-center align-items-center">
            <img src={payBridgeSm} alt="" className="mx-auto" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
            <h3 className="text-white text-center mx-2">Історія операцій компанії </h3>
            <h4 className='text-center' style={{color: "#0DA378"}}>{responsiblePersonData.companyFullName}</h4>
            <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <h3 className="text-white">Перекази між компаніями</h3>
          </div>
          {showCompanyToCompanyTransactions ? (<div>
            <div className="d-flex justify-content-center my-2">
            <button onClick={() => setShowCompanyToCompanyTransactions((previousState) => !previousState)} className="btn btn-warning">Приховати</button>
            </div>
            {companyToCompanyTransactionsStore && companyToCompanyTransactionsStore.length > 0 ?
            (companyToCompanyTransactionsStore.map(
              (transaction: companyToCompanyTransactionModel, index: number) => (
                <div
                  key={index}
                  className="d-flex justify-content-center align-items-center"
                >
                  <CompanyToCompanyTransactionCard transaction={transaction}></CompanyToCompanyTransactionCard>
                </div>
              )
            )) : (
              <div className="text-center mb-4">
                <h5 className="text-white">За Вашим обліковим записом транзакцій даного типу не знайдено.</h5>
              </div>
            )
            }
          </div>) : (<div className="d-flex justify-content-center my-2">
            <button onClick={() => setShowCompanyToCompanyTransactions((previousState) => !previousState)} className="btn btn-primary">Детальніше</button>
          </div>)}
    
          <div className="d-flex row justify-content-center align-items-center">
          <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
            <h3 className="text-white text-center">Перекази на рахунки компанії з банківських рахунків</h3>
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
                <h5 className="text-white">За Вашим обліковим записом транзакцій даного типу не знайдено.</h5>
              </div>)
          }
          </div>) : (<div className="d-flex justify-content-center">
            <button onClick={() => setShowUserToCompanyTransactions((previousState) => !previousState)} className="btn btn-primary my-2">Детальніше</button>
          </div>)}  
    
          <div className="d-flex row justify-content-center align-items-center">
          <img src={payBridgeSm} alt="" style={{maxHeight: "40px", maxWidth: "70px"}}></img>
            <h3 className="text-white text-center">Перекази з рахунків компанії на банківські картки</h3>
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
                <h5 className="text-white">За Вашим обліковим записом транзакцій даного типу не знайдено.</h5>
              </div>
            )
          }
          </div>) : (<div className="d-flex justify-content-center">
            <button onClick={() => setShowCompanyToUserTransactions((previousState) => !previousState)} className="btn btn-primary mb-4 mt-2">Детальніше</button>
          </div>)}  
    
        </div>
      )
}

export default CompanyTransactions