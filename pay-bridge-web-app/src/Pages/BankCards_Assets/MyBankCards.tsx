import React, { useEffect, useState } from "react";
import {
  useAddBankCardMutation,
  useGetBankCardsQuery,
} from "../../APIs/bankCard_AssetAPI";
import {
  apiResponse,
  bankAccountModel,
  bankCardModel,
  personalAccountHolderProfileModel,
} from "../../Interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { MainLoader, MiniLoader } from "../../Components/Common";
import { setBankCardsState } from "../../Storage/Redux/bankCard_AssetSlice";
import BankAccountCard from "../BankAccount/BankAccountCard";
import BankCardCard from "./BankCardCard";
import inputHelper from "../../Helper/inputHelper";
import { useGetPersonalBankAccountsQuery } from "../../APIs/bankAccountAPI";
import { setUserBankAccounts } from "../../Storage/Redux/bankAccountSlice";
import toastNotify from "../../Helper/toastNotify";
import "../BankCards_Assets/bankCardStyle.css";
import visaLogo from "../../assets/images/bankCardImages/visa_logo.png";
import mastercardLogo from "../../assets/images/bankCardImages/mastercard_logo.png";

function MyBankCards() {
  const dispatch = useDispatch();

  const [bankCardInput, setBankCardInput] = useState(() => ({
    cardNumber: "",
    expiryDate: "",
    cvc: 0,
    currencyType: "UAH",
    balance: 0,
    isActive: true,
    bankAccountId: 0,
  }));

  const [isAddingNewCard, setAddingNewCard] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  const profileData: personalAccountHolderProfileModel = useSelector(
    (state: RootState) => state.personalAccountHolderStore
  );

  const bankAccountState = useSelector(
    (state: RootState) => state.bankAccountStore.userBankAccounts
  );

  const { data: bankCards, isLoading: bankCardsLoading } = useGetBankCardsQuery(
    profileData.accountId,
    {
      skip: profileData.accountId === 0,
    }
  );

  useEffect(() => {
    const foot = document.getElementById("footer");

    foot?.classList.remove("fixed-bottom");

    return() => {
      foot?.classList.add("fixed-bottom");
    }

  }, [])


  const { data: bankAccounts, isLoading: bankAccountsLoading } =
    useGetPersonalBankAccountsQuery(profileData.accountId, {
      skip: bankAccountState.length === 0 && isAddingNewCard === false,
    });

  useEffect(() => {
    if (bankAccounts && !bankAccountsLoading) {
      dispatch(setUserBankAccounts(bankAccounts.result));
    }
  }, [bankAccounts]);

  const bankCardsStore = useSelector(
    (state: RootState) => state.bankCard_AssetStore.bankCards
  );

  useEffect(() => {
    if (bankCards && !bankCardsLoading) {
      dispatch(setBankCardsState(bankCards.result));
    }
  }, [bankCards]);

  const [addBankCard] = useAddBankCardMutation();

  const handleAddingNewCard = () => {
    setAddingNewCard((previous) => !previous);
  };

  const handleAddCard = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (bankCardInput.bankAccountId === 0) {
      toastNotify("Оберіть рахунок для додавання банківської картки.", "error");
    }

    else{
    const response : apiResponse = await addBankCard({
      cardNumber: bankCardInput.cardNumber,
    expiryDate: bankCardInput.expiryDate,
    cvc: bankCardInput.cvc,
    currencyType: bankCardInput.currencyType,
    balance: 0,
    isActive: true,
    bankAccountId: bankCardInput.bankAccountId,
    })

    if(response && response.data?.isSuccess)
    {
      localStorage.setItem("storedMessage", JSON.stringify({message: response.data.result, type: "success"}));
      location.reload();
    }

    else
    {
      toastNotify(response.error.data.errorMessages[0], "error");
    }

    console.log(response);
  }

    setLoading(false);
  };

  window.onload =() => {
    const storedMessage = localStorage.getItem("storedMessage");
    if(storedMessage)
      {
        const {message, type} = JSON.parse(storedMessage);
        toastNotify(message, type);
        localStorage.removeItem("storedMessage");
      }
  }

  const handleBankCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, bankCardInput);

    if(e.target.name === "expiryDate" && e.target.value.length === 2)
    {
        tempData[e.target.name] = e.target.value.substring(0, 2) + "/" + e.target.value.substring(3);
    }

    if(e.target.name === "cardNumber" && (e.target.value.length > 0 && e.target.value.length % 5 === 0))
    {
        const newValue = e.target.value.substring(0, e.target.value.length-1) + " " + e.target.value.substring(e.target.value.length-1)
        tempData[e.target.name] = newValue;
    }

    if(e.target.name === "cvc" && (!/^\d*$/.test(e.target.value)))
    {
        const newValue = e.target.value.replace(/\D/g, '');
        tempData[e.target.name] = newValue;
    }

    setBankCardInput(tempData);
  };

  const handleBankAccountChoose = (accountId: number) => {
    setBankCardInput((prevState) => ({
      ...prevState,
      bankAccountId: accountId,
    }));
  };


  if (bankCardsLoading) {
    return <MainLoader></MainLoader>;
  }

  return (
    <div
      className="container rounded mt-3 pt-3"
      style={{ backgroundColor: "#212529" }}
    >
      <h2 className="text-white text-center">Ваші банківські картки</h2>
      <div className="d-flex justify-content-center">
        {isAddingNewCard ? (
          <form method="POST" onSubmit={handleAddCard}>
            <div>
              <h5 className="text-center" style={{ color: "#0DA378" }}>
                Оберіть рахунок для банківської картки
              </h5>
              <select
                onChange={(e) =>
                  handleBankAccountChoose(parseInt(e.target.value))
                }
                className="form-select d-block mx-auto mb-3"
                style={{ width: "80%" }}
                required
              >
                <option selected disabled>
                  Оберіть рахунок для створення
                </option>
                {bankAccountState.map(
                  (bankAccount: bankAccountModel, index: number) => (
                    <option key={index} value={bankAccount.accountId}>
                      {bankAccount.accountOwnerFullName} -{" "}
                      {bankAccount.bankName}
                    </option>
                  )
                )}
              </select>
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
                        value={bankCardInput.cardNumber}
                        name="cardNumber"
                        onChange={handleBankCardInput}
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
                        value={bankCardInput.expiryDate}
                        name="expiryDate"
                        onChange={handleBankCardInput}
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
                        value={bankCardInput.cvc}
                        name="cvc"
                        onChange={handleBankCardInput}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn form-control btn-outline-success text-white w-50 mb-3 d-block mx-auto"
                >
                  {isLoading ? <MiniLoader></MiniLoader> : "Підтвердити"}
                </button>
                <button
                  onClick={handleAddingNewCard}
                  type="button"
                  className="btn form-control btn-primary w-25 mb-3 d-block mx-auto"
                >
                  Відмінити
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAddingNewCard}
              className="btn form-control btn-primary w-70 mb-3"
            >
              {isLoading ? <MiniLoader></MiniLoader> : "Додати нову картку"}
            </button>
          </div>
        )}
      </div>
      {bankCardsStore && bankCardsStore.length > 0 ? (
        bankCardsStore.map((card: bankCardModel, index: number) => (
          <div className="py-4" key={index}>
            <div className="d-flex justify-content-center">
              <div className="">
                <BankCardCard bankCard={card}></BankCardCard>
              </div>
            </div>
          </div>
        ))
      ) : (<div className="text-center">
        <h5 className="text-danger pb-4">За Вашим обліковим записом не знайдено банківських карток.</h5>
      </div>)}
    </div>
  );
}

export default MyBankCards;
