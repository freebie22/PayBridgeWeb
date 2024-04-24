import React, { useEffect, useState } from "react";
import { withAuth } from "../HOC";
import "..//Pages/BankCards_Assets/bankCardStyle.css";
import { useMakeUserToUserTransactionMutation } from "../APIs/transactionAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import { useGetBankCardsQuery } from "../APIs/bankCard_AssetAPI";
import {
    apiResponse,
  bankCardModel,
  personalAccountHolderProfileModel,
} from "../Interfaces";
import { setBankCardsState } from "../Storage/Redux/bankCard_AssetSlice";
import inputHelper from "../Helper/inputHelper";
import toastNotify from "../Helper/toastNotify";
import { MiniLoader } from "../Components/Common";

function ServiceCatalog() {
  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const dispatch = useDispatch();

  const bankCardsStore = useSelector(
    (state: RootState) => state.bankCard_AssetStore.bankCards
  );
  const profileData: personalAccountHolderProfileModel = useSelector(
    (state: RootState) => state.personalAccountHolderStore
  );

  const { data: bankCards, isLoading: bankCardsLoading } = useGetBankCardsQuery(
    profileData.accountId,
    {
      skip: bankCardsStore.length > 0,
    }
  );

  useEffect(() => {
    if (bankCards && !bankCardsLoading) {
      dispatch(setBankCardsState(bankCards.result));
    }
  }, [bankCards]);

  const [userToUserTransactionInput, setUserToUserTransactionInput] = useState({
    currencyCode: "",
    amount: 0,
    senderBankCardNumber: "",
    receiverBankCardNumber: ""
  })

  const [isRechargingOwnCard, setRechargingOwnCard] = useState<boolean>(false);
  const [isRechargingCard, setRechargingCard] = useState<boolean>(false);
  const [isRechargingAsset, setRechargingAsset] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [bankCardsToReceive, setBankCardsToReceive] =
    useState<bankCardModel[]>();

  const [makeUserToUserTransaction] = useMakeUserToUserTransactionMutation();

  const handleMakeUserToUserTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(userToUserTransactionInput.currencyCode,
        userToUserTransactionInput.amount,
        userToUserTransactionInput.senderBankCardNumber,
        userToUserTransactionInput.receiverBankCardNumber);

    const response: apiResponse = await makeUserToUserTransaction({
        currencyCode: userToUserTransactionInput.currencyCode,
        amount: userToUserTransactionInput.amount,
        senderBankCardNumber: userToUserTransactionInput.senderBankCardNumber,
        receiverBankCardNumber: userToUserTransactionInput.receiverBankCardNumber
    })

    if(response.data && response.data.isSuccess)
    {
        toastNotify("Транзакцію виконано успішно, деталі Ви можете переглянути в особистому кабінеті.", "success");
        setRechargingOwnCard(false);
    }

    else
    {
        toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  const handleChooseSenderCard = (cardNumber: string) => {

    let cardsFromList = bankCardsStore.filter(
      (bankCard: bankCardModel) => bankCard.cardNumber !== cardNumber
    );

    setUserToUserTransactionInput((previousState) => ({
        ...previousState,
        senderBankCardNumber: cardNumber
    }))

    setBankCardsToReceive(cardsFromList);
  };

  const handleChooseReceiverCard = (cardNumber: string) => {

    setUserToUserTransactionInput((previousState) => ({
        ...previousState,
        receiverBankCardNumber: cardNumber
    }))
  };

  const handleChooseCurrencyCode = (currencyCode: string) => {
    setUserToUserTransactionInput((previousState) => ({
        ...previousState,
        currencyCode: currencyCode
    }))
  }

  const handleInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userToUserTransactionInput);
    setUserToUserTransactionInput(tempData);
  }

  return (
    <div
      className="container rounded mt-3 p-3"
      style={{ backgroundColor: "#212529" }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="text-center">
            <h1 className="text-white">Каталог послуг</h1>
          </div>
          <div className="text-center rounded">
            <h3 className="text-white">Поповнення власної картки</h3>
            {isRechargingOwnCard ? (
              <form method="POST" onSubmit={handleMakeUserToUserTransaction}>
                <label className="h5 text-white">З карти</label>
                <div className="row justify-content-center">
                  <div className="col-8 text-center">
                    <select
                      onChange={(e) => handleChooseSenderCard(e.target.value)}
                      className="form-select"
                    >
                      <option disabled selected>
                        --Оберіть карту--
                      </option>
                      {bankCardsStore.map(
                        (bankCard: bankCardModel, index: number) => (
                          <option key={index} value={bankCard.cardNumber}>
                            {bankCard.cardNumber} - {bankCard.bankEmitent}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
                {bankCardsToReceive && bankCardsToReceive.length > 0 && (
                  <div>
                    <div className="text-center mt-3">
                      <h5 className="text-white">На карту</h5>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-8 text-center">
                        <select onChange={(e) => handleChooseReceiverCard(e.target.value)} className="form-select">
                          <option disabled selected>
                            --Оберіть карту--
                          </option>
                          {bankCardsToReceive.map(
                            (bankCard: bankCardModel, index: number) => (
                              <option key={index} value={bankCard.cardNumber}>
                                {bankCard.cardNumber} - {bankCard.bankEmitent}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                    <label className="h5 text-white">
                      Введіть суму поповнення та оберіть тип валюти
                    </label>
                    <div className="row justify-content-center align-items-center">
                      <div className="col-4">
                        <div className="">
                          <label
                            className="text-white text-center"
                            htmlFor="amount"
                          >
                            Сума поповнення
                          </label>
                          <input
                            maxLength={5}
                            type="number"
                            placeholder="Сума..."
                            required
                            value={userToUserTransactionInput.amount}
                            name="amount"
                            onChange={handleInput}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="">
                          <label
                            className="text-white text"
                            htmlFor="currencyCode"
                          >
                            Оберіть код валюти
                          </label>
                          <select onChange={(e) => handleChooseCurrencyCode(e.target.value)} required className="form-select">
                            <option selected disabled>--Оберіть код валюти--</option>
                            <option value={"UAH"}>
                              UAH
                            </option>
                            <option value={"USD"}>USD</option>
                            <option value={"EUR"}>EUR</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button disabled={isLoading} type="submit" className="btn btn-success my-3">
                      {isLoading ? (<MiniLoader></MiniLoader>) : "Підтвердити"}
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setRechargingOwnCard((previousState) => !previousState)
                  }
                  className="btn btn-danger my-1"
                >
                  Відмінити
                </button>
              </form>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    setRechargingOwnCard((previousState) => !previousState)
                  }
                  className="btn btn-primary mb-2"
                >
                  Детальніше
                </button>
              </div>
            )}
          </div>
          <div className="text-center">
            <h3 className="text-white">Переказ з картки на карту</h3>
            <button className="btn btn-primary mb-2">Детальніше</button>
          </div>
          <div className="text-center">
            <h3 className="text-white">Переказ за реквізитами</h3>
            <button className="btn btn-primary mb-2">Детальніше</button>
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div
                className="bank-card mb-3 mx-auto"
                style={{ backgroundColor: "#0DA378", color: "white" }}
              >
                <div className="row justify-content-center">
                  <div className="col-8">
                    <div className="bank-card-number">
                    <label htmlFor="cardNumber">Номер картки</label>
                      <input
                        type="text"
                        placeholder="4111 1111 1111 1111"
                        maxLength={19}
                        required
                        // value={bankCardInput.cardNumber}
                        name="cardNumber"
                        // onChange={handleBankCardInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center align-items-center">
                  <div className="col-4">
                    <div className="bank-card-expires text-start">
                    <label htmlFor="expiryDate">Дійсна до</label>
                      <input
                        maxLength={5}
                        type="text"
                        placeholder="12/25"
                        required
                        // value={bankCardInput.expiryDate}
                        name="expiryDate"
                        // onChange={handleBankCardInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="bank-card-name">
                    <label htmlFor="cvc">CVC</label>
                      <input
                        minLength={3}
                        maxLength={3}
                        pattern="\d*"
                        type="text"
                        placeholder="123"
                        required
                        // value={bankCardInput.cvc}
                        name="cvc"
                        // onChange={handleBankCardInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div> */
}

export default withAuth(ServiceCatalog);
