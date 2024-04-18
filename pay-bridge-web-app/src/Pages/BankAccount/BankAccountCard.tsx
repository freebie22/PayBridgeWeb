import React from 'react'
import { bankAccountModel } from '../../Interfaces'


interface BankAccountProps {
   bankAccount: bankAccountModel,
   accountIndex: number
}

function BankAccountCard(props : BankAccountProps) {
  return (
    <div
            style={{ backgroundColor: "#212529", color: "#0DA378", borderColor: "#0DA378" }}
            className="card mb-4"
          >
            <div className="card-body">
              <div className='col'>
                <h3 className='text-center pb-2'>Рахунок №{props.accountIndex}</h3>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Унікальний номер рахунку</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.accountNumber}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">П.І.Б власника</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                   {props.bankAccount.accountOwnerFullName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Тип рахунку</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.accountType}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Назва банку</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.bankName}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">К-ть прив'язаних карток</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.bankCards.length}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Статус рахунку</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.status}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Рахунок активний ?</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.isActive ? (<h5 className='text-success'>Так</h5>) : (<h5 className='text-danger'>Ні</h5>)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0 text-center">Дата реєстрації рахунку</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-white text-center mb-0">
                    {props.bankAccount.registrationDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
  )
}

export default BankAccountCard