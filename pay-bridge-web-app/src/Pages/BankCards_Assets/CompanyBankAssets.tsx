import React, { useEffect, useState } from "react";
import { apiResponse, bankAccountModel, corporateBankAccount, responsiblePerson } from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { useCreateBankAssetMutation, useGetBankAssetsQuery } from "../../APIs/bankCard_AssetAPI";
import { setBankAssetsState } from "../../Storage/Redux/bankCard_AssetSlice";
import BankAssetCard from "./BankAssetCard";
import bankAsset from "../../Interfaces/bankAssetModel";
import { useGetCorporateBankAccountByIdQuery } from "../../APIs/bankAccountAPI";
import { MiniLoader } from "../../Components/Common";
import inputHelper from "../../Helper/inputHelper";
import toastNotify from "../../Helper/toastNotify";

function CompanyBankAssets() {
  const dispatch = useDispatch();
  const responsiblePersonData: responsiblePerson = useSelector(
    (state: RootState) => state.responsiblePersonStore
  );

  const { data: bankAssetsData, isLoading: bankAssetsLoading } =
    useGetBankAssetsQuery(responsiblePersonData.responsiblePersonId, {
      skip: responsiblePersonData.responsiblePersonId === 0,
    });

  const [isLoading, setLoading] = useState<boolean>(false);

  const [newBankAssetInput, setNewBankAssetInput] = useState({
    ibaN_Number: "",
    corporateAccountId: 0
  })

  let accountId = undefined;
  let accountOwnerId = responsiblePersonData.responsiblePersonId;

  const { data: bankAccountData, isLoading: bankAccountLoading } =
  useGetCorporateBankAccountByIdQuery(
    { accountId, accountOwnerId },
    { skip: responsiblePersonData.responsiblePersonId === 0 }
  );

  useEffect(() => {
    if(bankAccountData && !bankAccountLoading)
      {
        let bankAccount = bankAccountData.result as corporateBankAccount;
        setNewBankAssetInput((previousState) => ({
          ...previousState,
          corporateAccountId: bankAccount.accountId
        }))
      }
  }, [bankAccountData]);

  const [isCreatingNewBankAsset, setCreatingNewBankAsset] = useState<boolean>(false);

  const bankAssetsStore = useSelector(
    (state: RootState) => state.bankCard_AssetStore.bankAssets
  );

  useEffect(() => {
    if (bankAssetsData && !bankAssetsLoading) {
      dispatch(setBankAssetsState(bankAssetsData.result));
    }
  }, [bankAssetsData]);

  useEffect(() => {
    if (bankAssetsStore && bankAssetsStore.length < 3) {
      const foot = document.getElementById("footer");
      foot?.classList.add("fixed-bottom");

      return () => {
        foot?.classList.remove("fixed-bottom");
      };
    }
  }, [bankAssetsStore]);

  const [createBankAsset] = useCreateBankAssetMutation();

  const handleFormSubmit = async(e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const response : apiResponse = await createBankAsset({
      ibaN_Number: newBankAssetInput.ibaN_Number,
      corporateAccountId: newBankAssetInput.corporateAccountId
    })

    if(response.data && response.data.isSuccess)
    {
        toastNotify("Розрахунковий рахунок успішно створено!", "success");
        setCreatingNewBankAsset(false);
        window.location.reload();
    }

    else if(response.error)
    {
        toastNotify(response.error.data.errorMessages[0], "error");
        setCreatingNewBankAsset(false);
    }

    setLoading(false);
  }

  const handleIBANInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, newBankAssetInput);
    setNewBankAssetInput(tempData);
  }

  return (
    <div
      className="container rounded pt-3 mt-3"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="col">
          <h3 className="text-white text-center">Рахунки компанії</h3>
          <h5 className="text-white text-center">
            {responsiblePersonData.companyFullName}
          </h5>
          {isCreatingNewBankAsset ? (<div className="text-center mb-3">
            <form method="POST" onSubmit={handleFormSubmit}>
              <label className="h5 text-white" htmlFor="ibaN_Number">Введіть IBAN-номер для свторення рахунку</label>
              <input onChange={handleIBANInput} style={{width: "50%"}} className="form-control mx-auto mb-3" name="ibaN_Number" required placeholder="UA..."></input>
              <button type="submit" disabled={isLoading} className="btn btn-success">{isLoading ? (<MiniLoader></MiniLoader>) : ("Створити новий розрахунковий рахунок")}</button>
            </form>
            <button type="button" className="btn btn-danger mt-3" onClick={() => setCreatingNewBankAsset((previousState) => !previousState)}>Відмінити</button>
          </div>) : (<div className="text-center mb-3">
            <button onClick={() => setCreatingNewBankAsset((previousState) => !previousState)} className="btn btn-warning">Додати розрахунковий рахунок</button>
          </div>)}
        </div>
      </div>
      {bankAssetsStore && bankAssetsStore.length > 0 ? (
        bankAssetsStore.map((bankAsset: bankAsset, index: number) => (
          <div
            key={index}
            className="d-flex justify-content-center align-items-center"
          >
            <BankAssetCard bankAsset={bankAsset}></BankAssetCard>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h5 className="text-white">
            За Вашим обліковим записом транзакцій не знайдено.
          </h5>
        </div>
      )}
    </div>
  );
}

export default CompanyBankAssets;
