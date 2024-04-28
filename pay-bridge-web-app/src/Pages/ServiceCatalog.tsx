import React, { useEffect, useState } from "react";
import { withAuth } from "../HOC";
import "..//Pages/BankCards_Assets/bankCardStyle.css";
import {
  useMakeCompanyToCompanyTransactionsMutation,
  useMakeUserToUserTransactionMutation,
} from "../APIs/transactionAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Storage/Redux/store";
import {
  useGetBankAssetsQuery,
  useGetBankCardsQuery,
} from "../APIs/bankCard_AssetAPI";
import {
  apiResponse,
  bankCardModel,
  personalAccountHolderProfileModel,
  responsiblePerson,
  userModel,
} from "../Interfaces";
import {
  emptyBankCard_AssetState,
  setBankAssetsState,
  setBankCardsState,
} from "../Storage/Redux/bankCard_AssetSlice";
import inputHelper from "../Helper/inputHelper";
import toastNotify from "../Helper/toastNotify";
import { MiniLoader } from "../Components/Common";
import { useNavigate } from "react-router-dom";
import payBridgeSm from "../assets/images/paybridge-sm.png";
import bankAsset from "../Interfaces/bankAssetModel";

enum RechargingTypes {
  RechargingOwnCard = "RechargingOwnCard",
  RechargingAnotherUserCard = "RechargingAnotherUserCard",
}

