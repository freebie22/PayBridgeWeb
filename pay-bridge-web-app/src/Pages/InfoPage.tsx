import React, { useEffect } from "react";
import payBridgeSm from "../assets/images/paybridge-sm.png";
import payBridgeSign from "../assets/images/paybridgeSign.png";

function InfoPage() {
  return (
    <div>
      <div
        className="container rounded d-flex justify-content-center align-items-center mt-4 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
        <img
          src={payBridgeSign}
          className="mx-3"
          style={{ margin: "auto", height: "50px", width: "300px" }}
        ></img>
        <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
      </div>
      <div
        className="container rounded d-flex justify-content-center align-items-center mt-3 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="row text-center">
          <div className="col text-center">
            <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
          </div>
          <span className="text-white h5 mt-2">
            Вітаємо Вас на інформаційній сторінці нашого сервісу онлайн-платежів
          </span>
        </div>
      </div>
      <div
        className="container rounded d-flex justify-content-center align-items-center mt-3 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="row text-center">
          <div className="col">
            <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
          </div>

          <h2 className="text-white text-center">Послуги</h2>
          <span className="text-white">
            Ми молодий сервіс, що надає послуги онлайн-переказів коштів. На
            даний момент, Ви маєте можливість оперувати 2 типами рахунків. Але, наша команда знаходиться в процесі постійного вдосконалення нашого дітища. Тому, слідкуйте за оновленнями!
          </span>
        </div>
      </div>
      <div
        className="container rounded d-flex justify-content-center align-items-center mt-3 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="row text-center">
          <div className="col">
            <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
          </div>

          <h2 className="text-white text-center">Рахунок фізичної особи</h2>
          <span className="text-white h6">
            Для того, щоб відкрити свій рахунок клієнта, Вам необхідно виконати
            наступні кроки:
          </span>
          <ul className="list-group">
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              1. Створити обліковий запис
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              2. Зареєструвати особистий кабінет сервісу PAYBRIDGE
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              3. Зареєструвати рахунок, з якого будуть здійснюватись платежі
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              4. Додати банківські картки, якими Ви будете проводити платежі
            </li>
          </ul>
        </div>
      </div>
      <div
        className="container rounded d-flex justify-content-center align-items-center my-3 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="row text-center">
          <div className="col">
            <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
          </div>

          <h2 className="text-white text-center">Рахунок компанії / ФОП</h2>
          <span className="text-white h6">
            Для того, щоб відкрити рахунок для компанії / ФОП, Вам необхідно
            виконати наступні кроки:
          </span>
          <ul className="list-group">
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              1. Створити обліковий запис відповідальної особи
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              2. Сформувати та надіслати на обробку менеджерам запит на
              оформлення Вашої юридичної особи в нашому сервісі
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              3. Зареєструвати рахунок, з якого будуть здійснюватись платежі
            </li>
            <li
              style={{
                color: "#0DA378",
                backgroundColor: "#212529",
                border: "none",
              }}
              className="list-group-item"
            >
              4. Додати розрахунковий рахунок / актив, яким Ви, як юридична
              особа, будете провоидити фінансові операції
            </li>
          </ul>
        </div>
      </div>
      <div
        className="container rounded d-flex justify-content-center align-items-center my-3 py-4"
        style={{ backgroundColor: "#212529" }}
      >
        <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
        <img
          src={payBridgeSign}
          className="mx-3"
          style={{ margin: "auto", height: "50px", width: "300px" }}
        ></img>
        <img src={payBridgeSm} alt="" style={{ maxHeight: "40px" }}></img>
      </div>
    </div>
  );
}

export default InfoPage;
