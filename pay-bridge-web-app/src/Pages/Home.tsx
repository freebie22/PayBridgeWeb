import React, { useEffect } from "react";
import logo from "../assets/images/logo.jpg";
import payBridge from "../assets/images/paybridge-wb.png";
import payBridgeSm from "../assets/images/paybridge-sm.png";
import financialImage from "../assets/images/financialImage.jpg";
// import "../Styles/homeStyle.css";

function Home() {
  return (
    <div className="container p-3">
      <div
        className="container rounded"
        id="first-container"
        style={{ backgroundColor: "#212529" }}
      >
        <div className="d-flex justify-content-center align-items-center">
          <img src={payBridge} alt="logo" />
        </div>
      </div>
      <div
        className="container p-3 mt-3 rounded"
        id="second-container"
        style={{ backgroundColor: "#212529" }}
      >
        <h4 className="text-center mt-2" style={{ color: "#0DA378" }}>
          Вітаємо Вас на сторінці сервісу онлайн-платежів PayBridge!
        </h4>
        <div className="row">
          <div className="col-lg-6 text-center">
            <img src={payBridgeSm} style={{ maxHeight: "40px" }} alt="avatar" />
            <h5 className="mt-1" style={{ color: "#FFF" }}>
              Ми - молодий сервіс, що був заснований в березні 2024 року. Нашою
              командою було створено якісний онлайн-застосунок, що відповідає
              усім сучасним вимогам щодо фінансової сфери.
            </h5>
            <img src={payBridgeSm} style={{ maxHeight: "40px" }} alt="avatar" />
            <h5 className="mt-1" style={{ color: "#FFF" }}>
              У нашому сервісі Ви можете зареєструвати власні банківські
              рахунки, та додати платіжні картки відповідних банків. Також, Ви
              можете створити корпоративинй аккаунт і виконувати фінансові
              операції. Детальніше про різні типи облікових записів Ви можете
              дізнатись на відповідній сторінці.
            </h5>
            <button className="btn btn-success mt-1">Детальніше</button>
          </div>
          <div className="col-lg-6">
            <div
              className="d-flex align-items-center justify-content-center mt-2"
              style={{ maxHeight: "100%" }}
            >
              <img
                src={financialImage}
                alt="avatar"
                className="img-fluid"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="container mt-3 rounded"
        id="third-container"
        style={{ backgroundColor: "#1F2029" }}
      >
        <h4 className="p-3 text-center" style={{ color: "#0DA378" }}>
          Наші клієнти
        </h4>
        {/* <div className="form-group justify-content-center text-center pb-3">
        <div className="row col-8 justify-content-center slider mx-auto">
          <div className="slide">
            <img
              className=""
              src="/images/istockphoto-1081481926-612x612-transformed.jpeg"
              width="100%"
            />
          </div>
          <div className="slide">
            <img
              className=""
              src="/images/istockphoto-1147618892-612x612-transformed.jpeg"
              width="100%"
            />
          </div>
          <div className="slide">
            <img
              className=""
              src="/images/istockphoto-1446754567-612x612-transformed.jpeg"
              width="100%"
            />
          </div>
          <div className="slide">
            <img
              className=""
              src="/images/istockphoto-859611724-612x612-transformed.jpeg"
              width="100%"
            />
          </div>
          <div className="slide">
            <img
              className=""
              src="/images/istockphoto-876914486-612x612-transformed.jpeg"
              width="100%"
            />
          </div>
        </div>
      </div> */}
      </div>
      <div
        className="container p-2 mt-3 rounded"
        id="fourth-container"
        style={{
          backgroundColor: "#1F2029",
          marginBottom: "50px",
        }}
      >
        <div className="col-12 row">
          <div className="col-6">
            <h3 className="text-center" style={{ color: "#0DA378" }}>
              Контакти
            </h3>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={payBridgeSm}
                style={{ maxHeight: "40px" }}
                alt="avatar"
              />
            </div>
            <div className="p-1">
              <h5 style={{ color: "#FFF" }} className="mt-2 text-center">
                Адреса офісу: м.Київ, вул. Прорізна 39/24
              </h5>
              <h5 className="text-center" style={{ color: "#FFF" }}>
                <a
                  href="tel:+380685034088"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  +380 68 503 4088
                </a>
              </h5>
              <h5 className="text-center" style={{ color: "#FFF" }}>
                <a
                  href="tel:+380950515967"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  +380 95 051 5967
                </a>
              </h5>
              <h5 className="text-center" style={{ color: "#FFEBA7" }}>
                <a
                  href="mailto:barbershop.oasis@ukr.net"
                  style={{ textDecoration: "none", color: "#FFF" }}
                >
                  paybridge@gmail.com
                </a>
              </h5>
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <img
              className="mt-1"
                src={payBridgeSm}
                style={{ maxHeight: "40px" }}
                alt="avatar"
              />
            </div>

            <h3 className="mt-2 text-center" style={{ color: "#0DA378" }}>
              Графік роботи нашого офісу
            </h3>
            <h5 style={{ color: "#FFF" }} className="mt-4 text-center">
              {" "}
              З 9:00 - 19:00
            </h5>
          </div>
          <div className="col-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d635.1432761850003!2d30.51452657683076!3d50.449051780974365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4ce59eb5dfcef%3A0x96a79a5ce83fbc8b!2z0J_RgNC40LHRg9GC0LrQvtCy0LjQuSDQsdGD0LTQuNC90L7QuiDQodGW0YDQvtGC0LrRltC90LA!5e0!3m2!1suk!2sua!4v1713039124708!5m2!1suk!2sua"
              style={{ border: "0", width: "100%", height: "100%" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