function ServiceCatalog() {
  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.add("fixed-bottom");

    return () => {
      foot?.classList.remove("fixed-bottom");
    };
  }, []);

  const responsiblePersonData: responsiblePerson = useSelector(
    (state: RootState) => state.responsiblePersonStore
  );

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
      skip:
        bankCardsStore.length > 0 ||
        responsiblePersonData.responsiblePersonId !== 0,
    }
  );

  useEffect(() => {
    if (bankCards && !bankCardsLoading) {
      dispatch(setBankCardsState(bankCards.result));
    }
  }, [bankCards]);

  const [userToUserTransactionInput, setUserToUserTransactionInput] = useState({
    amount: 0,
    senderBankCardNumber: "",
    receiverBankCardNumber: "",
    senderExpiryDate: "",
    senderCVC: "",
    rechargingType: "",
  });

  const navigate = useNavigate();
  const [isRechargingOwnCard, setRechargingOwnCard] = useState<boolean>(false);
  const [isRechargingCard, setRechargingCard] = useState<boolean>(false);
  const [isRechargingOwnAsset, setRechargingOwnAsset] =
    useState<boolean>(false);
  const [isRechargingAsset, setRechargingAsset] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const userData: userModel = useSelector(
    (state: RootState) => state.userAuthStore
  );

  useEffect(() => {
    if (userData.role !== "Client" && userData.role !== "Responsible_Person") {
      navigate("/login");
    }
  }, []);

  //#region UserToUserTransactions(переказ зі своєї картки на іншу картку)

  const handleReachargingOwnCard = () => {
    setRechargingOwnCard((previousState) => !previousState);
    setUserToUserTransactionInput({
      amount: 0,
      senderBankCardNumber: "",
      receiverBankCardNumber: "",
      senderExpiryDate: "",
      senderCVC: "",
      rechargingType: "",
    });
  };

  const [bankCardsToReceive, setBankCardsToReceive] =
    useState<bankCardModel[]>();

  const [makeUserToUserTransaction] = useMakeUserToUserTransactionMutation();

  const handleMakeUserToUserTransaction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await makeUserToUserTransaction({
      amount: userToUserTransactionInput.amount,
      senderBankCardNumber: userToUserTransactionInput.senderBankCardNumber,
      receiverBankCardNumber: userToUserTransactionInput.receiverBankCardNumber,
      rechargingType: userToUserTransactionInput.rechargingType,
      senderCVC: userToUserTransactionInput.senderCVC,
      senderExpiryDate: userToUserTransactionInput.senderExpiryDate,
    });

    if (response.data && response.data.isSuccess) {
      toastNotify(
        "Транзакцію виконано успішно, деталі Ви можете переглянути в особистому кабінеті.",
        "success"
      );
      setRechargingOwnCard(false);
      setRechargingCard(false);
    } else {
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
      senderBankCardNumber: cardNumber,
    }));

    setBankCardsToReceive(cardsFromList);
  };

  const handleChooseReceiverCard = (cardNumber: string) => {
    setUserToUserTransactionInput((previousState) => ({
      ...previousState,
      receiverBankCardNumber: cardNumber,
    }));
  };

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userToUserTransactionInput);

    if (
      e.target.name === "senderBankCardNumber" &&
      e.target.value.length > 0 &&
      e.target.value.length % 5 === 0
    ) {
      const newValue =
        e.target.value.substring(0, e.target.value.length - 1) +
        " " +
        e.target.value.substring(e.target.value.length - 1);
      tempData[e.target.name] = newValue;
    }

    if (
      e.target.name === "receiverBankCardNumber" &&
      e.target.value.length > 0 &&
      e.target.value.length % 5 === 0
    ) {
      const newValue =
        e.target.value.substring(0, e.target.value.length - 1) +
        " " +
        e.target.value.substring(e.target.value.length - 1);
      tempData[e.target.name] = newValue;
    }

    if (
      e.target.name === "senderExpiryDate" &&
      e.target.value.length > 0 &&
      e.target.value.length === 2
    ) {
      const newValue =
        e.target.value.substring(0, 2) + "/" + e.target.value.substring(3);
      tempData[e.target.name] = newValue;
    }

    setUserToUserTransactionInput(tempData);
  };

  //#endregion

  //#region UserToCompanyTransactions(переказ зі своєї картки на рахунок компанії/ФОП)

  const bankAssetStore = useSelector(
    (state: RootState) => state.bankCard_AssetStore.bankAssets
  );

  const { data: bankAssetsData, isLoading: bankAssetsLoading } =
    useGetBankAssetsQuery(responsiblePersonData.responsiblePersonId, {
      skip:
        responsiblePersonData.responsiblePersonId === 0 ||
        bankAssetStore.length > 0,
    });

  useEffect(() => {
    if (bankAssetStore.length === 0) {
      if (bankAssetsData && !bankAssetsLoading) {
        dispatch(setBankAssetsState(bankAssetsData.result));
      }
    }
  }, [bankAssetsData, bankAssetStore]);

  const [makeCompanyToCompanyTransaction] =
    useMakeCompanyToCompanyTransactionsMutation();

  const handleMakeCompanyToCompanyTransaction = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    const response: apiResponse = await makeCompanyToCompanyTransaction({
      currencyCode: "uah",
      amount: companyToCompanyTransactionInput.amount,
      description: companyToCompanyTransactionInput.description,
      transactionType: "Переказ коштів між власними рахунками",
      senderIBANNumber: companyToCompanyTransactionInput.senderIBANNumber,
      receiverIBANNumber: companyToCompanyTransactionInput.receiverIBANNumber,
    });

    if (response.data && response.data.isSuccess) {
      setCompanyToCompanyTransactionInput({
        currencyCode: "",
        amount: 0,
        description: "",
        transactionType: "",
        senderIBANNumber: "",
        receiverIBANNumber: "",
      });
      setBankAssetsToRecieve(undefined);
      dispatch(setBankAssetsState({ ...emptyBankCard_AssetState }));
      setRechargingOwnAsset(false);
      setRechargingAsset(false);
      navigate("/");
      toastNotify("Переказ на рахунок здійснено успішно!");
    } else if (response.error) {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    setLoading(false);
  };

  const [
    companyToCompanyTransactionInput,
    setCompanyToCompanyTransactionInput,
  ] = useState({
    currencyCode: "",
    amount: 0,
    description: "",
    transactionType: "",
    senderIBANNumber: "",
    receiverIBANNumber: "",
  });

  const [bankAssetsToReceive, setBankAssetsToRecieve] = useState<bankAsset[]>();

  const handleChooseBankAsset = (ibaN_Number: string) => {
    let assetsFromList = bankAssetStore.filter(
      (asset: bankAsset) => asset.ibaN_Number !== ibaN_Number
    );

    setCompanyToCompanyTransactionInput((previousState) => ({
      ...previousState,
      senderIBANNumber: ibaN_Number,
    }));

    setBankAssetsToRecieve(assetsFromList);
  };

  const handleChooseReceiverAsset = (ibaN_Number: string) => {
    setCompanyToCompanyTransactionInput((previousState) => ({
      ...previousState,
      receiverIBANNumber: ibaN_Number,
    }));
  };

  const handleRechargingOwnAsset = () => {
    setRechargingOwnAsset((previousState) => !previousState);

    setBankAssetsToRecieve(undefined);

    setCompanyToCompanyTransactionInput({
      currencyCode: "",
      amount: 0,
      description: "",
      transactionType: "",
      senderIBANNumber: "",
      receiverIBANNumber: "",
    });
  };

  const handleAssetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, companyToCompanyTransactionInput);
    setCompanyToCompanyTransactionInput(tempData);
  };

  //#endregion

  return (
    <div
      className="container rounded mt-3 p-3"
      style={{ backgroundColor: "#212529" }}
    >
      {userData && userData.role === "Client" && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="text-center">
              <h1 className="text-white">Каталог послуг фізичної особи</h1>
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
                          <select
                            onChange={(e) =>
                              handleChooseReceiverCard(e.target.value)
                            }
                            className="form-select"
                          >
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
                        Введіть суму поповнення
                      </label>
                      <div className="row justify-content-center align-items-center">
                        <div className="col-8">
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
                              onChange={handleCardInput}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        disabled={isLoading}
                        type="submit"
                        onClick={() =>
                          setUserToUserTransactionInput((previousState) => ({
                            ...previousState,
                            rechargingType: RechargingTypes.RechargingOwnCard,
                          }))
                        }
                        className="btn btn-success my-3"
                      >
                        {isLoading ? <MiniLoader></MiniLoader> : "Підтвердити"}
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleReachargingOwnCard}
                    className="btn btn-danger my-1"
                  >
                    Відмінити
                  </button>
                </form>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleReachargingOwnCard}
                    className="btn btn-primary mb-2"
                  >
                    Детальніше
                  </button>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-white">Переказ з картки на карту</h3>
              {isRechargingCard ? (
                <form method="POST" onSubmit={handleMakeUserToUserTransaction}>
                  <div className="text-center">
                    <h5 className="text-white">З картки</h5>
                  </div>
                  <div
                    className="bank-card mb-3 mx-auto"
                    style={{ backgroundColor: "#0DA378", color: "white" }}
                  >
                    <div className="row justify-content-center">
                      <div className="col-8">
                        <div className="bank-card-number">
                          <label htmlFor="senderBankCardNumber">
                            Номер картки
                          </label>
                          <input
                            type="text"
                            placeholder="4111 1111 1111 1111"
                            maxLength={19}
                            required
                            value={
                              userToUserTransactionInput.senderBankCardNumber
                            }
                            name="senderBankCardNumber"
                            onChange={handleCardInput}
                            className="form-control"
                            onKeyDown={(event) => {
                              if (event.key === "Backspace") {
                                event.preventDefault();
                                const updatedCardNumber =
                                  userToUserTransactionInput.senderBankCardNumber.slice(
                                    0,
                                    -1
                                  );
                                setUserToUserTransactionInput(
                                  (previousState) => ({
                                    ...previousState,
                                    senderBankCardNumber: updatedCardNumber,
                                  })
                                );
                              }
                            }}
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
                            value={userToUserTransactionInput.senderExpiryDate}
                            name="senderExpiryDate"
                            onChange={handleCardInput}
                            className="form-control"
                            onKeyDown={(e) => {
                              if (e.key === "Backspace") {
                                e.preventDefault();
                                const newExpiryDate =
                                  userToUserTransactionInput.senderExpiryDate.slice(
                                    0,
                                    -1
                                  );
                                setUserToUserTransactionInput(
                                  (previousState) => ({
                                    ...previousState,
                                    senderExpiryDate: newExpiryDate,
                                  })
                                );
                              }
                            }}
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
                            value={userToUserTransactionInput.senderCVC}
                            name="senderCVC"
                            onChange={handleCardInput}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-4">
                    <div className="col-8">
                      <label
                        htmlFor="amount"
                        className="h5 text-center text-white"
                      >
                        Введіть суму переказу
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="Сума"
                        name="amount"
                        maxLength={5}
                        onChange={handleCardInput}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div className="text-white">
                        <h5 className="text-center">На карту</h5>
                      </div>
                      <div
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
                                value={
                                  userToUserTransactionInput.receiverBankCardNumber
                                }
                                name="receiverBankCardNumber"
                                onChange={handleCardInput}
                                className="form-control"
                                onKeyDown={(event) => {
                                  if (event.key === "Backspace") {
                                    event.preventDefault();
                                    const newValue =
                                      userToUserTransactionInput.receiverBankCardNumber.slice(
                                        0,
                                        -1
                                      );
                                    setUserToUserTransactionInput(
                                      (previousState) => ({
                                        ...previousState,
                                        receiverBankCardNumber: newValue,
                                      })
                                    );
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={() =>
                      setUserToUserTransactionInput((previousState) => ({
                        ...previousState,
                        rechargingType:
                          RechargingTypes.RechargingAnotherUserCard,
                      }))
                    }
                    className="btn btn-success mb-2"
                  >
                    Підтвердити
                  </button>
                  <button
                    className="btn btn-danger mx-3 mb-2"
                    onClick={() =>
                      setRechargingCard((previousState) => !previousState)
                    }
                  >
                    Відмінити
                  </button>
                </form>
              ) : (
                <button
                  className="btn btn-primary mb-2"
                  onClick={() =>
                    setRechargingCard((previousState) => !previousState)
                  }
                >
                  Детальніше
                </button>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-white">Переказ за реквізитами</h3>
              <button className="btn btn-primary mb-2">Детальніше</button>
            </div>
          </div>
        </div>
      )}

      {userData && userData.role === "Responsible_Person" && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="row">
            <div className="d-flex justify-content-center align-items-center">
              <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
              <h1 className="text-white mx-2">Каталог послуг для компанії/ФОП</h1>
              <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
            </div>
            <div className="text-center rounded">
              <h3 className="text-white">Переказ на власний рахунок</h3>
              {isRechargingOwnAsset ? (
                <form
                  method="POST"
                  onSubmit={handleMakeCompanyToCompanyTransaction}
                >
                  <label className="h5 text-white">З рахунку</label>
                  <div className="row justify-content-center">
                    <div className="col-8 text-center">
                      <select
                        onChange={(e) => handleChooseBankAsset(e.target.value)}
                        className="form-select"
                      >
                        <option disabled selected>
                          --Оберіть розрахунковий рахунок--
                        </option>
                        {bankAssetStore.map(
                          (asset: bankAsset, index: number) => (
                            <option key={index} value={asset.ibaN_Number}>
                              {asset.ibaN_Number} - {asset.bankName} -{" "}
                              {asset.balance} грн.
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  {bankAssetsToReceive && bankAssetsToReceive.length > 0 && (
                    <div>
                      <div className="text-center mt-3">
                        <h5 className="text-white">На рахунок</h5>
                      </div>
                      <div className="row justify-content-center">
                        <div className="col-8 text-center">
                          <select
                            onChange={(e) =>
                              handleChooseReceiverAsset(e.target.value)
                            }
                            className="form-select"
                          >
                            <option disabled selected>
                              --Оберіть розрахунковий рахунок--
                            </option>
                            {bankAssetsToReceive.map(
                              (asset: bankAsset, index: number) => (
                                <option key={index} value={asset.ibaN_Number}>
                                  {asset.ibaN_Number} - {asset.bankName} -{" "}
                                  {asset.balance} грн.
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                      <label className="h5 text-white">
                        Призначення переказу
                      </label>
                      <div className="row justify-content-center align-items-center">
                        <div className="col-8">
                          <div className="">
                            <label
                              className="text-white text-center"
                              htmlFor="description"
                            >
                              Призначення переказу
                            </label>
                            <input
                              type="text"
                              placeholder="Призначення..."
                              required
                              name="description"
                              onChange={handleAssetInput}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <label className="h5 text-white">
                        Введіть суму переказу
                      </label>
                      <div className="row justify-content-center align-items-center">
                        <div className="col-8">
                          <div className="">
                            <label
                              className="text-white text-center"
                              htmlFor="amount"
                            >
                              Сума переказу, грн
                            </label>
                            <input
                              maxLength={5}
                              type="number"
                              placeholder="Сума переказу..."
                              required
                              name="amount"
                              onChange={handleAssetInput}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="btn btn-success my-3"
                      >
                        {isLoading ? <MiniLoader></MiniLoader> : "Підтвердити"}
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={handleRechargingOwnAsset}
                    className="btn btn-danger my-1"
                  >
                    Відмінити
                  </button>
                </form>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={handleRechargingOwnAsset}
                    className="btn btn-primary mb-2"
                  >
                    Детальніше
                  </button>
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-white">Переказ з рахунку на рахунок</h3>
              {isRechargingAsset ? (
                <form method="POST" onSubmit={handleMakeCompanyToCompanyTransaction}>
                  <div
                    className="mb-3 mx-auto"
                    style={{color: "white" }}
                  >
                    <div className="row justify-content-center">
                      <div className="col-8">
                        <div className="">
                          <label className="h5" htmlFor="senderBankCardNumber">
                            IBAN-номер рахунку відправника
                          </label>
                          <input
                            type="text"
                            placeholder="UA0000000000000000000000000001"
                            maxLength={29}
                            required
                            value={
                              companyToCompanyTransactionInput.senderIBANNumber
                            }
                            name="senderIBANNumber"
                            onChange={handleAssetInput}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-4">
                    <div className="col-8">
                      <label
                        htmlFor="description"
                        className="h5 text-center text-white"
                      >
                        Призначення переказу
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        placeholder="Призначення..."
                        name="description"
                        value={companyToCompanyTransactionInput.description}
                        onChange={handleAssetInput}
                      ></input>
                    </div>
                  </div>
                  <div className="row justify-content-center align-items-center mb-4">
                    <div className="col-8">
                      <label
                        htmlFor="amount"
                        className="h5 text-center text-white"
                      >
                        Введіть суму переказу
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        required
                        placeholder="Сума"
                        name="amount"
                        value={companyToCompanyTransactionInput.amount}
                        onChange={handleAssetInput}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div
                        className="mb-3 mx-auto"
                        style={{color: "white" }}
                      >
                        <div className="row justify-content-center">
                          <div className="col-8">
                            <div className="">
                              <label className="h5" htmlFor="receiverIBANNumber">
                                IBAN-номер рахунку отримувача
                              </label>
                              <input
                                type="text"
                                placeholder="UA0000000000000000000000000001"
                                maxLength={29}
                                required
                                value={
                                  companyToCompanyTransactionInput.receiverIBANNumber
                                }
                                name="receiverIBANNumber"
                                onChange={handleAssetInput}
                                className="form-control"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success mb-2"
                  >
                    Підтвердити
                  </button>
                  <button
                    className="btn btn-danger mx-3 mb-2"
                    onClick={() =>
                      setRechargingAsset((previousState) => !previousState)
                    }
                  >
                    Відмінити
                  </button>
                </form>
              ) : (
                <button
                  className="btn btn-primary mb-2"
                  onClick={() =>
                    setRechargingAsset((previousState) => !previousState)
                  }
                >
                  Детальніше
                </button>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-white">Переказ за номером картки</h3>
              <button className="btn btn-primary mb-2">Детальніше</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withAuth(ServiceCatalog);
