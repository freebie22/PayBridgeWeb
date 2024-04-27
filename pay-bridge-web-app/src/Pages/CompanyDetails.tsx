import React, { useEffect, useState } from 'react'
import { corporateAccountHolder, responsiblePerson, userModel } from '../Interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../Storage/Redux/store'
import { useGetCorporateAccountHolderByUserIdQuery } from '../APIs/accountHolderAPI';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Components/Common';

function CompanyDetails() {

    const responsiblePersonData : responsiblePerson = useSelector((state: RootState) => state.responsiblePersonStore);
    const userData: userModel = useSelector((state: RootState) => state.userAuthStore);

    const [companyInfo, setCompanyInfo] = useState<corporateAccountHolder>();

    const navigate = useNavigate();

    const {data: companyData, isLoading: companyLoading} = useGetCorporateAccountHolderByUserIdQuery(responsiblePersonData.responsiblePersonId, {skip: responsiblePersonData.responsiblePersonId === 0});

    useEffect(() => {
        if(companyData && !companyLoading)
            {
                setCompanyInfo(companyData.result);
            }
    }, [companyData])

    useEffect(() => {
        if(companyInfo)
            {
                console.log(companyInfo);
            }
    }, [companyInfo]);

    if(companyLoading)
        {
            return <MainLoader></MainLoader>
        }

  return (
    <div
    className="container p-3 mt-3 rounded"
    style={{ backgroundColor: "#212529" }}
  >
    <div className="text-white d-flex row justify-content-center align-items-center">
      <h4 className="text-center">{companyInfo?.shortCompanyName}</h4>
      <button className="btn btn-warning" style={{width: "30%"}} onClick={() => (navigate(-1))}>До профілю</button>
    </div>
    <hr style={{color: "#0DA378"}}></hr>
    <div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Коротка назва компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.shortCompanyName}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Повна назва компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.fullCompanyName}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">КОД ЄДРПОУ</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.companyCode}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
    <div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Контактний E-Mail</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.contactEmail} - {companyInfo?.emailConfirmed ? (<p className='text-success'>Підтверджений</p>) : (<p className='text-danger'>Не підтверджений</p>)}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Контактний номер телефону</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.contactPhone}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Дата заснування компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.dateOfEstablishment}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Країна реєстрації компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.country}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Область реєстрації компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.state}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Місто реєстрації компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.city}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Адреса реєстрації компанії</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.streetAddress}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
<div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Індекс</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.postalCode}
      </div>
    </div>
  </div>
</div>
<hr style={{color: "#0DA378"}}></hr>
    <div className="row" style={{ borderColor: "#0DA378" }}>
  <div className="col-12">
    <div className="row">
      <div className="col-sm-3 text-center text-white">Компанія активна</div>
      <div className="col-sm-9 text-center" style={{ color: "#0DA378" }}>
        {companyInfo?.isActive ? (<p className='text-success'>Так</p>) : (<p className='text-danger'>Ні</p>)}
      </div>
    </div>
  </div>
</div>
  </div>
  )
}

export default CompanyDetails